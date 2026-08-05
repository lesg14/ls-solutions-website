"use client"

import { useState, type FormEvent } from "react"
import { Phone, Send } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsappIcon, InstagramIcon, FacebookIcon } from "@/components/brand-icons"
import { siteConfig, whatsappLink } from "@/lib/site"

const serviceOptions = [
  "Mantenimiento de computadores",
  "Instalación de S.O. (Windows/Linux)",
  "Licencia de Microsoft Office",
  "Venta de componentes y accesorios",
  "Repotenciación de equipos",
  "Desarrollo de página web",
  "Automatización de procesos",
  "Otro / Asesoría",
]

export function Contact() {
  const [name, setName] = useState("")
  const [service, setService] = useState(serviceOptions[0])
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text =
      `Hola LS Solutions, soy ${name || "un cliente"}.` +
      `\nServicio de interés: ${service}.` +
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
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contacto</p>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
            Hablemos de tu proyecto o servicio
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Completa el formulario y te enviaremos directo a WhatsApp con tu solicitud lista para enviar.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8 lg:col-span-3"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-card-foreground">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-sm font-medium text-card-foreground">
                Servicio de interés
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-card-foreground">
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntanos qué necesitas..."
                className="resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button type="submit" className={buttonVariants({ size: "lg", className: "w-full" })}>
              <Send className="size-4" />
              Enviar por WhatsApp
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Al enviar, se abrirá WhatsApp con tu mensaje listo para nosotros.
            </p>
          </form>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-secondary p-6 text-secondary-foreground">
              <h3 className="font-heading text-lg font-semibold">Contacto directo</h3>
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
                  <span className="block text-secondary-foreground/60">WhatsApp</span>
                  <span className="font-medium">{siteConfig.whatsappDisplay}</span>
                </span>
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-card-foreground">Síguenos</h3>
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
