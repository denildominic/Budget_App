import React from "react";

type Size = "sm" | "md" | "lg" | "xl";

export default function Card({
  className = "",
  children,
  size = "lg", // bigger by default
}: React.PropsWithChildren<{
  className?: string;
  title?: string;
  subtitle?: string;
  size?: Size;
}>) {
  const pad =
    size === "sm"
      ? "p-4"
      : size === "md"
      ? "p-6"
      : size === "lg"
      ? "p-8"
      : "p-10 md:p-12"; // xl

  return (
    <section
      className={[
        "bg-[hsl(var(--card))]",
        "border border-black/10 dark:border-white/10",
        "rounded-2xl shadow-xl",
        "space-y-6",
        pad,
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
