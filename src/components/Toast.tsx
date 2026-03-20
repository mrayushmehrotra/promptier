"use client";

import { Check } from "lucide-react";

interface ToastProps {
  show: boolean;
  message?: string;
}

export function Toast({ show, message = "Prompt copied to clipboard!" }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl shadow-2xl border border-accent/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-accent rounded-full p-1">
        <Check className="w-4 h-4 text-white" />
      </div>
      <p className="font-medium text-sm">{message}</p>
    </div>
  );
}