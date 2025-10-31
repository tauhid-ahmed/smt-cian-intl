"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

interface CustomTabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: "default" | "underline" | "pills" | "bordered";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  scrollable?: boolean;
}

interface CustomTabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: "default" | "underline" | "pills" | "bordered";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

interface CustomTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: string; // required for Radix
  variant?: "default" | "underline" | "pills" | "bordered";
  size?: "sm" | "md" | "lg";
}

interface CustomTabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  value: string; // required for Radix
  size?: "sm" | "md" | "lg";
}

// ---------------- CustomTabs Root ----------------
const CustomTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  CustomTabsProps
>(
  (
    {
      variant = "default",
      size = "md",
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const searchParams = useSearchParams();
    const tabFromUrl = searchParams.get("tab") || undefined;

    return (
      <TabsPrimitive.Root
        ref={ref}
        className={cn("w-full", className)}
        value={tabFromUrl}
        {...props}
      />
    );
  }
);
CustomTabs.displayName = "CustomTabs";

// ---------------- CustomTabs List ----------------
const CustomTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  CustomTabsListProps
>(
  (
    {
      variant = "default",
      size = "md",
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      // ✅ Added responsive wrapping only for small screens
      "inline-flex sm:flex-nowrap flex-wrap items-center justify-start rounded-[10px] bg-muted p-1";
    const variantStyles = {
      default: "bg-muted",
      underline: "border-b border-border bg-transparent p-0",
      pills: "gap-2 bg-transparent p-0",
      bordered: "border gap-5 border-white bg-transparent p-[5px]",
    };
    const sizeStyles = { sm: "h-8", md: "h-fit sm:h-12", lg: "h-12" };

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    );
  }
);
CustomTabsList.displayName = "CustomTabsList";

// ---------------- CustomTabs Trigger ----------------
const CustomTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  CustomTabsTriggerProps
>(
  (
    { value, variant = "default", size = "md", className, children, ...props },
    ref
  ) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("tab", value);
    const href = `${pathname}?${currentParams.toString()}`;

    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-[5px] font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default:
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      underline:
        "border-b-2 border-transparent text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",
      pills:
        "bg-muted text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full",
      bordered:
        "text-white/85 data-[state=active]:bg-[#262626] data-[state=active]:text-white bg-transparent",
    };

    const sizeStyles = {
      sm: "px-3 py-1 text-xs",
      md: "p-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <TabsPrimitive.Trigger
        asChild
        ref={ref}
        value={value} // required for Radix
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}>
        <Link href={href}>{children}</Link>
      </TabsPrimitive.Trigger>
    );
  }
);
CustomTabsTrigger.displayName = "CustomTabsTrigger";

// ---------------- CustomTabs Content ----------------
const CustomTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  CustomTabsContentProps
>(({ value, size = "md", className, ...props }, ref) => {
  const sizeStyles = { sm: "mt-2", md: "mt-8", lg: "mt-10" };

  return (
    <TabsPrimitive.Content
      ref={ref}
      value={value}
      className={cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
});
CustomTabsContent.displayName = "CustomTabsContent";

export { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent };
