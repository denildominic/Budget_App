"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "bb-theme";
export default function ThemeToggle() {
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
      className="btn"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="h-4 w-4 mr-2" />
      ) : (
        <Moon className="h-4 w-4 mr-2" />
      )}
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
