import { Heading } from "@/components/Heading";
import Section from "@/components/layout/Section";
import Image from "next/image";

const profiles = [
  {
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Studio Recording",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Live Performance",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Music Production",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&h=600&q=80",
    description: "DJ Performance",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Mixing Console",
  },
];

export default function Overview() {
  return (
    <Section className="text-left" padding="sm">
      {/* <div className="relative left-1/2 right-1/2 w-screen -mx-[50vw]">
        
      </div> */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {profiles.map((profile, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="relative w-full h-60 md:h-[340px] overflow-hidden rounded-xs shadow-lg">
                <Image
                  src={profile.image}
                  alt={profile.description}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center lg:items-end p-8 lg:p-4">
                  <Heading
                    as="h4"
                    size="h6"
                    className="text-center font-medium"
                  >
                    {profile.description}
                  </Heading>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Container from "@/components/layout/Container";

const testimonials = [
  {
    id: 1,
    text: "I have been listening to Fridia kanil for a while now, and every song feels like a story i can relate to. The lyrics are heartfelt, and the production is top-notch. Truly one of the most talented musicians out there!",
    author: "Sam Newton",
    role: "YouTuber",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    text: "An incredible artist with a unique voice. Every track takes you on an emotional journey that stays with you long after the music stops. The attention to detail in production is outstanding.",
    author: "Emily Chen",
    role: "Music Blogger",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    text: "I've been following this artist's work for years, and the growth and evolution in their sound is remarkable. Each album brings something fresh while staying true to their artistic vision.",
    author: "Marcus Johnson",
    role: "Radio Host",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    text: "The songwriting is pure poetry set to music. It's rare to find an artist who can balance commercial appeal with genuine artistic integrity so effortlessly.",
    author: "Sophie Martinez",
    role: "Music Producer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    text: "Every performance is electric. The passion and energy this artist brings to their craft is infectious. Can't wait to see what comes next!",
    author: "David Park",
    role: "Podcast Host",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];
