"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  PanelLeft,
  LayoutDashboard,
  FileText,
  Users,
  FolderKanban,
  Wallet,
  LogOut,
} from "lucide-react";

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

  // Updated Menu Items
  const items = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Transactions", href: "/transactions" },
    { icon: Users, label: "Accounts", href: "/accounts" },
    { icon: FolderKanban, label: "Projects", href: "/projects" },
    { icon: Wallet, label: "Withdrawals", href: "/withdrawals" },
  ];

  const handleLogout = () => {
    console.log("Logout Successful.");
    router.push("/signin");
  };

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } flex flex-col justify-between border-r border-gray-200 transition-all duration-300 bg-white h-screen`}
    >
      <div className="flex flex-col gap-6 px-3 pt-4">
        {/* Branding + Toggle */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => collapsed && setHoveringLogo(true)}
            onMouseLeave={() => collapsed && setHoveringLogo(false)}
          >
            {/* Logo */}
            <h1
              className={`w-9 h-9 text-white font-semibold text-lg bg-[#2d60ff] rounded-lg flex items-center justify-center shadow-md transition-opacity duration-200 ${
                hoveringLogo ? "opacity-0" : "opacity-100"
              }`}
            >
              A
            </h1>

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

          {/* Expanded header */}
          {!collapsed && (
            <div className="flex items-center justify-between w-full ml-2">
              <span className="text-lg font-bold text-black">ADMIN</span>
              <button
                onClick={() => setCollapsed(true)}
                className="p-1.5 rounded-md hover:bg-gray-200 transition cursor-e-resize"
              >
                <PanelLeft className="w-6 h-6 text-gray-800" />
              </button>
            </div>
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
                } rounded-lg transition
                ${active ? "bg-transparent" : "hover:bg-gray-200"}
                `}
              >
                <item.icon
                  className={`w-6 h-6 transition ${
                    active ? "text-[#2d60ff]" : "text-gray-600"
                  }`}
                />

                {!collapsed && (
                  <span
                    className={`text-base font-medium transition ${
                      active ? "text-[#2d60ff]" : "text-gray-700"
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
    </div>
  );
};

export default DashboardSidebar;
