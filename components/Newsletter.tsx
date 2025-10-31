"use client";

import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import Section from "./layout/Section";
import Container from "./layout/Container";
import { Button } from "./ui/button";

// Type Definitions
interface Feature {
  id: number;
  text: string;
}

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  privacyText?: string;
  onSubscribe?: (email: string) => void;
}

// Default Features Data
const defaultFeatures: Feature[] = [
  { id: 1, text: "New music alerts" },
  { id: 2, text: "Behind-the-scenes content" },
  { id: 3, text: "Exclusive discounts" },
];

// Newsletter Component
const Newsletter: React.FC<NewsletterProps> = ({
  title = "Stay update",
  subtitle = "Get notified about new releases, tour dates, and exclusive content.",
  features = defaultFeatures,
  privacyText = "We respect your privacy. Unsubscribe at any time",
  onSubscribe,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      if (onSubscribe) {
        onSubscribe(email);
      }
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <Section padding="sm" className="overflow-hidden relative">
      <Container>
        <div className="flex items-center justify-center relative">
          <span className="text-outline text-[160px] font-bold text-center truncate leading-tight relative">
            {title}
          </span>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0) 10%, black 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0) 10%, black 100%)",
            }}
          />
        </div>

        <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12"
        >
          <div className="flex flex-col md:flex-row items-center w-full gap-6">
            <div className="flex-1 w-full relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email address"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors bg-accent"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitted}
              variant="secondary"
              size="lg"
              width="responsive"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
        </form>

        {/* Features */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-8">
          {features.map((feature: Feature) => (
            <div key={feature.id} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-base md:text-lg">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Privacy Text */}
        <p className="text-sm text-gray-400 text-center">{privacyText}</p>
      </Container>
    </Section>
  );
};

export default Newsletter;
