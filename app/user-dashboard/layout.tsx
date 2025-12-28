"use client";

import DashboardSidebar from "@/components/userDashboard/DashboardSidebar";
import DashboardTopNav from "@/components/userDashboard/DashboardTopNav";
import RouteGuard from "@/components/auth/RouteGuard";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RouteGuard allowedRoles={["USER", "SUPERADMIN"]} redirectTo="/">
      <div className="h-screen flex bg-black overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="shrink-0">
            <DashboardTopNav />
          </div>
          <main className="flex-1 overflow-y-auto">
            <div className="min-h-full">{children}</div>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}