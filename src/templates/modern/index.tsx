import React from "react";
import { TemplateProps } from "../types";

export function ModernTemplate({
  resume,
  accent = "#3b82f6",
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
      label: "Email",
      text: personal.email,
      href: `mailto:${personal.email}`,
    },
    personal.phone && {
      label: "Phone",
      text: personal.phone,
      href: `tel:${personal.phone}`,
    },
    personal.location && { label: "Location", text: personal.location },
    personal.website && {
      label: "Portfolio",
      text: personal.website.replace(/^https?:\/\//, ""),
      href: personal.website.startsWith("http")
        ? personal.website
        : `https://${personal.website}`,
    },
    personal.linkedin && {
      label: "LinkedIn",
      text: personal.linkedin.replace(
        /^https?:\/\/(www\.)?linkedin\.com\/in\//,
        "in/"
      ),
      href: personal.linkedin.startsWith("http")
        ? personal.linkedin
        : `https://${personal.linkedin}`,
    },
    personal.github && {
      label: "GitHub",
      text: personal.github.replace(
        /^https?:\/\/(www\.)?github\.com\//,
        "github/"
      ),
      href: personal.github.startsWith("http")
        ? personal.github
        : `https://${personal.github}`,
    },
  ].filter(Boolean) as { label: string; text: string; href?: string }[];

  const initials = personal.name
    ? personal.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "RM";

  return (
    <div
      id="resume-document"
      className="bg-white text-slate-900 shadow-xl print:shadow-none box-border flex overflow-hidden"
      style={{
        width: "794px",
        height: "1123px",
        fontFamily:
          "var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: `${(12 * contentScale).toFixed(1)}px`,
        lineHeight: contentScale < 0.95 ? "1.38" : "1.45",
      }}
    >
      {/* ================= LEFT COLORED SIDEBAR (254px) ================= */}
      <aside
        className="w-[254px] min-w-[254px] p-6 text-white flex flex-col justify-between"
        style={{ backgroundColor: accent }}
      >
        <div className="space-y-6">
          {/* Avatar / Initials */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center font-bold text-2xl tracking-wider mb-3 backdrop-blur-sm shadow-inner">
              {initials}
            </div>
            <h2 className="font-bold text-base tracking-tight leading-tight">
              {personal.name || "Your Name"}
            </h2>
            {personal.title && (
              <p className="text-white/80 text-[11px] font-medium mt-0.5">
                {personal.title}
              </p>
            )}
          </div>

          {/* Contact Details */}
          {contactItems.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                Contact
              </h3>
              <div className="space-y-1.5 text-[11px] text-white/90">
                {contactItems.map((item, idx) => (
                  <div key={idx} className="break-words">
                    <span className="block text-[10px] text-white/60 font-semibold uppercase">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white underline underline-offset-2 decoration-white/40"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {showEducation && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                Education
              </h3>
              <div className="space-y-2.5 text-xs">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px]">
                    <div className="font-bold text-white leading-tight">
                      {edu.degree}
                    </div>
                    {edu.field && (
                      <div className="text-white/80 text-[10.5px]">
                        {edu.field}
                      </div>
                    )}
                    <div className="text-white/70 text-[10px]">
                      {edu.institution}
                    </div>
                    <div className="flex justify-between items-center text-[9.5px] text-white/60 mt-0.5">
                      <span>
                        {[edu.startDate, edu.endDate]
                          .filter(Boolean)
                          .join(" - ")}
                      </span>
                      {edu.score && <span>{edu.score}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {showSkills && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                Skills
              </h3>
              <div className="space-y-2 text-[11px]">
                {skills.map((group) => (
                  <div key={group.id}>
                    <span className="font-semibold text-white/90 block text-[10px] uppercase">
                      {group.category}
                    </span>
                    <p className="text-white/80 text-[10.5px] leading-tight">
                      {group.skills}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extras / Certifications */}
          {showExtras && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                Highlights
              </h3>
              <div className="space-y-1.5 text-[10.5px]">
                {extras?.map((item) => (
                  <div key={item.id}>
                    {item.label && (
                      <span className="font-semibold text-white/90 block text-[10px]">
                        {item.label}
                      </span>
                    )}
                    <p className="text-white/80 leading-tight">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[9px] text-white/50 text-center pt-2">
          Page 1 of 1
        </div>
      </aside>

      {/* ================= RIGHT MAIN CONTENT (540px) ================= */}
      <main className="flex-1 p-8 flex flex-col justify-between space-y-5">
        <div className="space-y-5">
          {/* Header Title Bar */}
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
              {personal.name || "Your Name"}
            </h1>
            {personal.title && (
              <p
                className="text-sm font-semibold mt-1 tracking-wide uppercase"
                style={{ color: accent }}
              >
                {personal.title}
              </p>
            )}
          </div>

          {/* Profile Summary */}
          {showSummary && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2"
                style={{ color: accent }}
              >
                <span>About Me</span>
                <span className="flex-1 h-[1.5px] bg-slate-200" />
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {personal.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {showExperience && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
                style={{ color: accent }}
              >
                <span>Experience</span>
                <span className="flex-1 h-[1.5px] bg-slate-200" />
              </h2>
              <div className="space-y-3.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{exp.position}</span>
                      <span className="text-slate-500 font-normal text-[11px]">
                        {[exp.startDate, exp.current ? "Present" : exp.endDate]
                          .filter(Boolean)
                          .join(" - ")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 text-[11px] mb-1">
                      <span className="font-semibold" style={{ color: accent }}>
                        {exp.company}
                      </span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>

                    {exp.description && (
                      <div className="text-slate-600 text-xs leading-relaxed whitespace-pre-line pl-0.5">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {showProjects && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
                style={{ color: accent }}
              >
                <span>Projects</span>
                <span className="flex-1 h-[1.5px] bg-slate-200" />
              </h2>
              <div className="space-y-3">
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
                          className="text-[11px] hover:underline"
                          style={{ color: accent }}
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
                      <p className="text-slate-600 text-xs leading-relaxed mt-0.5">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default ModernTemplate;
