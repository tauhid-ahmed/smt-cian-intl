import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function TextOpacityAnimation({
  text,
  triggerKey,
  className,
}: {
  text: string;
  triggerKey: number;
  className?: string;
}) {
  return (
    <div
      className={cn("text-4xl md:text-5xl font-light leading-tight", className)}
    >
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
