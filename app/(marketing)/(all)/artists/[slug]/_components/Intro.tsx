import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import ScrollDownButton from "@/components/ScrollDownButton";
import { Button } from "@/components/ui/button";
import { LucideHeadphones } from "lucide-react";
import Image from "next/image";

export default function Intro() {
  return (
    <div className="intro-height relative bg-black">
      <Image
        src="/images/artist.webp"
        alt="Intro Image"
        fill
        className="size-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center">
        <Container>
          <div className="text-center mt-24 lg:mt-32">
            <Heading as="h1" size="h1" font="serif" align="center">
              Grace Rivers
            </Heading>
            <div className="max-w-2xl mx-auto mt-2">
              <p className="text-lg font-semibold">
                Contemporary Worship • Inspiring Faith Through Music
              </p>
            </div>
          </div>
        </Container>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Button variant="secondary">
          <LucideHeadphones /> Latest Release
        </Button>
      </div>
      <div className="absolute inset-x-0 bottom-32 flex justify-center">
        <ScrollDownButton />
      </div>
    </div>
  );
}
