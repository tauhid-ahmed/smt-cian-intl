"use client";

import React from "react";
import { Package, Truck, Heart, ArrowRight } from "lucide-react";
import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

// ==================== TYPE DEFINITIONS ====================
interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  steps?: Step[];
}

// ==================== DEFAULT DATA ====================
const defaultSteps: Step[] = [
  {
    id: 1,
    icon: <Package className="w-16 h-16" />,
    title: "Choose Your Box",
    description: "Select your membership tier",
  },
  {
    id: 2,
    icon: <Truck className="w-16 h-16" />,
    title: "Receive Monthly",
    description: "Curated box arrives by the 15th",
  },
  {
    id: 3,
    icon: <Heart className="w-16 h-16" />,
    title: "Enjoy & Share",
    description: "Listen, wear, and spread the faith",
  },
];

// ==================== MAIN COMPONENT ====================
const HowItWorks: React.FC<HowItWorksProps> = ({
  title = "How Faithful Discoveries Work",
  steps = defaultSteps,
}) => {
  return (
    <Section padding="lg">
      <Container>
        {/* Title */}
        <div className="max-w-4xl mx-auto flex flex-col justify-center">
          <Heading as="h2" size="h3" align="center" className="mb-16">
            {title}
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <div className="flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="text-5xl md:text-6xl font-bold mb-6 text-white">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 text-white">{step.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-base md:text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Between Steps (Desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:flex items-center justify-center absolute top-32 transform -translate-y-1/2"
                    style={{
                      left: `${(index + 1) * (100 / steps.length)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                )}

                {/* Arrow Between Steps (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="flex md:hidden justify-center my-4">
                    <ArrowRight className="w-8 h-8 text-white rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HowItWorks;
