"use client";

import {
  MoonStar,
  Sun,
  Tags,
  Database,
  PieChart,
  ArrowLeftRight,
  Filter,
  Smartphone,
  ShieldCheck,
  Code2,
} from "lucide-react";

const features = [
  {
    title: "Dark / Light Mode",
    desc: "Comfortable viewing with a theme toggle that persists.",
    icon: MoonStar,
  },
  {
    title: "Custom Categories",
    desc: "Choose “Other” and define your own category types.",
    icon: Tags,
  },
  {
    title: "Local-First Storage",
    desc: "No backend required — data is saved in LocalStorage.",
    icon: Database,
  },
  {
    title: "Analytics Dashboard",
    desc: "Doughnut by category + daily spend trend line chart.",
    icon: PieChart,
  },
  {
    title: "Import / Export JSON",
    desc: "Move your data between devices with a simple JSON file.",
    icon: ArrowLeftRight,
  },
  {
    title: "Filters & Search",
    desc: "Find transactions fast using filtering controls.",
    icon: Filter,
  },
  {
    title: "Responsive UI",
    desc: "Looks great on mobile, tablet, and desktop.",
    icon: Smartphone,
  },
  {
    title: "Privacy-Friendly",
    desc: "Your data stays on your device — no tracking, no accounts.",
    icon: ShieldCheck,
  },
];

const tech = [
  { label: "Next.js", icon: Code2 },
  { label: "TypeScript", icon: Code2 },
  { label: "Tailwind CSS", icon: Code2 },
];

export default function AboutPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-2xl border bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              About ByteBudget
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">
              ByteBudget is a simple, budget tracker that helps you set a monthly
              budget, log expenses, and understand spending patterns with quick analytics.
            </p>
          </div>

          {/* Optional: tiny theme hint badge */}
          <div className="flex items-center gap-2 self-start rounded-full border px-3 py-1 text-xs text-gray-600 dark:border-white/10 dark:text-gray-300">
            <Sun className="h-3.5 w-3.5" />
            <span>Light</span>
            <span className="text-gray-300 dark:text-white/15">/</span>
            <MoonStar className="h-3.5 w-3.5" />
            <span>Dark</span>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-black"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border p-2 dark:border-white/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{f.title}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <div className="rounded-xl border p-4 dark:border-white/10">
            <p className="text-sm font-medium">1) Set your budget</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Pick a monthly budget goal and track progress as you spend.
            </p>
          </div>
          <div className="rounded-xl border p-4 dark:border-white/10">
            <p className="text-sm font-medium">2) Log transactions</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Add expenses with categories (including custom ones) and notes.
            </p>
          </div>
          <div className="rounded-xl border p-4 dark:border-white/10">
            <p className="text-sm font-medium">3) Learn from insights</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Use analytics to spot patterns and adjust your spending.
            </p>
          </div>
        </div>

        {/* Tech + Privacy */}
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border p-4 dark:border-white/10">
            <p className="text-sm font-medium">Tech Stack</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tech.map((t) => {
                const Icon = t.icon;
                return (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-700 dark:border-white/10 dark:text-gray-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border p-4 dark:border-white/10">
            <p className="text-sm font-medium">Data & Privacy</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              ByteBudget stores your data locally in your browser. Nothing is uploaded by default.
              You can export/import your transactions as JSON whenever you want.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-2 border-t pt-4 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Denil Dominic</span>
          <span className="text-gray-400 dark:text-gray-500">
            Built for speed, simplicity, and clean UI.
          </span>
        </div>
      </section>
    </main>
  );
}
