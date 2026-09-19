import { SectionHeading } from './section-heading'
import { services } from '@/lib/site-data'

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Услуги"
          title="Полный спектр электромонтажных работ"
          description="Беру объект от идеи до подключения — вам не нужно искать нескольких подрядчиков и координировать их между собой."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <service.icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
