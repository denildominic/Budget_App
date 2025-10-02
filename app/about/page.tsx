"use client";

export default function AboutPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-2xl border bg-white p-6 dark:bg-black">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          This budget app helps you set a monthly budget, add expenses
          (including custom categories), view transactions with filters, analyze
          spend by category and daily trend, and import/export data as JSON.
          More features coming soon!
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-6 text-sm">
          <li>Dark/Light mode toggle with no flicker</li>
          <li>“Other → Custom Type” for categories</li>
          <li>LocalStorage persistence (no backend required)</li>
          <li>Analytics: doughnut by category & line trend</li>
          <li>Import/Export your data as JSON</li>
        </ul>
      </section>
    </main>
  );
}
