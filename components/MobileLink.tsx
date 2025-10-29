"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  exact?: boolean;
} & React.ComponentProps<"a">;
export default function MobileLink({
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
        "flex items-center text-muted text-base px-4 py-2 hover:text-white",
        isActive && "is-active-link text-white bg-secondary rounded",
        className
      )}
    >
      {children}
    </Link>
  );
}
