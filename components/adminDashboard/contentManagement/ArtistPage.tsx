"use client";

import { useState } from "react";
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
  artist: Artist;
  onEdit: (artist: Artist) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="relative bg-gray-900 rounded-md overflow-hidden group">
      <Image
        src="/images/artist-page-image.jpg"
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

      <p className="p-3 text-sm text-white font-medium">{artist.name}</p>
    </div>
  );
};

/* ------------------ Main Component ------------------ */
const ArtistPage = () => {
  const [artists, setArtists] = useState<Artist[]>([
    {
      id: 1,
      name: "Artist Name",
      genre: "Pop",
      tracks: 10,
      followers: "1M",
      status: "Verified",
    },
    {
      id: 2,
      name: "Artist Name",
      genre: "Rock",
      tracks: 8,
      followers: "500K",
      status: "Pending",
    },
  ]);

  const [files, setFiles] = useState<File[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ArtistFormValues>({
    resolver: zodResolver(artistSchema),
  });

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const onSubmit = (data: ArtistFormValues) => {
    if (selectedArtist) {
      setArtists((prev) =>
        prev.map((artist) =>
          artist.id === selectedArtist.id ? { ...artist, ...data } : artist
        )
      );
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

  const handleDelete = (id: number) => {
    setArtists((prev) => prev.filter((artist) => artist.id !== id));
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
            <DialogTrigger asChild>
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
            </DialogTrigger>

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

      {/* Artist Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;
