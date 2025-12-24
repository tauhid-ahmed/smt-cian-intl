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
        "flex items-center text-muted text-base",
        isActive && "is-active-link text-white rounded",
        className
      )}
    >
      {children}
    </Link>
  );
}
