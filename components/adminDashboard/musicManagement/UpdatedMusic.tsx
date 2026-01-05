"use client";
import { Upload, Music, Save, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useGetAllAlbumsQuery } from "@/lib/api/albumApi";
import { useGetArtistListQuery } from "@/lib/api/artistApi";
import {
    useGetSingleMusicQuery,
    useUpdateMusicMutation,
} from "@/lib/api/musicApi";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

// Updated Zod validation schema for update (audio file optional)
const musicSchema = z.object({
    title: z.string().min(1, "Music title is required"),
    description: z.string().optional(),
    genre: z.string().min(1, "Genre is required"),
    albumId: z.string().optional(),
    language: z.string().min(1, "Language is required"),
    artistIds: z.array(z.string()).min(1, "At least one artist is required"),
    audioFile: z
        .union([
            z
                .instanceof(File)
                .refine((file) => file.type.startsWith("audio/"), {
                    message: "Please upload a valid audio file",
                })
                .refine((file) => file.size <= 50 * 1024 * 1024, {
                    message: "Audio file must be less than 50MB",
                }),
            z.undefined(),
        ])
        .optional(),
});

type MusicFormData = z.infer<typeof musicSchema>;

export default function UpdateMusic() {
    const params = useParams();
    const router = useRouter();
    const musicId = params.id as string;
    const [openArtistPopover, setOpenArtistPopover] = React.useState(false);
    const [openAlbumPopover, setOpenAlbumPopover] = React.useState(false);
    const [artistSearch, setArtistSearch] = useState("");
    const [albumSearch, setAlbumSearch] = useState("");
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // RTK Query hooks
    const { data: musicData, isLoading: isLoadingMusic } =
        useGetSingleMusicQuery(musicId);
    const { data: albumsData, isLoading: isLoadingAlbums } =
        useGetAllAlbumsQuery();
    const { data: artistsData, isLoading: isLoadingArtists } =
        useGetArtistListQuery();
    const [updateMusic, { isLoading: isUpdatingMusic }] =
        useUpdateMusicMutation();

    const albums = albumsData?.data || [];
    const artists = artistsData?.data || [];
    const currentMusic = musicData?.data;

    // React Hook Form with Zod validation
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<MusicFormData>({
        resolver: zodResolver(musicSchema),
        defaultValues: {
            title: "",
            description: "",
            genre: "",
            albumId: "",
            language: "English",
            artistIds: [],
            audioFile: undefined,
        },
    });

    const watchedArtistIds = watch("artistIds");
    const watchedAlbumId = watch("albumId");
    const watchedAudioFile = watch("audioFile");

    // Populate form when music data is loaded
    useEffect(() => {
        if (currentMusic) {
            reset({
                title: currentMusic.title || "",
                description: currentMusic.description || "",
                genre: currentMusic.genre || "",
                albumId: currentMusic.albumId || "",
                language: currentMusic.language || "English",
                artistIds: currentMusic.artistIds || [],
                audioFile: undefined, // Keep undefined for existing file
            });
        }
    }, [currentMusic, reset]);

    const filteredArtists = artists.filter((artist: any) =>
        artist.name.toLowerCase().includes(artistSearch.toLowerCase())
    );

    const filteredAlbums = albums.filter((album: any) =>
        album.title.toLowerCase().includes(albumSearch.toLowerCase())
    );

    const handleArtistSelect = (artistId: string) => {
        const currentArtists = watchedArtistIds || [];
        if (currentArtists.includes(artistId)) {
            setValue(
                "artistIds",
                currentArtists.filter((id) => id !== artistId),
                { shouldValidate: true }
            );
        } else {
            setValue("artistIds", [...currentArtists, artistId], {
                shouldValidate: true,
            });
        }
    };

    const getSelectedArtistNames = () => {
        return (watchedArtistIds || [])
            .map((id) => {
                const artist = artists.find((a: any) => a.id === id);
                return artist?.name || "";
            })
            .filter((name) => name);
    };

    const getSelectedAlbumTitle = () => {
        if (!watchedAlbumId) return "";
        const album = albums.find((a: any) => a.id === watchedAlbumId);
        return album?.title || "";
    };

    const handleAlbumSelect = (albumId: string) => {
        setValue("albumId", albumId === watchedAlbumId ? "" : albumId, {
            shouldValidate: true,
        });
        setOpenAlbumPopover(false);
    };

    const handleAudioFileChange = (file: File | null) => {
        if (file) {
            setValue("audioFile", file, { shouldValidate: true });
            // Stop current audio if playing
            if (audio && isPlaying) {
                audio.pause();
                setIsPlaying(false);
            }
        } else {
            setValue("audioFile", undefined, { shouldValidate: true });
        }
    };

    const handlePlayPreview = () => {
        const audioUrl = watchedAudioFile ? URL.createObjectURL(watchedAudioFile) : currentMusic?.audioUrl;

        if (!audioUrl) return;

        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        } else {
            const newAudio = new Audio(audioUrl);
            newAudio.play();
            setAudio(newAudio);
            setIsPlaying(true);
            newAudio.onended = () => setIsPlaying(false);
        }
    };

    const onSubmit = async (data: MusicFormData) => {
        try {
            const formData = new FormData();

            // ✅ audio (optional for update)
            if (data.audioFile) {
                formData.append("audio", data.audioFile);
            }

            // ✅ all other music data as JSON
            const musicPayload = {
                title: data.title,
                description: data.description || "",
                genre: data.genre,
                language: data.language,
                albumId: data.albumId || null,
                artistIds: data.artistIds,
            };

            formData.append("data", JSON.stringify(musicPayload));

            await updateMusic({
                id: musicId,
                formData,
            }).unwrap();

            toast.success("Music updated successfully!");

            // Redirect back to music list after successful update
            setTimeout(() => {
                router.push("/admin-dashboard/music-management");
            }, 1500);
        } catch (error) {
            console.error("Failed to update music:", error);
            toast.error("Failed to update music. Please try again.");
        }
    };

    // Show loading state while fetching music data
    if (isLoadingMusic) {
        return (
            <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <div className="text-white text-lg">Loading music data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:p-6 lg:p-8">
            <div className="w-full mx-auto max-w-7xl">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-linear-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                            Update Music
                        </h1>
                    </div>
                    <p className="text-neutral-400 ml-7">
                        Update existing music information
                    </p>
                </div>

                <div>
                    <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Music className="text-yellow-500" size={20} />
                            Music Information
                        </h2>

                        <div className="space-y-6">
                            {/* Music Title & Genre */}
                            <div className="flex flex-col sm:flex-row items-start gap-6 w-full">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Music Title *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("title")}
                                        placeholder="Enter music title"
                                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                    />
                                    {errors.title && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Genre *
                                    </label>
                                    <select
                                        {...register("genre")}
                                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all">
                                        <option value="">Select Genre</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Rock">Rock</option>
                                        <option value="Hip Hop">Hip Hop</option>
                                        <option value="R&B">R&B</option>
                                        <option value="Country">Country</option>
                                        <option value="Jazz">Jazz</option>
                                        <option value="Classical">Classical</option>
                                        <option value="Electronic">Electronic</option>
                                        <option value="Reggae">Reggae</option>
                                        <option value="Gospel">Gospel</option>
                                    </select>
                                    {errors.genre && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.genre.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Language & Album */}
                            <div className="flex flex-col sm:flex-row items-start gap-6 w-full">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Language *
                                    </label>
                                    <select
                                        {...register("language")}
                                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all">
                                        <option value="English">English</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                        <option value="German">German</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Bengali">Bengali</option>
                                    </select>
                                    {errors.language && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.language.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Album (Optional)
                                    </label>
                                    <div className="relative">
                                        <Controller
                                            name="albumId"
                                            control={control}
                                            render={({ field }) => (
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenAlbumPopover(!openAlbumPopover)}
                                                    disabled={isLoadingAlbums}
                                                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all flex items-center justify-between">
                                                    <span>
                                                        {isLoadingAlbums
                                                            ? "Loading albums..."
                                                            : !field.value
                                                                ? "Select album..."
                                                                : getSelectedAlbumTitle()}
                                                    </span>
                                                    <ChevronsUpDown className="opacity-50" size={16} />
                                                </button>
                                            )}
                                        />
                                        {openAlbumPopover && !isLoadingAlbums && (
                                            <div className="absolute z-50 w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search albums..."
                                                        value={albumSearch}
                                                        onChange={(e) => setAlbumSearch(e.target.value)}
                                                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    />
                                                </div>
                                                <div className="max-h-64 overflow-y-auto">
                                                    {filteredAlbums.length === 0 ? (
                                                        <div className="text-neutral-400 py-4 text-center text-sm">
                                                            No album found.
                                                        </div>
                                                    ) : (
                                                        filteredAlbums.map((album: any) => (
                                                            <button
                                                                key={album.id}
                                                                type="button"
                                                                onClick={() => handleAlbumSelect(album.id)}
                                                                className="w-full px-4 py-2 text-left hover:bg-neutral-700 text-white flex items-center justify-between">
                                                                <span>{album.title}</span>
                                                                <Check
                                                                    className={
                                                                        watchedAlbumId === album.id
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    }
                                                                    size={16}
                                                                />
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.albumId && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.albumId.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Artists Multi-select */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Artists *
                                </label>
                                <div className="relative">
                                    <Controller
                                        name="artistIds"
                                        control={control}
                                        render={({ field }) => (
                                            <button
                                                type="button"
                                                onClick={() => setOpenArtistPopover(!openArtistPopover)}
                                                disabled={isLoadingArtists}
                                                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all flex items-center justify-between">
                                                <span>
                                                    {isLoadingArtists
                                                        ? "Loading artists..."
                                                        : field.value.length === 0
                                                            ? "Select artists..."
                                                            : `${field.value.length} artist(s) selected`}
                                                </span>
                                                <ChevronsUpDown className="opacity-50" size={16} />
                                            </button>
                                        )}
                                    />
                                    {openArtistPopover && !isLoadingArtists && (
                                        <div className="absolute z-50 w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl">
                                            <div className="p-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search artists..."
                                                    value={artistSearch}
                                                    onChange={(e) => setArtistSearch(e.target.value)}
                                                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                />
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {filteredArtists.length === 0 ? (
                                                    <div className="text-neutral-400 py-4 text-center text-sm">
                                                        No artist found.
                                                    </div>
                                                ) : (
                                                    filteredArtists.map((artist: any) => (
                                                        <button
                                                            key={artist.id}
                                                            type="button"
                                                            onClick={() => handleArtistSelect(artist.id)}
                                                            className="w-full px-4 py-2 text-left hover:bg-neutral-700 text-white flex items-center justify-between">
                                                            <span>{artist.name}</span>
                                                            <Check
                                                                className={
                                                                    watchedArtistIds?.includes(artist.id)
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                }
                                                                size={16}
                                                            />
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.artistIds && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.artistIds.message}
                                    </p>
                                )}

                                {watchedArtistIds && watchedArtistIds.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {getSelectedArtistNames().map((name, index) => (
                                            <div
                                                key={index}
                                                className="px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center gap-2">
                                                <span className="text-sm text-yellow-300">{name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleArtistSelect(watchedArtistIds[index])
                                                    }
                                                    className="text-yellow-300 hover:text-yellow-200">
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    placeholder="Enter music description"
                                    rows={4}
                                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                                />
                                {errors.description && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Audio Upload Section */}
                    <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Music className="text-yellow-500" size={20} />
                            Audio File
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Audio File (Optional - Upload only if you want to change)
                            </label>
                            {(currentMusic?.audioUrl || watchedAudioFile) && (
                                <div className="mb-4">
                                    <button
                                        type="button"
                                        onClick={handlePlayPreview}
                                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition shadow-lg hover:shadow-yellow-500/50"
                                    >
                                        {isPlaying ? (
                                            <>
                                                <Pause size={18} />
                                                Pause Preview
                                            </>
                                        ) : (
                                            <>
                                                <Play size={18} />
                                                Preview Audio
                                            </>
                                        )}
                                    </button>
                                    <p className="text-neutral-500 text-xs mt-1">
                                        {watchedAudioFile ? "Previewing new uploaded file" : "Previewing current audio file"}
                                    </p>
                                </div>
                            )}
                            <Controller
                                name="audioFile"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <>
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    onChange(file);
                                                    handleAudioFileChange(file);
                                                }
                                            }}
                                            className="hidden"
                                            id="audio-file"
                                            {...field}
                                        />
                                        <div
                                            onClick={() =>
                                                document.getElementById("audio-file")?.click()
                                            }
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const file = e.dataTransfer.files?.[0];
                                                if (file) {
                                                    onChange(file);
                                                    handleAudioFileChange(file);
                                                }
                                            }}
                                            onDragOver={(e) => e.preventDefault()}
                                            className="w-full h-48 border-2 border-dashed border-neutral-600 rounded-xl flex items-center justify-center bg-neutral-800 cursor-pointer hover:border-yellow-500 hover:bg-neutral-700 transition-all group">
                                            {watchedAudioFile ? (
                                                <div className="text-center px-4">
                                                    <Music
                                                        size={32}
                                                        className="text-yellow-500 mx-auto mb-2"
                                                    />
                                                    <p className="text-neutral-300 text-sm font-medium truncate">
                                                        {watchedAudioFile.name}
                                                    </p>
                                                    <p className="text-neutral-500 text-xs mt-1">
                                                        {(watchedAudioFile.size / (1024 * 1024)).toFixed(2)}{" "}
                                                        MB
                                                    </p>
                                                    <p className="text-yellow-500 text-xs mt-2">
                                                        New file selected
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <Upload
                                                        size={32}
                                                        className="text-neutral-500 group-hover:text-yellow-500 transition-colors mx-auto mb-2"
                                                    />
                                                    <p className="text-neutral-400 text-sm">
                                                        {currentMusic?.audioUrl
                                                            ? "Click or drag to upload new audio (Optional)"
                                                            : "Click or drag to upload audio"}
                                                    </p>
                                                    {currentMusic?.audioUrl && (
                                                        <p className="text-neutral-500 text-xs mt-1">
                                                            Current audio file will be kept if no new file is
                                                            uploaded
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            />
                            {errors.audioFile && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.audioFile.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
                            disabled={isUpdatingMusic}>
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isUpdatingMusic}
                            className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                            {isUpdatingMusic ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Update Music
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
