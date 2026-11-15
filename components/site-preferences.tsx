"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Locale } from "@/lib/i18n"
import { messages } from "@/lib/i18n"

type Theme = "light" | "dark"

type PreferencesContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  theme: Theme
  toggleTheme: () => void
  t: (typeof messages)[Locale]
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function SitePreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es")
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("ls-locale")
    const storedTheme = window.localStorage.getItem("ls-theme")

    if (storedLocale === "es" || storedLocale === "en" || storedLocale === "fr") {
      // Restore persisted preferences after hydration without changing the server-rendered default.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(storedLocale)
    }

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.classList.toggle("light", theme === "light")
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("ls-theme", theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem("ls-locale", locale)
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      theme,
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
      t: messages[locale],
    }),
    [locale, theme],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function useSitePreferences() {
  const context = useContext(PreferencesContext)

  if (!context) {
    throw new Error("useSitePreferences debe utilizarse dentro de SitePreferencesProvider.")
  }

  return context
}
