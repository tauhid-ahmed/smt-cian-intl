"use client";

import { Header } from "@/components/adminDashboard/header";
import { Sidebar } from "@/components/adminDashboard/sidebar";
import { useState } from "react";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-background text-foreground w-full">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
