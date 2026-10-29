import React from "react";
import { Resume } from "@/lib/schema";

export interface ClassicTemplateProps {
  resume: Resume;
  accent?: string;
  contentScale?: number;
}

export function ClassicTemplate({
  resume,
  accent = "#1e3a8a", // Classic deep navy accent
  contentScale = 1.0,
}: ClassicTemplateProps) {
  const { personal, experience, education, projects, skills, settings } =
    resume;

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
    Array.isArray(resume.extras) &&
    resume.extras.length > 0;

  // Filter out blank contact items
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
      className="bg-white text-slate-900 shadow-xl print:shadow-none box-border flex flex-col justify-between overflow-hidden"
      style={{
        width: "794px",
        height: "1123px",
        padding: `${Math.round(40 * contentScale)}px ${Math.round(48 * contentScale)}px`,
        fontFamily:
          "var(--font-libre-baskerville), 'Libre Baskerville', Georgia, Cambria, 'Times New Roman', serif",
        fontSize: `${(12 * contentScale).toFixed(1)}px`,
        lineHeight: contentScale < 0.95 ? "1.4" : "1.5",
      }}
    >
      <div className="flex-1 flex flex-col space-y-4">
        {/* ================= HEADER SECTION ================= */}
        <header
          className="text-center border-b pb-3"
          style={{ borderColor: accent }}
        >
          <h1
            className="text-3xl font-bold tracking-tight uppercase"
            style={{ color: accent, letterSpacing: "1.5px" }}
          >
            {personal.name || "Your Name"}
          </h1>

          {personal.title && (
            <p className="text-sm font-medium text-slate-700 italic mt-0.5 tracking-wide">
              {personal.title}
            </p>
          )}

          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-slate-600 mt-2">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-400">•</span>}
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-slate-700"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </header>

        {/* ================= SUMMARY SECTION ================= */}
        {showSummary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Professional Summary
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">
              {personal.summary}
            </p>
          </section>
        )}

        {/* ================= EXPERIENCE SECTION ================= */}
        {showExperience && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Work Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-sm">
                      {exp.position}
                    </span>
                    <span className="text-slate-600 font-medium italic text-[11px]">
                      {[exp.startDate, exp.current ? "Present" : exp.endDate]
                        .filter(Boolean)
                        .join(" – ")}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline text-slate-700 mb-1 italic">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="text-slate-500 text-[11px] not-italic">
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line pl-1">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= PROJECTS SECTION ================= */}
        {showProjects && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {proj.title}
                      {proj.technologies && (
                        <span className="font-normal text-slate-600 italic text-[11px]">
                          {" "}
                          | {proj.technologies}
                        </span>
                      )}
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
                  {proj.description && (
                    <p className="text-slate-700 leading-relaxed mt-0.5">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= EDUCATION SECTION ================= */}
        {showEducation && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {edu.institution}
                    </span>
                    <span className="text-slate-600 italic text-[11px]">
                      {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-700 italic">
                    <span>
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </span>
                    {edu.score && (
                      <span className="text-slate-500 text-[11px] not-italic">
                        {edu.score}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SKILLS SECTION ================= */}
        {showSkills && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Skills & Expertise
            </h2>
            <div className="space-y-1 text-xs">
              {skills.map((skillGroup) => (
                <div
                  key={skillGroup.id}
                  className="flex flex-wrap gap-1 leading-normal"
                >
                  <span className="font-bold text-slate-900 min-w-[140px]">
                    {skillGroup.category}:
                  </span>
                  <span className="text-slate-700 flex-1">
                    {skillGroup.skills}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= EXTRAS SECTION ================= */}
        {showExtras && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Additional Information
            </h2>
            <div className="space-y-1 text-xs">
              {resume.extras?.map((extra) => (
                <div
                  key={extra.id}
                  className="flex flex-wrap gap-1 leading-normal"
                >
                  {extra.label && (
                    <span className="font-bold text-slate-900 min-w-[140px]">
                      {extra.label}:
                    </span>
                  )}
                  <span className="text-slate-700 flex-1">{extra.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Subtle A4 Page Footer Margin Accent */}
      <footer className="text-center pt-2 border-t border-slate-100 text-[9px] text-slate-400">
        Page 1 of 1
      </footer>
    </div>
  );
}

export default ClassicTemplate;
