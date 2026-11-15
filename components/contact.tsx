"use client"

import { useState, type FormEvent } from "react"
import { Phone, Send } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsappIcon, InstagramIcon, FacebookIcon } from "@/components/brand-icons"
import { siteConfig, whatsappLink } from "@/lib/site"
import { useSitePreferences } from "@/components/site-preferences"

export function Contact() {
  const { t } = useSitePreferences()
  const serviceOptions = t.contact.serviceOptions
  const [name, setName] = useState("")
  const [serviceIndex, setServiceIndex] = useState(0)
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text =
      `Hola LS Solutions, soy ${name || "un cliente"}.` +
      `\nServicio de interés: ${serviceOptions[serviceIndex]}.` +
      (message ? `\nMensaje: ${message}` : "")
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer")
  }

  const socials = [
    {
      label: "WhatsApp",
      value: siteConfig.whatsappDisplay,
      href: whatsappLink("Hola LS Solutions, quiero más información."),
      Icon: WhatsappIcon,
    },
    { label: "Instagram", value: siteConfig.instagramHandle, href: siteConfig.instagram, Icon: InstagramIcon },
    { label: "Facebook", value: siteConfig.facebookHandle, href: siteConfig.facebook, Icon: FacebookIcon },
  ]

  return (
    <section id="contacto" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.contact.eyebrow}</p>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.contact.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8 lg:col-span-3"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-card-foreground">
                {t.contact.name}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.namePlaceholder}
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-sm font-medium text-card-foreground">
                {t.contact.service}
              </label>
              <select
                id="service"
                value={serviceIndex}
                onChange={(e) => setServiceIndex(Number(e.target.value))}
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {serviceOptions.map((option, index) => (
                  <option key={option} value={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-card-foreground">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contact.messagePlaceholder}
                className="resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button type="submit" className={buttonVariants({ size: "lg", className: "w-full" })}>
              <Send className="size-4" />
              {t.actions.sendWhatsapp}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              {t.contact.note}
            </p>
          </form>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground dark:bg-secondary dark:text-secondary-foreground">
              <h3 className="font-heading text-lg font-semibold">{t.contact.direct}</h3>
              <a
                href={whatsappLink("Hola LS Solutions, quiero más información.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 text-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-muted-foreground dark:text-secondary-foreground/60">{t.contact.whatsapp}</span>
                  <span className="font-medium">{siteConfig.whatsappDisplay}</span>
                </span>
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-card-foreground">{t.contact.follow}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {socials.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted"
                    >
                      <span className="flex size-10 items-center justify-center rounded-full bg-accent text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-medium text-card-foreground">{label}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
