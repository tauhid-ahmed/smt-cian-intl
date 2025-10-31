"use client";

import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        {/* Title with Outline Effect */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6"
          style={{
            WebkitTextStroke: "2px white",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12"
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email address"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitted}
            className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:bg-green-500 disabled:text-white flex items-center justify-center gap-2"
          >
            {isSubmitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </button>
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
        <p className="text-sm text-gray-400">{privacyText}</p>
      </div>
    </div>
  );
};

export default Newsletter;
