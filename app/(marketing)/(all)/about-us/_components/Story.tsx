import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

export default function OurStory() {
  return (
    <Section>
      <Container className="space-y-10">
        <Heading align="center" as="h2" size="h3">
          Our Story
        </Heading>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative w-full h-[500px] md:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=800&fit=crop"
              alt="Recording studio with microphone and audio equipment"
              className="w-full h-full object-cover rounded-lg"
              fill
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <p>
              CIAN Collective was born from a simple yet powerful vision: to
              create a home for Christian artists who wanted to make an impact
              without compromising their faith. In 2018, what started as a small
              recording studio in Nashville has grown into a movement that spans
              the globe.
            </p>

            <p>
              Our founder, inspired by years of witnessing talented Christian
              artists struggle to find authentic representation, decided it was
              time for change. We believed that faith-based music deserved the
              same level of excellence and professional support as any other
              genre—without sacrificing the message.
            </p>

            <p>
              The journey hasn't been easy. We've faced industry skepticism,
              financial challenges, and moments of doubt. But through it all,
              our commitment to our mission has never wavered. Each artist we've
              signed, each song we've produced, and each life touched by our
              music has reinforced our purpose.
            </p>

            <p>
              Today, CIAN Collective is more than a record label—we're a
              community, a movement, and a testament to what's possible when
              faith meets excellence. As we look to the future, we're excited to
              continue discovering new voices, producing transformative music,
              and spreading the message of hope to every corner of the world.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
