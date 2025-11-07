"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Download, Heart, ChevronDown } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Image from "next/image";
import { useMusicPlayer } from "@/providers/MusicPlayer";
import { motion } from "framer-motion";

interface Track {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  url: string;
  artwork: string;
  duration?: string;
}

interface SpectrumBarProps {
  index: number;
  isPlaying: boolean;
  intensity: number;
}

interface WaveformSpectrumProps {
  trackId: number;
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

  const tracks: Track[] = [
    {
      id: 1,
      title: "Roll the Dice",
      artist: "DG Pacino, RGA04",
      duration: "02:54",
      artwork:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Willie",
      artist: "Assaf Ayalon feat. Roy Young",
      duration: "06:08",
      artwork:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      title: "Good Vibe",
      artist: "Alex MakeMusic",
      duration: "02:02",
      artwork:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=80&h=80&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: "Are You Ready for Me Baby",
      artist: "Funky Giraffe",
      duration: "03:14",
      artwork:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&h=80&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      title: "How About That",
      artist: "Foxxi",
      duration: "03:10",
      artwork:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=80&h=80&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      id: 6,
      title: "Bring It Back",
      artist: "Notixx",
      duration: "01:52",
      artwork:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&h=80&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
  ];

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
    return likedTracks.has(trackId);
  };

  const isCurrentTrack = (trackId: string | number) => {
    return currentTrack?.id === trackId;
  };

  // Show play button overlay only when NOT playing this track
  const shouldShowPlayOverlay = (trackId: string | number) => {
    return !isTrackPlaying(trackId);
  };

  return (
    <Section padding="sm">
      <Container>
        <div className="max-w-full mx-auto pb-20">
          <div className="hidden md:flex gap-4 lg:gap-8 mb-6 text-xs sm:text-sm flex-wrap">
            <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <span>Genre</span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <span>Mood</span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <span>Video Theme</span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <span>Instrument</span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          <div className="space-y-0">
            {tracks.map((track) => (
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
                        className={`text-sm sm:text-base truncate ${
                          isCurrentTrack(track.id)
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
                      trackId={track.id as number}
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
                      onClick={() => toggleLike(track.id)}
                      className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-colors"
                      aria-label={
                        isTrackLiked(track.id) ? "Unlike track" : "Like track"
                      }
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isTrackLiked(track.id)
                            ? "text-white fill-white"
                            : "text-white/50 hover:text-white"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MusicPlaylist;
