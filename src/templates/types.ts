import React from "react";
import { Resume } from "@/lib/schema";
import { TemplateId } from "@/lib/store";

export interface TemplateProps {
  resume: Resume;
  accent: string;
  contentScale?: number;
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  fontName: string;
  fontFamily: string;
  defaultAccent: string;
  accentPresets: { name: string; value: string }[];
  component: React.ComponentType<TemplateProps>;
}
