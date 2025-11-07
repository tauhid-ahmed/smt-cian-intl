import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap font-medium transition-all cursor-pointer outline-none " +
  "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring " +
  "disabled:opacity-50 disabled:pointer-events-none leading-none " +
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-white bg-transparent hover:bg-white hover:text-primary-foreground shadow-xs",
        secondary: "bg-white text-secondary hover:bg-white/80",
        accent: "bg-accent text-white hover:bg-accent/80",
        ghost: "text-muted hover:text-accent-foreground hover:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        sm: "h-7 px-2.5 text-xs sm:h-8 sm:px-3",
        md: "h-9 px-4 text-xs sm:px-6 sm:text-sm md:h-10 md:px-8 lg:px-10",
        lg: "h-10 px-6 text-sm sm:px-8 md:h-11 md:text-base lg:h-12 lg:px-10",
        xl: "h-11 px-8 text-sm sm:px-10 sm:text-base md:h-12 md:px-12 lg:h-13.5 lg:text-lg",
        icon: "size-8 sm:size-9",
        "icon-sm": "size-7 sm:size-8",
        "icon-lg": "size-9 sm:size-10 md:size-11",
      },

      shape: {
        default: "rounded",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        pill: "rounded-full",
        none: "rounded-none",
      },

      weight: {
        default: "font-bold",
        normal: "font-normal",
        semibold: "font-semibold",
      },

      width: {
        auto: "w-auto",
        responsive: "w-full sm:w-auto md:w-44",
        full: "w-full",
        fixed: "w-45!",
        xl: "w-full sm:w-auto md:w-[13.75rem]!",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "sm",
      weight: "default",
      width: "auto",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  shape,
  weight,
  width,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, shape, weight, width }),
        className
      )}
      {...props}
    />
  );
}

export { buttonVariants };
