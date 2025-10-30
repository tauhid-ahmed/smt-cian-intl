"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "./layout/Container";
import { LucideChevronDown } from "lucide-react";
import { Button } from "./ui/button";

type FaqItem = {
  question: string;
  answer: string;
};

interface FaqProps {
  items: FaqItem[];
  className?: string;
}

export default function FAQ({ items, className }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <div className={cn("space-y-4", className)}>
        {items.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden border-b border-white pb-4"
          >
            {/* Question */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => toggle(index)}
              className={cn(
                "w-full text-left py-4 flex justify-between items-center font-medium text-lg",
                index === openIndex && "text-white"
              )}
            >
              {item.question}
              <span
                className={cn(
                  "transition-transform duration-300",
                  openIndex === index ? "rotate-180" : "rotate-0"
                )}
              >
                <LucideChevronDown />
              </span>
            </Button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-muted"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Container>
  );
}
