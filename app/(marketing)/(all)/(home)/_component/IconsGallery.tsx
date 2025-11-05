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
  // Duplicate icons for seamless loop
  const duplicatedIcons = [...icons, ...icons];

  return (
    <div className="w-full overflow-hidden py-8 md:py-12">
      <div className="relative flex">
        {/* First set of logos */}
        <div className="flex animate-scroll-left gap-8 md:gap-12 lg:gap-16 min-w-max">
          {duplicatedIcons.map((icon, index) => (
            <div
              key={`${icon}-${index}`}
              className="relative flex items-center justify-center shrink-0"
            >
              <Image
                src={`/icons/${icon}`}
                alt={icon.replace(".svg", "")}
                width={120}
                height={40}
                className="h-6 w-auto md:h-8 lg:h-10 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Second set for seamless loop */}
        <div
          className="flex animate-scroll-left gap-8 md:gap-12 lg:gap-16 min-w-max"
          aria-hidden="true"
        >
          {duplicatedIcons.map((icon, index) => (
            <div
              key={`duplicate-${icon}-${index}`}
              className="relative flex items-center justify-center shrink-0"
            >
              <Image
                src={`/icons/${icon}`}
                alt=""
                width={120}
                height={40}
                className="h-6 w-auto md:h-8 lg:h-10 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
