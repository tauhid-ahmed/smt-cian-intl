"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface StatData {
  value: number;
  suffix?: string;
  label: string;
}

interface CounterProps {
  value: number;
  suffix?: string;
  start?: boolean;
}

function formatNumber(num: number) {
  return num.toLocaleString();
}

function Counter({ value, suffix, start = true }: CounterProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    const isInteger = Number.isInteger(value);
    const displayNumber = isInteger
      ? Math.round(latest)
      : Number(latest.toFixed(2));
    return formatNumber(displayNumber);
  });

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!start) return;
    const controls = animate(motionValue, value, {
      duration: 3.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [motionValue, value, start]);

  useEffect(() => {
    const unsubscribe = rounded.onChange((latest) => setDisplayValue(latest));
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.span>
      {displayValue}
      {suffix}
    </motion.span>
  );
}

export default function Stats() {
  const statsData: StatData[] = [
    { value: 120, suffix: "+", label: "Albums" },
    { value: 45, suffix: "K", label: "Fans" },
    { value: 23, suffix: "", label: "Testimonies" },
  ];

  return (
    <Section padding="none">
      <Container>
        <div
          className={cn(
            "flex justify-between gap-4 max-w-3xl -mx-8 md:mx-auto bg-linear-to-b from-transparent via-accent to-transparent py-8 px-4"
          )}
        >
          {statsData.map((stat, index) => {
            return (
              <>
                <motion.div
                  key={index}
                  className="rounded-xl shadow text-center flex gap-1 text-white text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, delay: index * 0.15 }}
                >
                  <span>
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      start={true}
                    />
                  </span>{" "}
                  <span>{stat.label}</span>
                </motion.div>
                {index !== statsData.length - 1 && (
                  <div className="w-px h-8 bg-linear-to-b from-transparent via-white to-transparent" />
                )}
              </>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
