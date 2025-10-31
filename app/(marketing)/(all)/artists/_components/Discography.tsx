"use client";

import React, { useState } from "react";
import { Play, ShoppingBag, Star } from "lucide-react";
import Section from "@/components/layout/Section";
import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Type Definitions
interface Track {
  title: string;
  duration: string;
}

interface Album {
  id: number;
  title: string;
  type: "Album" | "Single" | "EP";
  coverImage: string;
  releaseDate: string;
  trackCount: number;
  duration: string;
  rating: number;
  reviewCount: number;
  popularTracks: Track[];
}

type FilterType = "All" | "Albums" | "Singles" | "EPs";
type SortType = "Most Recent" | "Oldest" | "Most Popular";

interface DiscographyProps {
  albums?: Album[];
}

// Reusable Album Card Component
function AlbumCard({ album }) {
  return (
    <div className="bg-linear-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all p-2">
      {/* Album Cover */}
      <div className="relative aspect-3/2 overflow-hidden group rounded-lg">
        <Image
          fill
          src={album.coverImage}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </div>
      <div className="flex justify-between gap-2 py-2">
        <div className="">
          <span className="px-3 py-1 bg-accent backdrop-blur-sm rounded text-xs font-medium">
            {album.type}
          </span>
        </div>

        {/* Release Date */}
        <div className="absolutex top-4 right-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium">
            {album.releaseDate}
          </span>
        </div>
      </div>
      {/* Album Info */}
      <div className="p-6 space-y-1">
        <Heading as="h4" size="h6">
          {album.title}
        </Heading>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span>{album.trackCount} tracks</span>
          <span>•</span>
          <span>{album.duration}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-medium">{album.rating}</span>
          <span className="text-sm text-gray-400">
            ({album.reviewCount} Reviews)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <Button variant="secondary">
            <Play className="w-4 h-4 fill-black" />
            Preview
          </Button>
          <Button variant="outline">
            <ShoppingBag className="w-4 h-4" />
            Buy
          </Button>
        </div>

        {/* Popular Tracks */}
        <div className="space-y-2">
          <Heading size="h6" as="h4">
            Popular Tracks:
          </Heading>
          <div className="space-y-2">
            {album.popularTracks.map((track: Track, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm group cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1 group">
                  <Play className="w-3 h-3 text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {track.title}
                  </span>
                </div>
                <span className="text-xs text-gray-300 group-hover:text-white">
                  {track.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Default Albums Data
const defaultAlbums: Album[] = [
  {
    id: 1,
    title: "Heaven's Echo",
    type: "Album",
    coverImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",
    releaseDate: "October 2024",
    trackCount: 12,
    duration: "48:32",
    rating: 4.8,
    reviewCount: 89,
    popularTracks: [
      { title: "Sanctuary", duration: "4:23" },
      { title: "Overflow", duration: "3:58" },
      { title: "Endless Praise", duration: "5:12" },
    ],
  },
  {
    id: 2,
    title: "Unshakeable",
    type: "Album",
    coverImage:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=800&fit=crop",
    releaseDate: "March 2023",
    trackCount: 10,
    duration: "42:15",
    rating: 4.9,
    reviewCount: 124,
    popularTracks: [
      { title: "Unshakeable Faith", duration: "4:45" },
      { title: "Anchor", duration: "4:02" },
      { title: "Standing Firm", duration: "3:38" },
    ],
  },
  {
    id: 3,
    title: "Goodness",
    type: "EP",
    coverImage:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=800&fit=crop",
    releaseDate: "November 2021",
    trackCount: 5,
    duration: "21:30",
    rating: 4.9,
    reviewCount: 67,
    popularTracks: [
      { title: "Your Goodness", duration: "4:15" },
      { title: "Faithful One", duration: "3:52" },
      { title: "Morning Song", duration: "4:28" },
    ],
  },
  {
    id: 4,
    title: "Breathe Again",
    type: "Single",
    coverImage:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=800&fit=crop",
    releaseDate: "June 2021",
    trackCount: 1,
    duration: "4:02",
    rating: 4.9,
    reviewCount: 45,
    popularTracks: [{ title: "Breathe Again", duration: "4:02" }],
  },
  {
    id: 5,
    title: "Awakening",
    type: "Album",
    coverImage:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=800&fit=crop",
    releaseDate: "September 2019",
    trackCount: 11,
    duration: "45:18",
    rating: 4.9,
    reviewCount: 156,
    popularTracks: [
      { title: "Awakening", duration: "5:01" },
      { title: "New Creation", duration: "3:45" },
      { title: "Spirit Fall", duration: "4:32" },
    ],
  },
  {
    id: 6,
    title: "Radiant",
    type: "Album",
    coverImage:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=800&fit=crop",
    releaseDate: "February 2018",
    trackCount: 9,
    duration: "38:24",
    rating: 4.8,
    reviewCount: 98,
    popularTracks: [
      { title: "Shine", duration: "3:56" },
      { title: "Light of the World", duration: "4:18" },
      { title: "Radiant Glory", duration: "4:42" },
    ],
  },
];

// Main Discography Component
export default function Discography({
  albums = defaultAlbums,
}: DiscographyProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<SortType>("Most Recent");

  const filters: FilterType[] = ["All", "Albums", "Singles", "EPs"];

  const filteredAlbums: Album[] = albums.filter((album: Album) => {
    if (activeFilter === "All") return true;
    return album.type === activeFilter.slice(0, -1); // Remove 's' from filter
  });

  const sortedAlbums: Album[] = [...filteredAlbums].sort(
    (a: Album, b: Album) => {
      if (sortBy === "Most Recent") {
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      }
      return 0;
    }
  );

  return (
    <Section padding="md">
      <Container className="space-y-10">
        <Heading as="h2" size="h3" align="center">
          Discography
        </Heading>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Filter Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-bold block">Filter:</span>
            <div className="flex gap-2">
              {filters.map((filter: FilterType) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant="ghost"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-white hover:text-black ${
                    activeFilter === filter
                      ? "bg-white text-black"
                      : "text-white"
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortBy(e.target.value as SortType)
              }
              className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium border border-white/20 focus:outline-none focus:border-white/20 cursor-pointer"
            >
              <option value="Most Recent">Most Recent</option>
              <option value="Oldest">Oldest</option>
              <option value="Most Popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAlbums.map((album: Album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
