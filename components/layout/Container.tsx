import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContainerElement = "div" | "section" | "article" | "main" | "aside";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  padding?: "fluid" | "fixed";
  as?: ContainerElement;
}

export default function Container({
  children,
  className = "",
  padding = "fluid",
  as: Component = "div",
}: ContainerProps) {
  const paddingClasses: Record<
    NonNullable<ContainerProps["padding"]>,
    string
  > = {
    fluid: "w-full padding-fluid",
    fixed: "w-full px-8",
  };

  return (
    <Component className={cn(paddingClasses[padding], className)}>
      {children}
    </Component>
  );
}
