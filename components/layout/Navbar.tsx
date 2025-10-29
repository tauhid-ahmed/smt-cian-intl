"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { marketingNavbarData } from "@/paths";
import Logo from "../Logo";
import ActiveLink from "../ActiveLink";
import MobileNav from "./MobileNav";
import { LucideHome } from "lucide-react";

export default function () {
  return (
    <header className="bg-accent sticky top-0 z-50 shadow">
      <Container>
        <nav className="py-4 flex">
          <div className="flex-1 flex items-center gap-4">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <Logo />
          </div>
          <div className="hidden lg:flex justify-center">
            <ul className="flex items-center gap-6">
              {marketingNavbarData.map((item) => {
                return (
                  <li key={item.path()}>
                    <ActiveLink href={item.path()}>{item.title}</ActiveLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex-1 flex gap-4 justify-end">
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
