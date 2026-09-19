'use client'

import { useEffect, useState } from 'react'
import { Menu, Phone, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { contact } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#prices', label: 'Цены' },
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#projects', label: 'Работы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-5 w-5 fill-accent text-accent" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-primary">ВОЛЬТ</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Красноярск
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={contact.phoneHref}
            className="text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            {contact.phone}
          </a>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#request">Оставить заявку</a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-primary lg:hidden"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-base font-medium text-foreground/80"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2 text-base font-semibold text-primary"
              >
                <Phone className="h-4 w-4 text-accent" />
                {contact.phone}
              </a>
              <Button
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href="#request" onClick={() => setOpen(false)}>
                  Оставить заявку
                </a>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
