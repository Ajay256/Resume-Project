import React from "react";
import { TemplateProps } from "../types";

export function FresherTemplate({
  resume,
  accent = "#4f46e5",
  contentScale = 1.0,
}: TemplateProps) {
  const { personal, education, projects, skills, extras, settings } = resume;

  // Fresher template intentionally has NO experience section
  const showSummary = Boolean(personal.summary && personal.summary.trim());
  const showEducation = Array.isArray(education) && education.length > 0;
  const showProjects = Array.isArray(projects) && projects.length > 0;
  const showSkills = Array.isArray(skills) && skills.length > 0;
  const showExtras =
    (settings?.showExtras ?? true) &&
    Array.isArray(extras) &&
    extras.length > 0;

  const contactItems = [
    personal.email && {
      text: personal.email,
      href: `mailto:${personal.email}`,
    },
    personal.phone && { text: personal.phone, href: `tel:${personal.phone}` },
    personal.location && { text: personal.location },
    personal.website && {
      text: personal.website.replace(/^https?:\/\//, ""),
      href: personal.website.startsWith("http")
        ? personal.website
        : `https://${personal.website}`,
    },
    personal.linkedin && {
      text: personal.linkedin.replace(
        /^https?:\/\/(www\.)?linkedin\.com\/in\//,
        "in/"
      ),
      href: personal.linkedin.startsWith("http")
        ? personal.linkedin
        : `https://${personal.linkedin}`,
    },
    personal.github && {
      text: personal.github.replace(
        /^https?:\/\/(www\.)?github\.com\//,
        "github/"
      ),
      href: personal.github.startsWith("http")
        ? personal.github
        : `https://${personal.github}`,
    },
  ].filter(Boolean) as { text: string; href?: string }[];

  return (
    <div
      id="resume-document"
      className="bg-white text-slate-800 shadow-xl print:shadow-none box-border flex flex-col justify-between overflow-hidden"
      style={{
        width: "794px",
        height: "1123px",
        fontFamily:
          "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', system-ui, sans-serif",
        fontSize: `${(12 * contentScale).toFixed(1)}px`,
        lineHeight: contentScale < 0.95 ? "1.38" : "1.45",
      }}
    >
      <div>
        {/* ================= COLORED HEADER ================= */}
        <header
          className="px-10 py-7 text-white text-center flex flex-col items-center"
          style={{ backgroundColor: accent }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight">
            {personal.name || "Your Name"}
          </h1>
          {personal.title && (
            <p className="text-white/90 text-sm font-medium mt-1 tracking-wide">
              {personal.title}
            </p>
          )}

          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              {contactItems.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-medium backdrop-blur-sm border border-white/20"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-white"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* ================= MAIN BODY ================= */}
        <div className="px-10 py-6 space-y-4">
          {/* 1. CAREER OBJECTIVE */}
          {showSummary && (
            <section>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <h2
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  Career Objective
                </h2>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-4">
                {personal.summary}
              </p>
            </section>
          )}

          {/* 2. NUMBERED PROJECTS FIRST */}
          {showProjects && (
            <section>
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <h2
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  Featured Projects
                </h2>
              </div>

              <div className="space-y-3 pl-1">
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="text-xs flex gap-3 items-start">
                    {/* Project Number */}
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-white shadow-sm"
                      style={{ backgroundColor: accent }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[12.5px]">
                          {proj.title}
                        </span>
                        {proj.link && (
                          <a
                            href={
                              proj.link.startsWith("http")
                                ? proj.link
                                : `https://${proj.link}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] hover:underline"
                            style={{ color: accent }}
                          >
                            {proj.link.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>

                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1 my-1">
                          {proj.technologies.split(",").map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {proj.description && (
                        <p className="text-slate-600 leading-relaxed mt-0.5">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. EDUCATION */}
          {showEducation && (
            <section>
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <h2
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  Education
                </h2>
              </div>

              <div className="space-y-2 pl-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{edu.institution}</span>
                      <span className="text-slate-500 font-normal text-[11px]">
                        {[edu.startDate, edu.endDate]
                          .filter(Boolean)
                          .join(" – ")}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-slate-700 text-[11.5px]">
                      <span>
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </span>
                      {edu.score && (
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10.5px]">
                          {edu.score}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. TECHNICAL SKILLS */}
          {showSkills && (
            <section>
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <h2
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  Technical Skills
                </h2>
              </div>

              <div className="space-y-1.5 pl-4 text-xs">
                {skills.map((group) => (
                  <div key={group.id} className="flex gap-2">
                    <span className="font-bold text-slate-900 min-w-[130px]">
                      {group.category}:
                    </span>
                    <span className="text-slate-700 flex-1">
                      {group.skills}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. EXTRAS / CERTIFICATIONS */}
          {showExtras && (
            <section>
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <h2
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  Certifications & Languages
                </h2>
              </div>

              <div className="space-y-1.5 pl-4 text-xs">
                {extras?.map((item) => (
                  <div key={item.id} className="flex gap-2">
                    {item.label && (
                      <span className="font-bold text-slate-900 min-w-[130px]">
                        {item.label}:
                      </span>
                    )}
                    <span className="text-slate-700 flex-1">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <footer className="text-center pb-4 text-[9px] text-slate-400">
        Page 1 of 1
      </footer>
    </div>
  );
}

export default FresherTemplate;
