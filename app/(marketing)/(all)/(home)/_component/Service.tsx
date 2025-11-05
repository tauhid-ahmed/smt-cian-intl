import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Service() {
  const heading = "The perfect plan to fit your needs";
  const imageSrc = "/images/service.webp";
  const cards = [
    {
      title: "For creators",
      description: `Get the full AI suite, the highest quality
creative assets, or everything Artlist has to
offer, all covered by the right license for you.`,
      buttonText: "See Plans",
    },
    {
      title: "For teams",
      description: `Give your brand, team, or agency unlimited assets
and advanced AI tools to create securely and at
scale — backed by the perfect business license.`,
      buttonText: "See Plans",
    },
  ];

  return (
    <Section className="relative" padding="none">
      <div className="relative left-1/2 right-1/2 w-screen -mx-[50vw] min-h-[90vh]">
        <Image src={imageSrc} fill alt={heading} className="object-cover" />
        <div className="absolute inset-0 py-16 lg:py-20">
          <Container>
            <div className="flex flex-col items-start gap-12 md:gap-16 lg:gap-18 relative z-10">
              <div className="max-w-xl">
                <Heading className="text-white" as="h2" weight="normal">
                  {heading}
                </Heading>
              </div>

              <div className="flex flex-col gap-10 md:gap-20 md:flex-row">
                {cards.map((card, idx) => (
                  <div key={idx} className="max-w-96 text-left">
                    <Heading
                      as="h3"
                      size="h5"
                      weight="medium"
                      className="text-white"
                    >
                      {card.title}
                    </Heading>
                    <p className="text-white mt-2.5">{card.description}</p>
                    <Button
                      variant="secondary"
                      size="xl"
                      className={cn(
                        "mt-4",
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
