"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur dark:bg-black/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold">
            Budget App
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className="rounded-xl px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Transactions
            </Link>
            <Link
              href="/analytics"
              className="rounded-xl px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Analytics
            </Link>
            <Link
              href="/about"
              className="rounded-xl px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              About
            </Link>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
