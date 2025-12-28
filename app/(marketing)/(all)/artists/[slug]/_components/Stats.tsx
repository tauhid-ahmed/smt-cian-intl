"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { useGetSingleArtistQuery } from "@/lib/api/commonApi";
import { useParams } from "next/navigation";

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

function formatNumber(num: number): string {
  return num.toLocaleString();
}

function Counter({ value, suffix = "", start = true }: CounterProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    const isInteger = Number.isInteger(value);
    const displayNumber = isInteger
      ? Math.round(latest)
      : Number(latest.toFixed(2));
    return formatNumber(displayNumber);
  });

  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    if (!start) return;
    const controls = animate(motionValue, value, {
      duration: 3.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [motionValue, value, start]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) =>
      setDisplayValue(latest)
    );
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
    const {id} = useParams()
    const {data: artistData , isLoading , isError} = useGetSingleArtistQuery(id as  string)
  const statsData: StatData[] = [
      { value: artistData?.followers ?? 0, suffix: (artistData?.followers ?? 0) > 0  ? "+" : "", label: "followers" },
      { value: artistData?.awards ?? 0, suffix: (artistData?.awards ?? 0) > 0  ? "+" : "", label: "awards" },
      { value: artistData?.popularity ?? 0, suffix: (artistData?.popularity ?? 0) > 0  ? "+" : "", label: "popularity" },
  ];


   console.log(artistData)
  return (
    <Section padding="none">
      <Container>
        <div
          className={cn(
            "relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16",
            "max-w-2xl mx-auto py-8 px-4",
            "md:bg-linear-to-b from-transparent via-accent to-transparent"
          )}
        >
          {
                      isLoading ? 'loading' : 
                          statsData.map((stat, index) => (
                              <div key={stat.label} className="relative flex items-center">
                                  <motion.div
                                      className={cn(
                                          "flex flex-col items-center justify-center text-center",
                                          "min-w-[100px] sm:min-w-[120px]"
                                      )}
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true, amount: 0.5 }}
                                      transition={{ duration: 0.6, delay: index * 0.15 }}
                                  >
                                      <div className="flex items-center text-xl md:text-2xl lg:text:3xl font-bold text-white gap-1">
                                          <div>
                                              <Counter
                                                  value={stat.value}
                                                  suffix={stat.suffix}
                                                  start={true}
                                              />
                                          </div>
                                          <div>{stat.label}</div>
                                      </div>
                                  </motion.div>

                                  {/* Separator Line */}
                                  {index !== statsData.length - 1 && (
                                      <div className="hidden sm:block absolute -right-4 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2">
                                          <div className="w-0.5 h-16 md:h-8 bg-linear-to-b from-transparent via-white/30 to-transparent" />
                                      </div>
                                  )}

                                  {/* Horizontal separator for mobile */}
                                  {index !== statsData.length - 1 && (
                                      <div className="sm:hidden absolute -bottom-3 left-1/2 -translate-x-1/2">
                                          <div className="h-px w-16 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                                      </div>
                                  )}
                              </div>
                          ))
                      
          }
        </div>
      </Container>
    </Section>
  );
}
