"use client";

import { useEffect, useRef, useState } from "react";

interface SmartVideoProps {
  sources: { src: string; type: string; media?: string }[];
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
  muted?: boolean;
  preload?: "auto" | "metadata" | "none";
  threshold?: number;
  autoplayMode?: "viewport" | "hover";
}

export default function Video({
  sources,
  className = "",
  style,
  loop = true,
  muted = true,
  preload = "auto",
  threshold = 0.25,
  autoplayMode = "hover",
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  // 🧭 Detect if video is visible on screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold]);

  // ▶️ Control playback based on autoplayMode
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Determine if video should play based on mode
    const shouldPlay = autoplayMode === "viewport" ? inView : inView && hovered;

    if (shouldPlay && video.paused) {
      video.play().catch((err) => {
        console.warn("Video autoplay failed:", err);
      });
    } else if (!shouldPlay && !video.paused) {
      video.pause();
      video.currentTime = 0;
    }
  }, [inView, hovered, autoplayMode]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted={muted}
      loop={loop}
      preload={preload}
      playsInline
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {sources.map((s, i) => (
        <source key={i} {...s} />
      ))}
    </video>
  );
}

// Demo Usage
function Demo() {
  return (
    <div className="min-h-screen bg-gray-900 p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          Smart Autoplay Video Player
        </h1>
        <p className="text-gray-400 mb-8">
          Scroll to see viewport mode autoplay, hover for hover mode!
        </p>

        <div className="space-y-12">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl text-white mb-2">Video 1 - Viewport Mode</h2>
            <p className="text-gray-400 text-sm mb-4">
              🎬 Autoplays when scrolled into view (no hover needed)
            </p>
            <Video
              sources={[
                {
                  src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  type: "video/mp4",
                },
              ]}
              className="w-full rounded-lg shadow-2xl"
              autoplayMode="viewport"
              loop={true}
              muted={true}
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl text-white mb-2">Video 2 - Hover Mode</h2>
            <p className="text-gray-400 text-sm mb-4">
              🖱️ Requires hover to play (default behavior)
            </p>
            <Video
              sources={[
                {
                  src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  type: "video/mp4",
                },
              ]}
              className="w-full rounded-lg shadow-2xl hover:shadow-blue-500/50 transition-shadow duration-300"
              autoplayMode="hover"
              loop={true}
              muted={true}
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl text-white mb-2">Video 3 - Viewport Mode</h2>
            <p className="text-gray-400 text-sm mb-4">
              🎬 Autoplays when in view
            </p>
            <Video
              sources={[
                {
                  src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  type: "video/mp4",
                },
              ]}
              className="w-full rounded-lg shadow-2xl"
              autoplayMode="viewport"
              loop={true}
              muted={true}
            />
          </div>
        </div>

        <div className="mt-12 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">
            ✨ Features
          </h3>
          <ul className="text-gray-300 space-y-2">
            <li>
              ✓ <strong>Viewport mode:</strong> Autoplays when scrolled into
              view
            </li>
            <li>
              ✓ <strong>Hover mode:</strong> Requires hover + viewport to play
            </li>
            <li>✓ Pauses when scrolled out of view</li>
            <li>✓ Resets to start on pause</li>
            <li>✓ Handles autoplay restrictions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { Demo };
