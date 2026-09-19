import { MapPin, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { geography, contact } from '@/lib/site-data'

export function Geography() {
  return (
    <section className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-8">
            <SectionHeading
              label="География"
              title="Работаю по всему Красноярску"
              description="Выезжаю во все районы города и пригород. Дорога в черте города — бесплатно."
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {geography.map((area) => (
                <li key={area} className="flex items-center gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-primary p-8 text-primary-foreground sm:p-10">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
              aria-hidden
            />
            <div className="relative flex flex-col gap-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <div className="text-2xl font-semibold">{contact.city}</div>
                <p className="mt-2 max-w-sm text-pretty text-white/70">
                  Базируюсь в Красноярске и знаю специфику местных домов — от сталинок до новостроек
                  и частного сектора.
                </p>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/15 pt-6">
                <span className="text-sm text-white/60">Режим работы</span>
                <span className="text-lg font-medium">{contact.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
