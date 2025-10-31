import DashboardLayout from "@/components/adminDashboard/dashboard-layout";
import "@/styles/admin-dashboard.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
export default function AdminDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <DashboardLayout>
      <Suspense>{children}</Suspense>
      <Toaster
        position="top-right"
        richColors={true}
        theme="dark"
        closeButton={true}
      />
    </DashboardLayout>
  );
}
