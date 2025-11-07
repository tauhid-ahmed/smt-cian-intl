"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, progressPercentage } from "framer-motion";
import {
  Heart,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMusicPlayerLogic } from "../hooks/useMusicPlayerLogic";

export default function Popout() {
  const {
    isOpen,
    isPlaying,
    currentTrack,

    currentTime,
    duration,
    isExpanded,
    isShuffled,
    repeatMode,
    likedTracks,
    playerMode,

    // Refs
    audioRef,

    close,
    togglePlay,
    playNext,
    playPrevious,
    setIsExpanded,

    toggleRepeat,
    toggleLike,
    togglePlayerMode,
    formatTime,
    setIsShuffled,

    // Drag handlers
    progressDragHandlers,
    volumeDragHandlers,
  } = useMusicPlayerLogic();

  return (
    <AnimatePresence>
      {isOpen && currentTrack && !isExpanded && playerMode === "popout" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.01 }}
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
                <div
                  className="progress-bar-container flex-1 h-1 bg-gray-700 rounded-full relative group cursor-pointer"
                  {...progressDragHandlers}
                >
                  <motion.div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{
                      duration: 0.01,
                    }}
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
  );
}
