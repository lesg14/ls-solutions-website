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

const services = [
  {
    icon: Wrench,
    title: "Mantenimiento preventivo y correctivo",
    description:
      "Limpieza, diagnóstico y reparación de computadores para que trabajen sin fallas y prolonguen su vida útil.",
  },
  {
    icon: MonitorCog,
    title: "Instalación y activación de S.O.",
    description: "Instalación y activación de sistemas operativos Windows y Linux, optimizados y listos para usar.",
  },
  {
    icon: FileCheck2,
    title: "Licencias de Microsoft Office",
    description: "Instalación y activación de licencias de Microsoft Office originales para tu hogar o empresa.",
  },
  {
    icon: HardDrive,
    title: "Venta de componentes y accesorios",
    description: "Memorias, discos, fuentes, periféricos y accesorios con asesoría para elegir lo que necesitas.",
  },
  {
    icon: Gauge,
    title: "Repotenciación de equipos",
    description: "Asesoría y actualización de hardware para mejorar el rendimiento de tus equipos existentes.",
  },
  {
    icon: CodeXml,
    title: "Desarrollo de páginas web",
    description: "Sitios y aplicaciones web a la medida, según las necesidades y objetivos de tu negocio.",
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description: "Automatizamos tareas administrativas repetitivas para ahorrarte tiempo y reducir errores.",
  },
  {
    icon: Cpu,
    title: "Asesoría tecnológica",
    description: "Te orientamos para tomar las mejores decisiones en equipos, software y soluciones digitales.",
  },
]

export function Services() {
  return (
    <section id="servicios" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Nuestros servicios</p>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-foreground md:text-4xl">
            Todo lo que tu tecnología necesita en un solo lugar
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Desde el mantenimiento de tu equipo hasta el desarrollo de soluciones digitales para tu empresa.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="size-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-card-foreground">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/50 p-8 text-center">
          <h3 className="font-heading text-xl font-semibold text-foreground">
            ¿No sabes cuál servicio necesitas?
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Cuéntanos qué te pasa y te asesoramos sin compromiso para encontrar la mejor solución.
          </p>
          <a
            href={whatsappLink("Hola LS Solutions, necesito asesoría para elegir un servicio.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            <WhatsappIcon className="size-4" />
            Pedir asesoría gratis
          </a>
        </div>
      </div>
    </section>
  )
}
