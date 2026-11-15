"use client"

import Image from "next/image"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { WhatsappIcon } from "@/components/brand-icons"
import { whatsappLink } from "@/lib/site"
import { useSitePreferences } from "@/components/site-preferences"

export function Hero() {
  const { t } = useSitePreferences()

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-background text-foreground dark:bg-secondary dark:text-secondary-foreground"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <ShieldCheck className="size-4 text-primary" />
            {t.hero.badge}
          </span>
          <h1 className="text-balance font-heading text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground dark:text-secondary-foreground/70 md:text-lg">
            {t.hero.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(t.hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              <WhatsappIcon className="size-4" />
              {t.actions.requestService}
            </a>
            <a
              href="#servicios"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className:
                  "border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground dark:border-secondary-foreground/30 dark:text-secondary-foreground dark:hover:bg-secondary-foreground/10 dark:hover:text-secondary-foreground",
              })}
            >
              {t.actions.viewServices}
              <ArrowRight className="size-4" />
            </a>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-foreground/15 pt-6 dark:border-secondary-foreground/15">
            <div>
              <dt className="text-2xl font-bold text-primary">8+</dt>
              <dd className="text-xs text-muted-foreground dark:text-secondary-foreground/60">{t.hero.servicesCount}</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">100%</dt>
              <dd className="text-xs text-muted-foreground dark:text-secondary-foreground/60">{t.hero.personalized}</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">Rápida</dt>
              <dd className="text-xs text-muted-foreground dark:text-secondary-foreground/60">{t.hero.response}</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl" aria-hidden="true" />
          <Image
            src="/images/hero-tech.png"
            alt="Técnico de LS Solutions reparando un computador de escritorio"
            width={720}
            height={720}
            className="relative rounded-2xl border border-foreground/10 object-cover shadow-2xl dark:border-secondary-foreground/10"
            priority
          />
        </div>
      </div>
    </section>
  )
}
