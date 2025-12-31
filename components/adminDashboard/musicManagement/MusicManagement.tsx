"use client";

import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import {
  useDeleteMusicMutation,
  useGetAllMusicQuery,
} from "@/lib/api/musicApi";
import { useState, useEffect, ChangeEvent } from "react";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { toast } from "sonner";

const MusicManagement = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const {
    data: musics,
    isLoading,
    isError,
  } = useGetAllMusicQuery({ search: debouncedSearch });

  // Debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200); // 300ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string | null;
    name: string;
  }>({
    isOpen: false,
    id: null,
    name: "",
  });

  const [deleteAction, { isLoading: isDeletingLoading }] =
    useDeleteMusicMutation();

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({
      isOpen: true,
      id,
      name,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id) return;

    try {
      await deleteAction(deleteDialog.id);

      toast.success("Deleted Successfully!");
      // Close dialog
      setDeleteDialog({
        isOpen: false,
        id: null,
        name: "",
      });
    } catch (error) {
      toast.error("Failed to delete music, please try again later.");
      console.error("Delete failed:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({
      isOpen: false,
      id: null,
      name: "",
    });
  };
  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left text-white">
            <h1 className="font-semibold text-base sm:text-lg">Music Upload</h1>
            <h2 className="text-sm text-[#F2F2F2]">
              Manage music content and music uploads
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Music..."
                  value={search}
                  onChange={handleSearchChange}
                  className="bg-[#414141] rounded-[10px] pl-10 pr-10 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-72"
                />
                {/* Search Icon */}
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#818181]"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>

                {/* Clear button */}
                {search && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#818181] hover:text-white"
                    type="button">
                    ✕
                  </button>
                )}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  </div>
                )}
              </div>
            </div>

            <Link
              href="/admin-dashboard/music-management/add-new-music"
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap">
              Add Music
            </Link>
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
            <p className="text-red-500 text-sm">
              Failed to load music. Please try again.
            </p>
          </div>
        )}

        {/* Loading State - Desktop */}
        {isLoading && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                    <th className="py-4 pr-4">Music Name</th>
                    <th className="py-4 pr-4">Genre</th>
                    <th className="py-4 pr-4">Tracks</th>
                    <th className="py-4 pr-4">Followers</th>
                    <th className="py-4 pr-4">Status</th>
                    <th className="py-4 pl-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#EFEFEF] animate-pulse">
                      <td className="py-4 pr-4">
                        <div className="h-4 bg-gray-700 rounded w-32"></div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="h-4 bg-gray-700 rounded w-20"></div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="h-4 bg-gray-700 rounded w-12"></div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="h-4 bg-gray-700 rounded w-16"></div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="h-6 bg-gray-700 rounded-full w-20"></div>
                      </td>
                      <td className="pl-4 pt-4 pb-4">
                        <div className="flex justify-end gap-4">
                          <div className="h-6 w-6 bg-gray-700 rounded"></div>
                          <div className="h-6 w-6 bg-gray-700 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Loading State - Mobile */}
            <div className="md:hidden space-y-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 animate-pulse">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-4 bg-gray-700 rounded w-32"></div>
                    <div className="h-6 w-6 bg-gray-700 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Data State - Desktop Table */}
        {!isLoading && !isError && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                    <th className="py-4 pr-4">Music Name</th>
                    <th className="py-4 pr-4">Genre</th>
                    <th className="py-4 pr-4">Tracks</th>
                    <th className="py-4 pr-4">Followers</th>
                    <th className="py-4 pr-4">Status</th>
                    <th className="py-4 pl-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {musics?.data?.map((music) => {
                    const status = music.isDeleted ? "Inactive" : "Active";

                    return (
                      <tr
                        key={music.id}
                        className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                        <td className="py-4 pr-4 text-white text-sm">
                          {music.title}
                        </td>

                        <td className="py-4 pr-4 text-white text-sm">
                          {music.genre}
                        </td>

                        <td className="py-4 pr-4 text-white text-sm">
                          {music.artists?.length ?? 0}
                        </td>

                        <td className="py-4 pr-4 text-white text-sm">
                          {music.likeCount}
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              status === "Active"
                                ? "bg-[#497FF51A] text-[#497FF5] border border-[#497FF5]"
                                : "bg-[#FF0000]/10 text-red-600 border border-red-600"
                            }`}>
                            {status}
                          </span>
                        </td>

                        <td className="pl-4 pt-4 pb-4">
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() =>
                                handleDeleteClick(music.id, music.title)
                              }
                              className="text-white hover:text-gray-300"
                              type="button">
                              <Trash size={18} />
                            </button>

                            <Link
                              href={`/admin-dashboard/music-management/edit-music/${music.id}`}
                              className="text-white hover:text-gray-300">
                              <Edit size={18} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {musics?.data?.map((music) => {
                const status = music.isDeleted ? "Inactive" : "Active";

                return (
                  <div
                    key={music.id}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-medium text-sm">
                        {music.title}
                      </h3>

                      <Link
                        href={`/admin-dashboard/music-management/edit-music/${music.id}`}
                        className="text-white hover:text-gray-300">
                        <Edit size={18} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Genre:</span>
                        <span className="text-white ml-2">{music.genre}</span>
                      </div>

                      <div>
                        <span className="text-gray-400">Tracks:</span>
                        <span className="text-white ml-2">
                          {music.artists?.length ?? 0}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400">Followers:</span>
                        <span className="text-white ml-2">
                          {music.likeCount}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400">Status:</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${
                            status === "Active"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          }`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !isError && musics?.data?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">
              {search
                ? "No music found for your search."
                : "No music found. Add your first track!"}
            </p>
            {search && (
              <button
                onClick={clearSearch}
                className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                type="button">
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        title={`Delete "${deleteDialog.name}"?`}
        message={`You are about to delete "${deleteDialog.name}". This action is permanent and cannot be reversed.`}
        confirmText="Delete Permanently"
        cancelText="Keep Item"
        isLoading={isDeletingLoading}
        dangerLevel="high"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        // Optional customization
        dialogClassName="border-2 border-red-200/50"
        overlayClassName="backdrop-blur-md"
      />
    </div>
  );
};

export default MusicManagement;
