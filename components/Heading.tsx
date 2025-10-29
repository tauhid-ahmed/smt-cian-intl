import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
  as?: React.ElementType;
  size?: HeadingLevel;
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
  font?: "serif" | "sans";
  children: React.ReactNode;
}

export function Heading({
  asChild = false,
  as,
  size = "h2",
  weight = "bold",
  align = "left",
  className,
  children,
  font,
  ...props
}: HeadingProps) {
  const Component = as ?? size;
  const Comp = asChild ? Slot : Component;

  // 1rem = 16px baseline (by default in Tailwind)
  const sizes: Record<HeadingLevel, string> = {
    h1: "text-[3rem] sm:text-[4rem] md:text-[4.1875rem] leading-tight", // 48 → 64 → 67px
    h2: "text-[2.5rem] sm:text-[3rem] md:text-[2.8125rem] leading-snug", // 40 → 48 → 45px
    h3: "text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] leading-snug", // 32 → 40 → 40px
    h4: "text-[1.75rem] sm:text-[2rem] md:text-[2rem] leading-normal", // 28 → 32px
    h5: "text-[1.5rem] sm:text-[1.625rem] md:text-[1.625rem] leading-normal", // 24 → 26px
    h6: "text-[1.25rem] sm:text-[1.375rem] md:text-[1.25rem] leading-normal", // 20px
  };

  const weights: Record<NonNullable<HeadingProps["weight"]>, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const aligns: Record<NonNullable<HeadingProps["align"]>, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const classes = cn(sizes[size], weights[weight], aligns[align], className);

  return (
    <Comp
      className={cn(classes, font === "serif" ? "font-serif" : "font-sans")}
      {...props}
    >
      {children}
    </Comp>
  );
}
