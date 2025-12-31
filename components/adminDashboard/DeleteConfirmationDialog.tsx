// DeleteConfirmationDialog.tsx
import React, { useEffect } from "react";

export type DeleteConfirmationDialogProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  dangerLevel?: "low" | "medium" | "high";
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
  overlayClassName?: string;
  dialogClassName?: string;
};

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  dangerLevel = "high",
  onConfirm,
  onCancel,
  className = "",
  overlayClassName = "",
  dialogClassName = "",
}) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const getDangerStyles = () => {
    switch (dangerLevel) {
      case "low":
        return {
          text: "text-yellow-500",
          icon: "text-yellow-400",
          bg: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500/30",
          border: "border-yellow-500/40",
          iconBg: "bg-yellow-500/10 ring-1 ring-yellow-500/20",
        };
      case "medium":
        return {
          text: "text-orange-500",
          icon: "text-orange-400",
          bg: "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500/30",
          border: "border-orange-500/40",
          iconBg: "bg-orange-500/10 ring-1 ring-orange-500/20",
        };
      case "high":
      default:
        return {
          text: "text-red-500",
          icon: "text-red-400",
          bg: "bg-red-500 hover:bg-red-600 focus:ring-red-500/30",
          border: "border-red-500/40",
          iconBg: "bg-red-500/10 ring-1 ring-red-500/20",
        };
    }
  };

  const dangerStyles = getDangerStyles();

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/60 backdrop-blur-sm transition-all duration-200
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        ${overlayClassName}
      `}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      aria-hidden={!isOpen}>
      <div
        className={`
          relative w-full max-w-xs min-w-[360px]
          bg-[#18181b] backdrop-blur-md rounded-lg
          border border-zinc-800 shadow-xl shadow-black/30
          transform transition-all duration-200 ease-out
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          ${className}
        `}
        onClick={handleDialogClick}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />

        <div className="relative p-4">
          <div className="flex justify-center mb-3">
            <div
              className={`
                flex items-center justify-center p-2 rounded-full
                ${dangerStyles.iconBg}
                ${isLoading ? "animate-pulse" : ""}
              `}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-8 h-8 ${dangerStyles.icon}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-4">
            <h2
              className={`text-lg font-semibold mb-1.5 ${dangerStyles.text}`}
              id="delete-dialog-title">
              {title}
            </h2>
            <p
              className="text-sm text-zinc-300 leading-relaxed px-1"
              id="delete-dialog-description">
              {message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              className={`
                flex-1 px-3 py-2 rounded-md font-medium text-sm
                transition-all duration-150
                bg-zinc-800 hover:bg-zinc-700
                text-zinc-200
                border border-zinc-700
                hover:shadow-md
                disabled:opacity-50 disabled:cursor-not-allowed
                ${dialogClassName}
              `}
              onClick={onCancel}
              disabled={isLoading}
              type="button">
              {cancelText}
            </button>

            <button
              className={`
                flex-1 px-3 py-2 rounded-md font-medium text-sm
                transition-all duration-150
                text-white
                ${dangerStyles.bg}
                border ${dangerStyles.border}
                hover:shadow-md
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-1.5
              `}
              onClick={onConfirm}
              disabled={isLoading}
              type="button">
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Deleting...</span>
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-zinc-800/60">
            <p className="text-xs text-zinc-400 text-center">
              Press{" "}
              <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-xs">ESC</kbd>{" "}
              to cancel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
