"use client"

import type { ReactNode } from "react"
import { Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => ReactNode
  className?: string
}

export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onAction?: (row: T) => void
  onStatusChange?: (row: T, newStatus: string) => void
  rowKey: keyof T
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  currentPage,
  totalPages,
  onPageChange,
  onAction,
  onStatusChange,
  rowKey,
}: TableProps<T>) {
  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <div className="  rounded-lg bg-black">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white bg-black/80">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                {onAction && (
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + (onAction ? 1 : 0)} className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-2 w-2 bg-white-400 rounded-full animate-pulse"></div>
                      <div
                        className="h-2 w-2 bg-white-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-white-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <span className="text-gray-400 ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (onAction ? 1 : 0)} className="px-6 py-8 text-center text-gray-400">
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={String(row[rowKey])}
                    className="border-b border-white hover:bg-white-500/5 transition-colors"
                  >
                    {columns.map((column) => (
                      <td key={String(column.key)} className={cn("px-6 py-4 text-sm text-gray-200", column.className)}>
                        {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                      </td>
                    ))}
                    {onAction && (
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => onAction(row)}
                          className="text-gray-400 hover:text-white-400 transition-colors p-1"
                          aria-label="View details"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-8">
            <div className="h-2 w-2 bg-white-400 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-white-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 bg-white-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            <span className="text-gray-400 ml-2">Loading...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No data available</div>
        ) : (
          data.map((row) => (
            <div key={String(row[rowKey])} className="border border-white-500/50 rounded-lg bg-black p-4 space-y-3">
              {columns.map((column) => (
                <div key={String(column.key)} className="flex justify-between items-start gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{column.label}</span>
                  <span className="text-sm text-gray-200 text-right">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                  </span>
                </div>
              ))}
              {onAction && (
                <div className="flex justify-end pt-2 border-t border-white-500/20">
                  <button
                    onClick={() => onAction(row)}
                    className="text-gray-400 hover:text-white-400 transition-colors p-1"
                    aria-label="View details"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 px-2">
        <span className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "p-2 rounded border transition-colors",
              currentPage === 1
                ? "border-gray-700 text-gray-600 cursor-not-allowed"
                : "border-white-500/50 text-white hover:bg-white-500/10",
            )}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "p-2 rounded border transition-colors",
              currentPage === totalPages
                ? "border-gray-700 text-gray-600 cursor-not-allowed"
                : "border-white-500/50 text-white-400 hover:bg-white-500/10",
            )}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
