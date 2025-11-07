"use client";

import Image from "next/image";

const icons = [
  "allianz.svg",
  "apple.svg",
  "bloomingdales.svg",
  "google.svg",
  "microsoft.svg",
  "ogilvy.svg",
  "tbwa.svg",
  "versace.svg",
  "wilson.svg",
];

export default function IconGallery() {
  // Triple the icons for seamless loop
  const scrollingIcons = [...icons, ...icons, ...icons];

  return (
    <div className="w-full max-w-8xl mx-auto overflow-hidden py-8">
      <div className="flex animate-scroll py-2">
        <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-w-max px-3 sm:px-4 md:px-5">
          {scrollingIcons.map((icon, index) => (
            <div
              key={`${icon}-${index}`}
              className="relative flex items-center justify-center shrink-0"
            >
              <Image
                src={`/icons/${icon}`}
                alt={icon.replace(".svg", "")}
                width={70}
                height={40}
                className="h-6 w-auto sm:h-8 max-w-10 lg:max-w-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll {
          animation: scroll 45s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
