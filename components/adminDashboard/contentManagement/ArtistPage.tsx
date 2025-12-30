/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileUpload } from "@/components/ui/file-upload";
import { useGetArtistsQuery } from "@/lib/api/commonApi";
import { ArtistData } from "@/lib/api/adminApi";

/* ------------------ Types ------------------ */
interface Artist {
    id: number;
    name: string;
    genre: string;
    tracks: number | string;
    followers: string;
    status: "Verified" | "Pending" | "Not Verified";
}

/* ------------------ Schema ------------------ */
const artistSchema = z.object({
    name: z.string().min(1, "Artist name is required"),
    genre: z.string().min(1, "Genre is required"),
    tracks: z.string().regex(/^\d+$/, "Tracks must be a number"),
    followers: z.string().min(1, "Followers is required"),
});

type ArtistFormValues = z.infer<typeof artistSchema>;

/* ------------------ Artist Card ------------------ */
const ArtistCard = ({
    artist,
    onEdit,
    onDelete,
}: {
    artist: ArtistData;
    onEdit: (artist: ArtistData) => void;
    onDelete: (id: string) => void;
}) => {
    return (
        <div className="relative bg-gray-900 rounded-md overflow-hidden group">
            <Image
                src={artist.image ?? "/images/artist-page-image.jpg"}
                alt={artist.name}
                width={300}
                height={300}
                className="w-full h-[220px] object-cover"
            />

            {/* Edit & Delete */}
            <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                    onClick={() => onDelete(artist.id)}
                    className="p-1.5 bg-black/70 rounded-full hover:bg-red-600 transition"
                >
                    <Trash2 size={14} className="text-white" />
                </button>

                <Link
                    href={`/admin-dashboard/content/edit-artist-page/${artist.id}`}
                    className="p-1.5 bg-black/70 rounded-full hover:bg-blue-600 transition"
                >
                    <Pencil size={14} className="text-white" />
                </Link>
            </div>

           <Link href={`/artists/${artist.id}`} className="p-3 text-sm text-white font-medium">{artist.name}</Link>
        </div>
    );
};

/* ------------------ Main Component ------------------ */
const ArtistPage = () => { 
    const [artists, setArtists] = useState<ArtistData[]>();

 
    const [selectedArtist, setSelectedArtist] = useState<ArtistData | null>(null);
    const [open, setOpen] = useState(false);

    const { data, isLoading , isSuccess } = useGetArtistsQuery(); 

    useEffect(() => {
        if (isSuccess && data) {
            setArtists(data.data);
        }
    }, [isSuccess, data]);

   

    const handleEdit = (id: string) => {
        console.log("Edit artist with ID:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete artist with ID:", id);
    };

    return (
        <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-left text-white">
                    <h1 className="font-semibold text-base sm:text-lg">Artist page</h1>
                    <h2 className="text-sm text-[#F2F2F2]">Manage all artist’s Page</h2>
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
                            placeholder="Search artist..."
                            className="bg-[#414141] rounded-[10px] pl-10 pr-4 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:border-gray-500 w-full sm:w-72"
                        />
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>

                        <Link
                            href={"/admin-dashboard/content/add-new-artist-page"}
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
                            Add Artist Page
                        </Link>

                    </Dialog>
                </div>
            </div>

            {/* Artist Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {artists?.map((artist) => (
                    <ArtistCard
                        key={artist.id}
                        artist={artist}
                        onEdit={() => handleEdit(artist.id)}
                        onDelete={() => handleDelete(artist.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArtistPage;
