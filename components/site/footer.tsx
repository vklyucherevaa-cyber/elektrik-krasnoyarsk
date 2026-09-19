import { Zap, Phone } from 'lucide-react'
import { contact } from '@/lib/site-data'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Zap className="h-5 w-5 fill-accent text-accent" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight">ВОЛЬТ</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                Красноярск
              </span>
            </span>
          </div>
          <p className="max-w-xs text-sm text-white/60">
            Частный электрик {contact.master}. Электромонтаж под ключ с гарантией по всему
            Красноярску.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={contact.phoneHref}
            className="flex items-center gap-2 text-base font-semibold transition-colors hover:text-accent"
          >
            <Phone className="h-4 w-4 text-accent" />
            {contact.phone}
          </a>
          <span className="text-white/60">{contact.email}</span>
          <span className="text-white/60">{contact.hours}</span>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} ВОЛЬТ Красноярск. Все права защищены.</span>
          <a href="/admin" className="transition-colors hover:text-white/70">
            Панель управления
          </a>
        </div>
      </div>
    </footer>
  )
}
