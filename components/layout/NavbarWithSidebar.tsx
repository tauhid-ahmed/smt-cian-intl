"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import MobileNav from "./MobileNav";

export default function NavbarWithSidebar() {
  return (
    <header className="bg-accent sticky top-0 z-50 shadow">
      <Container>
        <nav className="py-3 flex justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <MobileNav />
            <Logo />
          </div>
          <div className="flex gap-4 justify-end">
            <Button size="sm" asChild>
              <Link href="/">Start Free Now</Link>
            </Button>
            <Button
              variant="ghost"
              weight="normal"
              size="sm"
              className="text-base"
              asChild
            >
              <Link href="/">Sign in</Link>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
