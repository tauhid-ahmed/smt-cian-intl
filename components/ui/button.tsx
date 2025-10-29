import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-white bg-transparent hover:bg-transparent shadow-xs hover:bg-white hover:text-primary-foreground",
        secondary: "bg-white text-secondary hover:bg-white/80",
        accent: "bg-accent text-white hover:bg-accent/80",
        ghost: "hover:bg-transparent text-muted hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9.5 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-11 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-13.5 rounded-md px-12 has-[>svg]:px-4",
        text: "px-2 py-1.5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      shape: {
        default: "rounded",
        pill: "rounded-full",
      },
      weight: {
        default: "font-bold",
        bold: "font-normal",
      },
      text: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-lg",
        base: "text-base",
      },
      width: {
        responsive: "w-full md:w-45",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
      weight: "default",
      text: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  shape,
  weight,
  text,
  width,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, shape, weight, text, width, className })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
