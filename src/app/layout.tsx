import type { Metadata } from "next";
import {
  Libre_Baskerville,
  Inter,
  DM_Sans,
  Plus_Jakarta_Sans,
} from "next/font/google";
import Link from "next/link";
import "./globals.css";
import "@/styles/print.css";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "ResumeCraft — Free One-Page Resume Builder (No Watermark, ATS-Friendly)",
  description:
    "Build a professional, single-page A4 resume in minutes. 100% free forever, zero watermarks, ATS-friendly templates, live preview, and instant PDF download.",
  keywords: [
    "resume builder",
    "free resume maker",
    "one page resume",
    "A4 resume template",
    "ATS resume",
    "fresher resume template",
    "no watermark resume",
    "curriculum vitae",
  ],
  authors: [{ name: "ResumeCraft" }],
  creator: "ResumeCraft",
  metadataBase: new URL("https://resumecraft.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resumecraft.dev",
    title: "ResumeCraft — Free One-Page Resume Builder (No Watermark)",
    description:
      "Create recruiter-ready single-page A4 resumes. Completely free, no watermark, ATS-compatible, and instant PDF export.",
    siteName: "ResumeCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeCraft — Free One-Page Resume Builder",
    description:
      "Build ATS-friendly one-page resumes without watermarks. Free PDF export.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full ${libreBaskerville.variable} ${inter.variable} ${dmSans.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="no-print border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm group-hover:bg-indigo-700 transition">
                R
              </div>
              <span className="font-semibold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                ResumeCraft
              </span>
            </Link>

            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link
                href="/templates"
                className="text-slate-600 hover:text-slate-900 transition"
              >
                Templates
              </Link>
              <Link
                href="/fresher-resume-template"
                className="text-slate-600 hover:text-slate-900 transition hidden sm:inline"
              >
                Fresher Guide
              </Link>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 transition"
              >
                Build My Resume
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
