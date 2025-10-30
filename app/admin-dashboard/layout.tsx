import DashboardLayout from "@/components/adminDashboard/dashboard-layout";

export default function AdminDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
