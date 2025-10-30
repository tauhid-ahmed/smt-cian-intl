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
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-8 py-8 max-w-8xl mx-auto">
      {icons.map((icon) => (
        <div key={icon} className="relative flex items-center justify-center">
          <Image
            src={`/icons/${icon}`}
            alt={icon}
            width={120}
            height={10}
            className="max-h-10 grayscale hover:grayscale-0 transition"
          />
        </div>
      ))}
    </div>
  );
}
