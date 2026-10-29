"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FresherTemplate } from "@/templates/fresher";
import { Resume } from "@/lib/schema";
import { useResumeStore } from "@/lib/store";
import { PrintPortal } from "@/components/preview/PrintPortal";
import { printResume } from "@/lib/pdf";

// Sample resume specifically tailored for a fresher / new graduate
const fresherSampleResume: Resume = {
  settings: {
    showExperience: false, // Fresher template strictly omits experience
    showProjects: true,
    showEducation: true,
    showSkills: true,
    showExtras: true,
  },
  personal: {
    name: "Rohan Sharma",
    title: "Computer Science Graduate • Aspiring Software Engineer",
    email: "rohan.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    website: "https://rohansharma.dev",
    github: "github.com/rohansharma",
    linkedin: "linkedin.com/in/rohansharma-dev",
    summary:
      "Motivated and detail-oriented B.Tech Computer Science graduate with hands-on experience building full-stack web applications, REST APIs, and distributed systems. Seeking an Associate Software Engineer role to leverage problem-solving abilities and contribute to high-impact products.",
  },
  experience: [],
  projects: [
    {
      id: "proj-1",
      title: "DevCollab — Real-time Code Collaboration Editor",
      link: "https://github.com/rohansharma/devcollab",
      technologies: "Next.js, TypeScript, Socket.io, Redis, Tailwind CSS",
      description:
        "Built a collaborative browser-based IDE with real-time cursor syncing, multi-language syntax highlighting, and integrated code execution runner handling 100+ concurrent rooms.",
    },
    {
      id: "proj-2",
      title: "HealthPulse — AI Powered Symptom Checker",
      link: "https://github.com/rohansharma/healthpulse",
      technologies: "Python, FastAPI, React, PostgreSQL, Docker",
      description:
        "Developed a responsive medical triage portal matching patient symptoms to medical conditions with 89% diagnosis accuracy. Integrated automated appointment scheduling.",
    },
    {
      id: "proj-3",
      title: "CampusBuy — College Marketplace PWA",
      link: "https://github.com/rohansharma/campusbuy",
      technologies: "React, Firebase, Tailwind CSS",
      description:
        "Created a peer-to-peer textbook and gadget resale platform adopted by 1,200+ campus students with secure authentication and real-time chat.",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "National Institute of Technology (NIT)",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      startDate: "2020",
      endDate: "2024",
      score: "8.8 CGPA (First Class with Distinction)",
    },
  ],
  skills: [
    {
      id: "sk-1",
      category: "Programming Languages",
      skills: "Java, Python, C++, TypeScript, JavaScript, SQL",
    },
    {
      id: "sk-2",
      category: "Frameworks & Web",
      skills: "React, Next.js, Node.js, Express, Tailwind CSS, HTML5/CSS3",
    },
    {
      id: "sk-3",
      category: "Databases & Tools",
      skills: "PostgreSQL, MongoDB, Redis, Git, GitHub, Docker, Postman",
    },
  ],
  extras: [
    {
      id: "ext-1",
      label: "Certifications",
      value:
        "Meta Front-End Developer Specialization (Coursera), HackerRank 5-Star Problem Solving",
    },
    {
      id: "ext-2",
      label: "Achievements",
      value:
        "Winner at HackIndia 2023 (FinTech Track), Solved 450+ LeetCode problems",
    },
    {
      id: "ext-3",
      label: "Languages",
      value: "English (Fluent), Hindi (Native)",
    },
  ],
};

const COLOR_PRESETS = [
  { name: "Indigo", value: "#4f46e5" },
  { name: "Cobalt", value: "#2563eb" },
  { name: "Emerald", value: "#059669" },
  { name: "Rose", value: "#e11d48" },
  { name: "Slate", value: "#1e293b" },
];

export default function FresherLandingPage() {
  const router = useRouter();
  const setStoreTemplate = useResumeStore((state) => state.setTemplate);
  const setStoreAccent = useResumeStore((state) => state.setAccent);
  const setStoreResume = useResumeStore((state) => state.setResume);

  const [accent, setAccent] = useState("#4f46e5");
  const [zoom, setZoom] = useState(0.8);

  const handleUseFresherTemplate = () => {
    setStoreTemplate("fresher");
    setStoreAccent(accent);
    setStoreResume(fresherSampleResume);
    router.push("/builder");
  };

  const handlePrint = () => {
    printResume(fresherSampleResume.personal.name);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Clean portal for direct PDF export */}
      <PrintPortal>
        <FresherTemplate resume={fresherSampleResume} accent={accent} />
      </PrintPortal>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            🎓 Tailored for College Students, Fresh Graduates & Career Changers
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Fresher Resume Template:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Land Your First Job
            </span>
            <br /> Without Prior Experience
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Standard resume templates fail freshers by leaving large, awkward
            gaps where work history should be. Our Fresher template
            strategically spotlights <strong>Numbered Projects</strong>,{" "}
            <strong>Academic Honors</strong>, and{" "}
            <strong>Core Technical Skills</strong> instead.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleUseFresherTemplate}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5"
            >
              Use This Fresher Template (Free)
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
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base transition"
            >
              Download Sample PDF
            </button>
          </div>
        </div>
      </section>

      {/* ================= 4 FRESHER RULES ================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10 tracking-tight">
            How This Template Gets Fresh Graduates Hired
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Projects Ranked First
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recruiters judge freshers by what they have built. Numbered
                project cards highlight your tech stack, GitHub links, and
                tangible features.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Zero Awkward Gaps
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard templates leave empty experience sections. This
                template automatically hides work history, giving full focus to
                your projects.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Education & GPA Spotlight
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your university, degree, graduation year, and GPA/CGPA are
                highlighted with clean badge styling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Targeted Objective
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Replaces generic summaries with a sharp 2-line career objective
                tailored to the exact role you are targeting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE PREVIEW ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                Accent Color:
              </span>
              <div className="flex items-center gap-1.5">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setAccent(preset.value)}
                    className={`w-6 h-6 rounded-full border-2 transition ${
                      accent === preset.value
                        ? "border-slate-900 scale-110 shadow-xs"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: preset.value }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() =>
                    setZoom((z) => Math.max(0.4, Number((z - 0.05).toFixed(2))))
                  }
                  className="px-2 py-0.5 rounded hover:bg-white text-slate-700 font-bold"
                >
                  −
                </button>
                <span className="w-12 text-center font-mono text-[11px] text-slate-700">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoom((z) => Math.min(1.2, Number((z + 0.05).toFixed(2))))
                  }
                  className="px-2 py-0.5 rounded hover:bg-white text-slate-700 font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleUseFresherTemplate}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs transition"
              >
                Customize in Builder →
              </button>
            </div>
          </div>

          {/* Rendered Live Template */}
          <div className="flex justify-center items-start overflow-auto pt-4">
            <div
              className="shadow-2xl rounded-sm transition-transform duration-150 origin-top"
              style={{
                transform: `scale(${zoom})`,
                marginBottom: `${1123 * zoom - 1123 + 32}px`,
              }}
            >
              <FresherTemplate resume={fresherSampleResume} accent={accent} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to Build Your Graduate Resume?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Create a clean, ATS-optimized one-page resume and start applying to
            internships and junior roles with confidence.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleUseFresherTemplate}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg transition"
            >
              Start With Fresher Template Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
