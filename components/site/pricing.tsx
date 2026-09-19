import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Button } from '@/components/ui/button'
import { priceGroups } from '@/lib/site-data'

export function Pricing() {
  return (
    <section id="prices" className="scroll-mt-20 bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Цены"
          title="Прозрачная стоимость работ"
          description="Ниже — ориентировочные расценки на основные работы. Точную смету составлю после бесплатного выезда и замера."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {priceGroups.map((group) => (
            <div
              key={group.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold text-primary">{group.title}</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm leading-snug text-foreground">
                      {item.name}
                      <span className="ml-1 text-muted-foreground">/ {item.unit}</span>
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold text-primary">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-pretty text-base text-foreground">
            Нужна точная смета под ваш объект? Оставьте заявку — рассчитаю стоимость и приеду на
            бесплатный замер.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href="#request">
              Получить смету
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
