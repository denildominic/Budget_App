import React from "react";

type Size = "sm" | "md" | "lg" | "xl";

export default function Card({
  className = "",
  children,
  title,
  subtitle,
  size = "lg",
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
      : "p-10 md:p-12";

  return (
    <section
      className={[
        "card",
        "border border-black/10 dark:border-white/10",
        "rounded-2xl shadow-xl",
        "space-y-6",
        pad,
        className,
      ].join(" ")}
    >
      {(title || subtitle) && (
        <header>
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm opacity-70">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
