import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Intro() {
  return (
    <Section padding="none" className="relative overflow-hidden">
      <Container className="relative">
        <div className="h-[40vh] relative rounded overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072"
            alt="intro image"
            fill
            className="size-full object-cover"
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
            <Button size="sm" className="px-10" shape="pill" variant="outline">
              Pricing
            </Button>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-0 inset-x-0">
        <IconGallery />
      </div>
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
  return (
    <div className="w-full max-w-8xl mx-auto px-8">
      <div className="flex flex-wrap items-center justify-center gap-8 px-10 bg-black/50 backdrop-blur-3xl">
        {icons.map((icon) => (
          <div key={icon} className="relative flex items-center justify-center">
            <Image
              src={`/icons/${icon}`}
              alt={icon}
              width={40}
              height={10}
              className="max-h-10 max-w-20 grayscale hover:grayscale-0 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
