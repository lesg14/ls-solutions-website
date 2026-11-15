"use client"

import {
  Wrench,
  MonitorCog,
  FileCheck2,
  Cpu,
  Gauge,
  CodeXml,
  Workflow,
  HardDrive,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsappIcon } from "@/components/brand-icons"
import { whatsappLink } from "@/lib/site"
import { useSitePreferences } from "@/components/site-preferences"

const serviceIcons = [Wrench, MonitorCog, FileCheck2, HardDrive, Gauge, CodeXml, Workflow, Cpu]

export function Services() {
  const { t } = useSitePreferences()

  return (
    <section id="servicios" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.services.eyebrow}</p>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.services.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map(([title, description], index) => {
            const Icon = serviceIcons[index]

            return (
            <article
              key={title}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/50 p-8 text-center">
          <h3 className="font-heading text-xl font-semibold text-foreground">
            {t.services.adviceTitle}
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t.services.adviceDescription}
          </p>
          <a
            href={whatsappLink(t.services.adviceMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            <WhatsappIcon className="size-4" />
            {t.actions.freeAdvice}
          </a>
        </div>
      </div>
    </section>
  )
}
