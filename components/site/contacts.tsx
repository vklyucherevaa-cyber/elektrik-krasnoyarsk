import { Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { contact } from '@/lib/site-data'

export function Contacts() {
  const items = [
    {
      icon: Phone,
      label: 'Телефон',
      value: contact.phone,
      href: contact.phoneHref,
    },
    {
      icon: Mail,
      label: 'Почта',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Clock,
      label: 'Режим работы',
      value: contact.hours,
    },
  ]

  return (
    <section id="contacts" className="scroll-mt-20 bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Контакты"
          title="Свяжитесь удобным способом"
          description="Звоните напрямую или напишите в мессенджер — отвечаю лично и быстро."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <item.icon className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-lg font-semibold text-primary transition-colors hover:text-accent"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-lg font-semibold text-primary">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span className="text-lg font-semibold text-primary">WhatsApp</span>
            </span>
            <span className="text-sm font-medium text-accent">Написать</span>
          </a>
          <a
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <Send className="h-6 w-6" />
              </span>
              <span className="text-lg font-semibold text-primary">Telegram</span>
            </span>
            <span className="text-sm font-medium text-accent">Написать</span>
          </a>
        </div>
      </div>
    </section>
  )
}
