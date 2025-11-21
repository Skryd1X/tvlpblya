// src/components/ui/SiteModal.tsx
import type { ReactNode, MouseEvent } from "react";
import { useEffect } from "react";

interface SiteModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function SiteModal({
  isOpen,
  title,
  onClose,
  children,
  footer,
}: SiteModalProps) {
  // Закрытие по ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    // Закрываем только если клик именно по подложке, а не по контенту
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/8 bg-[#0c101c] shadow-2xl">
        <div className="flex items-center justify-between gap-4 px-5 pt-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:bg-white/5"
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-4 text-sm text-slate-100 space-y-2 max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 px-5 pb-4 pt-1">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
