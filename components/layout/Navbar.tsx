"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { Lily_Script_One } from "next/font/google";
import LocaleSwitcher from "@/components/LocaleSwitch";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { LucideChevronDown, LucideHome } from "lucide-react";
import { webPaths } from "@/paths";
import { cn } from "@/lib/utils";
import WebSearch from "@/features/search/components/SearchWidget";
import { AppIcon } from "../Icons";
import { CurrencySelector } from "../MultiCurrency";

const lily = Lily_Script_One({ subsets: ["latin"], weight: "400" });

const NAV_ITEMS = [
  {
    name: "HOTELS",
    href: webPaths,
    title: "Hotels, Apartments & Lodge",
  },
  {
    name: "ACTIVITIES",
    href: webPaths,
    title: "Activities Deals",
  },
  { name: "TOURS", href: webPaths, title: "Tours & Eco Tourism" },
  {
    name: "TRANSPORTATION",
    href: webPaths,
    title: "Transportation & Travel Service",
  },
  {
    name: "MEETINGS",
    href: webPaths,
    title: "Business Meetings",
  },
  { name: "TRAVELS", href: webPaths, title: "Travel Deals" },
  {
    name: "NOSY BE",
    href: webPaths,
    title: "Nosy Be Destination",
  },
];

export default function Navbar() {
  return (
    <header>
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className={`${lily.className} text-2xl font-bold`}>
              <span className="text-green-600">Afuno</span>
              <span className="text-orange-400">Tec</span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex items-center flex-1 max-w-96">
              <WebSearch />
            </div>

            <AppIcon />

            {/* Right Side Icons & Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* My Account */}
              <Button variant="ghost">
                <FaRegUserCircle className="text-xl" />
                <span className="hidden sm:inline text-sm">My Account</span>
                <LucideChevronDown />
              </Button>

              <span className="text-gray-300 hidden sm:inline">|</span>

              {/* Locale Switcher */}
              <div className="hidden sm:block">
                <LocaleSwitcher />
              </div>
              <div className="hidden sm:block">
                <CurrencySelector />
              </div>

              <span className="text-gray-300 hidden sm:inline">|</span>

              {/* Wishlist & Cart */}
              <button
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Wishlist"
              >
                <CiHeart className="text-2xl" />
              </button>
              <button
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Shopping cart"
              >
                <AiOutlineShoppingCart className="text-2xl" />
              </button>

              {/* Gift Card Link */}
              <Link
                href="/gift-card"
                className="text-[#007ADF] text-sm font-semibold hover:underline hidden md:inline"
              >
                Gift Card
              </Link>

              {/* Holiday Offers Button */}
              <Link
                href="#"
                className="bg-[#1BA0E2] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1890C8] transition-colors hidden md:inline-block"
              >
                Holiday Offers
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-2xl text-gray-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4">
            <WebSearch />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Menu */}
      <nav className="bg-primary-500 text-white relative">
        <Container size="lg">
          {/* Desktop Menu */}

          <ul className="hidden lg:flex items-center relative">
            <li className="relative group">
              <Link
                href={"/"}
                className={cn(
                  "block px-6 py-4 transition-colors font-semibold hover:text-green-200"
                )}
              >
                <LucideHome className="text-2xl" />
              </Link>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative group flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "block px-6 py-4 transition-colors font-semibold",
                    isActive(item.href) ? "bg-green-600" : "hover:bg-green-600"
                  )}
                >
                  {item.name}
                </Link>
                {/* Tooltip */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.title}
                </span>
                <div className="h-6 w-px bg-gray-100"></div>
              </li>
            ))}

            {/* ✅ More Section (Full-Width Expandable Panel) */}
            <li className="relative" ref={dropdownRef}>
              {/* Dropdown Trigger */}
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={cn(
                  "flex items-center gap-1 px-6 py-4 font-semibold transition-colors",
                  moreDropdownOpen ? "bg-green-900" : "hover:bg-green-600"
                )}
              >
                MORE
                <LucideChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    moreDropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {moreDropdownOpen && (
                <ul className="absolute left-0 mt-1 w-60 bg-green-500 text-white rounded-md shadow-lg z-50">
                  {MORE_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block p-4 text-lg hover:bg-green-600 transition-colors rounded"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile Menu (unchanged) */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-2">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 rounded transition-colors",
                        isActive(item.href)
                          ? "bg-green-900"
                          : "hover:bg-green-600"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                {/* More Items in Mobile */}
                <li className="pt-2 border-t border-green-600">
                  <div className="px-4 py-2 text-xs font-semibold text-green-200">
                    MORE
                  </div>
                  <ul className="space-y-1">
                    {MORE_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 hover:bg-green-600 rounded transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Mobile-only actions */}
                <li className="pt-2 border-t border-green-600 space-y-2">
                  <Link
                    href="/gift-card"
                    className="block px-4 py-2 text-center bg-[#007ADF] hover:bg-[#0068C0] rounded transition-colors"
                  >
                    Gift Card
                  </Link>
                  <Link
                    href="/offers"
                    className="block px-4 py-2 text-center bg-[#1BA0E2] hover:bg-[#1890C8] rounded transition-colors"
                  >
                    Holiday Offers
                  </Link>
                  <div className="flex gap-2 items-center justify-center">
                    <LocaleSwitcher />
                    <CurrencySelector />
                  </div>
                </li>
              </ul>
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
}
