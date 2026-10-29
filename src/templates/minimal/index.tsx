import React from "react";
import { TemplateProps } from "../types";

export function MinimalTemplate({
  resume,
  accent = "#0f172a",
  contentScale = 1.0,
}: TemplateProps) {
  const {
    personal,
    experience,
    education,
    projects,
    skills,
    extras,
    settings,
  } = resume;

  const showExperience =
    (settings?.showExperience ?? true) &&
    Array.isArray(experience) &&
    experience.length > 0;

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
        padding: `${Math.round(44 * contentScale)}px ${Math.round(50 * contentScale)}px`,
        fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
        fontSize: `${(12 * contentScale).toFixed(1)}px`,
        lineHeight: contentScale < 0.95 ? "1.38" : "1.45",
      }}
    >
      <div className="flex-1 flex flex-col space-y-5">
        {/* ================= HEADER ================= */}
        <header className="border-b border-slate-200 pb-4">
          <div className="flex justify-between items-baseline flex-wrap gap-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {personal.name || "Your Name"}
              </h1>
              {personal.title && (
                <p className="text-sm font-medium mt-0.5 tracking-wide text-slate-600">
                  {personal.title}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-300">/</span>}
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-slate-900 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </header>

        {/* ================= SUMMARY (Label Col + Content Col) ================= */}
        {showSummary && (
          <div className="grid grid-cols-12 gap-5 pt-1">
            <div className="col-span-3">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: accent }}
              >
                Profile
              </span>
            </div>
            <div className="col-span-9">
              <p className="text-xs text-slate-700 leading-relaxed">
                {personal.summary}
              </p>
            </div>
          </div>
        )}

        {/* ================= EXPERIENCE (Label Col + Content Col) ================= */}
        {showExperience && (
          <div className="grid grid-cols-12 gap-5 border-t border-slate-100 pt-3">
            <div className="col-span-3">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: accent }}
              >
                Experience
              </span>
            </div>
            <div className="col-span-9 space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {exp.position}
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">
                      {[exp.startDate, exp.current ? "Present" : exp.endDate]
                        .filter(Boolean)
                        .join(" – ")}
                    </span>
                  </div>

                  <div className="text-slate-600 text-[11px] mb-1">
                    <span className="font-medium text-slate-800">
                      {exp.company}
                    </span>
                    {exp.location && <span>, {exp.location}</span>}
                  </div>

                  {exp.description && (
                    <div className="text-slate-600 leading-relaxed whitespace-pre-line text-[11.5px]">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PROJECTS (Label Col + Content Col) ================= */}
        {showProjects && (
          <div className="grid grid-cols-12 gap-5 border-t border-slate-100 pt-3">
            <div className="col-span-3">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: accent }}
              >
                Projects
              </span>
            </div>
            <div className="col-span-9 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
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
                        className="text-[11px] text-slate-400 hover:text-slate-700 underline underline-offset-2"
                      >
                        {proj.link.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">
                      {proj.technologies}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-slate-600 leading-relaxed mt-0.5 text-[11.5px]">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= EDUCATION (Label Col + Content Col) ================= */}
        {showEducation && (
          <div className="grid grid-cols-12 gap-5 border-t border-slate-100 pt-3">
            <div className="col-span-3">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: accent }}
              >
                Education
              </span>
            </div>
            <div className="col-span-9 space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">
                      {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 text-[11px]">
                    <span>{edu.institution}</span>
                    {edu.score && (
                      <span className="text-slate-500">{edu.score}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SKILLS (Label Col + Content Col) ================= */}
        {showSkills && (
          <div className="grid grid-cols-12 gap-5 border-t border-slate-100 pt-3">
            <div className="col-span-3">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: accent }}
              >
                Skills
              </span>
            </div>
            <div className="col-span-9 space-y-1.5 text-xs">
              {skills.map((group) => (
                <div key={group.id} className="flex gap-2">
                  <span className="font-semibold text-slate-800 min-w-[130px]">
                    {group.category}
                  </span>
                  <span className="text-slate-600 flex-1">{group.skills}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= EXTRAS (Label Col + Content Col) ================= */}
        {showExtras && (
          <div className="grid grid-cols-12 gap-5 border-t border-slate-100 pt-3">
            <div className="col-span-3">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: accent }}
              >
                Extras
              </span>
            </div>
            <div className="col-span-9 space-y-1.5 text-xs">
              {extras?.map((item) => (
                <div key={item.id} className="flex gap-2">
                  {item.label && (
                    <span className="font-semibold text-slate-800 min-w-[130px]">
                      {item.label}
                    </span>
                  )}
                  <span className="text-slate-600 flex-1">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="text-center pt-2 text-[9px] text-slate-300">
        Page 1 of 1
      </footer>
    </div>
  );
}

export default MinimalTemplate;
