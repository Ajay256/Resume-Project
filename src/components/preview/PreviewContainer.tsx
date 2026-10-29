"use client";

import React, { useEffect, useRef, useState } from "react";
import { Resume } from "@/lib/schema";
import { useResumeStore } from "@/lib/store";
import { getTemplate } from "@/templates/registry";
import { printResume } from "@/lib/pdf";
import { useFitToPage } from "@/lib/fit-to-page";
import { TemplatePicker } from "./TemplatePicker";
import { PrintPortal } from "./PrintPortal";

interface PreviewContainerProps {
  resume: Resume;
  accent: string;
}

export function PreviewContainer({ resume, accent }: PreviewContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);
  const [autoFit, setAutoFit] = useState(true);

  const currentTemplateId = useResumeStore((state) => state.template);
  const contentScale = useResumeStore((state) => state.contentScale);
  const setContentScale = useResumeStore((state) => state.setContentScale);

  const activeTemplateConfig = getTemplate(currentTemplateId);
  const TemplateComponent = activeTemplateConfig.component;

  // Fit to page hook measuring #resume-document height against 1123px
  const { isOverflowing, overflowPx, fitToOnePage, resetScale } = useFitToPage(
    "resume-document",
    contentScale,
    setContentScale,
    [resume, currentTemplateId, accent]
  );

  // Auto-scale to fit available container width
  useEffect(() => {
    if (!autoFit) return;

    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 32;
        if (availableWidth > 0) {
          const calculatedScale = Math.min(
            1.05,
            Math.max(0.35, availableWidth / 794)
          );
          setScale(Number(calculatedScale.toFixed(3)));
        }
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [autoFit]);

  const handleManualZoom = (delta: number) => {
    setAutoFit(false);
    setScale((prev) =>
      Math.min(1.4, Math.max(0.4, Number((prev + delta).toFixed(2))))
    );
  };

  const handlePrint = () => {
    printResume(resume?.personal?.name);
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `${resume.personal.name ? resume.personal.name.toLowerCase().replace(/\s+/g, "-") : "resume"}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Clean portal directly on document.body for unclipped, exact A4 print output */}
      <PrintPortal>
        <TemplateComponent
          resume={resume}
          accent={accent}
          contentScale={contentScale}
        />
      </PrintPortal>

      {/* Visual Template & Color Picker */}
      <TemplatePicker />

      {/* Overflow Warning Banner */}
      {isOverflowing && (
        <div className="no-print bg-amber-50 border border-amber-300 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <div>
              <span className="font-bold">Content exceeds 1 page</span>
              <span className="text-amber-700 ml-1.5 hidden sm:inline">
                (overflows by ~{overflowPx}px). Text may be clipped when
                exported.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fitToOnePage}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-xs transition"
            >
              Fit to one page
            </button>
            {contentScale < 1 && (
              <button
                type="button"
                onClick={resetScale}
                className="px-2.5 py-1.5 bg-white border border-amber-300 hover:bg-amber-100/50 text-amber-800 rounded-lg transition"
              >
                Reset sizing ({Math.round(contentScale * 100)}%)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preview Action Toolbar */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Preview:</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
            {activeTemplateConfig.name} (794×1123 px A4)
          </span>

          {/* Sizing Indicator & Fit Action */}
          {contentScale < 1 ? (
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium text-[11px]">
                Font scale: {Math.round(contentScale * 100)}%
              </span>
              <button
                type="button"
                onClick={resetScale}
                className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                title="Reset font scale to 100%"
              >
                Reset
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={fitToOnePage}
              className="text-[11px] text-slate-500 hover:text-indigo-600 font-medium pl-1 hidden sm:inline"
            >
              Auto-fit sizing
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-fit container toggle */}
          <button
            type="button"
            onClick={() => setAutoFit(true)}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              autoFit
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Fit Width
          </button>

          {/* Zoom In / Out */}
          <div className="flex items-center bg-slate-100 rounded-md p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => handleManualZoom(-0.05)}
              className="px-2 py-0.5 rounded hover:bg-white text-slate-700 font-bold"
              title="Zoom out"
            >
              −
            </button>
            <span className="w-12 text-center font-mono text-[11px] text-slate-700">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => handleManualZoom(0.05)}
              className="px-2 py-0.5 rounded hover:bg-white text-slate-700 font-bold"
              title="Zoom in"
            >
              +
            </button>
          </div>

          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportJSON}
            className="px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition"
          >
            Export JSON
          </button>

          {/* Download PDF button */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition flex items-center gap-1.5"
            title="Save as PDF via browser print"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Responsive Viewport */}
      <div
        ref={containerRef}
        className="flex-1 w-full bg-slate-200/60 rounded-2xl p-4 overflow-auto flex justify-center items-start border border-slate-300/80"
        style={{ minHeight: "680px" }}
      >
        <div
          className="print-area transition-transform duration-100 origin-top shadow-2xl rounded-sm"
          style={{
            transform: `scale(${scale})`,
            marginBottom: `${1123 * scale - 1123 + 24}px`,
          }}
        >
          <TemplateComponent
            resume={resume}
            accent={accent}
            contentScale={contentScale}
          />
        </div>
      </div>
    </div>
  );
}
