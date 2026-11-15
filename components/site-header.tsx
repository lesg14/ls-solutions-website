"use client"

import { useState } from "react"
import Image from "next/image"
import { Languages, Menu, Moon, Sun, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsappIcon } from "@/components/brand-icons"
import { useSitePreferences } from "@/components/site-preferences"
import { localeLabels, type Locale } from "@/lib/i18n"
import { siteConfig, whatsappLink } from "@/lib/site"

const navLinks = [
  { href: "#servicios", key: "services" },
  { href: "#productos", key: "products" },
  { href: "#nosotros", key: "about" },
  { href: "#contacto", key: "contact" },
] as const

function PreferenceControls() {
  const { locale, setLocale, theme, toggleTheme, t } = useSitePreferences()
  const localeOptions = Object.keys(localeLabels) as Locale[]

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t.preferences.theme}
        title={t.preferences.theme}
        className="inline-flex size-9 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
      >
        {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </button>
      <label className="flex items-center gap-1 rounded-md border border-border px-2 text-sm text-foreground/80">
        <Languages className="size-4" aria-hidden="true" />
        <span className="sr-only">{t.preferences.language}</span>
        <select
          value={locale}
          onChange={(event) => setLocale(event.target.value as Locale)}
          aria-label={t.preferences.language}
          className="bg-transparent py-1.5 text-xs font-semibold outline-none"
        >
          {localeOptions.map((option) => (
            <option key={option} value={option}>
              {localeLabels[option]}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { t } = useSitePreferences()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#inicio" className="flex items-center gap-2" aria-label="LS Solutions inicio">
          <span className="flex items-center rounded-xl bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/ls-solutions-logo.png"
              alt="Logo de LS Solutions"
              width={150}
              height={48}
              className="h-8 w-auto"
              priority
            />
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <PreferenceControls />
          <a
            href={whatsappLink("Hola LS Solutions, quiero más información sobre sus servicios.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants()}
          >
            <WhatsappIcon className="size-4" />
            {t.actions.writeUs}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <a
              href={whatsappLink("Hola LS Solutions, quiero más información sobre sus servicios.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={buttonVariants({ className: "mt-2" })}
            >
              <WhatsappIcon className="size-4" />
              {t.actions.writeUsWhatsapp}
            </a>
            <div className="px-3 pt-3">
              <PreferenceControls />
            </div>
            <p className="px-3 pt-2 text-xs text-muted-foreground">{siteConfig.whatsappDisplay}</p>
          </nav>
        </div>
      )}
    </header>
  )
}
