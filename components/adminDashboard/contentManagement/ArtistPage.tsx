/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, ChevronDown, Loader, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useGetArtistsQuery } from "@/lib/api/commonApi";
import { ArtistData, useDeleteUserByIdMutation } from "@/lib/api/adminApi";


import { Button } from "@/components/ui/button"
import {

    DialogClose,

    DialogDescription,
    DialogFooter,



} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
/* ------------------ Artist Card ------------------ */
const ArtistCard = ({
    artist,
    onDelete,
    isDeleting,
}: {
    artist: ArtistData;
    onDelete: (id: string) => void;
    isDeleting: boolean;
}) => {
    // Determine the priority of images to show
    const displayImage = artist.image || artist.banner || "/images/artist-placeholder.jpg";

    return (
        <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10">
            {/* Image Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image
                    src={displayImage}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top Actions - Glassmorphism */}
                <div className="absolute top-3 right-3 flex gap-2 translate-y-[-10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-red-500 transition-colors border border-white/10">
                                <Trash2 size={16} className="text-white" />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">Delete Artist</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Are you sure you want to remove <span className="text-white font-semibold">{artist.name}</span>? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-6">
                                <DialogClose asChild>
                                    <Button variant="ghost" className="hover:bg-zinc-800 text-zinc-400">Cancel</Button>
                                </DialogClose>
                                <Button
                                    variant="destructive"
                                    onClick={() => onDelete(artist.id)}
                                    disabled={isDeleting}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {isDeleting ? <Loader className="animate-spin mr-2" size={16} /> : null}
                                    Confirm Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Link
                        href={`/admin-dashboard/content/edit-artist-page/${artist.id}`}
                        className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-yellow-500 hover:text-black transition-colors border border-white/10 group/edit"
                    >
                        <Pencil size={16} className="text-white group-hover/edit:text-black" />
                    </Link>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <Link href={`/artists/${artist.id}`} className="block">
                        <h3 className="text-lg font-bold text-white mb-0.5 truncate drop-shadow-md">{artist.name}</h3>
                        <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold group-hover:text-yellow-500 transition-colors">
                            {artist.genres?.[0] || "Artist"}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ArtistPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: artistsData, isLoading, isError } = useGetArtistsQuery();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserByIdMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
        } catch (error) {
            console.error("Failed to delete artist:", error);
        }
    };

    const allArtists = artistsData?.data || [];

    // Client-side filtering based on search query
    const filteredArtists = allArtists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sm:p-8 w-full shadow-xl">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
                <div className="text-center lg:text-left space-y-1">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Artist Library</h1>
                    <p className="text-zinc-400 text-sm font-medium">Manage and curate your roster of talented artists</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    {/* Search Field */}
                    <div className="relative w-full sm:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Find an artist..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white text-sm font-medium placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all w-full"
                        />
                    </div>

                    {/* Add Button */}
                    <Link
                        href="/admin-dashboard/content/add-new-artist-page"
                        className="w-full sm:w-auto bg-linear-to-r from-yellow-500 to-orange-400 hover:from-yellow-400 hover:to-orange-300 text-black px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-yellow-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Artist</span>
                    </Link>
                </div>
            </div>

            {/* Artist Grid */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-400 font-medium animate-pulse">Loading Artists...</p>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="p-4 bg-red-500/10 rounded-full mb-4">
                        <Trash2 className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Ops, something went wrong</h3>
                    <p className="text-zinc-400 text-sm max-w-xs mt-2">We couldn't load your artists. Please check your connection and try again.</p>
                </div>
            ) : filteredArtists.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-zinc-800 rounded-2xl">
                    <p className="text-zinc-500 font-medium">
                        {searchQuery ? `No artists found matching "${searchQuery}"` : "No artists found in your library."}
                    </p>
                    {!searchQuery && (
                        <Link href="/admin-dashboard/content/add-new-artist-page" className="text-yellow-500 hover:underline mt-2 text-sm font-bold">Start by adding one</Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredArtists.map((artist) => (
                        <ArtistCard
                            key={artist.id}
                            artist={artist}
                            onDelete={() => handleDelete(artist.id)}
                            isDeleting={isDeleting}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtistPage;
