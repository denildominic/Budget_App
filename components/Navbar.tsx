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
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--bg)/0.72)] bg-[hsl(var(--bg))] border-b border-token">
      <div className="mx-auto max-w-container px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white font-bold shadow">
            B
          </div>
          <div>
            <div className="font-semibold">ByteBudget</div>
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
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
