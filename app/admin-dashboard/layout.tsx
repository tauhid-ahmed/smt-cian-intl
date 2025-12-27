import DashboardLayout from "@/components/adminDashboard/dashboard-layout";
import "@/styles/admin-dashboard.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import AuthProvider from "@/features/auth/provider/AuthProvider";
export default function AdminDashboardLayout({
    children,
}: React.PropsWithChildren) {
    return (
        <AuthProvider>
            <DashboardLayout>
                <Suspense>{children}</Suspense>
                <Toaster
                    position="top-right"
                    richColors={true}
                    theme="dark"
                    closeButton={true}
                />
            </DashboardLayout>
        </AuthProvider>
    );
}
