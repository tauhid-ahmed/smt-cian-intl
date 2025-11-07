"use client";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  subtitle?: string;
  comingSoonText?: string;
  showComingSoon?: boolean;
}

const VideoIntro: React.FC<VideoPlayerProps> = ({
  videoUrl,
  posterUrl,
  title = "Watch Our Story",
  subtitle = "Behind the scenes of CIAN Collective",
  comingSoonText = "2-3 minute company video coming soon",
  showComingSoon = true,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format time in MM:SS
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Toggle play/pause
  const togglePlay = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = (): void => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = (): void => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!videoRef.current) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    const newTime = percentage * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const dur = video.duration;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls
  const handleMouseMove = (): void => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  return (
    <Section className="bg-accent" padding="lg">
      <Container>
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto aspect-video bg-linear-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border-4 border-blue-500 shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video Element */}
          {videoUrl ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={posterUrl}
              onClick={togglePlay}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            // Placeholder when no video
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <div className="text-center">
                <div className="inline-block p-6 border-4 border-dashed border-blue-400 rounded-lg mb-6">
                  <Play className="w-16 h-16 text-yellow-400 fill-yellow-400" />
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  {title}
                </h3>
                <p className="text-white/80 text-base md:text-lg">{subtitle}</p>
              </div>
            </div>
          )}

          {/* Play Button Overlay (for placeholder) */}
          {!videoUrl && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button
                className="w-20 h-20 rounded-full bg-black/50 border-2 border-white/50 flex items-center justify-center hover:bg-black/70 hover:border-white transition-all"
                onClick={togglePlay}
              >
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </button>
            </div>
          )}

          {/* Video Controls */}
          {videoUrl && (
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Progress Bar */}
              <div
                className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-blue-500 rounded-full relative group-hover:bg-blue-400 transition-colors"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  {/* Volume */}
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>

                  {/* Time */}
                  <span className="text-white text-sm tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="w-6 h-6" />
                  ) : (
                    <Maximize className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Coming Soon Text */}
        {showComingSoon && (
          <p className="text-white/70 text-center mt-6 text-sm md:text-base">
            {comingSoonText}
          </p>
        )}
      </Container>
    </Section>
  );
};

export default VideoIntro;
