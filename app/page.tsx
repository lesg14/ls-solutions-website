import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { WhatsappIcon } from "@/components/brand-icons"
import { whatsappLink } from "@/lib/site"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <SiteFooter />

      <a
        href={whatsappLink("Hola LS Solutions, quiero más información sobre sus servicios.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <WhatsappIcon className="size-7" />
      </a>
    </>
  )
}
