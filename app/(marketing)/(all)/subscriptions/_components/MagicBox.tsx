"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// ==================== TYPE DEFINITIONS ====================
interface BoxItem {
  name: string;
  value: number;
}

interface Box {
  id: string;
  title: string;
  image: string;
  items: BoxItem[];
  totalValue: number;
  yourPrice: number;
}

interface BoxShowcaseProps {
  boxes?: Box[];
  onBoxChange?: (boxId: string) => void;
}

// ==================== DEFAULT DATA ====================
const defaultBoxes: Box[] = [
  {
    id: "january-2024",
    title: "January 2024 Box",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=600&fit=crop",
    items: [
      { name: "CD Album", value: 19 },
      { name: "T-Shirt", value: 28 },
      { name: "Sticker Pack", value: 6 },
      { name: "Digital Bonus", value: 9 },
    ],
    totalValue: 62,
    yourPrice: 34.99,
  },
  {
    id: "february-2024",
    title: "February 2024 Box",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop",
    items: [
      { name: "CD Album", value: 19 },
      { name: "Hoodie", value: 35 },
      { name: "Pin Set", value: 8 },
      { name: "Digital Bonus", value: 9 },
    ],
    totalValue: 71,
    yourPrice: 34.99,
  },
  {
    id: "march-2024",
    title: "March 2024 Box",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=600&fit=crop",
    items: [
      { name: "Vinyl Record", value: 29 },
      { name: "Poster", value: 12 },
      { name: "Tote Bag", value: 18 },
      { name: "Digital Bonus", value: 9 },
    ],
    totalValue: 68,
    yourPrice: 34.99,
  },
  {
    id: "april-2024",
    title: "April 2024 Box",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=600&fit=crop",
    items: [
      { name: "CD Album", value: 19 },
      { name: "Cap", value: 22 },
      { name: "Keychain", value: 7 },
      { name: "Digital Bonus", value: 9 },
    ],
    totalValue: 57,
    yourPrice: 34.99,
  },
];

// ==================== MAIN COMPONENT ====================
const BoxShowcase: React.FC<BoxShowcaseProps> = ({
  boxes = defaultBoxes,
  onBoxChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    setDirection(-1);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : boxes.length - 1;
    setCurrentIndex(newIndex);
    onBoxChange?.(boxes[newIndex].id);
  };

  const handleNext = () => {
    setDirection(1);
    const newIndex = currentIndex < boxes.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onBoxChange?.(boxes[newIndex].id);
  };

  const currentBox = boxes[currentIndex];

  return (
    <Section padding="xl">
      <Container>
        <Heading as="h2" size="h3" align="center" className="mb-10">
          What's in Your Box?
        </Heading>
        <div className="max-w-2xl mx-auto overflow-hidden">
          {/* Image Container with Animation */}
          <div className="relative mb-8 h-[300px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentBox.id}
                custom={direction}
                initial={{
                  x: direction > 0 ? "100%" : "-100%",
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: direction < 0 ? "100%" : "-100%",
                  opacity: 0,
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden will-change-transform"
              >
                <Image
                  src={currentBox.image}
                  alt={currentBox.title}
                  className="w-full h-full object-cover"
                  fill
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-12">
            <Button variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentBox.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <h2 className="text-xl md:text-2xl font-semibold">
                  {currentBox.title}
                </h2>
              </motion.div>
            </AnimatePresence>

            <Button variant="outline" onClick={handleNext}>
              Next
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Items Included */}
          <div className="mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBox.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8">
                  {currentBox.title} Included:
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentBox.items.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="bg-transparent border-2 border-white rounded-2xl p-4 text-center hover:bg-white hover:text-black transition-all flex flex-col justify-center"
                    >
                      <h4 className="text-lg font-semibold mb-2">
                        {item.name}
                      </h4>
                      <p className="text-base md:text-lg">${item.value} val</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Total Value */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentBox.id}-price`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl">
                <span className="font-normal">Total Value: </span>
                <span className="font-bold">${currentBox.totalValue}</span>
                <span className="font-normal"> Your Price </span>
                <span className="font-bold">
                  ${currentBox.yourPrice.toFixed(2)}
                </span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
};

export default BoxShowcase;
