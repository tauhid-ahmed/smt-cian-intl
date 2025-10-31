import DashboardLayout from "@/components/adminDashboard/dashboard-layout";
import "@/styles/admin-dashboard.css";
import { Toaster } from "@/components/ui/sonner";
export default function AdminDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <DashboardLayout>
      {children}
      <Toaster
        position="top-right"
        richColors={true}
        theme="dark"
        closeButton={true}
      />
    </DashboardLayout>
  );
}
