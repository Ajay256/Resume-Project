import { TemplateConfig } from "../types";
import { ModernTemplate } from "./index";

export const modernConfig: TemplateConfig = {
  id: "modern",
  name: "Modern",
  description:
    "Two-column layout featuring a bold colored sidebar and clean Inter typography.",
  fontName: "Inter",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  defaultAccent: "#2563eb",
  accentPresets: [
    { name: "Cobalt", value: "#2563eb" },
    { name: "Teal", value: "#0d9488" },
    { name: "Indigo", value: "#4f46e5" },
    { name: "Violet", value: "#7c3aed" },
    { name: "Emerald", value: "#059669" },
    { name: "Charcoal", value: "#1e293b" },
  ],
  component: ModernTemplate,
};
