"use client";

import React, { useState } from "react";
import Link from "next/link";
import { templates, getTemplate } from "@/templates/registry";
import { initialResume } from "@/lib/schema";
import { TemplateId, useResumeStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const setStoreTemplate = useResumeStore((state) => state.setTemplate);
  const setStoreAccent = useResumeStore((state) => state.setAccent);

  const [activeTab, setActiveTab] = useState<TemplateId>("classic");
  const selectedConfig = getTemplate(activeTab);
  const SelectedTemplateComponent = selectedConfig.component;

  const handleUseTemplate = (templateId: TemplateId, accentColor: string) => {
    setStoreTemplate(templateId);
    setStoreAccent(accentColor);
    router.push("/builder");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/30 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            100% Free • No Watermark • ATS-Friendly Single-Page A4
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Build Your Perfect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
              One-Page Resume
            </span>
            <br className="hidden sm:inline" /> Guaranteed to Fit A4
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Craft a polished, recruiter-ready resume in minutes. Choose from
            four meticulously calibrated templates with live preview, custom
            accent colors, and instant PDF download.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition duration-150 transform hover:-translate-y-0.5"
            >
              Build my resume — it&apos;s free
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-base hover:bg-slate-50 transition"
            >
              Explore 4 Templates
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Zero Watermarks
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              ATS-Optimized Formatting
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Standard A4 (794 × 1123 px)
            </span>
          </div>
        </div>
      </section>

      {/* ================= 2. TEMPLATE GALLERY WITH REAL PREVIEWS ================= */}
      <section
        id="templates"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/60 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four Recruiter-Approved Resume Templates
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Every layout is engineered to fit strictly on one page with
              optimal margins, clean hierarchy, and high-readability typography.
            </p>
          </div>

          {/* Template Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setActiveTab(tpl.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 shadow-xs ${
                  activeTab === tpl.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <span>{tpl.name}</span>
                <span className="text-[11px] opacity-70 font-normal">
                  ({tpl.fontName})
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Real Preview Showcase */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Template Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Featured Layout
                </span>
                <h3 className="text-3xl font-extrabold text-slate-900">
                  {selectedConfig.name} Template
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedConfig.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="font-semibold w-24">Typography:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-medium">
                    {selectedConfig.fontName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="font-semibold w-24">Page Fit:</span>
                  <span className="text-emerald-700 font-medium">
                    Strict Single A4 Page (794 × 1123 px)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="font-semibold w-24">Ideal For:</span>
                  <span className="text-slate-600">
                    {selectedConfig.id === "fresher"
                      ? "College graduates, internships & entry-level roles"
                      : selectedConfig.id === "classic"
                        ? "Corporate, finance, law & senior management"
                        : selectedConfig.id === "modern"
                          ? "Tech, engineering, startup & design roles"
                          : "Creative, publishing & minimalist portfolios"}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleUseTemplate(
                      selectedConfig.id,
                      selectedConfig.defaultAccent
                    )
                  }
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition"
                >
                  Use This Template in Builder →
                </button>

                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
                >
                  Full Screen Preview
                </Link>
              </div>
            </div>

            {/* Right: Actual Rendered Scaled A4 Preview */}
            <div className="lg:col-span-7 flex justify-center items-center bg-slate-100 rounded-2xl p-6 border border-slate-200/80 overflow-hidden min-h-[520px]">
              <div
                className="shadow-2xl rounded-sm transition-transform duration-200 origin-top"
                style={{
                  transform: "scale(0.48)",
                  marginBottom: "-580px",
                }}
              >
                <SelectedTemplateComponent
                  resume={initialResume}
                  accent={selectedConfig.defaultAccent}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. THREE FEATURE POINTS ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Why ResumeCraft
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Job Seekers, Not Subscriptions
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              Most resume tools lure you in, then hold your PDF hostage behind a
              paywall. ResumeCraft is completely different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: 100% Free Forever */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white hover:border-indigo-300 hover:shadow-lg transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                🎁
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                100% Free Forever
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No credit cards, no trial periods that secretly expire, and no
                paywalls when you click download. Every template, feature, and
                export is free.
              </p>
            </div>

            {/* Feature 2: Zero Watermarks */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white hover:border-indigo-300 hover:shadow-lg transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl font-bold">
                ✨
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Zero Watermarks
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your resume belongs entirely to you. Download crisp, clean PDF
                exports free of any branding, watermarks, or third-party badges.
              </p>
            </div>

            {/* Feature 3: ATS-Friendly */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white hover:border-indigo-300 hover:shadow-lg transition space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                🤖
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Recruiter & ATS-Friendly
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Generated from pure semantic HTML with 100% selectable text.
                Automated Applicant Tracking Systems and human recruiters read
                every keyword with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. FINAL CALL TO ACTION ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Land Your Next Interview?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals and new graduates who build their
            resumes with ResumeCraft. Guaranteed single-page A4 precision in
            under 5 minutes.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              Start Building Now — Free
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            <Link
              href="/fresher-resume-template"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-base transition"
            >
              Fresher Resume Guide →
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>
    </div>
  );
}
