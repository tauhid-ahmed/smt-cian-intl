"use client";

import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-[#1A1A1A] px-6 lg:px-8 lg:min-h-[88px] min-h-[70px] flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden text-foreground hover:bg-secondary px-2.5"
      >
        <Menu className="w-5 h-5" />
      </Button>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              Sarah Mitchell
            </p>
            <p className="text-xs text-[#f2f2f2]">sarah.mitchell@gmail.com</p>
          </div>
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-secondary"
        >
          <Bell className="w-8! h-8!" />
        </Button>
      </div>
    </header>
  );
}
