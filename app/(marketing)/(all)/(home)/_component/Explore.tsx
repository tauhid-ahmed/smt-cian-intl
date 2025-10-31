import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Video from "@/components/Video";
import Link from "next/link";

type ExploreProps = {
  source: { src: string; type: string; media?: string }[];
  title: string;
  subtitle: string;
  href: string;
  hrefTitle: string;
};

export default function Explore({
  source,
  title = "hello",
  subtitle,
  href,
  hrefTitle,
}: ExploreProps) {
  return (
    <div
      aria-label="asset"
      className="relative w-full overflow-hidden group bg-sidebar"
    >
      <div className="hidden lg:block w-full relative min-h-96 cursor-pointer">
        <Video
          sources={source}
          className="w-full min-h-110 max-h-110 object-cover"
          autoplayMode="viewport"
        />

        <div className="absolute inset-0 bg-sidebar group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
      </div>

      <div className="lg:absolute py-14 inset-0 flex flex-col justify-center items-center lg:items-start z-10 text-white lg:px-10">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row justify-between lg:items-center cursor-pointer">
            <div className="flex flex-col xl:flex-row xl:items-center gap-4">
              <Heading as="h2" size="h1">
                {title}
              </Heading>
              <Heading as="h3" size="h6">
                {subtitle}
              </Heading>
            </div>
            <Button
              size="lg"
              className="font-semibold px-8 py-6 text-base"
              variant="outline"
              asChild
              width="responsive"
            >
              <Link href={href}>{hrefTitle || "Explore Now"}</Link>
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
