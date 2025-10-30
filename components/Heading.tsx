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

  const sizes: Record<HeadingLevel, string> = {
    h1: "text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.25rem] leading-tight",
    h2: "text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] leading-snug",
    h3: "text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] leading-snug",
    h4: "text-[1.25rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.125rem] leading-normal",
    h5: "text-[1.125rem] sm:text-[1.5rem] md:text-[1.625rem] lg:text-[1.75rem] leading-normal",
    h6: "text-[1rem] leading-normal",
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
