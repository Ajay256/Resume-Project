"use client";

import dynamic from "next/dynamic";

const BuilderWorkspace = dynamic(
  () =>
    import("@/components/builder/BuilderWorkspace").then(
      (mod) => mod.BuilderWorkspace
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3 text-slate-500 text-sm font-medium">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading resume builder...</span>
        </div>
      </div>
    ),
  }
);

export default function BuilderPage() {
  return <BuilderWorkspace />;
}
