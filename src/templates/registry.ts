import { TemplateId } from "@/lib/store";
import { TemplateConfig } from "./types";
import { classicConfig } from "./classic/config";
import { modernConfig } from "./modern/config";
import { minimalConfig } from "./minimal/config";
import { fresherConfig } from "./fresher/config";

export const templates: TemplateConfig[] = [
  classicConfig,
  modernConfig,
  minimalConfig,
  fresherConfig,
];

export const templateRegistry: Record<TemplateId, TemplateConfig> = {
  classic: classicConfig,
  modern: modernConfig,
  minimal: minimalConfig,
  fresher: fresherConfig,
};

export function getTemplate(id: TemplateId): TemplateConfig {
  return templateRegistry[id] || classicConfig;
}
