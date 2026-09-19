'use client'

import Image from 'next/image'
import { ArrowRight, PhoneCall, ShieldCheck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { contact } from '@/lib/site-data'

export function Hero() {
  const scrollToRequest = () => {
    document.getElementById('request')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-electrician.png"
          alt="Электромонтажные работы"
          fill
          priority
          className="object-cover opacity-25"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/55" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-28 sm:px-6">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
              <ShieldCheck className="h-4 w-4 text-accent" />
              10 лет опыта
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
              <MapPin className="h-4 w-4 text-accent" />
              Красноярск и пригород
            </span>
          </div>

          <h1 className="text-balance text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Электрик в Красноярске
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Электромонтажные работы для квартир, домов и небольших офисов.
            Аккуратно, надёжно и без посредников.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              onClick={scrollToRequest}
              className="h-12 bg-accent px-7 text-base text-accent-foreground"
            >
              Рассчитать стоимость
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <a href={contact.phoneHref}>
                <PhoneCall className="h-5 w-5" />
                {contact.phone}
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="text-2xl font-semibold sm:text-3xl">200+</div>
            <div className="mt-1 text-sm text-white/65">
              выполненных объектов
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="text-2xl font-semibold sm:text-3xl">10 лет</div>
            <div className="mt-1 text-sm text-white/65">опыта</div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="text-2xl font-semibold sm:text-3xl">4 группа</div>
            <div className="mt-1 text-sm text-white/65">
              по электробезопасности
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="text-2xl font-semibold sm:text-3xl">до 5 лет</div>
            <div className="mt-1 text-sm text-white/65">гарантии</div>
          </div>
        </div>
      </div>
    </section>
  )
}