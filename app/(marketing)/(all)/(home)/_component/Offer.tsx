import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";
import GetStarted from "./GetStarted";

export default function Offer() {
  const heading = "The perfect plan to fit your needs";

  return (
    <Section className="relative" padding="none">
      <div
        className="
          relative
          left-1/2 right-1/2
          w-screen
          -mx-[50vw]
          min-h-[300px]
          sm:min-h-[400px]
          md:min-h-[500px]
          lg:min-h-[600px]
          xl:min-h-[600px]
        "
      >
        <Image
          src="/images/man.png"
          fill
          alt={heading}
          priority
          className="object-cover object-top"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Overlay content */}
        <div
          className="
            absolute inset-0
            flex items-center
            py-12
            md:py-20
            lg:py-24
          "
        >
          <Container>
            <div
              className="
                relative z-10
                max-w-xl
                md:max-w-2xl
                flex flex-col
                gap-6
                md:gap-8"
            >
              <Heading
                as="h2"
                size="h3"
                className="
                  text-white
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  leading-normal
                "
              >
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
