import { TemplateConfig } from "../types";
import { ClassicTemplate } from "./index";

export const classicConfig: TemplateConfig = {
  id: "classic",
  name: "Classic",
  description:
    "Traditional serif layout with refined typography and balanced sections.",
  fontName: "Libre Baskerville",
  fontFamily:
    "var(--font-libre-baskerville), 'Libre Baskerville', Georgia, serif",
  defaultAccent: "#1e3a8a",
  accentPresets: [
    { name: "Navy", value: "#1e3a8a" },
    { name: "Burgundy", value: "#881337" },
    { name: "Forest", value: "#14532d" },
    { name: "Slate", value: "#334155" },
    { name: "Charcoal", value: "#1e293b" },
  ],
  component: ClassicTemplate,
};
