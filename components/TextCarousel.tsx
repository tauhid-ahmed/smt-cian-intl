"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import TextOpacityAnimation from "@/components/animations/TextOpacity";

type Props = {
  data: { text: string; author: string; role: string; avatar: string }[];
  className?: string;
};

export default function TextCarousel({ data, className }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % data.length);
      setAnimationKey((prev) => prev + 1);
    }, 1000000);

    return () => clearInterval(interval);
  }, [direction]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setAnimationKey((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setAnimationKey((prev) => prev + 1);
  };

  const currentTestimonial = data[currentIndex];

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
    <>
      <div className="relative w-fit flex items-center gap-2 mb-2">
        <Button onClick={goToPrevious} size="icon" variant="ghost">
          <ChevronLeft className="w-4 h-4 text-white" />
        </Button>
        <div className="text-white/80 font-semibold text-sm whitespace-nowrap">
          {currentIndex + 1} / {data.length}
        </div>
        <Button onClick={goToNext} size="icon" variant="ghost">
          <ChevronRight className="w-4 h-4 text-white" />
        </Button>
      </div>

      <div className="overflow-hidden relative min-h-[50vh] lg:min-h-[500px] xl:min-h-[400px]">
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
                className={className}
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
    </>
  );
}
