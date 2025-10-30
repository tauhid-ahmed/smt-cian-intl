import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Service() {
  // Data inside the same file
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
      <div className="relative left-1/2 right-1/2 w-screen -mx-[50vw] min-h-[80vh]">
        <Image src={imageSrc} fill alt={heading} className="object-cover" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Overlay content */}
        <div className="absolute inset-0 py-16 md:py-24">
          <Container>
            <div className="flex flex-col items-start gap-8 relative z-10">
              <Heading className="text-white">{heading}</Heading>

              <div className="flex flex-col gap-6 md:flex-row">
                {cards.map((card, idx) => (
                  <div key={idx} className="max-w-96 text-left space-y-2">
                    <Heading
                      as="h3"
                      size="h5"
                      weight="medium"
                      className="text-white"
                    >
                      {card.title}
                    </Heading>
                    <p className="text-white">{card.description}</p>
                    <Button
                      variant="secondary"
                      size="lg"
                      className={cn(
                        idx === 1 &&
                          "bg-black hover:bg-black hover:opacity-80 border border-white text-white"
                      )}
                    >
                      {card.buttonText}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
