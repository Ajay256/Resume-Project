import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  score: z.string(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  link: z.string(),
  description: z.string(),
  technologies: z.string(),
});

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string().min(1, "Category is required"),
  skills: z.string(),
});

export const extraItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
});

export const resumeSettingsSchema = z.object({
  showExperience: z.boolean(),
  showProjects: z.boolean(),
  showEducation: z.boolean(),
  showSkills: z.boolean(),
  showExtras: z.boolean(),
});

export const resumeSchema = z.object({
  personal: z.object({
    name: z.string().min(1, "Name is required"),
    title: z.string(),
    email: z.string().email("Invalid email").or(z.literal("")),
    phone: z.string(),
    location: z.string(),
    website: z.string(),
    github: z.string(),
    linkedin: z.string(),
    summary: z.string(),
  }),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillGroupSchema),
  extras: z.array(extraItemSchema),
  settings: resumeSettingsSchema,
});

export type Resume = z.infer<typeof resumeSchema>;
export type ResumeSettings = z.infer<typeof resumeSettingsSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ExtraItem = z.infer<typeof extraItemSchema>;

export const initialResume: Resume = {
  settings: {
    showExperience: true,
    showProjects: true,
    showEducation: true,
    showSkills: true,
    showExtras: true,
  },
  personal: {
    name: "Alex Morgan",
    title: "Senior Full-Stack Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    github: "github.com/alexmorgan",
    linkedin: "linkedin.com/in/alexmorgan",
    summary:
      "Results-driven software engineer with 6+ years of experience designing and scaling web applications, microservices, and design systems. Passionate about developer tooling, performance optimization, and intuitive user experiences.",
  },
  experience: [
    {
      id: "exp-1",
      company: "Acme Cloud Technologies",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2022",
      endDate: "Present",
      current: true,
      description:
        "• Spearheaded migration of core web platform to Next.js and TypeScript, reducing p95 load times by 42%.\n• Mentored 5 junior engineers and led architectural review for micro-frontend services.\n• Implemented automated CI/CD pipelines cutting deployment cycles from 45m to 7m.",
    },
    {
      id: "exp-2",
      company: "Nexus Digital Labs",
      position: "Software Engineer",
      location: "Austin, TX",
      startDate: "2019",
      endDate: "2022",
      current: false,
      description:
        "• Built real-time analytics dashboards using React, Node.js, and WebSocket handling 50k+ events/sec.\n• Designed and maintained reusable design system components used across 8 internal applications.\n• Partnered with product and design teams to iterate quickly on key user funnel metrics.",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015",
      endDate: "2019",
      score: "3.8 GPA",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "FlowState - Distributed Workflow Engine",
      link: "https://github.com/alexmorgan/flowstate",
      technologies: "TypeScript, Go, Redis, Docker",
      description:
        "High-performance open-source task orchestration engine with visual execution graphs and failure recovery.",
    },
    {
      id: "proj-2",
      title: "DevMetrics CLI",
      link: "https://github.com/alexmorgan/devmetrics",
      technologies: "Node.js, Rust, GraphQL",
      description:
        "Developer CLI utility to benchmark build times, bundle sizing, and API latency across local environments.",
    },
  ],
  skills: [
    {
      id: "sk-1",
      category: "Languages & Frameworks",
      skills:
        "TypeScript, JavaScript, Python, Go, React, Next.js, Node.js, HTML5/CSS3",
    },
    {
      id: "sk-2",
      category: "Tools & Infrastructure",
      skills:
        "PostgreSQL, Redis, Docker, Kubernetes, AWS, Git, Tailwind CSS, GraphQL",
    },
  ],
  extras: [
    {
      id: "ext-1",
      label: "Certifications",
      value: "AWS Certified Solutions Architect (Associate), Kubernetes CKA",
    },
    {
      id: "ext-2",
      label: "Languages",
      value: "English (Native), Spanish (Conversational)",
    },
  ],
};
