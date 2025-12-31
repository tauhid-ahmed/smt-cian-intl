"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Mail, Mic, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

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
  const router = useRouter();
  const handleEmailClick = () => {
    window.location.href = "mailto:info@ciancollective.com";
  };

  const handleDemoClick = () => {
    console.log("Opening demo submission...");
    // router navigation
    router.push("/contact/artist-information");
  };

  const handlePressKitClick = () => {
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
                className="
                  group
                  rounded-3xl
                  p-8
                  border-2
                  transition-all
                  duration-300
                  bg-zinc-800
                  border-zinc-700
                  hover:bg-white
                "
              >
                <div className="flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className="mb-6 text-white transition-colors group-hover:text-black">
                    {category.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white transition-colors group-hover:text-black">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base mb-8 grow text-gray-300 transition-colors group-hover:text-gray-700">
                    {category.description}
                  </p>

                  {/* Button */}
                  <button
                    onClick={category.buttonAction}
                    className="
                      w-full
                      py-4
                      rounded-xl
                      font-semibold
                      text-lg
                      transition-all
                      bg-white
                      text-black
                      group-hover:bg-black
                      group-hover:text-white
                    "
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
