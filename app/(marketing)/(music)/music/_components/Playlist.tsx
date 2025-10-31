"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Download, Heart, ChevronDown } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  isNew?: boolean;
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
    },
    {
      id: 2,
      title: "Willie",
      artist: "Assaf Ayalon feat. Roy Young",
      duration: "06:08",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop",
    },
    {
      id: 3,
      title: "Good Vibe",
      artist: "Alex MakeMusic",
      duration: "02:02",
      cover:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=80&h=80&fit=crop",
    },
    {
      id: 4,
      title: "Are You Ready for Me Baby",
      artist: "Funky Giraffe",
      duration: "03:14",
      cover:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&h=80&fit=crop",
    },
    {
      id: 5,
      title: "How About That",
      artist: "Foxxi",
      duration: "03:10",
      isNew: true,
      cover:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=80&h=80&fit=crop",
    },
    {
      id: 6,
      title: "Bring It Back",
      artist: "Notixx",
      duration: "01:52",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&h=80&fit=crop",
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

    return (
      <div className="flex items-center h-12 w-full gap-px">
        {Array.from({ length: 120 }).map((_, i) => (
          <SpectrumBar key={i} index={i} isPlaying={isCurrentlyPlaying} />
        ))}
      </div>
    );
  };

  const togglePlay = (id: number): void => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-full mx-auto px-6 py-6">
        {/* Header Filters */}
        <div className="flex gap-8 mb-6 text-sm">
          <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
            <span>Genre</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
            <span>Mood</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
            <span>Video Theme</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
            <span>Instrument</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Track List */}
        <div className="space-y-0">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group relative flex items-center gap-4 py-2 hover:bg-white/5 transition-colors"
            >
              {/* Album Cover & Play Button */}
              <div className="relative flex-shrink-0">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-14 h-14 rounded object-cover"
                />
                <button
                  onClick={() => togglePlay(track.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                  aria-label={playingId === track.id ? "Pause" : "Play"}
                >
                  {playingId === track.id ? (
                    <Pause className="w-6 h-6 text-white fill-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  )}
                </button>
              </div>

              {/* Track Info */}
              <div className="w-64 min-w-0 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-sm truncate">{track.title}</h3>
                  {track.isNew && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-green-500 text-black font-bold rounded uppercase tracking-wider">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-xs truncate mt-0.5">
                  {track.artist}
                </p>
              </div>

              {/* Duration */}
              <div className="text-white/50 text-xs tabular-nums w-12 flex-shrink-0">
                {track.duration}
              </div>

              {/* Waveform/Spectrum */}
              <div className="flex-1 min-w-0 px-2">
                <WaveformSpectrum
                  trackId={track.id}
                  playingId={playingId}
                  isPlaying={false}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-0 flex-shrink-0">
                <button
                  className="p-2.5 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Download track"
                >
                  <Download className="w-4 h-4 text-white/50" />
                </button>
                <button
                  className="p-2.5 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Like track"
                >
                  <Heart className="w-4 h-4 text-white/50" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlaylist;
