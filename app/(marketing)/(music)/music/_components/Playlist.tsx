"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Download, Heart, ChevronDown, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Image from "next/image";
import { useMusicPlayer } from "@/providers/MusicPlayer";
import { motion } from "framer-motion";
import { useGetAllMusicQuery, useToggleSavedMusicMutation } from "@/lib/api/musicApi";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GENRES = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Country",
    "Jazz",
    "Classical",
    "Electronic",
    "Reggae",
    "Gospel"
];

interface Track {
    id: string | number;
    title: string;
    artist: string;
    album?: string;
    url: string;
    artwork: string;
    duration?: string;
    isSaved?: boolean;
}

interface SpectrumBarProps {
    index: number;
    isPlaying: boolean;
    intensity: number;
}

interface WaveformSpectrumProps {
    trackId: string | number;
    isCurrentlyPlaying: boolean;
    isGlobalPlaying: boolean;
}

const MusicPlaylist = () => {
    const {
        open: openMusicPlayer,
        currentTrack,
        isPlaying: isGlobalPlaying,
        togglePlay,
        toggleLike,
        likedTracks,
        playTrack,
    } = useMusicPlayer();
    const [toggleSavedMusic, { isLoading: isSaving, originalArgs }] = useToggleSavedMusicMutation();
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data: musicData, isLoading, isError } = useGetAllMusicQuery({
        page: currentPage,
        limit: limit,
        ...(selectedGenre && { genre: selectedGenre }),
        ...(searchQuery && { search: searchQuery })
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGenre, searchQuery]);

    const tracks: Track[] = musicData?.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        artist: item.artists?.map((a: any) => a.name).join(", ") || "Unknown Artist",
        duration: item.duration || "0:00",
        artwork: item.coverImage || item.artists?.[0]?.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
        url: item.audioUrl,
        isSaved: item.isSaved,
    })) || [];

    function SpectrumBar({ index, isPlaying, intensity }: SpectrumBarProps) {
        const [height, setHeight] = useState<number>(4);
        const animationRef = useRef<number>(0);

        useEffect(() => {
            if (!isPlaying) {
                setHeight(4);
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
                return;
            }

            const animate = () => {
                // Create wave pattern
                const time = Date.now() * 0.003;
                const frequency = 0.3 + index * 0.08;
                const wave = Math.sin(time * frequency + index * 0.3);

                // Base height with wave pattern and intensity
                const baseHeight = 4 + Math.abs(wave) * 20 * intensity;
                // Add random variation
                const variation = 0.8 + Math.random() * 0.4;
                const newHeight = Math.max(4, baseHeight * variation);

                setHeight(newHeight);
                animationRef.current = requestAnimationFrame(animate);
            };

            animationRef.current = requestAnimationFrame(animate);

            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }, [isPlaying, index, intensity]);

        return (
            <motion.div
                className="w-0.5 bg-gray-400 rounded-full"
                style={{ height: `${height}px` }}
                animate={{ height: `${height}px` }}
                transition={{ duration: 0.15 }}
            />
        );
    }

    const WaveformSpectrum: React.FC<WaveformSpectrumProps> = ({
        isCurrentlyPlaying,
        isGlobalPlaying,
    }) => {
        const isActive = isCurrentlyPlaying && isGlobalPlaying;
        const barCount = 50;

        // Create intensity pattern - higher in middle, lower on edges
        const getIntensity = (index: number, total: number) => {
            const center = total / 2;
            const distanceFromCenter = Math.abs(index - center);
            const maxDistance = center;
            return Math.max(0.2, 1 - (distanceFromCenter / maxDistance) * 0.8);
        };

        return (
            <div className="flex items-end justify-center h-8 w-full gap-[1.5px] px-2">
                {Array.from({ length: barCount }).map((_, i) => (
                    <SpectrumBar
                        key={i}
                        index={i}
                        isPlaying={isActive}
                        intensity={getIntensity(i, barCount)}
                    />
                ))}
            </div>
        );
    };

    const handlePlayTrack = (track: Track): void => {
        if (currentTrack?.id === track.id) {
            // If clicking the same track, toggle play/pause
            togglePlay();
        } else {
            // If clicking a different track, open it and play
            openMusicPlayer(track, tracks);
        }
    };

    const isTrackPlaying = (trackId: string | number) => {
        return currentTrack?.id === trackId && isGlobalPlaying;
    };

    const isTrackLiked = (trackId: string | number) => {
        const track = tracks.find(t => t.id === trackId);
        if (track && typeof track.isSaved !== 'undefined') {
            return track.isSaved;
        }
        return likedTracks.has(trackId);
    };

    const isCurrentTrack = (trackId: string | number) => {
        return currentTrack?.id === trackId;
    };

    const handleToggleLike = async (trackId: string) => {
        try {
            const response = await toggleSavedMusic(trackId).unwrap();
            if (response.success) {
                toast.success(response.message || "Playlist updated");
                // Also toggle in the global player state
                toggleLike(trackId);
            } else {
                toast.error(response.message || "Failed to update playlist");
            }
        } catch (error: any) {
            console.error("Error toggling like:", error);
            const errorMessage = error?.data?.message || "Failed to update playlist. Please sign in.";
            toast.error(errorMessage);
        }
    };

    // Show play button overlay only when NOT playing this track
    const shouldShowPlayOverlay = (trackId: string | number) => {
        return !isTrackPlaying(trackId);
    };

    return (
        <Section padding="sm">
            <Container>
                <div className="max-w-full mx-auto pb-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors border border-white/10 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-sm group">
                                        <span className="font-bold uppercase tracking-widest text-[10px] text-zinc-500 group-hover:text-zinc-400">Genre:</span>
                                        <span className="text-yellow-500 font-bold">{selectedGenre || "All Genres"}</span>
                                        <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="bg-zinc-900 border-zinc-800 text-white min-w-[200px] p-2 rounded-2xl backdrop-blur-xl shadow-2xl">
                                    <DropdownMenuItem
                                        onClick={() => setSelectedGenre("")}
                                        className="hover:bg-yellow-500 hover:text-black focus:bg-yellow-500 focus:text-black transition-all rounded-xl cursor-pointer font-bold py-3 px-4"
                                    >
                                        All Genres
                                    </DropdownMenuItem>
                                    {GENRES.map((genre) => (
                                        <DropdownMenuItem
                                            key={genre}
                                            onClick={() => setSelectedGenre(genre)}
                                            className={`hover:bg-yellow-500 hover:text-black focus:bg-yellow-500 focus:text-black transition-all rounded-xl cursor-pointer font-bold py-3 px-4 mb-1 last:mb-0 ${selectedGenre === genre ? "text-yellow-500" : ""}`}
                                        >
                                            {genre}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {selectedGenre && (
                                <button
                                    onClick={() => setSelectedGenre("")}
                                    className="text-[10px] uppercase font-black tracking-widest text-zinc-500 hover:text-yellow-500 transition-colors px-2"
                                >
                                    Clear Filter
                                </button>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tracks or artists..."
                                className="bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-white text-sm font-medium placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all w-full backdrop-blur-md"
                            />
                        </div>
                    </div>

                    <div className="space-y-0">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-zinc-400 font-medium animate-pulse">Loading Playlist...</p>
                            </div>
                        ) : isError ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <p className="text-red-500 font-medium">Failed to load music playlist.</p>
                                <button onClick={() => window.location.reload()} className="text-yellow-500 hover:underline mt-2 text-sm">Try again</button>
                            </div>
                        ) : tracks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <p className="text-zinc-500 font-medium">No music found in your playlist.</p>
                            </div>
                        ) : (
                            tracks.map((track) => (
                                <div
                                    key={track.id}
                                    className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-3 sm:py-2 hover:bg-white/5 transition-colors border-b border-white/5 sm:border-0"
                                >
                                    <div className="flex items-center gap-3 w-full sm:w-auto cursor-pointer">
                                        <div className="relative shrink-0">
                                            <Image
                                                src={track.artwork}
                                                alt={track.title}
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover"
                                                width={56}
                                                height={56}
                                            />

                                            {/* Play/Pause Button Overlay - Only show when track is NOT playing */}
                                            {shouldShowPlayOverlay(track.id) && (
                                                <button
                                                    onClick={() => handlePlayTrack(track)}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded"
                                                    aria-label={isTrackPlaying(track.id) ? "Pause" : "Play"}
                                                >
                                                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" />
                                                </button>
                                            )}

                                            {/* Equalizer Animation - Only show when track IS playing */}
                                            {isTrackPlaying(track.id) && (
                                                <button
                                                    onClick={() => handlePlayTrack(track)}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded cursor-pointer"
                                                    aria-label="Pause"
                                                >
                                                    <div className="flex gap-0.5">
                                                        <motion.div
                                                            className="w-1 h-3 bg-white rounded-full"
                                                            animate={{ height: ["3px", "12px", "3px"] }}
                                                            transition={{
                                                                duration: 0.8,
                                                                repeat: Infinity,
                                                                delay: 0,
                                                            }}
                                                        />
                                                        <motion.div
                                                            className="w-1 h-3 bg-white rounded-full"
                                                            animate={{ height: ["3px", "8px", "3px"] }}
                                                            transition={{
                                                                duration: 0.8,
                                                                repeat: Infinity,
                                                                delay: 0.2,
                                                            }}
                                                        />
                                                        <motion.div
                                                            className="w-1 h-3 bg-white rounded-full"
                                                            animate={{ height: ["3px", "16px", "3px"] }}
                                                            transition={{
                                                                duration: 0.8,
                                                                repeat: Infinity,
                                                                delay: 0.4,
                                                            }}
                                                        />
                                                    </div>
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 sm:w-48 md:w-64 sm:shrink-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3
                                                    className={`text-sm sm:text-base truncate ${isCurrentTrack(track.id)
                                                        ? "text-white font-medium"
                                                        : "text-white"
                                                        }`}
                                                >
                                                    {track.title}
                                                </h3>
                                            </div>
                                            <p className="text-white/50 text-xs sm:text-sm truncate mt-0.5">
                                                {track.artist}
                                            </p>
                                        </div>

                                        <div className="text-white/50 text-xs tabular-nums shrink-0 sm:hidden">
                                            {track.duration}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1">
                                        <div className="hidden sm:block text-white/50 text-xs tabular-nums w-12 shrink-0">
                                            {track.duration}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <WaveformSpectrum
                                                trackId={track.id}
                                                isCurrentlyPlaying={currentTrack?.id === track.id}
                                                isGlobalPlaying={isGlobalPlaying}
                                            />
                                        </div>

                                        <div className="flex items-center gap-0 shrink-0">
                                            <button
                                                className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-colors"
                                                aria-label="Download track"
                                            >
                                                <Download className="w-4 h-4 text-white/50 hover:text-white" />
                                            </button>
                                            <button
                                                onClick={() => handleToggleLike(track.id.toString())}
                                                className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-colors"
                                                aria-label={
                                                    isTrackLiked(track.id) ? "Unlike track" : "Like track"
                                                }
                                            >
                                                {isSaving && originalArgs === track.id.toString() ? (
                                                    <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                                                ) : (
                                                    <Heart
                                                        className={`w-4 h-4 ${isTrackLiked(track.id)
                                                            ? "text-yellow-500 fill-yellow-500"
                                                            : "text-white/50 hover:text-white"
                                                            }`}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {musicData?.meta && musicData.meta.totalPage > 1 && (
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-white/5 pt-8">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-full border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all group"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white group-hover:text-yellow-500 transition-colors" />
                                </button>

                                <div className="flex items-center gap-1.5 px-2">
                                    {Array.from({ length: Math.min(5, musicData.meta.totalPage) }, (_, i) => {
                                        // Simple logic to show pages around current
                                        let pageNum = currentPage;
                                        if (musicData.meta.totalPage <= 5) {
                                            pageNum = i + 1;
                                        } else {
                                            if (currentPage <= 3) pageNum = i + 1;
                                            else if (currentPage >= musicData.meta.totalPage - 2) pageNum = musicData.meta.totalPage - 4 + i;
                                            else pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${currentPage === pageNum
                                                    ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(253,199,0,0.3)]"
                                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(musicData.meta.totalPage, prev + 1))}
                                    disabled={currentPage === musicData.meta.totalPage}
                                    className="p-2 rounded-full border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all group"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="w-5 h-5 text-white group-hover:text-yellow-500 transition-colors" />
                                </button>
                            </div>

                            <div className="text-white/40 text-xs tracking-wider uppercase">
                                Page {currentPage} of {musicData.meta.totalPage}
                                <span className="mx-2">•</span>
                                {musicData.meta.total} Total Tracks
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </Section>
    );
};

export default MusicPlaylist;
