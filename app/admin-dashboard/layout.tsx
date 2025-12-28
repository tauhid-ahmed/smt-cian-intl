import DashboardLayout from "@/components/adminDashboard/dashboard-layout";
import "@/styles/admin-dashboard.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import AuthProvider from "@/features/auth/provider/AuthProvider";
import RouteGuard from "@/components/auth/RouteGuard";

export default function AdminDashboardLayout({
    children,
}: React.PropsWithChildren) {
    return (
        <AuthProvider>
            <RouteGuard allowedRoles={["SUPERADMIN"]} redirectTo="/">
                <DashboardLayout>
                    <Suspense>{children}</Suspense>
                    <Toaster
                        position="top-right"
                        richColors={true}
                        theme="dark"
                        closeButton={true}
                    />
                </DashboardLayout>
            </RouteGuard>
        </AuthProvider>
    );
}
