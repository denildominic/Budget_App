export function BudgetProgress({ pct }: { pct: number }) {
  const width = Math.min(100, Math.max(0, pct));
  return (
    <div className="relative h-3 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${width}%`,
          background:
            "linear-gradient(90deg, rgba(34,211,238,1), rgba(59,130,246,1))",
        }}
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
    </div>
  );
}
