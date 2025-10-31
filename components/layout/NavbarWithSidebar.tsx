"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useAuth } from "@/features/auth/provider/AuthProvider";
import { usePathname } from "next/navigation";
import MusicNav from "./MusicSidebar";

export default function NavbarWithSidebar() {
  const { openSignUp, openSignIn } = useAuth();
  const pathname = usePathname();
  return (
    <header className="bg-accent sticky top-0 z-50 shadow -mx-6 px-4">
      <Container>
        <nav className="py-3 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold self-start text-2xl hidden lg:block">
              {pathname === "/music" ? "Music" : "Download"}
            </span>
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
