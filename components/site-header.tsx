"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsappIcon } from "@/components/brand-icons"
import { siteConfig, whatsappLink } from "@/lib/site"

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

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
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={whatsappLink("Hola LS Solutions, quiero más información sobre sus servicios.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants()}
          >
            <WhatsappIcon className="size-4" />
            Escríbenos
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
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
                {link.label}
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
              Escríbenos por WhatsApp
            </a>
            <p className="px-3 pt-2 text-xs text-muted-foreground">{siteConfig.whatsappDisplay}</p>
          </nav>
        </div>
      )}
    </header>
  )
}
