import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

export default function Service() {
  return (
    <Section className="relative overflow-x-hidden max-w-7xl m-auto" padding="sm">
      <Container>
        <div className="text-center font-black">
          <span className="text-outline text-4xl md:text-6xl lg:text-8xl xl:text-[200px] font-bold capitalize!">
            Listen on
          </span>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0) 20%, black 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0) 20%, black 100%)",
          }}
        />
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <Image
            src="/icons/spotify.svg"
            alt="spotify"
            width={120}
            height={80}
          />
          <Image
            src="/icons/apple-logo.svg"
            alt="apple"
            width={120}
            height={80}
          />
          <Image
            src="/icons/youtube.svg"
            alt="youtube"
            width={120}
            height={80}
          />
        </div>
      </Container>
    </Section>
  );
}
