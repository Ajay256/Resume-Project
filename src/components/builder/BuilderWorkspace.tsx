"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, Resume, initialResume } from "@/lib/schema";
import { useResumeStore, TemplateId } from "@/lib/store";
import { ResumeForm } from "@/components/builder/ResumeForm";
import { PreviewContainer } from "@/components/preview/PreviewContainer";

export function BuilderWorkspace() {
  const searchParams = useSearchParams();
  const storeResume = useResumeStore((state) => state.resume);
  const storeAccent = useResumeStore((state) => state.accent);
  const setStoreResume = useResumeStore((state) => state.setResume);
  const setStoreAccent = useResumeStore((state) => state.setAccent);
  const setStoreTemplate = useResumeStore((state) => state.setTemplate);

  // Auto-switch template if ?template=... is provided in URL
  useEffect(() => {
    const paramTemplate = searchParams.get("template") as TemplateId | null;
    if (
      paramTemplate &&
      ["classic", "modern", "minimal", "fresher"].includes(paramTemplate)
    ) {
      setStoreTemplate(paramTemplate);
    }
  }, [searchParams, setStoreTemplate]);

  // Mobile active tab state: "edit" or "preview"
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  // React Hook Form initialized with zod validation
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: storeResume,
    mode: "onChange",
  });

  // Watch entire resume form state for instant live preview synchronization
  const formValues = watch();

  // Keep store in sync when values change
  useEffect(() => {
    const subscription = watch((value) => {
      if (value) {
        setStoreResume(value as Resume);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setStoreResume]);

  const handleResetToSample = () => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "Are you sure you want to reset all resume data? Any custom changes will be replaced with standard sample data."
      )
    ) {
      return;
    }
    reset(initialResume);
    setStoreResume(initialResume);
  };

  const handleLoadJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const validated = resumeSchema.safeParse(parsed);
      if (validated.success) {
        reset(validated.data);
        setStoreResume(validated.data);
      } else {
        alert("JSON does not match resume schema: " + validated.error.message);
      }
    } catch {
      alert("Invalid JSON file");
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center justify-center p-1 mb-4 bg-slate-200/80 rounded-xl no-print">
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            mobileTab === "edit"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          ✏️ Edit Form
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            mobileTab === "preview"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          📄 Live Preview
        </button>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
        {/* Left Form Column */}
        <div
          className={`lg:col-span-6 xl:col-span-5 space-y-4 ${
            mobileTab === "edit" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-1">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Resume Content
              </h1>
              <p className="text-xs text-slate-500">
                Changes update the preview instantly in real-time.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetToSample}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Reset Sample
            </button>
          </div>

          <ResumeForm
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
            accent={storeAccent}
            setAccent={setStoreAccent}
            onReset={handleResetToSample}
            onLoadJSON={handleLoadJSON}
          />
        </div>

        {/* Right Preview Column */}
        <div
          className={`lg:col-span-6 xl:col-span-7 sticky top-20 ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <PreviewContainer
            resume={formValues as Resume}
            accent={storeAccent}
          />
        </div>
      </div>
    </div>
  );
}
