"use client"

import Image from "next/image"
import { CircleCheck } from "lucide-react"
import { useSitePreferences } from "@/components/site-preferences"

export function About() {
  const { t } = useSitePreferences()

  return (
    <section id="nosotros" className="bg-muted/40 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="relative order-last md:order-first">
          <Image
            src="/images/workspace.png"
            alt="Espacio de trabajo con laptop y componentes de computador"
            width={640}
            height={520}
            className="rounded-2xl border border-border object-cover shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.about.eyebrow}</p>
          <h2 className="text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
            {t.about.title}
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {t.about.description}
          </p>
          <ul className="flex flex-col gap-3">
            {t.about.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground/90">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
