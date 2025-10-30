"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    text: "I have been listening to Fridia kanil for a while now, and every song feels like a story i can relate to. The lyrics are heartfelt, and the production is top-notch. Truly one of the most talented musicians out there!",
    author: "Sam Newton",
    role: "YouTuber",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    text: "An incredible artist with a unique voice. Every track takes you on an emotional journey that stays with you long after the music stops. The attention to detail in production is outstanding.",
    author: "Emily Chen",
    role: "Music Blogger",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    text: "I've been following this artist's work for years, and the growth and evolution in their sound is remarkable. Each album brings something fresh while staying true to their artistic vision.",
    author: "Marcus Johnson",
    role: "Radio Host",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    text: "The songwriting is pure poetry set to music. It's rare to find an artist who can balance commercial appeal with genuine artistic integrity so effortlessly.",
    author: "Sophie Martinez",
    role: "Music Producer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    text: "Every performance is electric. The passion and energy this artist brings to their craft is infectious. Can't wait to see what comes next!",
    author: "David Park",
    role: "Podcast Host",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

function TextOpacityAnimation({
  text,
  triggerKey,
}: {
  text: string;
  triggerKey: number;
}) {
  return (
    <div className="text-4xl md:text-5xl font-light leading-tight">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${triggerKey}-${index}`}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
            ease: "linear",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setAnimationKey((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setAnimationKey((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setAnimationKey((prev) => prev + 1);
  };

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <Section>
      <Container>
        <div className="relative w-fit flex items-center gap-2 mb-2">
          <Button onClick={goToPrevious} size="icon" variant="ghost">
            <ChevronLeft className="w-4 h-4 text-white" />
          </Button>
          <div className="text-white/80 font-semibold text-sm whitespace-nowrap">
            {currentIndex + 1} / {testimonials.length}
          </div>
          <Button onClick={goToNext} size="icon" variant="ghost">
            <ChevronRight className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="overflow-hidden relative min-h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0"
            >
              <div className="text-white mb-12">
                <TextOpacityAnimation
                  text={currentTestimonial.text}
                  triggerKey={animationKey}
                />
              </div>

              <div className="flex items-center gap-4">
                <Image
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
                />
                <div>
                  <div className="text-white font-semibold text-lg">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {currentTestimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
