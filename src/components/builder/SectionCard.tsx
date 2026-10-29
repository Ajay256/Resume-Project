import React from "react";

interface SectionCardProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string | number;
  subtitle?: string;
  children: React.ReactNode;
}

export function SectionCard({
  title,
  isOpen,
  onToggle,
  badge,
  subtitle,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-900 text-sm">{title}</span>
          {badge !== undefined && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {subtitle && (
            <span className="text-xs text-slate-500 hidden sm:inline">
              {subtitle}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
