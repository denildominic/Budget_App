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
  const base = "rounded-xl px-3 py-2 text-sm";
  return (
    <Link
      href={href}
      className={
        active
          ? `${base} bg-gray-100 dark:bg-gray-900 font-medium`
          : `${base} hover:bg-gray-100 dark:hover:bg-gray-900`
      }
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur dark:bg-black/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold">
            Budget App
          </Link>
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
