"use client";
import { motion } from "framer-motion";

export default function TextOpacityAnimation() {
  const text =
    "The quick brown fox jumps over the lazy dog. This animation reveals each letter gradually while keeping the entire text visible from the start.";

  return (
    <div className="text-5xl text-white max-w-4xl">
      <div>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
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
    </div>
  );
}
