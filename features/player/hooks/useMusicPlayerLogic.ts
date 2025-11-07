"use client";

import { useEffect, useRef, useState } from "react";
import { Track } from "../types";

export function useMusicPlayerLogic() {
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
  const isDraggingProgress = useRef(false);
  const isDraggingVolume = useRef(false);

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

  const handleVolumeDrag = (clientX: number, rect: DOMRect) => {
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newVolume = percentage;

    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  const handleProgressDrag = (clientX: number, rect: DOMRect) => {
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    setCurrentTime(newTime);
    if (audioRef.current && isDraggingProgress.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDraggingProgress.current) {
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
    setIsExpanded(false);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Mouse event handlers for drag
  const setupDragHandlers = (type: "progress" | "volume") => {
    const isProgress = type === "progress";
    const isDragging = isProgress ? isDraggingProgress : isDraggingVolume;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const element = document.querySelector(
        isProgress ? ".progress-bar-container" : ".volume-bar-container"
      ) as HTMLElement;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (isProgress) {
        handleProgressDrag(e.clientX, rect);
      } else {
        handleVolumeDrag(e.clientX, rect);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      const rect = e.currentTarget.getBoundingClientRect();
      if (isProgress) {
        handleProgressDrag(e.clientX, rect);
      } else {
        handleVolumeDrag(e.clientX, rect);
      }
    };

    return handleMouseDown;
  };

  const progressDragHandlers = {
    onMouseDown: setupDragHandlers("progress"),
  };

  const volumeDragHandlers = {
    onMouseDown: setupDragHandlers("volume"),
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

  return {
    // State
    isOpen,
    isPlaying,
    currentTrack,
    playlist,
    currentIndex,
    volume,
    isMuted,
    currentTime,
    duration,
    isExpanded,
    showPlaylist,
    isShuffled,
    repeatMode,
    likedTracks,
    playerMode,

    // Refs
    audioRef,

    // Actions
    open,
    close,
    togglePlay,
    playNext,
    playPrevious,
    playTrack,
    setIsExpanded,
    setShowPlaylist,
    toggleMute,
    handleVolumeChange,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleSeek,
    handleEnded,
    toggleRepeat,
    toggleLike,
    togglePlayerMode,
    formatTime,
    setIsShuffled,
    setPlayerMode,

    // Drag handlers
    progressDragHandlers,
    volumeDragHandlers,
  };
}
