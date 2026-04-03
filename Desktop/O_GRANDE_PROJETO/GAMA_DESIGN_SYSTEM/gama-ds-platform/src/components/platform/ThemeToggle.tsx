'use client'

import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check localStorage or system preference on mount
    const savedTheme = localStorage.getItem('gama-theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'light'
      setTheme(initialTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('gama-theme', newTheme)
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`p-2.5 rounded-lg motion-transition-default border-2 font-bold shadow-md hover:shadow-lg ${
        theme === 'dark'
          ? 'bg-gama-surface border-gama-primary text-gama-primary hover:bg-gama-surface-accent'
          : 'bg-gama-surface border-gama-primary text-gama-primary hover:bg-gama-surface-hover'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  )
}
