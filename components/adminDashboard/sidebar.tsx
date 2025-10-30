"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  ShoppingCart,
  Gift,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    icon: BarChart3,
    label: "Analytics & Insights",
    href: "/",
    id: "analytics",
  },
  {
    icon: FileText,
    label: "Content Management",
    href: "/content",
    id: "content",
  },
  {
    icon: ShoppingCart,
    label: "E-commerce Management",
    href: "/ecommerce",
    id: "ecommerce",
  },
  {
    icon: Gift,
    label: "Donation Management",
    href: "/donation",
    id: "donation",
  },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("analytics");

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
        <div className="p-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-2 space-y-2 py-6 mt-11">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2 py-3 rounded-lg transition-all duration-200",
                  activeItem === item.id
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
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
