import { cn } from "@/lib/utils"

export interface StatusBadgeProps {
  status: string
  variant?: "success" | "warning" | "error" | "info" | "default"
  className?: string
}

export function StatusBadge({ status, variant = "default", className }: StatusBadgeProps) {
  const variants = {
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warning: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className,
      )}
    >
      {status}
    </span>
  )
}
