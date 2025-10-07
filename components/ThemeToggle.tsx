"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const KEY = "bb-theme";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [dark, setDark] = useState(false);
  useEffect(
    () => setDark(document.documentElement.classList.contains("dark")),
    []
  );
  useEffect(() => {
    const el = document.documentElement;
    if (dark) {
      el.classList.add("dark");
      localStorage.setItem(KEY, "dark");
    } else {
      el.classList.remove("dark");
      localStorage.setItem(KEY, "light");
    }
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="px-3 py-1.5 rounded-xl border-token bg-card text-sm"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
