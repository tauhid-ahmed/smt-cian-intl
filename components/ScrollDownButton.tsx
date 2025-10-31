"use client";

import { LucideChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollDownButton() {
  return (
    <div className="flex items-center flex-col mt-12">
      <span>Scroll to explore</span>
      <Button
        size="icon"
        variant="ghost"
        className="animate-bounce mt-2"
        onClick={() => window.scrollBy({ top: 150, behavior: "smooth" })}
      >
        <LucideChevronDown />
      </Button>
    </div>
  );
}
