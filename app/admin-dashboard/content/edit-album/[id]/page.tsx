/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Upload, GripVertical, X, Music, Plus, Image } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useGetSingleAlbumQuery, useUpdateAlbumMutation } from "@/lib/api/albumApi";
import { useGetArtistListQuery } from "@/lib/api/artistApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditAlbum() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [selectedArtist, setSelectedArtist] = useState("");
    const [albumTitle, setAlbumTitle] = useState("");
    const [albumDescription, setAlbumDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [albumImage, setAlbumImage] = useState<string | null>(null);
    const [albumImageFile, setAlbumImageFile] = useState<File | null>(null);
    const [tracks, setTracks] = useState<
        Array<{
            id: number;
            title: string;
            duration: string;
            fileName: string;
            file: File | null;
        }>
    >([]);
    const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
    const [newTrackTitle, setNewTrackTitle] = useState("");
    const [newTrackDuration, setNewTrackDuration] = useState("");
    const [newTrackFile, setNewTrackFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const audioFileInputRef = useRef<HTMLInputElement>(null);

    const { data: artistListData, isLoading: isArtistsLoading } = useGetArtistListQuery();
    const { data: albumData, isLoading: isAlbumLoading } = useGetSingleAlbumQuery(id);
    const [updateAlbum, { isLoading: isPublishing }] = useUpdateAlbumMutation();

    useEffect(() => {
        if (albumData?.data) {
            const album = albumData.data;
            setAlbumTitle(album.title || "");
            setAlbumDescription(album.description || "");
            setReleaseDate(album.releaseDate ? new Date(album.releaseDate).toISOString().split('T')[0] : "");
            setSelectedGenre(album.genre || "");
            setAlbumImage(album.coverImage || null);
            if (album.artistIds && album.artistIds.length > 0) {
                setSelectedArtist(album.artistIds[0]);
            }
        }
    }, [albumData]);

    const genres = [
        "Gospel",
        "Pop",
        "Jazz",
        "R&B",
        "Hip Hop",
        "Rock",
        "Electronic",
        "Classical",
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAlbumImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAlbumImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const removeTrack = (id: number) => {
        setTracks(tracks.filter((track) => track.id !== id));
    };

    const addTrack = () => {
        if (newTrackTitle.trim() && newTrackDuration.trim() && newTrackFile) {
            const newTrack = {
                id: tracks.length > 0 ? Math.max(...tracks.map((t) => t.id)) + 1 : 1,
                title: newTrackTitle,
                duration: newTrackDuration,
                file: newTrackFile,
                fileName: newTrackFile.name,
            };
            setTracks([...tracks, newTrack]);
            setNewTrackTitle("");
            setNewTrackDuration("");
            setNewTrackFile(null);
            if (audioFileInputRef.current) {
                audioFileInputRef.current.value = "";
            }
        }
    };

    const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("audio/")) {
            setNewTrackFile(file);

            const audio = new Audio();
            audio.src = URL.createObjectURL(file);
            audio.onloadedmetadata = () => {
                const minutes = Math.floor(audio.duration / 60);
                const seconds = Math.floor(audio.duration % 60);
                setNewTrackDuration(
                    `${minutes}:${seconds.toString().padStart(2, "0")}`
                );
            };
        }
    };

    const handlePublish = async () => {
        if (!albumTitle || !selectedArtist || !selectedGenre || !releaseDate) {
            toast.error("Please fill in all required fields (Title, Artist, Genre, Release Date)");
            return;
        }

        try {
            const formData = new FormData();
            if (albumImageFile) {
                formData.append("image", albumImageFile);
            }

            const data = {
                title: albumTitle,
                artistIds: [selectedArtist],
                genre: selectedGenre,
                description: albumDescription,
                releaseDate: new Date(releaseDate).toISOString(),
            };

            formData.append("data", JSON.stringify(data));
            const response = await updateAlbum({ id, formData }).unwrap();

            if (response.success) {
                toast.success(response.message || "Album updated successfully!");
                setTimeout(() => {
                    router.back();
                }, 2000);
            } else {
                toast.error(response.message || "Failed to update album");
            }
        } catch (error: any) {
            console.error("Failed to update album:", error);
            toast.error(error?.data?.message || "An error occurred while updating the album");
        }
    };

    if (isAlbumLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="text-gray-500 text-sm mb-2">
                        Artist profile for music dashboard
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Edit New Album
                        </h1>
                        <select
                            value={selectedArtist}
                            onChange={(e) => setSelectedArtist(e.target.value)}
                            disabled={isArtistsLoading}
                            className="px-5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-zinc-750 transition disabled:opacity-50"
                        >
                            <option value="">{isArtistsLoading ? "Loading Artists..." : "Select Artist"}</option>
                            {artistListData?.data?.map((artist) => (
                                <option key={artist.id} value={artist.id}>
                                    {artist.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Main Container */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 shadow-2xl">
                    {/* Album Details Section */}
                    <div className="mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Album Photo Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-4">
                                    Album Cover
                                </label>
                                <div
                                    onClick={handleImageClick}
                                    className="relative group w-full h-80 border-2 border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all bg-zinc-800/50 hover:bg-zinc-800 overflow-hidden"
                                >
                                    {albumImage ? (
                                        <>
                                            <img
                                                src={albumImage}
                                                alt="Album cover"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="text-center">
                                                    <Image
                                                        className="mx-auto mb-2 text-white"
                                                        size={32}
                                                        width={500}
                                                        height={600}
                                                    />
                                                    <span className="text-sm text-white font-medium">
                                                        Change Image
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Upload className="text-gray-400" size={28} />
                                            </div>
                                            <span className="text-sm text-gray-400 font-medium">
                                                Drop image or click to upload
                                            </span>
                                            <span className="text-xs text-gray-600 mt-2 block">
                                                PNG, JPG up to 10MB
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Album Details */}
                            <div className="space-y-6">
                                {/* Album Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                                        Album Title
                                    </label>
                                    <input
                                        type="text"
                                        value={albumTitle}
                                        onChange={(e) => setAlbumTitle(e.target.value)}
                                        placeholder="Enter album title"
                                        className="w-full px-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 hover:bg-zinc-750 transition"
                                    />
                                </div>

                                {/* Album Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                                        Description
                                    </label>
                                    <textarea
                                        value={albumDescription}
                                        onChange={(e) => setAlbumDescription(e.target.value)}
                                        placeholder="Enter album description"
                                        rows={3}
                                        className="w-full px-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 hover:bg-zinc-750 transition resize-none"
                                    />
                                </div>

                                {/* Genre Selector */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                                        Genre
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                                            className="w-full px-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between hover:bg-zinc-750 transition"
                                        >
                                            <span
                                                className={
                                                    selectedGenre ? "text-white" : "text-gray-500"
                                                }
                                            >
                                                {selectedGenre || "Select a genre"}
                                            </span>
                                            <svg
                                                className={`w-5 h-5 text-gray-400 transition-transform ${genreDropdownOpen ? "rotate-180" : ""
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {genreDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl max-h-60 overflow-auto">
                                                {genres.map((genre) => (
                                                    <button
                                                        key={genre}
                                                        onClick={() => {
                                                            setSelectedGenre(genre);
                                                            setGenreDropdownOpen(false);
                                                        }}
                                                        className="w-full px-4 py-3 text-left text-white hover:bg-zinc-700 transition first:rounded-t-xl last:rounded-b-xl"
                                                    >
                                                        {genre}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Release Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                                        Release Date
                                    </label>
                                    <input
                                        type="date"
                                        value={releaseDate}
                                        onChange={(e) => setReleaseDate(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-zinc-750 transition [color-scheme:dark]"
                                    />
                                </div>

                                {/* Info Card */}
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-6">
                                    <p className="text-sm text-blue-400">
                                        💡 Tip: Choose a high-quality cover image and accurate genre
                                        for better discoverability
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Album Track List */}
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                Album Track List
                            </h2>
                            <span className="text-sm text-gray-400 bg-zinc-700 px-3 py-1 rounded-full">
                                {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
                            </span>
                        </div>

                        {/* Add New Track Form */}
                        <div className="mb-6 p-5 bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 rounded-xl border border-zinc-600">
                            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                                <Plus size={18} className="text-blue-500" />
                                Add New Track
                            </h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={newTrackTitle}
                                        onChange={(e) => setNewTrackTitle(e.target.value)}
                                        placeholder="Track title"
                                        className="px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 hover:bg-zinc-750 transition"
                                    />
                                    <input
                                        type="text"
                                        value={newTrackDuration}
                                        onChange={(e) => setNewTrackDuration(e.target.value)}
                                        placeholder="Duration (auto-detected)"
                                        className="px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 hover:bg-zinc-750 transition"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        ref={audioFileInputRef}
                                        type="file"
                                        accept="audio/*"
                                        onChange={handleAudioFileChange}
                                        className="hidden"
                                        id="audio-upload"
                                    />
                                    <label
                                        htmlFor="audio-upload"
                                        className="flex-1 px-4 py-3 border-2 border-dashed border-zinc-600 rounded-lg cursor-pointer hover:border-blue-500 transition flex items-center gap-3 text-gray-400 hover:text-blue-400 hover:bg-zinc-800"
                                    >
                                        <Music size={20} />
                                        {newTrackFile ? (
                                            <div className="flex-1 truncate">
                                                <span className="text-white font-medium">
                                                    {newTrackFile.name}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-2">
                                                    ({(newTrackFile.size / 1024 / 1024).toFixed(2)} MB)
                                                </span>
                                            </div>
                                        ) : (
                                            <span>Choose audio file (MP3, WAV, etc.)</span>
                                        )}
                                    </label>
                                    <button
                                        onClick={addTrack}
                                        disabled={
                                            !newTrackTitle.trim() ||
                                            !newTrackDuration.trim() ||
                                            !newTrackFile
                                        }
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:bg-zinc-700 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg disabled:shadow-none"
                                    >
                                        Add Track
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Track List */}
                        <div className="space-y-2">
                            {tracks.map((track, index) => (
                                <div
                                    key={track.id}
                                    className="flex items-center gap-4 p-4 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition group border border-zinc-700/50 hover:border-zinc-600"
                                >
                                    <GripVertical
                                        className="text-gray-600 group-hover:text-gray-400 cursor-move transition"
                                        size={20}
                                    />

                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-white font-semibold">
                                            {track.title}
                                        </div>
                                        {track.fileName && (
                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                                <Music size={12} className="text-blue-500" />
                                                {track.fileName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-gray-400 font-mono text-sm bg-zinc-700 px-3 py-1 rounded-full">
                                        {track.duration}
                                    </div>

                                    <button
                                        onClick={() => removeTrack(track.id)}
                                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}

                            {tracks.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <Music size={48} className="mx-auto mb-3 text-gray-700" />
                                    <p className="font-medium">No tracks added yet</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Add your first track above to get started
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Publish Button */}
                    <div className="flex justify-end mt-8 gap-4">
                        <button
                            onClick={() => router.back()}
                            className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl transition shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105"
                        >
                            Back
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl transition shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isPublishing && <Loader2 className="animate-spin" size={20} />}
                            {isPublishing ? "Updating..." : "Update Album"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
