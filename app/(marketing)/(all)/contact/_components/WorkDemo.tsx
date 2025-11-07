"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Mail, Mic, FileText } from "lucide-react";

interface ContactCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  variant: "light" | "dark";
}

export default function WorkDemo() {
  const handleEmailClick = () => {
    window.location.href = "mailto:info@ciancollective.com";
  };

  const handleDemoClick = () => {
    // Navigate to demo submission page or open modal
    console.log("Opening demo submission...");
  };

  const handlePressKitClick = () => {
    // Download press kit or navigate to press page
    console.log("Opening press kit...");
  };

  const categories: ContactCategory[] = [
    {
      id: "general",
      icon: <Mail className="w-16 h-16" strokeWidth={1.5} />,
      title: "General Inquiries",
      description: "For questions about orders, products, or subscriptions",
      buttonText: "Email Us",
      buttonAction: handleEmailClick,
      variant: "light",
    },
    {
      id: "artist",
      icon: <Mic className="w-16 h-16" strokeWidth={1.5} />,
      title: "Artist",
      description: "Demo submissions and artist partnerships",
      buttonText: "Submit demo",
      buttonAction: handleDemoClick,
      variant: "dark",
    },
    {
      id: "press",
      icon: <FileText className="w-16 h-16" strokeWidth={1.5} />,
      title: "Press & Media",
      description: "Media inquiries and press kits",
      buttonText: "Press Kit",
      buttonAction: handlePressKitClick,
      variant: "dark",
    },
  ];

  return (
    <Section padding="lg">
      <Container>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`rounded-3xl p-8 border-2 transition-transform ${"bg-zinc-800 border-zinc-700"}`}
              >
                <div className="flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className={`mb-6 ${"text-white"}`}>{category.icon}</div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-4 ${"text-white"}`}>
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-base mb-8 grow ${"text-gray-300"}`}>
                    {category.description}
                  </p>

                  {/* Button */}
                  <button
                    onClick={category.buttonAction}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${"bg-white text-black hover:bg-gray-100"}`}
                  >
                    {category.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
