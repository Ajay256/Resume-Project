"use client";

import React from "react";
import { TemplateId, useResumeStore } from "@/lib/store";
import { templates, getTemplate } from "@/templates/registry";

export function TemplatePicker() {
  const currentTemplateId = useResumeStore((state) => state.template);
  const currentAccent = useResumeStore((state) => state.accent);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const setAccent = useResumeStore((state) => state.setAccent);

  const activeConfig = getTemplate(currentTemplateId);

  const handleSelectTemplate = (id: TemplateId) => {
    setTemplate(id);
    // If the template has default accents, optionally preserve current or adapt
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4 no-print">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Choose Template</h3>
          <p className="text-[11px] text-slate-500">
            Switch styles anytime. Your resume content is always preserved.
          </p>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
          {activeConfig.name} • {activeConfig.fontName}
        </span>
      </div>

      {/* Template Thumbnails Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {templates.map((tpl) => {
          const isSelected = tpl.id === currentTemplateId;

          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleSelectTemplate(tpl.id)}
              className={`p-2 rounded-xl border-2 text-left transition relative flex flex-col group ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/30 shadow-sm ring-2 ring-indigo-600/20"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white"
              }`}
            >
              {/* Mini Layout Thumbnail */}
              <div className="w-full aspect-[4/5] rounded-md bg-white border border-slate-200 p-1.5 shadow-xs overflow-hidden flex flex-col mb-2">
                {tpl.id === "classic" && (
                  <div className="w-full h-full flex flex-col justify-between p-1 bg-white">
                    <div className="text-center border-b border-slate-300 pb-1">
                      <div className="h-1.5 w-12 bg-slate-800 rounded-full mx-auto mb-1" />
                      <div className="h-1 w-16 bg-slate-400 rounded-full mx-auto" />
                    </div>
                    <div className="space-y-1.5 my-1">
                      <div className="h-1 w-8 bg-indigo-600 rounded-full" />
                      <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                      <div className="h-0.5 w-4/5 bg-slate-200 rounded-full" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 w-10 bg-indigo-600 rounded-full" />
                      <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                    </div>
                  </div>
                )}

                {tpl.id === "modern" && (
                  <div className="w-full h-full flex rounded overflow-hidden">
                    <div
                      className="w-1/3 h-full p-1 flex flex-col items-center"
                      style={{ backgroundColor: currentAccent }}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white/40 mb-1" />
                      <div className="w-4 h-0.5 bg-white/60 rounded-full mb-2" />
                      <div className="w-5 h-0.5 bg-white/40 rounded-full mb-1" />
                      <div className="w-5 h-0.5 bg-white/40 rounded-full" />
                    </div>
                    <div className="w-2/3 h-full p-1.5 flex flex-col justify-between bg-white">
                      <div>
                        <div className="h-1.5 w-10 bg-slate-800 rounded-full mb-1" />
                        <div className="h-1 w-14 bg-slate-300 rounded-full" />
                      </div>
                      <div className="space-y-1 my-1">
                        <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                        <div className="h-0.5 w-4/5 bg-slate-200 rounded-full" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 w-8 bg-blue-500 rounded-full" />
                        <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {tpl.id === "minimal" && (
                  <div className="w-full h-full flex flex-col p-1.5 bg-white justify-between">
                    <div className="border-b border-slate-200 pb-1">
                      <div className="h-1.5 w-14 bg-slate-900 rounded-full mb-1" />
                      <div className="h-0.5 w-10 bg-slate-400 rounded-full" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 my-1">
                      <div className="h-1 w-4 bg-slate-500 rounded-full" />
                      <div className="col-span-2 space-y-1">
                        <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                        <div className="h-0.5 w-3/4 bg-slate-200 rounded-full" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="h-1 w-5 bg-slate-500 rounded-full" />
                      <div className="col-span-2 space-y-1">
                        <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {tpl.id === "fresher" && (
                  <div className="w-full h-full flex flex-col rounded overflow-hidden bg-white">
                    <div
                      className="w-full h-1/4 p-1 flex flex-col items-center justify-center text-white"
                      style={{ backgroundColor: currentAccent }}
                    >
                      <div className="h-1.5 w-10 bg-white rounded-full mb-0.5" />
                      <div className="h-0.5 w-14 bg-white/70 rounded-full" />
                    </div>
                    <div className="p-1.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                        <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="w-2.5 h-2.5 rounded bg-indigo-500 shrink-0" />
                        <div className="space-y-0.5 flex-1">
                          <div className="h-0.5 w-full bg-slate-300 rounded-full" />
                          <div className="h-0.5 w-2/3 bg-slate-200 rounded-full" />
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="w-2.5 h-2.5 rounded bg-indigo-500 shrink-0" />
                        <div className="space-y-0.5 flex-1">
                          <div className="h-0.5 w-full bg-slate-300 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Font */}
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition">
                  {tpl.name}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-indigo-200" />
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5">
                {tpl.fontName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Accent Color Palette */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Accent:</span>
          <div className="flex items-center gap-1.5">
            {activeConfig.accentPresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setAccent(preset.value)}
                className={`w-6 h-6 rounded-full border-2 transition ${
                  currentAccent === preset.value
                    ? "border-slate-900 scale-110 shadow-sm"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: preset.value }}
                title={`${preset.name} (${preset.value})`}
              />
            ))}

            <div className="flex items-center gap-1 pl-1.5 ml-1 border-l border-slate-200">
              <span className="text-slate-400 text-[11px]">Custom:</span>
              <input
                type="color"
                value={currentAccent}
                onChange={(e) => setAccent(e.target.value)}
                className="w-6 h-6 rounded border cursor-pointer p-0 bg-transparent"
                title="Select any custom hex color"
              />
            </div>
          </div>
        </div>

        <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {currentAccent.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
