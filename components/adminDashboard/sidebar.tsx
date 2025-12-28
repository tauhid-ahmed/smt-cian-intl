"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  ShoppingCart,
  Gift,
  LogOut,
  X,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "../Logo";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    icon: BarChart3,
    label: "Analytics & Insights",
    href: "/admin-dashboard",
    id: "analytics",
  },
  {
    icon: FileText,
    label: "Content Management",
    href: "/admin-dashboard/content",
    id: "content",
  },
  {
    icon: ShoppingCart,
    label: "E-commerce Management",
    href: "/admin-dashboard/ecommerce",
    id: "ecommerce",
  },
  {
    icon: Gift,
    label: "Donation Management",
    href: "/admin-dashboard/donation",
    id: "donation",
  },
  {
    icon: Music,
    label: "Music Management",
    href: "/admin-dashboard/music-management",
    id: "music",
  },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative w-64 h-screen bg-[#1A1A1A] flex flex-col transition-transform duration-300 z-50 md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
        <div className="flex items-center justify-between sm:justify-center pt-4 sm:pt-8 px-4">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="md:hidden px-2 text-sidebar-foreground hover:bg-sidebar-accent">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-2 space-y-5 py-6 mt-6 md:mt-11 border-t sm:border-none border-[#f2f2f248]">
          {menuItems.map((item) => {
            const Icon = item.icon;

            // Determine active link logic
            let isActive = false;

            if (item.href === "/admin-dashboard") {
              // Only active on exact route "/admin-dashboard"
              isActive = pathname === item.href;
            } else {
              // Active if pathname starts with link (for subpages)
              isActive = pathname?.startsWith(item.href);
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-[#262626] text-white"
                    : "text-white/85 hover:bg-[#262626]"
                )}>
                <Icon className="w-6 h-6" />
                <span className="text-sm font-normal tracking-[0px]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button className="w-full flex justify-center items-center gap-2.5 px-2 py-3 rounded-lg transition-all duration-200 text-white hover:bg-[#262626]">
            <LogOut className="w-5 h-5 text-white" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
