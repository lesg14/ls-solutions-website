"use client"

import { WhatsappIcon, InstagramIcon, FacebookIcon } from "@/components/brand-icons"
import { siteConfig, whatsappLink } from "@/lib/site"
import { useSitePreferences } from "@/components/site-preferences"

export function SiteFooter() {
  const { t } = useSitePreferences()
  const socials = [
    { label: "WhatsApp", href: whatsappLink(), Icon: WhatsappIcon },
    { label: "Instagram", href: siteConfig.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: siteConfig.facebook, Icon: FacebookIcon },
  ]

  return (
    <footer className="border-t border-border bg-background text-foreground dark:bg-secondary dark:text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex flex-col gap-4">
          <span className="font-heading text-2xl font-extrabold tracking-tight">
            LS <span className="text-primary">SOLUTIONS</span>
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground dark:text-secondary-foreground/60">
            {t.footer.description}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold">{t.footer.follow}</span>
          <div className="flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground dark:bg-secondary-foreground/10 dark:text-secondary-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground dark:text-secondary-foreground/60">{siteConfig.whatsappDisplay}</p>
        </div>
      </div>

      <div className="border-t border-foreground/10 dark:border-secondary-foreground/10">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <p className="text-center text-xs text-muted-foreground dark:text-secondary-foreground/50">
            &copy; {new Date().getFullYear()} LS Solutions. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
