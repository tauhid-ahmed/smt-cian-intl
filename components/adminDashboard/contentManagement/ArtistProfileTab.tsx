"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileUpload } from "@/components/ui/file-upload";
import Link from "next/link";
import { Trash } from "lucide-react";

// Zod schema for adding/editing artist
const artistSchema = z.object({
    name: z.string().min(1, "Artist name is required"),
    genre: z.string().min(1, "Genre is required"),
    tracks: z
        .string()
        .min(1, "Tracks is required")
        .regex(/^\d+$/, "Tracks must be a number"),
    followers: z.string().min(1, "Followers is required"),
});

type ArtistFormValues = z.infer<typeof artistSchema>;

interface Artist {
    id: number;
    name: string;
    genre: string;
    tracks: number | string;
    followers: string;
    status: "Verified" | "Pending" | "Rejected";
}

const ArtistProfileTab = () => {
    const [artists, setArtists] = useState<Artist[]>([
        {
            id: 1,
            name: "Taylor Swift",
            genre: "Pop",
            tracks: 198,
            followers: "88M",
            status: "Verified",
        },
        {
            id: 2,
            name: "Ed Sheeran",
            genre: "Pop",
            tracks: 156,
            followers: "75M",
            status: "Verified",
        },
        {
            id: 3,
            name: "Billie Eilish",
            genre: "Alternative",
            tracks: 95,
            followers: "42M",
            status: "Pending",
        },
        {
            id: 4,
            name: "Adele",
            genre: "Soul",
            tracks: 110,
            followers: "55M",
            status: "Rejected",
        },
        {
            id: 5,
            name: "Drake",
            genre: "Hip-Hop",
            tracks: 200,
            followers: "100M",
            status: "Verified",
        },
    ]);

    const [files, setFiles] = useState<File[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [open, setOpen] = useState(false);

    const handleFileUpload = (uploadedFiles: File[]) => {
        setFiles(uploadedFiles);
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ArtistFormValues>({
        resolver: zodResolver(artistSchema),
    });

    const randomId = 135;
    const onSubmit = (data: ArtistFormValues) => {
        const artistData = {
            id: selectedArtist ? selectedArtist.id : randomId,
            name: data.name,
            genre: data.genre,
            tracks: Number(data.tracks),
            followers: data.followers,
            status: selectedArtist ? selectedArtist.status : "Pending",
        };

        if (selectedArtist) {
            setArtists((prev) =>
                prev.map((a) => (a.id === selectedArtist.id ? artistData : a))
            );
        } else {
            setArtists((prev) => [...prev, artistData]);
        }

        reset();
        setFiles([]);
        setSelectedArtist(null);
        setOpen(false);
    };

    const handleEdit = (artist: Artist) => {
        setSelectedArtist(artist);
        setValue("name", artist.name);
        setValue("genre", artist.genre);
        setValue("tracks", artist.tracks.toString());
        setValue("followers", artist.followers);
        setOpen(true);
    };

    return (
        <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-left text-white">
                        <h1 className="font-semibold text-base sm:text-lg">Music Upload</h1>
                        <h2 className="text-sm text-[#F2F2F2]">
                            Manage artist content and music uploads
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search Music..."
                                className="bg-[#414141] rounded-[10px] pl-10 pr-4 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:border-gray-500 w-full sm:w-72"
                            />
                        </div>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <Link
                                href={"/admin-dashboard/content/add-new-artist"}
                                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Add Music
                            </Link>

                            <DialogContent className="bg-[#171717] border-none w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[714px]">
                                <DialogHeader>
                                    <DialogTitle className="md:text-xl text-lg font-semibold text-left">
                                        {selectedArtist ? "Edit Artist" : "Add New Artist"}
                                    </DialogTitle>

                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="mt-6 space-y-4"
                                    >
                                        {/* Name */}
                                        <div className="flex flex-col space-y-2">
                                            <label
                                                htmlFor="name"
                                                className="text-white text-sm md:text-lg text-left"
                                            >
                                                Artist Name
                                            </label>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                id="name"
                                                placeholder="Enter artist name"
                                                className="md:py-4 py-2 px-2.5 border border-[#3B3B3B] rounded-[15px] placeholder-[#828282] text-white text-sm md:text-lg bg-transparent"
                                            />
                                            {errors.name && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.name.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* Genre & Tracks */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
                                            <div className="flex flex-col space-y-2 flex-1">
                                                <label
                                                    htmlFor="genre"
                                                    className="text-white text-sm md:text-lg text-left"
                                                >
                                                    Genre
                                                </label>
                                                <input
                                                    {...register("genre")}
                                                    type="text"
                                                    id="genre"
                                                    placeholder="Pop, Rock, etc."
                                                    className="md:py-4 py-2 px-2.5 border border-[#3B3B3B] rounded-[15px] placeholder-[#828282] text-white text-sm md:text-lg bg-transparent"
                                                />
                                                {errors.genre && (
                                                    <span className="text-red-500 text-sm">
                                                        {errors.genre.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col space-y-2 flex-1">
                                                <label
                                                    htmlFor="tracks"
                                                    className="text-white text-sm md:text-lg text-left"
                                                >
                                                    Tracks
                                                </label>
                                                <input
                                                    {...register("tracks")}
                                                    type="text"
                                                    id="tracks"
                                                    placeholder="100"
                                                    className="md:py-4 py-2 px-2.5 border border-[#3B3B3B] rounded-[15px] placeholder-[#828282] text-white text-sm md:text-lg bg-transparent"
                                                />
                                                {errors.tracks && (
                                                    <span className="text-red-500 text-sm">
                                                        {errors.tracks.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Followers */}
                                        <div className="flex flex-col space-y-2">
                                            <label
                                                htmlFor="followers"
                                                className="text-white text-sm md:text-lg text-left"
                                            >
                                                Followers
                                            </label>
                                            <input
                                                {...register("followers")}
                                                type="text"
                                                id="followers"
                                                placeholder="50M"
                                                className="md:py-4 py-2 px-2.5 border border-[#3B3B3B] rounded-[15px] placeholder-[#828282] text-white text-sm md:text-lg bg-transparent"
                                            />
                                            {errors.followers && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.followers.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* File Upload */}
                                        <div>
                                            <FileUpload onChange={handleFileUpload} />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                className="bg-white hover:bg-[#f2f2f2] cursor-pointer py-2 md:py-[12.5px] px-5 text-black text-base md:text-lg rounded-[10px] transition-all max-w-[344px] w-full"
                                            >
                                                Save Artist
                                            </button>
                                        </div>
                                    </form>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                                <th className="py-4 pr-4">Artist Name</th>
                                <th className="py-4 pr-4">Genre</th>
                                <th className="py-4 pr-4">Tracks</th>
                                <th className="py-4 pr-4">Followers</th>
                                <th className="py-4 pr-4">Status</th>
                                <th className="py-4 pl-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.map((artist) => (
                                <tr
                                    key={artist.id}
                                    className="border-b border-[#EFEFEF] hover:bg-[#414141]/40"
                                >
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {artist.name}
                                    </td>
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {artist.genre}
                                    </td>
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {artist.tracks}
                                    </td>
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {artist.followers}
                                    </td>
                                    <td className="py-4 pr-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${artist.status === "Verified"
                                                    ? "bg-[#497FF51A] text-[#497FF5] border border-[#497FF5]"
                                                    : artist.status === "Pending"
                                                        ? "bg-[#FFA1001A] text-[#FFA100] border border-[#FFA100]"
                                                        : "bg-[#FF00001A] text-[#FF0000] border border-[#FF0000]"
                                                }`}
                                        >
                                            {artist.status}
                                        </span>
                                    </td>
                                    <div className="flex justify-center items-center gap-4">
                                        <td className="pl-4 pt-4 pb-4 flex justify-end">
                                            <button className="text-white hover:text-gray-300">
                                                <Trash />
                                            </button>
                                        </td>
                                        <td className="pl-4 pt-4 pb-4 flex justify-end">
                                            <Link
                                                href={`/admin-dashboard/content/edit-artist-profile/${artist.id}`}
                                                className="text-white hover:text-gray-300"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </Link>
                                        </td>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                    {artists.map((artist) => (
                        <div
                            key={artist.id}
                            className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-white font-medium text-sm">
                                    {artist.name}
                                </h3>
                                <button
                                    className="text-white hover:text-gray-300"
                                    onClick={() => handleEdit(artist)}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-gray-400">Genre:</span>
                                    <span className="text-white ml-2">{artist.genre}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Tracks:</span>
                                    <span className="text-white ml-2">{artist.tracks}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Followers:</span>
                                    <span className="text-white ml-2">{artist.followers}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Status:</span>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${artist.status === "Verified"
                                                ? "bg-green-500/20 text-green-500"
                                                : artist.status === "Pending"
                                                    ? "bg-yellow-200 text-yellow-600"
                                                    : "bg-red-500/10 text-red-600 border border-red-600/20"
                                            }`}
                                    >
                                        {artist.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistProfileTab;
