// components/BudgetProgress.tsx
export function BudgetProgress({ pct }: { pct: number }) {
  const width = Math.min(100, Math.max(0, pct || 0));
  return (
    <div
      className="relative h-3 rounded-full overflow-hidden"
      style={{ backgroundColor: "hsl(var(--muted))", opacity: 0.6 }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${width}%`,
          background:
            "linear-gradient(90deg, rgb(34,211,238), rgb(59,130,246))",
        }}
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
    </div>
  );
}
