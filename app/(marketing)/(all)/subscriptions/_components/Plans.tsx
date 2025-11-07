"use client";

import { CheckCircle } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";

// ==================== TYPE DEFINITIONS ====================
interface Feature {
  text: string;
}

interface MembershipPlan {
  id: string;
  name: string;
  price?: string;
  isPopular?: boolean;
  features: Feature[];
  buttonText: string;
  buttonStyle: "outline" | "solid";
  borderColor?: string;
}

interface GlobalFeature {
  text: string;
}

// ==================== MEMBERSHIP CARD COMPONENT ====================
function MembershipCard({
  plan,
  onSelect,
}: {
  plan: MembershipPlan;
  onSelect: () => void;
}) {
  return (
    <div
      className={`rounded-2xl p-8 border-2 relative flex flex-col h-full ${
        plan.borderColor || "border-gray-700"
      } hover:border-gray-600 transition-all`}
    >
      <div className="flex items-center justify-between">
        <Heading as="h3" size="h5">
          {plan.name}
        </Heading>

        {plan.isPopular && (
          <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
            Popular
          </span>
        )}
      </div>

      {/* Price */}
      <div className="my-8">
        <p className="text-5xl font-bold text-yellow-500">{plan.price}</p>
      </div>

      {/* Features - Flexible grow section */}
      <div className="space-y-4 mb-8 grow">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="size-5.5 text-white shrink-0 mt-0.5" />
            <span className="text-gray-300 text-lg">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Select Button - Always at bottom */}
      <Button
        onClick={onSelect}
        shape="lg"
        size="lg"
        variant={plan.buttonStyle === "solid" ? "secondary" : "outline"}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
}

// ==================== DEFAULT DATA ====================
const defaultPlans: MembershipPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$19.99/mo",
    features: [
      { text: "1 Album (digital)" },
      { text: "Early access to releases" },
      { text: "Review privileges" },
      { text: "Member community" },
    ],
    buttonText: "Select",
    buttonStyle: "outline",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$34.99/mo",
    isPopular: true,
    features: [
      { text: "2 Albums (CD/vinyl)" },
      { text: "All Basic features" },
      { text: "Exclusive tracks" },
      { text: "Artist content" },
      { text: "Priority support" },
      { text: "1 merch item" },
      { text: "Digital bonus content" },
    ],
    buttonText: "Select",
    buttonStyle: "solid",
    borderColor: "border-yellow-500",
  },
  {
    id: "vip",
    name: "VIP",
    price: "$59.99/mo",
    features: [
      { text: "3 Albums (vinyl)" },
      { text: "All Premium features" },
      { text: "Signed merch" },
      { text: "Video call with artist (1/year)" },
      { text: "2 merch items" },
      { text: "Featured reviews" },
    ],
    buttonText: "Select",
    buttonStyle: "outline",
  },
  {
    id: "church",
    name: "Church",
    price: "Custom Pricing",
    features: [
      { text: "Bulk licenses" },
      { text: "Custom selection" },
      { text: "Group rates" },
      { text: "Church resources" },
      { text: "Bulk downloads" },
    ],
    buttonText: "Contact us",
    buttonStyle: "outline",
  },
];

const defaultGlobalFeatures: GlobalFeature[] = [
  { text: "Cancel anytime" },
  { text: "Pause subscription" },
  { text: "Swap/skip months" },
  { text: "Exclusive discounts" },
  { text: "Birthday gifts" },
];

// ==================== MAIN COMPONENT ====================
function MembershipPricing({
  title = "Choose Your Membership",
  plans = defaultPlans,
  globalFeatures = defaultGlobalFeatures,
}) {
  return (
    <Section padding="lg" className="bg-sidebar">
      <Container>
        <Heading as="h2" size="h3" align="center">
          {title}
        </Heading>

        {/* Membership Cards Grid - Equal height with flexbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16 items-stretch">
          {plans.map((plan) => (
            <MembershipCard
              key={plan.id}
              plan={plan}
              onSelect={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>

        {/* Global Features */}
        <div className="text-center">
          <Heading as="h3" size="h5" weight="normal" align="center">
            All plans include:
          </Heading>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mt-6">
            {globalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="size-5.5 text-white shrink-0" />
                <span className="text-gray-300 text-lg">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default MembershipPricing;
