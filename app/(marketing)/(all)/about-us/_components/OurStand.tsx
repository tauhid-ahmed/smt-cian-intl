import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Cross, Music, Heart, Users } from "lucide-react";

interface ValueCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhatWeStandFor = () => {
  const values: ValueCard[] = [
    {
      id: 1,
      icon: <Cross className="w-8 h-8" />,
      title: "Faith",
      description:
        "Everything we do is rooted in our commitment to glorify God and advance His kingdom through music.",
    },
    {
      id: 2,
      icon: <Music className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We believe in delivering the highest quality in production, distribution, and artist support.",
    },
    {
      id: 3,
      icon: <Heart className="w-8 h-8" />,
      title: "Authenticity",
      description:
        "We champion genuine voices and real stories that resonate with hearts seeking truth.",
    },
    {
      id: 4,
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description:
        "We foster connections between artists, fans, and believers to create a movement of faith.",
    },
  ];

  return (
    <Section padding="md">
      <Container className="space-y-8">
        {/* Title */}
        <Heading as="h2" size="h3" align="center">
          What We Stand For
        </Heading>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="group relative bg-transparent border border-white/20 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              {/* Icon Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-black">{value.icon}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-center mb-4">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-sm md:text-base text-center leading-relaxed">
                {value.description}
              </p>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhatWeStandFor;
