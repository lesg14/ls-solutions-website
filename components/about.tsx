import Image from "next/image"
import { CircleCheck } from "lucide-react"

const points = [
  "Atención personalizada y honesta en cada servicio.",
  "Soluciones tanto para hogares como para empresas.",
  "Respuesta rápida y directa por WhatsApp.",
  "Precios justos y asesoría sin compromiso.",
]

export function About() {
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
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Sobre nosotros</p>
          <h2 className="text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
            Tu aliado tecnológico de confianza
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            En LS Solutions combinamos experiencia técnica y compromiso para ofrecerte soluciones completas: desde
            mantener tu computador en óptimas condiciones hasta crear el sitio web o la automatización que tu negocio
            necesita para crecer.
          </p>
          <ul className="flex flex-col gap-3">
            {points.map((point) => (
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
