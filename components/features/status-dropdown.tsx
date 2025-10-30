"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StatusDropdownProps {
  status: string | number
  options: Array<{ value: string; label: string; variant: "success" | "warning" | "error" | "info" }>
  onChange?: (newStatus: string) => void
  className?: string
}

export function StatusDropdown({ status, options, onChange, className }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentOption = options.find((opt) => opt.value === String(status))
  const variantStyles = {
    success: "bg-green-500/20 text-green-400 border-green-500/50",
    warning: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    error: "bg-red-500/20 text-red-400 border-red-500/50",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  }

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded border text-xs font-medium transition-colors",
          currentOption ? variantStyles[currentOption.variant] : "bg-gray-500/20 text-gray-400 border-gray-500/50",
        )}
      >
        {currentOption?.label || String(status)}
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-black border border-cyan-500/50 rounded-lg shadow-lg z-50 min-w-max">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange?.(option.value)
                setIsOpen(false)
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-cyan-500/10",
                String(status) === option.value ? "bg-cyan-500/20 text-cyan-400" : "text-gray-300",
                option.value === options[0].value && "rounded-t-lg",
                option.value === options[options.length - 1].value && "rounded-b-lg",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
