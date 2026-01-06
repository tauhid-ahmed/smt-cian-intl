import { Search, Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetAllAlbumsQuery, useDeleteAlbumMutation } from "@/lib/api/albumApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ArtistAlbum() {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: albumResponse, isLoading, isError } = useGetAllAlbumsQuery();
    const [deleteAlbum, { isLoading: isDeleting }] = useDeleteAlbumMutation();

    const albums = albumResponse?.data || [];

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this album?")) {
            try {
                const res = await deleteAlbum(id).unwrap();
                if (res.success) {
                    toast.success(res.message || "Album deleted successfully");
                } else {
                    toast.error(res.message || "Failed to delete album");
                }
            } catch (err: any) {
                toast.error(err?.data?.message || "An error occurred while deleting");
            }
        }
    };

    const filteredAlbums = albums.filter((album: any) =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={48} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
                Failed to load albums. Please try again later.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white md:p-6 lg:p-0 p-3">
            <div className="w-full mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Artist Album</h1>
                    <p className="text-gray-400">
                        Manage all artist&apos;s Profile and music
                    </p>
                </div>

                {/* Search and Add Button Section */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Search Bar */}
                    <div className="flex-1 max-w-md relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="text-gray-500" size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search albums..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-800 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700 placeholder:text-gray-500"
                        />
                    </div>

                    {/* Add Album Button */}
                    <Link href="/admin-dashboard/content/create-album">
                        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                            <Plus size={20} />
                            Add Album
                        </button>
                    </Link>
                </div>

                {/* Table Section */}
                <div className="bg-black rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800 text-sm font-medium text-gray-400">
                        <div className="col-span-3">Album name</div>
                        <div className="col-span-2">Release Date</div>
                        <div className="col-span-2">Genre</div>
                        <div className="col-span-2">Track Count</div>
                        <div className="col-span-3 text-right">Action</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-zinc-800">
                        {filteredAlbums.length > 0 ? (
                            filteredAlbums.map((album: any) => (
                                <div
                                    key={album.id}
                                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-900 transition"
                                >
                                    {/* Album Name with Image */}
                                    <div className="col-span-3 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
                                            {album.coverImage ? (
                                                <img
                                                    src={album.coverImage}
                                                    alt={album.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-linear-to-br from-gray-600 to-gray-800" />
                                            )}
                                        </div>
                                        <span className="text-white font-medium truncate">{album.title}</span>
                                    </div>

                                    {/* Release Date */}
                                    <div className="col-span-2 text-gray-300">
                                        {new Date(album.releaseDate).toLocaleDateString()}
                                    </div>

                                    {/* Genre */}
                                    <div className="col-span-2 text-gray-300">{album.genre}</div>

                                    {/* Track Count */}
                                    <div className="col-span-2 text-gray-300">{album.musicIds?.length || 0} tracks</div>

                                    {/* Action Buttons */}
                                    <div className="col-span-3 flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => handleDelete(album.id)}
                                            disabled={isDeleting}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition disabled:opacity-50"
                                        >
                                            <Trash2 size={20} />
                                        </button>

                                        <Link
                                            href={`/admin-dashboard/content/edit-album/${album.id}`}
                                        >
                                            <button className="p-2 text-gray-400 hover:bg-zinc-800 rounded-lg transition">
                                                <Edit size={20} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center text-gray-500">
                                No albums found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
