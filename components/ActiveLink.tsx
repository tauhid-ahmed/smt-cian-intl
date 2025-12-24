"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  exact?: boolean;
} & React.ComponentProps<"a">;

export default function ActiveLink({
  href = "",
  className,
  children,
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center text-muted text-base",

        "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#FFDA2A] after:transition-all after:duration-300",
        "hover:after:w-full",

        isActive && "is-active-link text-white rounded after:w-full",

        className
      )}
    >
      {children}
    </Link>
  );
}
