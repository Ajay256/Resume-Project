import { TemplateConfig } from "../types";
import { MinimalTemplate } from "./index";

export const minimalConfig: TemplateConfig = {
  id: "minimal",
  name: "Minimal",
  description:
    "Swiss-inspired editorial grid with left label column and DM Sans typography.",
  fontName: "DM Sans",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
  defaultAccent: "#0f172a",
  accentPresets: [
    { name: "Charcoal", value: "#0f172a" },
    { name: "Zinc", value: "#52525b" },
    { name: "Navy", value: "#1e3a8a" },
    { name: "Olive", value: "#3f6212" },
    { name: "Terracotta", value: "#9a3412" },
  ],
  component: MinimalTemplate,
};
