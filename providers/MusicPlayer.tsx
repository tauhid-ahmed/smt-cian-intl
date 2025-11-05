"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Minimize2,
  Repeat,
  Shuffle,
  List,
  Heart,
  PictureInPicture2,
} from "lucide-react";

// Types
interface Track {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  url: string;
  artwork: string;
  duration?: string;
}

interface MusicPlayerContextType {
  isOpen: boolean;
  open: (track: Track, playlist?: Track[]) => void;
  close: () => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  playTrack: (track: Track) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  showPlaylist: boolean;
  setShowPlaylist: (value: boolean) => void;
  playlist: Track[];
  currentIndex: number;
  likedTracks: Set<string | number>;
  toggleLike: (trackId: string | number) => void;
  playerMode: "bottom" | "popout";
  setPlayerMode: (mode: "bottom" | "popout") => void;
}

// Context
const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  }
  return context;
};

// Provider Props
interface MusicPlayerProviderProps {
  children: ReactNode;
}

// Music Player Provider
export function MusicPlayerProvider({ children }: MusicPlayerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [likedTracks, setLikedTracks] = useState<Set<string | number>>(
    new Set()
  );
  const [playerMode, setPlayerMode] = useState<"bottom" | "popout">("bottom");

  const audioRef = useRef<HTMLAudioElement>(null);

  const open = (track: Track, trackPlaylist?: Track[]) => {
    if (
      trackPlaylist &&
      Array.isArray(trackPlaylist) &&
      trackPlaylist.length > 0
    ) {
      setPlaylist(trackPlaylist);
      const index = trackPlaylist.findIndex((t) => t.id === track.id);
      setCurrentIndex(index >= 0 ? index : 0);
    } else {
      setPlaylist([track]);
      setCurrentIndex(0);
    }
    setCurrentTrack(track);
    setIsOpen(true);
    setIsPlaying(true);
  };

  const close = () => {
    setIsOpen(false);
    setIsPlaying(false);
    setIsExpanded(false);
    setShowPlaylist(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playTrack = (track: Track) => {
    const index = playlist.findIndex((t) => t.id === track.id);
    if (index >= 0) {
      setCurrentIndex(index);
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (playlist.length === 0) return;

    if (repeatMode === "one" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
      return;
    }

    let nextIndex: number;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    setCurrentIndex(nextIndex);
    setCurrentTrack(playlist[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (playlist.length === 0) return;

    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }

    const prevIndex =
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTrack(playlist[prevIndex]);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleEnded = () => {
    if (repeatMode === "one" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    } else if (repeatMode === "all" || currentIndex < playlist.length - 1) {
      playNext();
    } else {
      setIsPlaying(false);
    }
  };

  const toggleRepeat = () => {
    const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
    const currentModeIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentModeIndex + 1) % modes.length]);
  };

  const toggleLike = (trackId: string | number) => {
    setLikedTracks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const togglePlayerMode = () => {
    setPlayerMode((prev) => (prev === "bottom" ? "popout" : "bottom"));
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          if (e.shiftKey) {
            playNext();
          } else if (audioRef.current) {
            audioRef.current.currentTime = Math.min(duration, currentTime + 5);
          }
          break;
        case "ArrowLeft":
          if (e.shiftKey) {
            playPrevious();
          } else if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, currentTime - 5);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((prev) => Math.min(1, prev + 0.1));
          if (audioRef.current)
            audioRef.current.volume = Math.min(1, volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((prev) => Math.max(0, prev - 0.1));
          if (audioRef.current)
            audioRef.current.volume = Math.max(0, volume - 0.1);
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "l":
        case "L":
          if (currentTrack) toggleLike(currentTrack.id);
          break;
        case "p":
        case "P":
          if (e.ctrlKey) {
            e.preventDefault();
            togglePlayerMode();
          }
          break;
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isOpen, isPlaying, currentTime, duration, volume, currentTrack]);

  return (
    <MusicPlayerContext.Provider
      value={{
        isOpen,
        open,
        close,
        currentTrack,
        isPlaying,
        togglePlay,
        playNext,
        playPrevious,
        playTrack,
        isExpanded,
        setIsExpanded,
        showPlaylist,
        setShowPlaylist,
        playlist,
        currentIndex,
        likedTracks,
        toggleLike,
        playerMode,
        setPlayerMode,
      }}
    >
      {children}

      {/* Audio Element */}
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {/* Bottom Player */}
      <AnimatePresence>
        {isOpen && currentTrack && !isExpanded && playerMode === "bottom" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 shadow-2xl z-50 h-20 md:h-24"
          >
            <div className="h-full flex flex-col md:flex-row items-center px-3 md:px-6 gap-2 md:gap-6">
              {/* Mobile: Track Info + Controls */}
              <div className="flex items-center w-full md:hidden gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={currentTrack.artwork}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-medium truncate text-sm">
                    {currentTrack.title}
                  </h3>
                  <p className="text-gray-400 text-xs truncate">
                    {currentTrack.artist}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={playPrevious}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-white hover:bg-gray-200 text-black"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={playNext}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(true)}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Desktop: Full Layout */}
              <div className="hidden md:flex items-center gap-4 flex-1 min-w-0">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                  <Image
                    src={currentTrack.artwork}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-medium truncate text-sm">
                    {currentTrack.title}
                  </h3>
                  <p className="text-gray-400 text-xs truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              {/* Desktop: Controls */}
              <div className="hidden md:flex flex-col items-center gap-2 flex-1">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`${
                      isShuffled ? "text-green-500" : "text-gray-400"
                    } hover:text-white h-8 w-8`}
                  >
                    <Shuffle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={playPrevious}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 text-black"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={playNext}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleRepeat}
                    className={`${
                      repeatMode !== "off" ? "text-green-500" : "text-gray-400"
                    } hover:text-white relative h-8 w-8`}
                  >
                    <Repeat className="w-4 h-4" />
                    {repeatMode === "one" && (
                      <span className="absolute bottom-0 right-0 text-[8px]">
                        1
                      </span>
                    )}
                  </Button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 w-full max-w-md">
                  <span className="text-xs text-gray-400">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex-1 h-1 bg-gray-700 rounded-full relative group">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="h-full bg-white rounded-full transition-all relative"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Desktop: Right Controls */}
              <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleLike(currentTrack.id)}
                  className={`${
                    likedTracks.has(currentTrack.id)
                      ? "text-green-500"
                      : "text-gray-400"
                  } hover:text-green-500 h-8 w-8`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedTracks.has(currentTrack.id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPlaylist(true)}
                  className="text-gray-400 hover:text-white h-8 w-8"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-gray-400 hover:text-white h-8 w-8"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <div className="relative w-24 h-1 bg-gray-700 rounded-full group">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                    aria-label="Volume"
                  />
                  <div
                    className="h-full bg-white rounded-full transition-all relative"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayerMode}
                  className="text-gray-400 hover:text-white h-8 w-8"
                  title="Toggle player mode (Ctrl+P)"
                >
                  <PictureInPicture2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(true)}
                  className="text-gray-400 hover:text-white h-8 w-8"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={close}
                  className="text-gray-400 hover:text-white h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popout Player */}
      <AnimatePresence>
        {isOpen && currentTrack && !isExpanded && playerMode === "popout" && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 w-80 bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={currentTrack.artwork}
                      alt={currentTrack.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-medium truncate text-sm">
                      {currentTrack.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayerMode}
                    className="text-gray-400 hover:text-white h-6 w-6"
                    title="Back to bottom player"
                  >
                    <Minimize2 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={close}
                    className="text-gray-400 hover:text-white h-6 w-6"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <div className="flex-1 h-1 bg-gray-700 rounded-full relative group">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`${
                      isShuffled ? "text-green-500" : "text-gray-400"
                    } hover:text-white h-8 w-8`}
                  >
                    <Shuffle className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={playPrevious}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <SkipBack className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-white hover:bg-gray-200 text-black"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={playNext}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <SkipForward className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleRepeat}
                    className={`${
                      repeatMode !== "off" ? "text-green-500" : "text-gray-400"
                    } hover:text-white relative h-8 w-8`}
                  >
                    <Repeat className="w-3 h-3" />
                    {repeatMode === "one" && (
                      <span className="absolute bottom-0 right-0 text-[6px]">
                        1
                      </span>
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(currentTrack.id)}
                    className={`${
                      likedTracks.has(currentTrack.id)
                        ? "text-green-500"
                        : "text-gray-400"
                    } hover:text-green-500 h-8 w-8`}
                  >
                    <Heart
                      className={`w-3 h-3 ${
                        likedTracks.has(currentTrack.id) ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(true)}
                    className="text-gray-400 hover:text-white h-8 w-8"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Player Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl h-[80vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gray-800 p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-white">
              Now Playing
            </DialogTitle>
          </DialogHeader>

          {currentTrack && (
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              {/* Main Content */}
              <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto">
                <div className="w-full max-w-2xl">
                  <div className="relative w-full aspect-square max-w-md mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={currentTrack.artwork}
                      alt={currentTrack.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {currentTrack.title}
                    </h1>
                    <p className="text-xl text-gray-400">
                      {currentTrack.artist}
                    </p>
                    {currentTrack.album && (
                      <p className="text-lg text-gray-500 mt-1">
                        {currentTrack.album}
                      </p>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="relative h-2 bg-gray-800 rounded-full mb-2 group">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                      />
                      <div
                        className="h-full bg-white rounded-full transition-all relative"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleLike(currentTrack.id)}
                      className={`${
                        likedTracks.has(currentTrack.id)
                          ? "text-green-500"
                          : "text-gray-400"
                      } hover:text-green-500 h-12 w-12`}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          likedTracks.has(currentTrack.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`${
                          isShuffled ? "text-green-500" : "text-gray-400"
                        } hover:text-white h-10 w-10`}
                      >
                        <Shuffle className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={playPrevious}
                        className="text-gray-400 hover:text-white h-10 w-10"
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlay}
                        className="w-16 h-16 rounded-full bg-white hover:bg-gray-200 text-black"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={playNext}
                        className="text-gray-400 hover:text-white h-10 w-10"
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleRepeat}
                        className={`${
                          repeatMode !== "off"
                            ? "text-green-500"
                            : "text-gray-400"
                        } hover:text-white relative h-10 w-10`}
                      >
                        <Repeat className="w-5 h-5" />
                        {repeatMode === "one" && (
                          <span className="absolute bottom-1 right-1 text-[10px]">
                            1
                          </span>
                        )}
                      </Button>
                    </div>

                    <div className="w-12" />
                  </div>

                  {/* Volume */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="text-gray-400 hover:text-white h-10 w-10"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                    <div className="relative flex-1 h-2 bg-gray-800 rounded-full group">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                        aria-label="Volume control"
                      />
                      <div
                        className="h-full bg-white rounded-full transition-all relative"
                        style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Player Mode Toggle */}
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      onClick={togglePlayerMode}
                      className="text-gray-400 border-gray-600 hover:bg-gray-800 hover:text-white"
                    >
                      <PictureInPicture2 className="w-4 h-4 mr-2" />
                      {playerMode === "bottom"
                        ? "Switch to Popout Player"
                        : "Switch to Bottom Player"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Playlist Sheet */}
      <Sheet open={showPlaylist} onOpenChange={setShowPlaylist}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-gray-900 border-gray-800 overflow-hidden p-0"
        >
          <SheetHeader className="p-6 border-b border-gray-800">
            <SheetTitle className="text-xl font-bold text-white">
              Queue
            </SheetTitle>
            <p className="text-sm text-gray-400">{playlist.length} tracks</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto h-full">
            <div className="p-2">
              {playlist.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    currentTrack?.id === track.id
                      ? "bg-gray-800 bg-opacity-50"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <Image
                        src={track.artwork}
                        alt={track.title}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    {currentTrack?.id === track.id && isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded">
                        <div className="flex gap-1">
                          <div
                            className="w-1 h-3 bg-green-500 animate-pulse rounded-full"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-1 h-3 bg-green-500 animate-pulse rounded-full"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-1 h-3 bg-green-500 animate-pulse rounded-full"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        currentTrack?.id === track.id
                          ? "text-green-500"
                          : "text-white"
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {track.artist}
                    </p>
                  </div>
                  {track.duration && (
                    <span className="text-xs text-gray-500 px-2">
                      {track.duration}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(track.id);
                    }}
                    className={`h-8 w-8 ${
                      likedTracks.has(track.id)
                        ? "text-green-500"
                        : "text-gray-400"
                    } hover:text-green-500`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedTracks.has(track.id) ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </MusicPlayerContext.Provider>
  );
}
