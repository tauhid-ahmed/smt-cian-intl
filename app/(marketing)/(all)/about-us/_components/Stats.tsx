// components/impact-section.tsx
import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import {
  Users,
  Palette,
  Heart,
  Disc,
  Globe,
  MessageCircle,
} from "lucide-react";

const ImpactSection = () => {
  const stats = [
    {
      icon: Users,
      number: "5,000+",
      label: "Community Members",
      color: "text-blue-600",
    },
    {
      icon: Palette,
      number: "150+",
      label: "Artists Supported",
      color: "text-purple-600",
    },
    {
      icon: Heart,
      number: "$250K+",
      label: "Donated to Ministry",
      color: "text-red-600",
    },
    {
      icon: Disc,
      number: "10,000+",
      label: "Albums Sold",
      color: "text-green-600",
    },
    {
      icon: Globe,
      number: "45+",
      label: "Countries Reached",
      color: "text-orange-600",
    },
    {
      icon: MessageCircle,
      number: "1,000+",
      label: "Testimonies Shared",
      color: "text-indigo-600",
    },
  ];

  return (
    <Section padding="lg">
      <Container>
        <div className="text-center mb-12">
          <Heading size="h4" as="h2" align="center">
            Our Impact
          </Heading>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-accent rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:bg-white hover:text-gray-900 text-white"
            >
              {/* Background decoration */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                {/* Number */}
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="text-lg font-medium">{stat.label}</p>

                {/* Hover effect line */}
                <div
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r ${stat.color} group-hover:w-full transition-all duration-500 rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default ImpactSection;
