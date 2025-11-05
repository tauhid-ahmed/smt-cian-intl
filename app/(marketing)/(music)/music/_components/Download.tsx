"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Download, Heart, ChevronDown } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Image from "next/image";
import { Heading } from "@/components/Heading";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  isNew?: boolean;
  src?: string;
}

interface SpectrumBarProps {
  index: number;
  isPlaying: boolean;
}

interface WaveformSpectrumProps {
  isPlaying: boolean;
  trackId: number;
  playingId: number | null;
}

const MusicPlaylist = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const tracks: Track[] = [
    {
      id: 1,
      title: "Roll the Dice",
      artist: "DG Pacino, RGA04",
      duration: "02:54",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Willie",
      artist: "Assaf Ayalon feat. Roy Young",
      duration: "06:08",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 3,
      title: "Good Vibe",
      artist: "Alex MakeMusic",
      duration: "02:02",
      cover:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=80&h=80&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 4,
      title: "Are You Ready for Me Baby",
      artist: "Funky Giraffe",
      duration: "03:14",
      cover:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&h=80&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 5,
      title: "How About That",
      artist: "Foxxi",
      duration: "03:10",
      isNew: true,
      cover:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=80&h=80&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 6,
      title: "Bring It Back",
      artist: "Notixx",
      duration: "01:52",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&h=80&fit=crop",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ];

  const SpectrumBar: React.FC<SpectrumBarProps> = ({ index, isPlaying }) => {
    const [height, setHeight] = useState<number>(30);

    useEffect(() => {
      if (!isPlaying) {
        setHeight(30);
        return;
      }

      const interval = setInterval(() => {
        const base = 20;
        const variation = Math.random() * 70;
        setHeight(base + variation);
      }, 80 + index * 10);

      return () => clearInterval(interval);
    }, [isPlaying, index]);

    return (
      <div
        className="w-px bg-gray-600/80 transition-all duration-75 ease-out"
        style={{ height: `${height}%` }}
      />
    );
  };

  const WaveformSpectrum: React.FC<WaveformSpectrumProps> = ({
    trackId,
    playingId,
  }) => {
    const isCurrentlyPlaying = playingId === trackId;
    const [barCount, setBarCount] = useState<number>(80);

    useEffect(() => {
      const updateBarCount = () => {
        const width = window.innerWidth;
        if (width < 640) {
          setBarCount(60); // Mobile
        } else if (width < 768) {
          setBarCount(100); // Small tablets
        } else if (width < 1024) {
          setBarCount(100); // Tablets
        } else {
          setBarCount(160); // Desktop
        }
      };

      updateBarCount();
      window.addEventListener("resize", updateBarCount);
      return () => window.removeEventListener("resize", updateBarCount);
    }, []);

    return (
      <div className="flex items-center h-8 sm:h-10 md:h-12 w-full gap-px">
        {Array.from({ length: barCount }).map((_, i) => (
          <SpectrumBar key={i} index={i} isPlaying={isCurrentlyPlaying} />
        ))}
      </div>
    );
  };

  const togglePlay = (id: number): void => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <Section padding="sm">
      <Container>
        <Heading as="h2" size="h5" weight="medium" className="mb-4 sm:mb-6">
          Download
        </Heading>
        <div className="max-w-full mx-auto">
          {/* Header Filters - Hidden on mobile, shown on tablet+ */}
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

          {/* Track List */}
          <div className="space-y-0">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-3 sm:py-2 hover:bg-white/5 transition-colors border-b border-white/5 sm:border-0"
              >
                {/* Top Row: Cover, Info, Duration (Mobile) */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Album Cover & Play Button */}
                  <div className="relative shrink-0">
                    <Image
                      src={track.cover}
                      alt={track.title}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover"
                      width={56}
                      height={56}
                    />
                    <button
                      onClick={() => {
                        togglePlay(track.id);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                      aria-label={playingId === track.id ? "Pause" : "Play"}
                    >
                      {playingId === track.id ? (
                        <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                      ) : (
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0 sm:w-48 md:w-64 sm:shrink-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white text-sm sm:text-base truncate">
                        {track.title}
                      </h3>
                      {track.isNew && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-green-500 text-black font-bold rounded uppercase tracking-wider">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-xs sm:text-sm truncate mt-0.5">
                      {track.artist}
                    </p>
                  </div>

                  {/* Duration - visible on mobile */}
                  <div className="text-white/50 text-xs tabular-nums shrink-0 sm:hidden">
                    {track.duration}
                  </div>
                </div>

                {/* Bottom Row: Waveform & Actions (Mobile) / Inline (Desktop) */}
                <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1">
                  {/* Duration - hidden on mobile, visible on sm+ */}
                  <div className="hidden sm:block text-white/50 text-xs tabular-nums w-12 shrink-0">
                    {track.duration}
                  </div>

                  {/* Waveform/Spectrum */}
                  <div className="flex-1 min-w-0">
                    <WaveformSpectrum
                      trackId={track.id}
                      playingId={playingId}
                      isPlaying={false}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-0 shrink-0">
                    <button
                      className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Download track"
                    >
                      <Download className="w-4 h-4 text-white/50" />
                    </button>
                    <button
                      className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Like track"
                    >
                      <Heart className="w-4 h-4 text-white/50" />
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
