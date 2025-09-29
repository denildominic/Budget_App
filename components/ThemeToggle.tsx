'use client'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const THEME_KEY = 'bb-theme'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    const r = document.documentElement
    if (dark) { r.classList.add('dark'); localStorage.setItem(THEME_KEY, 'dark') }
    else { r.classList.remove('dark'); localStorage.setItem(THEME_KEY, 'light') }
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
