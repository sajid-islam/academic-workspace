"use client";

import * as React from "react";
import { CheckCircle, WarningCircle, Info, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning" | "error";
}

interface ToastContextType {
  toasts: ToastMessage[];
  toast: (options: Omit<ToastMessage, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback(
    ({ title, description, type = "info" }: Omit<ToastMessage, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4 sm:p-0">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-200 animate-in slide-in-from-bottom-5",
              item.type === "success" &&
                "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
              item.type === "warning" &&
                "bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
              item.type === "error" &&
                "bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100",
              (!item.type || item.type === "info") &&
                "bg-background/95 border-border text-foreground"
            )}
          >
            <div className="mt-0.5 shrink-0">
              {item.type === "success" && (
                <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" weight="fill" />
              )}
              {item.type === "warning" && (
                <WarningCircle className="size-5 text-amber-600 dark:text-amber-400" weight="fill" />
              )}
              {item.type === "error" && (
                <WarningCircle className="size-5 text-rose-600 dark:text-rose-400" weight="fill" />
              )}
              {(!item.type || item.type === "info") && (
                <Info className="size-5 text-primary" weight="fill" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold">{item.title}</h5>
              {item.description && (
                <p className="mt-0.5 text-xs opacity-90 leading-relaxed">{item.description}</p>
              )}
            </div>

            <button
              onClick={() => dismiss(item.id)}
              className="shrink-0 rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
