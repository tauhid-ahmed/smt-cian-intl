import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Check } from "lucide-react";

interface Feature {
  id: number;
  text: string;
}

export default function Intro() {
  return (
    <div className="intro-height relative bg-black">
      <Image
        src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
        alt="Intro Image"
        fill
        className="size-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center">
        <Container>
          <div className="text-center absolute inset-0 flex flex-col justify-center -translate-y-14">
            <Heading as="h1" size="h1" font="serif" align="center">
              Faithful Discoveries
            </Heading>
            <div className="max-w-2xl mx-auto mt-2 w-full">
              <p className="text-lg font-semibold">
                Monthly Music & Mech Delivered Curated Christian music,
                exclusive merch, and faith-building content every month
              </p>
              <Button size="lg" className="mt-6">
                See Plans & Pricing
              </Button>
              <FeaturesBanner />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

const FeaturesBanner = () => {
  const features: Feature[] = [
    { id: 1, text: "New releases" },
    { id: 2, text: "Exclusive tracks" },
    { id: 3, text: "Artist meet & greets" },
    { id: 4, text: "Artist meets" },
  ];

  return (
    <div className="relative max-w-2xl mx-auto px-6 mt-10">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-8 md:gap-16 lg:gap-24">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center gap-3">
            {/* Check icon with circle background */}
            <div className="shrink-0 w-6 h-6 rounded-full border-2 border-white/80 bg-transparent flex items-center justify-center">
              <Check className="w-4 h-4 text-white stroke-3" />
            </div>

            {/* Feature text */}
            <span className="text-white text-sm font-normal whitespace-nowrap">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
