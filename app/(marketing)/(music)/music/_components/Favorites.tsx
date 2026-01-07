"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Download, Heart, Trash2, Loader2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Image from "next/image";
import { useMusicPlayer } from "@/providers/MusicPlayer";
import { motion } from "framer-motion";
import { Heading } from "@/components/Heading";
import { useGetSavedMusicQuery, useToggleSavedMusicMutation } from "@/lib/api/musicApi";
import { toast } from "sonner";

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

const Favorites = () => {
    const {
        open: openMusicPlayer,
        currentTrack,
        isPlaying: isGlobalPlaying,
        togglePlay,
        toggleLike,
        likedTracks,
    } = useMusicPlayer();

    const [toggleSavedMusic, { isLoading: isSaving, originalArgs }] = useToggleSavedMusicMutation();
    const { data: savedMusicData, isLoading, isError, refetch } = useGetSavedMusicQuery({});

    const tracks: Track[] = savedMusicData?.data.map((item: any) => ({
        id: item.music.id,
        title: item.music.title,
        artist: item.music.artists?.map((a: any) => a.name).join(", ") || "Unknown Artist",
        duration: item.music.duration || "0:00",
        artwork: item.music.coverImage || item.music.artists?.[0]?.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
        url: item.music.audioUrl,
        isSaved: true,
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
                const time = Date.now() * 0.003;
                const frequency = 0.3 + index * 0.08;
                const wave = Math.sin(time * frequency + index * 0.3);
                const baseHeight = 4 + Math.abs(wave) * 20 * intensity;
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
            togglePlay();
        } else {
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

    const shouldShowPlayOverlay = (trackId: string | number) => {
        return !isTrackPlaying(trackId);
    };

    const handleRemoveFromFavorites = async (trackId: string) => {
        try {
            const response = await toggleSavedMusic(trackId).unwrap();
            if (response.success) {
                toast.success("Removed from favorites");
                toggleLike(trackId);
                refetch();
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to remove from favorites");
        }
    };

    return (
        <Section padding="sm">
            <Container>
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                    <div>
                        <Heading as="h2" size="h5" weight="medium" className="text-white">
                            Your Favorites
                        </Heading>
                        <p className="text-zinc-500 text-sm mt-1">
                            {tracks.length} tracks saved in your collection
                        </p>
                    </div>
                </div>

                <div className="max-w-full mx-auto pb-20">
                    <div className="space-y-0">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-zinc-400 font-medium animate-pulse">Loading Favorites...</p>
                            </div>
                        ) : isError ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <p className="text-red-500 font-medium">Failed to load favorites.</p>
                                <button onClick={() => refetch()} className="text-yellow-500 hover:underline mt-2 text-sm">Try again</button>
                            </div>
                        ) : tracks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <p className="text-zinc-500 font-medium text-lg">Your collection is empty.</p>
                                <p className="text-zinc-600 text-sm mt-2">Heart some tracks to see them here!</p>
                            </div>
                        ) : (
                            tracks.map((track) => (
                                <motion.div
                                    key={track.id}
                                    className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-3 sm:py-2 hover:bg-white/5 transition-colors border-b border-white/5 sm:border-0"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div className="relative shrink-0">
                                            <Image
                                                src={track.artwork}
                                                alt={track.title}
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover shadow-lg"
                                                width={56}
                                                height={56}
                                            />

                                            {shouldShowPlayOverlay(track.id) && (
                                                <button
                                                    onClick={() => handlePlayTrack(track)}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded"
                                                >
                                                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" />
                                                </button>
                                            )}

                                            {isTrackPlaying(track.id) && (
                                                <button
                                                    onClick={() => handlePlayTrack(track)}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded"
                                                >
                                                    <div className="flex gap-0.5">
                                                        <motion.div
                                                            className="w-1 h-3 bg-white rounded-full"
                                                            animate={{ height: ["3px", "12px", "3px"] }}
                                                            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                                                        />
                                                        <motion.div
                                                            className="w-1 h-3 bg-white rounded-full"
                                                            animate={{ height: ["3px", "8px", "3px"] }}
                                                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                                                        />
                                                        <motion.div
                                                            className="w-1 h-3 bg-white rounded-full"
                                                            animate={{ height: ["3px", "16px", "3px"] }}
                                                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                                                        />
                                                    </div>
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 sm:w-48 md:w-64 sm:shrink-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className={`text-sm sm:text-base truncate ${isCurrentTrack(track.id) ? "text-yellow-500 font-bold" : "text-white"}`}>
                                                    {track.title}
                                                </h3>
                                            </div>
                                            <p className="text-zinc-500 text-xs sm:text-sm truncate mt-0.5">
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

                                        <div className="flex items-center gap-2 shrink-0">
                                            <button className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-colors group/btn" aria-label="Download track">
                                                <Download className="w-4 h-4 text-zinc-500 group-hover/btn:text-white" />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveFromFavorites(track.id.toString())}
                                                className="p-2 sm:p-2.5 hover:bg-red-500/10 rounded-full transition-colors group/heart"
                                                aria-label="Remove from favorites"
                                                disabled={isSaving && originalArgs === track.id.toString()}
                                            >
                                                {isSaving && originalArgs === track.id.toString() ? (
                                                    <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                                                ) : (
                                                    <Heart className="w-4 h-4 text-yellow-500 fill-yellow-500 group-hover/heart:text-red-500 group-hover/heart:fill-transparent" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Favorites;
