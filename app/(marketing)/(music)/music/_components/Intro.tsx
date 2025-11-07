"use client";

import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Intro() {
  return (
    <Section className="relative overflow-hidden" padding="sm">
      <Container>
        <Heading as="h2" size="h4" className="mb-4" weight="medium">
          Music
        </Heading>
        <div className="relative overflow-hidden rounded">
          <div className="h-[40vh] relative rounded -mx-8 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072"
              alt="intro image"
              fill
              className="size-full object-cover rounded"
            />
          </div>
          <div className="absolute inset-0 px-16 py-6">
            <Heading as="h1" size="h5" className="max-w-96 leading-tight">
              Get royalty-free music for your videos
            </Heading>
            <p className="text-sm font-semibold mt-2">
              Explore copyright-free music with music licensing that covers any
              kind of project, from social media to commercial use worldwide.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Button size="sm" className="px-10" shape="pill">
                Start Free Now
              </Button>
              <Button
                size="sm"
                className="px-10"
                shape="pill"
                variant="outline"
              >
                Pricing
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 translate-y-0.5 -inset-x-1">
            <IconGallery />
          </div>
        </div>
      </Container>
    </Section>
  );
}

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

function IconGallery() {
  // Duplicate icons for seamless infinite scroll
  const duplicatedIcons = [...icons, ...icons];

  return (
    <div className="w-full max-w-8xl mx-auto overflow-hidden bg-black/50 backdrop-blur-3xl">
      <div className="relative flex py-2">
        {/* First scrolling set */}
        <div className="flex animate-scroll gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-w-max px-3 sm:px-4 md:px-5">
          {duplicatedIcons.map((icon, index) => (
            <div
              key={`${icon}-${index}`}
              className="relative flex items-center justify-center shrink-0"
            >
              <Image
                src={`/icons/${icon}`}
                alt={icon.replace(".svg", "")}
                width={60}
                height={30}
                className="h-6 w-auto sm:h-8 max-w-10 lg:max-w-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Second scrolling set for seamless loop */}
        <div
          className="flex animate-scroll gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-w-max px-3 sm:px-4 md:px-5"
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
                width={80}
                height={40}
                className="h-6 w-auto sm:h-8 md:h-10 max-w-12 sm:max-w-16 md:max-w-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
