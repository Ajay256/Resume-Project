"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialResume, Resume } from "@/lib/schema";
import { TemplateId } from "@/lib/store";
import { templates, getTemplate } from "@/templates/registry";
import { printResume } from "@/lib/pdf";
import { PrintPortal } from "@/components/preview/PrintPortal";

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("classic");
  const [accent, setAccent] = useState("#1e3a8a");
  const [zoom, setZoom] = useState(0.85);
  const [resume, setResume] = useState<Resume>(initialResume);

  const activeTemplate = getTemplate(selectedTemplate);
  const TemplateComponent = activeTemplate.component;

  const handleTemplateChange = (id: TemplateId) => {
    setSelectedTemplate(id);
    const config = getTemplate(id);
    setAccent(config.defaultAccent);
  };

  const toggleExperience = () => {
    setResume((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        showExperience: !(prev.settings?.showExperience ?? true),
      },
    }));
  };

  const handlePrint = () => {
    printResume(resume?.personal?.name);
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-100 pb-16">
      {/* Clean portal directly on document.body for unclipped, exact A4 print output */}
      <PrintPortal>
        <TemplateComponent resume={resume} accent={accent} />
      </PrintPortal>

      {/* Control bar */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-16 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Template Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleTemplateChange(tpl.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  selectedTemplate === tpl.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tpl.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Accent Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Accent:</span>
              <div className="flex items-center gap-1">
                {activeTemplate.accentPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setAccent(preset.value)}
                    className={`w-6 h-6 rounded-full border-2 transition ${
                      accent === preset.value
                        ? "border-slate-800 scale-110 shadow-sm"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: preset.value }}
                    title={preset.name}
                  />
                ))}
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-6 h-6 rounded border cursor-pointer ml-1 p-0 bg-transparent"
                  title="Custom Accent Color"
                />
              </div>
            </div>

            {/* Toggle Experience (for Classic, Modern, Minimal) */}
            {selectedTemplate !== "fresher" && (
              <button
                onClick={toggleExperience}
                className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                  resume.settings?.showExperience
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-slate-50 border-slate-300 text-slate-600"
                }`}
              >
                Experience:{" "}
                {resume.settings?.showExperience ? "Visible" : "Hidden"}
              </button>
            )}

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1">
              <button
                onClick={() =>
                  setZoom((z) => Math.max(0.4, Number((z - 0.05).toFixed(2))))
                }
                className="px-2 py-0.5 rounded hover:bg-slate-200 text-slate-700 font-bold"
                title="Zoom Out"
              >
                −
              </button>
              <span className="w-12 text-center font-mono text-slate-700">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() =>
                  setZoom((z) => Math.min(1.3, Number((z + 0.05).toFixed(2))))
                }
                className="px-2 py-0.5 rounded hover:bg-slate-200 text-slate-700 font-bold"
                title="Zoom In"
              >
                +
              </button>
            </div>

            {/* Download PDF button */}
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition shadow-sm flex items-center gap-1.5"
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

            <Link
              href="/builder"
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition"
            >
              Open in Builder →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 flex justify-center items-start pt-8 px-4 overflow-auto">
        <div
          className="print-area transition-transform origin-top"
          style={{
            transform: `scale(${zoom})`,
            marginBottom: `${1123 * zoom - 1123 + 32}px`,
          }}
        >
          <TemplateComponent resume={resume} accent={accent} />
        </div>
      </div>
    </div>
  );
}
