import DashboardLayout from "@/components/adminDashboard/dashboard-layout";
import "@/styles/admin-dashboard.css";
export default function AdminDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
