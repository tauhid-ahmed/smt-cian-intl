import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import GetStarted from "./GetStarted";

export default function Offer() {
  const heading = "The perfect plan to fit your needs";
  const imageSrc = "/images/service.webp";
  const cards = [
    {
      title: "For creators",
      description:
        "Get the full AI suite, the highest quality creative assets, or everything Artlist has to offer, all covered by the right license for you.",
      buttonText: "See Plans",
    },
    {
      title: "For teams",
      description:
        "Collaborate with your team and get the right licenses for everyone in your workspace.",
      buttonText: "See Plans",
    },
  ];

  return (
    <Section className="relative" padding="none">
      {/* Full-width background image */}
      <div className="relative left-1/2 right-1/2 w-screen -mx-[50vw] min-h-[40vh]">
        <Image
          src={
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
          }
          fill
          alt={heading}
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Overlay content */}
        <div className="absolute inset-0 py-16 md:py-24">
          <Container>
            <div className="flex flex-col items-start gap-8 relative z-10 max-w-2xl">
              <Heading as="h2" size="h3" className="text-white">
                Everything you need to create without limits
              </Heading>
              <GetStarted />
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
