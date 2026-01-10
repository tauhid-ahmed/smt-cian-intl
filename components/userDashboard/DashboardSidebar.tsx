"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  PanelLeft,
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Star,
  CreditCard,
  Truck,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";

const DashboardSidebar = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveringLogo, setHoveringLogo] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    { icon: LayoutDashboard, label: "Overview", href: "/user-dashboard" },
    { icon: ShoppingBag, label: "Orders", href: "/user-dashboard/orders" },
    { icon: Heart, label: "Wishlist", href: "/user-dashboard/wishlist" },
    { icon: Star, label: "Reviews", href: "/user-dashboard/reviews" },
    {
      icon: CreditCard,
      label: "Subscriptions",
      href: "/user-dashboard/subscriptions",
    }, 
    {
      icon: Users,
      label: "Donor Portal",
      href: "/user-dashboard/donor-portal",
    },
    { icon: Settings, label: "Settings", href: "/user-dashboard/settings" },
  ];

  const handleLogout = () => {
    console.log("Logout Successful.");
    alert("Logout Successful")
  };

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } flex flex-col justify-between border-r border-[#1A1A1A] transition-all duration-300 bg-[#1A1A1A] h-screen`}
    >
      <div className="flex flex-col gap-6 px-3 pt-4">
        {/* Branding + Toggle */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {/* Single logo block */}
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => collapsed && setHoveringLogo(true)}
            onMouseLeave={() => collapsed && setHoveringLogo(false)}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={90}
                height={90}
                priority
                className={`transition-all duration-200 ${
                  collapsed ? "w-8 h-8" : "w-24 h-auto"
                }`}
                style={{ height: "auto" }}
              />
            </Link>

            {/* Expand button when collapsed */}
            {collapsed && (
              <button
                onClick={() => {
                  setCollapsed(false);
                  setHoveringLogo(false);
                }}
                className={`absolute inset-0 flex items-center justify-center rounded-md transition-opacity duration-200 cursor-e-resize ${
                  hoveringLogo ? "opacity-100" : "opacity-0"
                }`}
              >
                <PanelLeft className="w-5 h-5 text-white" />
              </button>
            )}
          </div>

          {/* Collapse button when expanded */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-md hover:bg-gray-200/10 transition cursor-e-resize"
            >
              <PanelLeft className="w-6 h-6 text-gray-300" />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1 mt-6">
          {items.map((item, i) => {
            const active = isActive(item.href);

            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center ${
                  collapsed ? "justify-center py-2" : "gap-3 px-3 py-2"
                } rounded-lg transition-all duration-200
                ${
                  active
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-700 text-gray-400"
                }`}
              >
                <item.icon
                  className={`w-6 h-6 ${
                    active ? "text-white" : "text-gray-400"
                  }`}
                />
                {!collapsed && (
                  <span
                    className={`text-base font-medium ${
                      active ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            collapsed ? "justify-center py-2" : "gap-3 px-3 py-2"
          } rounded-lg transition-all duration-200 hover:bg-gray-700 text-gray-400`}
        >
          <LogOut className="w-6 h-6 text-gray-400" />
          {!collapsed && (
            <span className="text-base font-medium text-gray-400">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
