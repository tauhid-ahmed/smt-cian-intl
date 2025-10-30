import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Video from "@/components/Video";
import GetStarted from "./GetStarted";

export default function Intro() {
  return (
    <div className="intro-height relative">
      <Video
        sources={[
          {
            src: "https://artlist-dev.imgix.net/artlist/artlist-ai-Mobile-2.webm",
            type: "video/webm",
            media: "(max-width: 767px)",
          },
          {
            src: "https://artlist-dev.imgix.net/artlist/artlist-ai-768-1.webm",
            type: "video/webm",
            media: "(min-width: 768px) and (max-width: 1279px)",
          },
          {
            src: "https://artlist-dev.imgix.net/artlist/artlist-ai-1440-1.webm",
            type: "video/webm",
            media: "(min-width: 1280px) and (max-width: 1439px)",
          },
          {
            src: "https://artlist-dev.imgix.net/artlist/artlist-ai-1440-1.webm",
            type: "video/webm",
            media: "(min-width: 1440px) and (max-width: 1535px)",
          },
          {
            src: "https://artlist-dev.imgix.net/artlist/artlist-ai-1536-1.webm",
            type: "video/webm",
            media: "(min-width: 1536px) and (max-width: 1599px)",
          },
          {
            src: "https://artlist-dev.imgix.net/artlist/artlist-ai-1920-1.webm",
            type: "video/webm",
            media: "(min-width: 1600px) and (max-width: 1919px)",
          },
          {
            src: "https://artlist-dev.imgix.net/artlist/artlist-ai-1920-1.webm",
            type: "video/webm",
            media: "(min-width: 1920px)",
          },
        ]}
        className="absolute bottom-0 left-0 w-full h-full object-cover"
        style={{
          objectPosition: "center bottom",
          filter: "brightness(0.9) contrast(1.15)",
        }}
        autoplayMode="viewport"
        loop
        muted
        // playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 flex justify-center">
        <Container>
          <div className="text-center mt-16 lg:mt-20">
            <Heading as="h1" size="h1" font="serif" align="center">
              Feel the Rhythm of Your Soul
            </Heading>
            <div className="max-w-2xl mx-auto mt-2">
              <p className="text-lg font-semibold">
                Discover, Stream, and share the music that moves you.
              </p>
            </div>
            <div className="mt-6 md:mt-8 lg:mt-10">
              <GetStarted />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
