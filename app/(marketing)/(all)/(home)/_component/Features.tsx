import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

const features = [
  {
    title: "Cutting-edge AI tools",
    description:
      "Generate anything you can imagine with the newest AI image and AI video generators, and voiceover your videos with exclusive voices.",
  },
  {
    title: "Highest-quality assets",
    description:
      "Create standout videos with royalty-free music, sound effects, footage, video templates, and plugins that are always on trend.",
  },
  {
    title: "Built for you",
    description:
      "Every tool or asset has been built by creators, for creators, to streamline and simplify your creative process.",
  },
];

export default function Features() {
  return (
    <Section padding="lg">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          {/* Image */}
          <div className="relative w-full min-h-120 lg:h-200 rounded overflow-hidden shadow-lg max-w-172">
            <Image
              src="/images/feature.webp"
              alt="Feature Image"
              fill
              className="object-cover"
              placeholder="empty"
              priority
            />
          </div>

          {/* Features */}
          <div className="flex flex-col max-w-2xl w-full text-left gap-8 md:p-10 lg:p-20  divide-y divide-white/70">
            {features.map((feature) => (
              <div key={feature.title} className="w-full pb-8 space-y-1">
                <Heading as="h3" size="h3">
                  {feature.title}
                </Heading>
                <p className="text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
