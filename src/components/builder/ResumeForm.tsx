"use client";

import React, { useState } from "react";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Resume } from "@/lib/schema";
import { SectionCard } from "./SectionCard";
import { ListControls } from "./ListControls";

interface ResumeFormProps {
  register: UseFormRegister<Resume>;
  control: Control<Resume>;
  errors: FieldErrors<Resume>;
  setValue: UseFormSetValue<Resume>;
  watch: UseFormWatch<Resume>;
  accent: string;
  setAccent: (accent: string) => void;
  onReset: () => void;
  onLoadJSON: (json: string) => void;
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="text-center py-6 px-4 bg-slate-50/80 border border-dashed border-slate-300 rounded-xl space-y-2">
      <div className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-600 mx-auto flex items-center justify-center text-sm font-bold">
        +
      </div>
      <h4 className="text-xs font-semibold text-slate-800">{title}</h4>
      <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs transition mt-1"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export function ResumeForm({
  register,
  control,
  errors,
  setValue,
  watch,
  accent,
  setAccent,
  onReset,
  onLoadJSON,
}: ResumeFormProps) {
  // Collapsible sections state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    projects: false,
    education: false,
    skills: false,
    extras: false,
  });

  // Reset confirmation modal state
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Field arrays for repeatable sections
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
    move: moveExp,
  } = useFieldArray({ control, name: "experience" });

  const {
    fields: projFields,
    append: appendProj,
    remove: removeProj,
    move: moveProj,
  } = useFieldArray({ control, name: "projects" });

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
    move: moveEdu,
  } = useFieldArray({ control, name: "education" });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
    move: moveSkill,
  } = useFieldArray({ control, name: "skills" });

  const {
    fields: extraFields,
    append: appendExtra,
    remove: removeExtra,
    move: moveExtra,
  } = useFieldArray({ control, name: "extras" });

  const showExperience = watch("settings.showExperience");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        onLoadJSON(text);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleConfirmReset = () => {
    setShowResetConfirm(false);
    onReset();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      {/* ================= RESET CONFIRMATION MODAL ================= */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in no-print">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Reset All Resume Data?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This will overwrite any information you entered and restore
                standard sample data. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. PERSONAL INFO SECTION */}
      <SectionCard
        id="personal"
        title="Personal Information"
        isOpen={openSections.personal}
        onToggle={() => toggleSection("personal")}
        subtitle="Name, contact & links"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              {...register("personal.name")}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
            {errors.personal?.name && (
              <p className="text-rose-500 mt-1 text-[11px]">
                {errors.personal.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Professional Title
            </label>
            <input
              {...register("personal.title")}
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("personal.email")}
              placeholder="e.g. alex.morgan@example.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
            {errors.personal?.email && (
              <p className="text-rose-500 mt-1 text-[11px]">
                {errors.personal.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Phone
            </label>
            <input
              {...register("personal.phone")}
              placeholder="e.g. +1 (555) 234-5678"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              {...register("personal.location")}
              placeholder="e.g. San Francisco, CA (or Remote)"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Website / Portfolio
            </label>
            <input
              {...register("personal.website")}
              placeholder="e.g. https://alexmorgan.dev"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              LinkedIn
            </label>
            <input
              {...register("personal.linkedin")}
              placeholder="e.g. linkedin.com/in/alexmorgan"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              GitHub
            </label>
            <input
              {...register("personal.github")}
              placeholder="e.g. github.com/alexmorgan"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
            />
          </div>
        </div>
      </SectionCard>

      {/* 2. SUMMARY SECTION */}
      <SectionCard
        id="summary"
        title="Professional Summary"
        isOpen={openSections.summary}
        onToggle={() => toggleSection("summary")}
        subtitle="2-3 sentence overview"
      >
        <div className="text-xs">
          <textarea
            {...register("personal.summary")}
            rows={3}
            placeholder="e.g. Results-driven engineer with 6+ years of experience designing scalable web services. Passionate about developer tooling, performance optimization, and clean architectural design..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white leading-relaxed"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Tip: 3–4 impactful sentences fit best on a standard A4 page.
          </p>
        </div>
      </SectionCard>

      {/* 3. EXPERIENCE SECTION */}
      <SectionCard
        id="experience"
        title="Work Experience"
        isOpen={openSections.experience}
        onToggle={() => toggleSection("experience")}
        badge={expFields.length}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={showExperience}
              onChange={(e) =>
                setValue("settings.showExperience", e.target.checked)
              }
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Show Experience Section
          </label>

          <button
            type="button"
            onClick={() =>
              appendExp({
                id: `exp-${Date.now()}`,
                company: "",
                position: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
              })
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-xs transition"
          >
            + Add Job
          </button>
        </div>

        <div className="space-y-4 pt-1">
          {expFields.map((field, idx) => (
            <div
              key={field.id}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-800">
                  #{idx + 1}{" "}
                  {watch(`experience.${idx}.position`) || "New Position"}
                </span>
                <ListControls
                  index={idx}
                  total={expFields.length}
                  onMoveUp={() => moveExp(idx, idx - 1)}
                  onMoveDown={() => moveExp(idx, idx + 1)}
                  onRemove={() => removeExp(idx)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Job Title *
                  </label>
                  <input
                    {...register(`experience.${idx}.position` as const)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                  {errors.experience?.[idx]?.position && (
                    <p className="text-rose-500 text-[11px] mt-0.5">
                      {errors.experience[idx]?.position?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Company *
                  </label>
                  <input
                    {...register(`experience.${idx}.company` as const)}
                    placeholder="e.g. Acme Cloud Corp"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                  {errors.experience?.[idx]?.company && (
                    <p className="text-rose-500 text-[11px] mt-0.5">
                      {errors.experience[idx]?.company?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Location
                  </label>
                  <input
                    {...register(`experience.${idx}.location` as const)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-slate-600">Dates</label>
                    <label className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                      <input
                        type="checkbox"
                        {...register(`experience.${idx}.current` as const)}
                        className="rounded border-slate-300 text-indigo-600"
                      />
                      Current
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      {...register(`experience.${idx}.startDate` as const)}
                      placeholder="Start (e.g. 2022)"
                      className="w-full px-2 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                    />
                    <input
                      {...register(`experience.${idx}.endDate` as const)}
                      disabled={watch(`experience.${idx}.current`)}
                      placeholder={
                        watch(`experience.${idx}.current`)
                          ? "Present"
                          : "End (e.g. 2024)"
                      }
                      className="w-full px-2 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white disabled:bg-slate-100"
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-600 mb-0.5">
                  Key Achievements
                </label>
                <textarea
                  {...register(`experience.${idx}.description` as const)}
                  rows={3}
                  placeholder="• Spearheaded platform migration to TypeScript, reducing latency by 40%&#10;• Mentored 5 engineers and introduced automated CI/CD testing&#10;• Led design system components adopted across 8 services"
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white leading-relaxed font-sans"
                />
              </div>
            </div>
          ))}

          {expFields.length === 0 && (
            <EmptyState
              title="No work experience added"
              description="Listing relevant full-time roles, internships, or freelance work is key for recruiters."
              actionLabel="+ Add Your First Job"
              onAction={() =>
                appendExp({
                  id: `exp-${Date.now()}`,
                  company: "",
                  position: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: "",
                })
              }
            />
          )}
        </div>
      </SectionCard>

      {/* 4. PROJECTS SECTION */}
      <SectionCard
        id="projects"
        title="Projects"
        isOpen={openSections.projects}
        onToggle={() => toggleSection("projects")}
        badge={projFields.length}
      >
        <div className="flex justify-end pb-2 border-b border-slate-100">
          <button
            type="button"
            onClick={() =>
              appendProj({
                id: `proj-${Date.now()}`,
                title: "",
                link: "",
                technologies: "",
                description: "",
              })
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-xs transition"
          >
            + Add Project
          </button>
        </div>

        <div className="space-y-4 pt-1">
          {projFields.map((field, idx) => (
            <div
              key={field.id}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-800">
                  #{idx + 1} {watch(`projects.${idx}.title`) || "New Project"}
                </span>
                <ListControls
                  index={idx}
                  total={projFields.length}
                  onMoveUp={() => moveProj(idx, idx - 1)}
                  onMoveDown={() => moveProj(idx, idx + 1)}
                  onRemove={() => removeProj(idx)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Project Title *
                  </label>
                  <input
                    {...register(`projects.${idx}.title` as const)}
                    placeholder="e.g. Distributed Workflow Engine"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                  {errors.projects?.[idx]?.title && (
                    <p className="text-rose-500 text-[11px] mt-0.5">
                      {errors.projects[idx]?.title?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Project Link / URL
                  </label>
                  <input
                    {...register(`projects.${idx}.link` as const)}
                    placeholder="e.g. github.com/alexmorgan/workflow"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-600 mb-0.5">
                  Tech Stack
                </label>
                <input
                  {...register(`projects.${idx}.technologies` as const)}
                  placeholder="e.g. TypeScript, React 19, Redis, Docker"
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="text-xs">
                <label className="block text-slate-600 mb-0.5">
                  Description
                </label>
                <textarea
                  {...register(`projects.${idx}.description` as const)}
                  rows={2}
                  placeholder="e.g. High-performance task orchestration engine with interactive execution graphs and auto-retry capabilities."
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white leading-relaxed"
                />
              </div>
            </div>
          ))}

          {projFields.length === 0 && (
            <EmptyState
              title="No projects listed yet"
              description="Side projects and open-source contributions demonstrate passion and real engineering skill."
              actionLabel="+ Add Your First Project"
              onAction={() =>
                appendProj({
                  id: `proj-${Date.now()}`,
                  title: "",
                  link: "",
                  technologies: "",
                  description: "",
                })
              }
            />
          )}
        </div>
      </SectionCard>

      {/* 5. EDUCATION SECTION */}
      <SectionCard
        id="education"
        title="Education"
        isOpen={openSections.education}
        onToggle={() => toggleSection("education")}
        badge={eduFields.length}
      >
        <div className="flex justify-end pb-2 border-b border-slate-100">
          <button
            type="button"
            onClick={() =>
              appendEdu({
                id: `edu-${Date.now()}`,
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                score: "",
              })
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-xs transition"
          >
            + Add Education
          </button>
        </div>

        <div className="space-y-4 pt-1">
          {eduFields.map((field, idx) => (
            <div
              key={field.id}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-800">
                  #{idx + 1}{" "}
                  {watch(`education.${idx}.institution`) || "New Degree"}
                </span>
                <ListControls
                  index={idx}
                  total={eduFields.length}
                  onMoveUp={() => moveEdu(idx, idx - 1)}
                  onMoveDown={() => moveEdu(idx, idx + 1)}
                  onRemove={() => removeEdu(idx)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Institution / School *
                  </label>
                  <input
                    {...register(`education.${idx}.institution` as const)}
                    placeholder="e.g. UC Berkeley"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                  {errors.education?.[idx]?.institution && (
                    <p className="text-rose-500 text-[11px] mt-0.5">
                      {errors.education[idx]?.institution?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Degree *
                  </label>
                  <input
                    {...register(`education.${idx}.degree` as const)}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                  {errors.education?.[idx]?.degree && (
                    <p className="text-rose-500 text-[11px] mt-0.5">
                      {errors.education[idx]?.degree?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Major / Field
                  </label>
                  <input
                    {...register(`education.${idx}.field` as const)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <label className="block text-slate-600 mb-0.5">
                      Grad Year
                    </label>
                    <input
                      {...register(`education.${idx}.endDate` as const)}
                      placeholder="e.g. 2019"
                      className="w-full px-2 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-0.5">
                      GPA / Honors
                    </label>
                    <input
                      {...register(`education.${idx}.score` as const)}
                      placeholder="e.g. 3.8 GPA"
                      className="w-full px-2 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {eduFields.length === 0 && (
            <EmptyState
              title="No education added"
              description="Add your degree, university, bootcamp, or secondary school credentials."
              actionLabel="+ Add Education Entry"
              onAction={() =>
                appendEdu({
                  id: `edu-${Date.now()}`,
                  institution: "",
                  degree: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                  score: "",
                })
              }
            />
          )}
        </div>
      </SectionCard>

      {/* 6. SKILLS SECTION */}
      <SectionCard
        id="skills"
        title="Skills & Expertise"
        isOpen={openSections.skills}
        onToggle={() => toggleSection("skills")}
        badge={skillFields.length}
      >
        <div className="flex justify-end pb-2 border-b border-slate-100">
          <button
            type="button"
            onClick={() =>
              appendSkill({
                id: `sk-${Date.now()}`,
                category: "",
                skills: "",
              })
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-xs transition"
          >
            + Add Skill Group
          </button>
        </div>

        <div className="space-y-3 pt-1">
          {skillFields.map((field, idx) => (
            <div
              key={field.id}
              className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  Group #{idx + 1}
                </span>
                <ListControls
                  index={idx}
                  total={skillFields.length}
                  onMoveUp={() => moveSkill(idx, idx - 1)}
                  onMoveDown={() => moveSkill(idx, idx + 1)}
                  onRemove={() => removeSkill(idx)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-600 mb-0.5">
                    Category *
                  </label>
                  <input
                    {...register(`skills.${idx}.category` as const)}
                    placeholder="e.g. Frontend Frameworks"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-medium"
                  />
                  {errors.skills?.[idx]?.category && (
                    <p className="text-rose-500 text-[11px] mt-0.5">
                      {errors.skills[idx]?.category?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 mb-0.5">
                    Skills (comma-separated)
                  </label>
                  <input
                    {...register(`skills.${idx}.skills` as const)}
                    placeholder="e.g. React 19, Next.js, TypeScript, Tailwind CSS"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>
            </div>
          ))}

          {skillFields.length === 0 && (
            <EmptyState
              title="No skill groups created"
              description="Highlight your core technical capabilities, programming languages, and tools."
              actionLabel="+ Add Skill Group"
              onAction={() =>
                appendSkill({
                  id: `sk-${Date.now()}`,
                  category: "",
                  skills: "",
                })
              }
            />
          )}
        </div>
      </SectionCard>

      {/* 7. EXTRAS & SETTINGS SECTION */}
      <SectionCard
        id="extras"
        title="Extras & Resume Settings"
        isOpen={openSections.extras}
        onToggle={() => toggleSection("extras")}
        badge={extraFields.length}
        subtitle="Certifications, theme & JSON"
      >
        <div className="space-y-4 text-xs">
          {/* Accent Color Picker */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-800 block mb-2">
              Accent Color
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: "Navy", value: "#1e3a8a" },
                { name: "Slate", value: "#334155" },
                { name: "Indigo", value: "#4f46e5" },
                { name: "Emerald", value: "#047857" },
                { name: "Burgundy", value: "#881337" },
                { name: "Charcoal", value: "#18181b" },
              ].map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setAccent(color.value)}
                  className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                    accent === color.value
                      ? "border-slate-800 bg-white shadow-sm font-semibold"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-slate-300"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </button>
              ))}

              <div className="flex items-center gap-1.5 pl-2">
                <span className="text-slate-500">Custom:</span>
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-7 h-7 rounded border cursor-pointer p-0 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Extra items (Certifications, Languages) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">
                Additional Fields
              </span>
              <button
                type="button"
                onClick={() =>
                  appendExtra({
                    id: `ext-${Date.now()}`,
                    label: "",
                    value: "",
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-xs transition"
              >
                + Add Field
              </button>
            </div>

            {extraFields.map((field, idx) => (
              <div
                key={field.id}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">
                    Item #{idx + 1}
                  </span>
                  <ListControls
                    index={idx}
                    total={extraFields.length}
                    onMoveUp={() => moveExtra(idx, idx - 1)}
                    onMoveDown={() => moveExtra(idx, idx + 1)}
                    onRemove={() => removeExtra(idx)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    {...register(`extras.${idx}.label` as const)}
                    placeholder="Label (e.g. Certifications)"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                  <input
                    {...register(`extras.${idx}.value` as const)}
                    placeholder="Value (e.g. AWS Certified Solutions Architect)"
                    className="sm:col-span-2 w-full px-2.5 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>
            ))}

            {extraFields.length === 0 && (
              <EmptyState
                title="No additional information fields"
                description="Include certifications, spoken languages, awards, or volunteer activities."
                actionLabel="+ Add Field"
                onAction={() =>
                  appendExtra({
                    id: `ext-${Date.now()}`,
                    label: "",
                    value: "",
                  })
                }
              />
            )}
          </div>

          {/* Data Backup & Reset with confirmation */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-3.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold transition flex items-center gap-1.5"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Reset to Sample Data
            </button>

            <label className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium cursor-pointer transition">
              Upload JSON
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </SectionCard>
    </form>
  );
}
