import { create } from "zustand";
import { Resume, initialResume } from "./schema";

export type TemplateId = "classic" | "modern" | "minimal" | "fresher";

export interface ResumeState {
  resume: Resume;
  template: TemplateId;
  accent: string;
  zoom: number;
  contentScale: number;
  setResume: (resume: Resume) => void;
  updatePersonal: (personal: Resume["personal"]) => void;
  setTemplate: (template: TemplateId) => void;
  setAccent: (accent: string) => void;
  setZoom: (zoom: number) => void;
  setContentScale: (scale: number) => void;
  resetToSample: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: initialResume,
  template: "classic",
  accent: "#1e3a8a", // Default Navy
  zoom: 0.85,
  contentScale: 1.0,
  setResume: (resume) => set({ resume }),
  updatePersonal: (personal) =>
    set((state) => ({ resume: { ...state.resume, personal } })),
  setTemplate: (template) => set({ template }),
  setAccent: (accent) => set({ accent }),
  setZoom: (zoom) => set({ zoom }),
  setContentScale: (contentScale) => set({ contentScale }),
  resetToSample: () => set({ resume: initialResume, contentScale: 1.0 }),
}));
