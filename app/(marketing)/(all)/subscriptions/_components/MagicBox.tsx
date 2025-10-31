"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const itemVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12">
          What's in Your Box?
        </h1>

        {/* Image Container with Animation */}
        <div className="relative mb-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentBox.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="rounded-3xl overflow-hidden aspect-video"
            >
              <img
                src={currentBox.image}
                alt={currentBox.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black transition-all font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Box
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentBox.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className="text-xl md:text-2xl font-semibold">
                {currentBox.title}
              </h2>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all font-medium"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Items Included */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.h3
              key={`${currentBox.id}-title`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl font-semibold text-center mb-8"
            >
              {currentBox.title} Included:
            </motion.h3>
          </AnimatePresence>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
              {currentBox.items.map((item, index) => (
                <motion.div
                  key={`${currentBox.id}-${item.name}`}
                  custom={index}
                  variants={itemVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-transparent border-2 border-white rounded-2xl p-6 text-center hover:bg-white hover:text-black transition-all"
                >
                  <h4 className="text-lg md:text-xl font-semibold mb-2">
                    {item.name}
                  </h4>
                  <p className="text-base md:text-lg">${item.value} val</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Total Value */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBox.id}-price`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
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
    </div>
  );
};

export default BoxShowcase;
