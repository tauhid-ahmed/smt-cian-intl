import type React from "react"
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-screen bg-background">{children}</div>
}
