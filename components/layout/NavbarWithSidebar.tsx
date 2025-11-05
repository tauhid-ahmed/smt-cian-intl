"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useAuth } from "@/features/auth/provider/AuthProvider";
import MusicNav from "./MusicSidebar";
import { Input } from "../ui/input";
import { LucideSearch } from "lucide-react";

export default function NavbarWithSidebar() {
  const { openSignUp, openSignIn } = useAuth();

  return (
    <header className="bg-accent sticky top-0 z-50 shadow -mx-6 px-6">
      <Container>
        <nav className="py-3 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap items-center justify-between flex-1 gap-4">
            <div className="font-semibold text-2xl hidden lg:block flex-1 max-w-2xl w-full! relative">
              <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="rounded-full bg-sidebar max-w-2xl w-full pl-10"
              />
            </div>
            <div className="lg:opacity-0 lg:pointer-events-none lg:user-select-none flex flex-wrap items-center gap-2">
              <MusicNav />
              <Logo />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button size="sm" onClick={openSignUp}>
              Start Free Now
            </Button>
            <Button
              variant="ghost"
              weight="normal"
              size="sm"
              className="text-base"
              onClick={openSignIn}
            >
              Sign in
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
