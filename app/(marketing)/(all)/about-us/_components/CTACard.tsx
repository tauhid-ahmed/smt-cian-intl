"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import React from "react";

interface CTACard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  variant: "light" | "dark";
}

const CTACardComponent: React.FC<{ card: CTACard }> = ({ card }) => {
  const isLight = card.variant === "light";

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col ${
        isLight ? "bg-gray-100 text-gray-900" : "bg-accent text-white"
      }`}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
        {card.title}
      </h2>

      <p
        className={`text-base sm:text-lg font-medium mb-4 ${
          isLight ? "text-gray-900" : "text-gray-200"
        }`}
      >
        {card.subtitle}
      </p>

      <p
        className={`text-sm sm:text-base mb-6 sm:mb-8 flex-grow ${
          isLight ? "text-gray-700" : "text-gray-300"
        }`}
      >
        {card.description}
      </p>

      <button
        onClick={card.buttonAction}
        className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
          isLight
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        {card.buttonText}
      </button>
    </div>
  );
};

const CTASection: React.FC = () => {
  const ctaCards: CTACard[] = [
    {
      id: 1,
      title: "For Artists",
      subtitle: "Are you a Christian artist looking for a label home?",
      description:
        "Join our roster of talented artists who are making an impact through faith-based music. We're always looking for authentic voices with a heart for ministry.",
      buttonText: "Submit Demo",
      buttonAction: () => {
        console.log("Submit Demo clicked");
        // Add your submit demo logic here
      },
      variant: "light",
    },
    {
      id: 2,
      title: "For Customers",
      subtitle: "Join our community of faith-filled music lovers",
      description:
        "Stay updated on new releases, exclusive content, and inspiring stories from our artists. Be the first to know about upcoming events and special announcements.",
      buttonText: "Join Newsletter",
      buttonAction: () => {
        console.log("Join Newsletter clicked");
        // Add your newsletter signup logic here
      },
      variant: "dark",
    },
  ];

  return (
    <Section padding="sm">
      <Container className="relative">
        <div className="text-center font-black">
          <span className="text-outline text-[100px] text-center whitespace-nowrap truncate leading-none">
            Be Part of The Movement
          </span>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0) 20%, black 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0) 20%, black 100%)",
          }}
        />
      </Container>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
          {ctaCards.map((card) => (
            <CTACardComponent key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default CTASection;
