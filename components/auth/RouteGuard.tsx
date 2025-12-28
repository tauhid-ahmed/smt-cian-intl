"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/lib/api/authApi";

type AllowedRole = "USER" | "SUPERADMIN";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: AllowedRole[];
  redirectTo?: string;
}

export default function RouteGuard({
  children,
  allowedRoles,
  redirectTo = "/",
}: RouteGuardProps) {
  const router = useRouter();
  const { data: meData, isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (!isLoading) {
      // If there's an error or no user data, redirect
      if (isError || !meData?.data) {
        router.push(redirectTo);
        return;
      }

      const userRole = meData.data.role;

      // Check if user role is in allowed roles
      if (!allowedRoles.includes(userRole)) {
        router.push(redirectTo);
        return;
      }
    }
  }, [meData, isLoading, isError, allowedRoles, router, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If error or no user, don't render children (redirect will happen)
  if (isError || !meData?.data) {
    return null;
  }

  const userRole = meData.data.role;

  // If user role is not allowed, don't render children (redirect will happen)
  if (!allowedRoles.includes(userRole)) {
    return null;
  }

  // User is authenticated and has correct role
  return <>{children}</>;
}

