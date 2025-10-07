"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`${
        active
          ? "bg-slate-100 dark:bg-slate-900 font-medium"
          : "hover:bg-slate-50 dark:hover:bg-slate-900"
      } rounded-xl px-3 py-2 text-sm`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-4 z-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4 bg-white/60 dark:bg-black/60 backdrop-blur rounded-2xl border p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white font-bold shadow">
              B
            </div>
            <div>
              <div className="font-semibold">ByteBudget 2025</div>
              <div className="text-xs text-muted-foreground hidden sm:block">
                Track and Optimize Your Spending.
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/transactions">Transactions</NavLink>
            <NavLink href="/analytics">Analytics</NavLink>
            <NavLink href="/about">About</NavLink>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
