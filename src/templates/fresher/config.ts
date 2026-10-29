import { TemplateConfig } from "../types";
import { FresherTemplate } from "./index";

export const fresherConfig: TemplateConfig = {
  id: "fresher",
  name: "Fresher",
  description:
    "Impactful layout with colored header, numbered projects first, and no experience section.",
  fontName: "Plus Jakarta Sans",
  fontFamily: "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
  defaultAccent: "#4f46e5",
  accentPresets: [
    { name: "Indigo", value: "#4f46e5" },
    { name: "Emerald", value: "#059669" },
    { name: "Rose", value: "#e11d48" },
    { name: "Amber", value: "#d97706" },
    { name: "Slate", value: "#1e293b" },
  ],
  component: FresherTemplate,
};
