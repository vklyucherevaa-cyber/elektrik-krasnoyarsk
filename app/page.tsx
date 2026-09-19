'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Gauge,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Plug,
  Send,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from 'lucide-react'

const PHONE = '+79994461423'
const PHONE_DISPLAY = '+7 999 446-14-23'
const EMAIL = 'rodionklyucherev@mail.ru'

const TELEGRAM = 'https://t.me/electrickrasnoyarsk'
const MAX =
  'https://max.ru/u/f9LHodD0cOINUS7zYJBaf5oFJY_R_Q0qm9Zp76K3AMUEAuJ6bcfg6d-Agd8'

const COLORS = {
  blue: '#102A43',
  blueDark: '#0B2238',
  blueSecond: '#1E4D6E',
  blueSoft: '#F1F6FA',
  orange: '#F97316',
  orangeSoft: '#FFF1E8',
}

const services = [
  {
    icon: Home,
    title: 'Электрика под ключ',
    text: 'Квартиры, частные дома и небольшие офисы.',
  },
  {
    icon: Plug,
    title: 'Розетки и выключатели',
    text: 'Монтаж и замена электрических точек.',
  },
  {
    icon: Lightbulb,
    title: 'Освещение',
    text: 'Люстры, точечный свет и LED-подсветка.',
  },
  {
    icon: Zap,
    title: 'Прокладка кабеля',
    text: 'Открытая прокладка, гофра и штроба.',
  },
  {
    icon: Gauge,
    title: 'Электрощиты',
    text: 'Сборка, монтаж и установка автоматики.',
  },
  {
    icon: Wrench,
    title: 'Штробление',
    text: 'Подготовка трасс под скрытую проводку.',
  },
  {
    icon: ShieldCheck,
    title: 'Аварийный вызов',
    text: 'Поиск неисправности и отключение аварийной линии.',
  },
  {
    icon: Zap,
    title: 'Электрический тёплый пол',
    text: 'Монтаж и подключение.',
  },
]

const priceGroups = [
  {
    title: 'Монтаж',
    items: [
      ['Розетка / выключатель', 'от 500 ₽', 'шт'],
      ['Прокладка кабеля в штробе', '400 ₽', 'м'],
      ['Прокладка кабеля открыто', '200 ₽', 'м'],
      ['Прокладка кабеля в гофре', '250 ₽', 'м'],
      ['Электрический тёплый пол', '1 500 ₽', 'м²'],
    ],
  },
  {
    title: 'Щиты',
    items: [
      ['Сборка щита до 12 модулей', '5 000 ₽', 'шт'],
      ['Сборка щита до 36 модулей', '12 000 ₽', 'шт'],
      ['Сборка щита до 72 модулей', '22 000 ₽', 'шт'],
      ['Установка автомата / УЗО', '500 ₽', 'шт'],
    ],
  },
  {
    title: 'Освещение',
    items: [
      ['Установка люстры', '1 500 ₽', 'шт'],
      ['Точечный светильник', '1 000 ₽', 'шт'],
      ['LED-подсветка с блоком питания', '900 ₽', 'шт'],
    ],
  },
]

const faqs = [
  {
    q: 'Выезд действительно бесплатный?',
    a: 'Да. Выезд по Красноярску и пригород, замер и составление сметы — 0 ₽.',
  },
  {
    q: 'Материалы входят в стоимость?',
    a: 'Нет. Калькулятор показывает примерную стоимость работ. Материалы закупаются отдельно.',
  },
  {
    q: 'Влияет ли площадь на стоимость?',
    a: 'Нет. Площадь нужна для понимания объекта и передаётся в заявку, но сама по себе стоимость не увеличивается.',
  },
  {
    q: 'Что входит в аварийный вызов?',
    a: 'Выезд, поиск неисправности, короткого замыкания или обрыва и отключение повреждённой линии. Ремонт неисправности оплачивается отдельно.',
  },
  {
    q: 'Можно ли оставить заявку после расчёта?',
    a: 'Да. Выбранные параметры и примерная стоимость автоматически попадут в форму.',
  },
]

type Quote = {
  objectType: string
  area: number
  outlets: number
  switches: number
  chandeliers: number
  spotlights: number
  ledLights: number
  wallMaterial: string
  panelType: string
  panelModules: string
  cableType: string
  cableLength: number
  pointsCost: number
  lightingCost: number
  panelCost: number
  cableCost: number
  total: number
}

export default function Page() {
  const [objectType, setObjectType] = useState('')
  const [area, setArea] = useState('')

  const [outlets, setOutlets] = useState(0)
  const [switches, setSwitches] = useState(0)

  const [chandeliers, setChandeliers] = useState(0)
  const [spotlights, setSpotlights] = useState(0)
  const [ledLights, setLedLights] = useState(0)

  const [wallMaterial, setWallMaterial] = useState('')

  const [panelType, setPanelType] = useState('')
  const [panelModules, setPanelModules] = useState('до 12 модулей')

  const [cableType, setCableType] = useState('не требуется')
  const [cableLength, setCableLength] = useState('')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [consent, setConsent] = useState(false)

  const [formStatus, setFormStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const [formError, setFormError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const pointsCost = (outlets + switches) * 500

  const lightingCost =
    chandeliers * 1500 +
    spotlights * 1000 +
    ledLights * 900

  const panelCost =
    panelType === 'существующий'
      ? 0
      : panelType === 'новый'
        ? panelModules === 'до 12 модулей'
          ? 5000
          : panelModules === 'до 36 модулей'
            ? 12000
            : 22000
        : panelType === 'замена'
          ? panelModules === 'до 12 модулей'
            ? 5000
            : panelModules === 'до 36 модулей'
              ? 12000
              : 22000
          : 0

  const cableCost =
    cableType === 'в штробе'
      ? Number(cableLength || 0) * 400
      : cableType === 'открыто'
        ? Number(cableLength || 0) * 200
        : cableType === 'в гофре'
          ? Number(cableLength || 0) * 250
          : 0

  const total =
    pointsCost +
    lightingCost +
    panelCost +
    cableCost

  const quote: Quote = useMemo(
    () => ({
      objectType,
      area: Number(area || 0),
      outlets,
      switches,
      chandeliers,
      spotlights,
      ledLights,
      wallMaterial,
      panelType,
      panelModules,
      cableType,
      cableLength: Number(cableLength || 0),
      pointsCost,
      lightingCost,
      panelCost,
      cableCost,
      total,
    }),
    [
      objectType,
      area,
      outlets,
      switches,
      chandeliers,
      spotlights,
      ledLights,
      wallMaterial,
      panelType,
      panelModules,
      cableType,
      cableLength,
      pointsCost,
      lightingCost,
      panelCost,
      cableCost,
      total,
    ],
  )

  function quoteText() {
    return [
      `Тип объекта: ${quote.objectType || 'не указан'}`,
      `Площадь: ${quote.area || 'не указана'} м²`,
      `Розетки: ${quote.outlets}`,
      `Выключатели: ${quote.switches}`,
      `Люстры: ${quote.chandeliers}`,
      `Точечные светильники: ${quote.spotlights}`,
      `LED-подсветка: ${quote.ledLights}`,
      `Материал стен: ${quote.wallMaterial || 'не указан'}`,
      `Электрощит: ${quote.panelType || 'не указан'}`,
      `Количество модулей: ${quote.panelModules}`,
      `Прокладка кабеля: ${quote.cableType}`,
      quote.cableLength
        ? `Длина кабеля: ${quote.cableLength} м`
        : '',
      `Примерная стоимость работ: ${quote.total.toLocaleString('ru-RU')} ₽`,
      `Материалы: не включены, закупаются отдельно.`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  function goToRequest() {
    document.getElementById('request')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  async function submitRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!consent) {
      setFormError(
        'Необходимо согласиться на обработку персональных данных.',
      )
      setFormStatus('error')
      return
    }

    setFormStatus('loading')
    setFormError('')

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${EMAIL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            comment: comment || 'Комментарий не указан.',
            calculation: quoteText(),
            consent:
              'Согласие на обработку персональных данных получено.',
            _subject: 'Новая заявка — Электрик Красноярск',
            _captcha: 'false',
          }),
        },
      )

      const result = await response.json()

      if (!response.ok || result.success === false) {
        throw new Error('send_failed')
      }

      setFormStatus('success')
      setName('')
      setPhone('')
      setComment('')
    } catch {
      setFormStatus('error')
      setFormError(
        `Не удалось отправить заявку. Позвоните по номеру ${PHONE_DISPLAY}.`,
      )
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        html {
          scroll-behavior: smooth;
        }

        body,
        button,
        input,
        textarea,
        select {
          font-family: 'Manrope', 'Segoe UI', sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes floatCard {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes softPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }

          50% {
            opacity: 0.7;
            transform: scale(1.04);
          }
        }

        .marquee-track {
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        .float-card {
          animation: floatCard 7s ease-in-out infinite;
        }

        .soft-glow {
          animation: softPulse 6s ease-in-out infinite;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 700ms ease,
            transform 700ms ease;
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 {
          transition-delay: 80ms;
        }

        .reveal-delay-2 {
          transition-delay: 160ms;
        }

        .reveal-delay-3 {
          transition-delay: 240ms;
        }

        .grid-pattern {
          background-image:
            linear-gradient(
              rgba(16, 42, 67, 0.065) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(16, 42, 67, 0.065) 1px,
              transparent 1px
            );
          background-size: 44px 44px;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .marquee-track,
          .float-card,
          .soft-glow {
            animation: none;
          }

          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a href="#top" className="shrink-0">
            <div className="text-sm font-extrabold tracking-[0.14em] text-slate-950">
              ЭЛЕКТРИК
            </div>

            <div
              className="text-xs font-extrabold tracking-[0.23em]"
              style={{ color: COLORS.orange }}
            >
              КРАСНОЯРСК
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            <a href="#services" className="transition hover:text-orange-500">
              Услуги
            </a>

            <a href="#prices" className="transition hover:text-orange-500">
              Цены
            </a>

            <a href="#calculator" className="transition hover:text-orange-500">
              Калькулятор
            </a>

            <a href="#faq" className="transition hover:text-orange-500">
              FAQ
            </a>

            <a href="#contacts" className="transition hover:text-orange-500">
              Контакты
            </a>
          </nav>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold tracking-[0.01em] text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: COLORS.blue }}
          >
            <Phone className="h-4 w-4" />

            <span className="hidden sm:inline">
              {PHONE_DISPLAY}
            </span>

            <span className="sm:hidden">Позвонить</span>
          </a>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden bg-white"
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern" />

        <div
          className="soft-glow pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.orange}18` }}
        />

        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.blue}12` }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:py-24">
          <div className="fade-up">
            <div
              className="reveal inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-[0.08em]"
              style={{
                borderColor: `${COLORS.blue}24`,
                color: COLORS.blue,
                backgroundColor: COLORS.blueSoft,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS.orange }}
              />

              КРАСНОЯРСК И ПРИГОРОД
            </div>

            <h1 className="reveal reveal-delay-1 mt-7 max-w-4xl text-5xl font-extrabold leading-[0.97] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-8xl">
              Электрика,
              <span className="block">которая работает,</span>
        
            </h1>

            <p className="reveal reveal-delay-2 mt-7 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl">
              Электромонтажные работы для квартир, домов и небольших офисов.
              Аккуратно, надёжно и без посредников.
            </p>

            <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-7 text-base font-semibold tracking-[0.02em] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: COLORS.orange }}
              >
                <Phone className="h-5 w-5" />
                {PHONE_DISPLAY}
              </a>

              <a
                href="#calculator"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border px-7 text-base font-semibold tracking-[0.015em] transition duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${COLORS.blue}30`,
                  color: COLORS.blue,
                }}
              >
                Рассчитать стоимость
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck
                  className="h-4 w-4"
                  style={{ color: COLORS.orange }}
                />
                Гарантия до 5 лет
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3
                  className="h-4 w-4"
                  style={{ color: COLORS.orange }}
                />
                Ежедневно 7:00–22:00
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div
              className="soft-glow absolute -inset-8 rounded-[44px] blur-3xl"
              style={{ backgroundColor: `${COLORS.orange}12` }}
            />

            <div
              className="float-card relative overflow-hidden rounded-[34px] border bg-white p-4 shadow-2xl"
              style={{ borderColor: `${COLORS.blue}16` }}
            >
              <div className="relative h-[350px] overflow-hidden rounded-[28px] bg-slate-900">
                <Image
                  src="/images/hero-electrician.png"
                  alt="Электромонтажные работы"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 rounded-2xl bg-white/95 px-4 py-3 shadow-xl">
                  <div className="text-sm font-extrabold text-slate-900">
                    4 группа
                  </div>

                  <div className="text-xs text-slate-500">
                    по электробезопасности
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <div className="text-3xl font-extrabold">
                      200+
                    </div>

                    <div className="text-sm text-white/70">
                      выполненных объектов
                    </div>
                  </div>

                  <div
                    className="rounded-2xl px-4 py-3 text-right"
                    style={{ backgroundColor: COLORS.orange }}
                  >
                    <div className="text-lg font-bold text-white">
                      до 5 лет
                    </div>

                    <div className="text-xs text-white/80">
                      гарантии
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-2">
                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: COLORS.blueSoft }}
                >
                  <div
                    className="text-2xl font-extrabold"
                    style={{ color: COLORS.blue }}
                  >
                    10 лет
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    опыта
                  </div>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: COLORS.orangeSoft }}
                >
                  <div
                    className="text-2xl font-extrabold"
                    style={{ color: COLORS.blue }}
                  >
                    0 ₽
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    замер и смета
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="overflow-hidden py-4 text-white"
        style={{ backgroundColor: COLORS.blue }}
      >
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap text-sm font-bold tracking-[0.08em]">
          {Array.from({ length: 2 }).flatMap((_, block) => [
            <span key={`${block}-1`}>
              КРАСНОЯРСК И ПРИГОРОД
            </span>,

            <span
              key={`${block}-2`}
              style={{ color: COLORS.orange }}
            >
              •
            </span>,

            <span key={`${block}-3`}>
              10 ЛЕТ ОПЫТА
            </span>,

            <span
              key={`${block}-4`}
              style={{ color: COLORS.orange }}
            >
              •
            </span>,

            <span key={`${block}-5`}>
              200+ ОБЪЕКТОВ
            </span>,

            <span
              key={`${block}-6`}
              style={{ color: COLORS.orange }}
            >
              •
            </span>,

            <span key={`${block}-7`}>
              4 ГРУППА ЭЛЕКТРОБЕЗОПАСНОСТИ
            </span>,

            <span
              key={`${block}-8`}
              style={{ color: COLORS.orange }}
            >
              •
            </span>,

            <span key={`${block}-9`}>
              ГАРАНТИЯ ДО 5 ЛЕТ
            </span>,

            <span
              key={`${block}-10`}
              style={{ color: COLORS.orange }}
            >
              •
            </span>,

            <span key={`${block}-11`}>
              БЕЗ ПОСРЕДНИКОВ
            </span>,

            <span
              key={`${block}-12`}
              style={{ color: COLORS.orange }}
            >
              •
            </span>,
          ])}
        </div>
      </section>

      <section
        className="border-b border-white/10 py-7 text-white"
        style={{ backgroundColor: COLORS.blueSecond }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">
          {[
            ['10 лет', 'опыта'],
            ['200+', 'объектов'],
            ['4 группа', 'электробезопасности'],
            ['до 5 лет', 'гарантии'],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border-r border-white/10 px-4 last:border-r-0 sm:px-7"
            >
              <div className="text-2xl font-extrabold sm:text-3xl">
                {value}
              </div>

              <div className="mt-1 text-sm text-white/55">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="px-4 py-20 sm:px-6 sm:py-28"
        style={{ backgroundColor: COLORS.blueSoft }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="reveal max-w-2xl">
            <div
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: COLORS.orange }}
            >
              Услуги
            </div>

            <h2
              className="mt-3 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
              style={{ color: COLORS.blue }}
            >
              Всё необходимое по электрике
            </h2>

            <p className="mt-4 text-lg leading-7 text-slate-500">
              От замены одной розетки до комплексных электромонтажных работ.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <article
                  key={service.title}
                  className={`reveal reveal-delay-${(index % 3) + 1} group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white transition duration-300 group-hover:scale-105"
                      style={{ backgroundColor: COLORS.blue }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-xs font-bold text-slate-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3
                    className="mt-6 text-xl font-bold"
                    style={{ color: COLORS.blue }}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {service.text}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="prices"
        className="bg-white px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: COLORS.orange }}
              >
                Прайс
              </div>

              <h2
                className="mt-3 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
                style={{ color: COLORS.blue }}
              >
                Стоимость основных работ
              </h2>

              <p className="mt-4 text-lg leading-7 text-slate-500">
                Прозрачные цены на основные виды работ. Материалы
                оплачиваются отдельно.
              </p>
            </div>

            <a
              href="#calculator"
              className="inline-flex w-fit items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
              style={{ backgroundColor: COLORS.blue }}
            >
              Перейти к калькулятору
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {priceGroups.map((group, groupIndex) => (
              <div
                key={group.title}
                className={`reveal reveal-delay-${groupIndex + 1} overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition duration-500 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div
                  className="border-b border-slate-200 px-6 py-5"
                  style={{
                    backgroundColor:
                      groupIndex === 0
                        ? COLORS.orangeSoft
                        : COLORS.blueSoft,
                  }}
                >
                  <h3
                    className="font-bold"
                    style={{ color: COLORS.blue }}
                  >
                    {group.title}
                  </h3>
                </div>

                <div>
                  {group.items.map(([nameValue, price, unit]) => (
                    <div
                      key={nameValue}
                      className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 last:border-b-0"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {nameValue}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {unit}
                        </div>
                      </div>

                      <div
                        className="shrink-0 text-right font-bold"
                        style={{ color: COLORS.orange }}
                      >
                        {price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="reveal mt-6 rounded-3xl px-6 py-5 text-sm text-slate-600"
            style={{ backgroundColor: COLORS.orangeSoft }}
          >
            <strong className="text-slate-950">
              Замер и составление сметы — 0 ₽.
            </strong>{' '}
            Материалы закупаются отдельно.
          </div>
        </div>
      </section>

      <section
        id="calculator"
        className="px-4 py-20 sm:px-6 sm:py-28"
        style={{ backgroundColor: COLORS.blueSoft }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="reveal max-w-3xl">
            <div
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: COLORS.orange }}
            >
              Калькулятор
            </div>

            <h2
              className="mt-3 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
              style={{ color: COLORS.blue }}
            >
              Рассчитайте примерную стоимость работ
            </h2>

            <p className="mt-4 text-lg leading-7 text-slate-500">
              Площадь нужна для заявки, но сама по себе не увеличивает
              стоимость.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_390px]">
            <div className="reveal rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <CalculatorStep
                number="1"
                title="Тип объекта"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    'Квартира',
                    'Частный дом',
                    'Небольшой офис',
                  ].map((item) => (
                    <OptionButton
                      key={item}
                      active={objectType === item}
                      onClick={() => setObjectType(item)}
                    >
                      {item}
                    </OptionButton>
                  ))}
                </div>
              </CalculatorStep>

              <CalculatorStep
                number="2"
                title="Площадь"
              >
                <div className="max-w-sm">
                  <input
                    type="number"
                    min="1"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Например, 65"
                    className="mt-1 h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg font-semibold outline-none transition focus:border-orange-400"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Площадь не влияет на сумму автоматически.
                  </p>
                </div>
              </CalculatorStep>

              <CalculatorStep
                number="3"
                title="Розетки и выключатели"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Counter
                    title="Розетки"
                    value={outlets}
                    onChange={setOutlets}
                  />

                  <Counter
                    title="Выключатели"
                    value={switches}
                    onChange={setSwitches}
                  />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  От 500 ₽ за розетку или выключатель.
                </p>
              </CalculatorStep>

              <CalculatorStep
                number="4"
                title="Освещение"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <Counter
                    title="Люстры"
                    value={chandeliers}
                    onChange={setChandeliers}
                  />

                  <Counter
                    title="Точечные светильники"
                    value={spotlights}
                    onChange={setSpotlights}
                  />

                  <Counter
                    title="LED-подсветка"
                    value={ledLights}
                    onChange={setLedLights}
                  />
                </div>

                <div className="mt-3 grid gap-1 text-xs text-slate-400 sm:grid-cols-3">
                  <span>1 500 ₽ / шт</span>
                  <span>1 000 ₽ / шт</span>
                  <span>900 ₽ / шт</span>
                </div>
              </CalculatorStep>

              <CalculatorStep
                number="5"
                title="Материал стен"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Бетон',
                    'Кирпич',
                    'Газоблок',
                    'Дерево',
                  ].map((item) => (
                    <OptionButton
                      key={item}
                      active={wallMaterial === item}
                      onClick={() => setWallMaterial(item)}
                    >
                      {item}
                    </OptionButton>
                  ))}
                </div>
              </CalculatorStep>

              <CalculatorStep
                number="6"
                title="Электрощит"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['существующий', 'Существующий'],
                    ['новый', 'Новый щит'],
                    ['замена', 'Замена / расширение'],
                  ].map(([value, label]) => (
                    <OptionButton
                      key={value}
                      active={panelType === value}
                      onClick={() => setPanelType(value)}
                    >
                      {label}
                    </OptionButton>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="font-bold" style={{ color: COLORS.blue }}>
                    Количество модулей
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Выбор появляется после выбора любого варианта щита.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      ['до 12 модулей', 5000],
                      ['до 36 модулей', 12000],
                      ['до 72 модулей', 22000],
                    ].map(([label, price]) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setPanelModules(String(label))}
                        className={`rounded-2xl border p-4 text-left transition duration-300 ${
                          panelModules === label
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-slate-200 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="font-semibold">
                          {label}
                        </div>

                        <div
                          className="mt-2 text-sm font-bold"
                          style={{ color: COLORS.orange }}
                        >
                          {panelType === 'существующий'
                            ? 'без доплаты'
                            : `${Number(price).toLocaleString('ru-RU')} ₽`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CalculatorStep>

              <CalculatorStep
                number="7"
                title="Прокладка кабеля"
                last
              >
                <div className="grid gap-3 sm:grid-cols-4">
                  {[
                    ['не требуется', 'Не требуется'],
                    ['открыто', 'Открыто'],
                    ['в гофре', 'В гофре'],
                    ['в штробе', 'В штробе'],
                  ].map(([value, label]) => (
                    <OptionButton
                      key={value}
                      active={cableType === value}
                      onClick={() => {
                        setCableType(value)

                        if (value === 'не требуется') {
                          setCableLength('')
                        }
                      }}
                    >
                      {label}
                    </OptionButton>
                  ))}
                </div>

                <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
                  <span>Открыто — 200 ₽/м</span>
                  <span>В гофре — 250 ₽/м</span>
                  <span>В штробе — 400 ₽/м</span>
                </div>

                {cableType !== 'не требуется' ? (
                  <div className="mt-5 max-w-sm">
                    <label className="text-sm font-semibold">
                      Длина кабеля, м
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={cableLength}
                      onChange={(e) => setCableLength(e.target.value)}
                      placeholder="Например, 25"
                      className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg font-semibold outline-none transition focus:border-orange-400"
                    />
                  </div>
                ) : null}
              </CalculatorStep>
            </div>

            <aside className="reveal h-fit rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl lg:sticky lg:top-24">
              <div
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: COLORS.orange }}
              >
                Расчёт
              </div>

              <h3
                className="mt-3 text-2xl font-extrabold"
                style={{ color: COLORS.blue }}
              >
                Примерная стоимость
              </h3>

              <div
                className="mt-5 text-5xl font-extrabold"
                style={{ color: COLORS.blue }}
              >
                {total.toLocaleString('ru-RU')} ₽
              </div>

              <div className="mt-7 space-y-3 border-t border-slate-200 pt-6 text-sm">
                <LightLine
                  label="Розетки и выключатели"
                  value={pointsCost}
                />

                <LightLine
                  label="Освещение"
                  value={lightingCost}
                />

                <LightLine
                  label="Электрощит"
                  value={panelCost}
                />

                <LightLine
                  label="Кабель"
                  value={cableCost}
                />
              </div>

              <div
                className="mt-6 rounded-2xl p-4"
                style={{ backgroundColor: COLORS.blueSoft }}
              >
                <div className="flex gap-3">
                  <ShieldCheck
                    className="h-5 w-5 shrink-0"
                    style={{ color: COLORS.orange }}
                  />

                  <div>
                    <div className="font-bold">
                      Без учёта материалов
                    </div>

                    <div className="mt-1 text-xs leading-5 text-slate-500">
                      Материалы закупаются отдельно.
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={goToRequest}
                className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-semibold tracking-[0.02em] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: COLORS.orange }}
              >
                Оставить заявку
                <ArrowRight className="h-5 w-5" />
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="request"
        className="px-4 py-20 sm:px-6 sm:py-28"
        style={{ backgroundColor: '#F7F9FB' }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="reveal">
            <div
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: COLORS.orange }}
            >
              Обратная связь
            </div>

            <h2
              className="mt-3 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
              style={{ color: COLORS.blue }}
            >
              Оставьте заявку
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-7 text-slate-500">
              Заполните имя и номер телефона. Если вы пользовались
              калькулятором, весь расчёт автоматически прикрепится к заявке.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-3 font-semibold text-slate-900"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: COLORS.blue }}
                >
                  <Phone className="h-5 w-5" />
                </span>

                {PHONE_DISPLAY}
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 font-semibold text-slate-900"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: COLORS.blue }}
                >
                  <Mail className="h-5 w-5" />
                </span>

                {EMAIL}
              </a>

              <div className="flex items-center gap-3 font-semibold text-slate-900">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: COLORS.blue }}
                >
                  <MapPin className="h-5 w-5" />
                </span>

                Красноярск и пригород
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={TELEGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  style={{ backgroundColor: COLORS.blue }}
                >
                  Telegram
                </a>

                <a
                  href={MAX}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  style={{ backgroundColor: COLORS.blue }}
                >
                  MAX
                </a>
              </div>
            </div>
          </div>

          <div className="reveal rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: COLORS.orange }}
                >
                  <Check className="h-8 w-8" />
                </div>

                <h3
                  className="mt-5 text-2xl font-extrabold"
                  style={{ color: COLORS.blue }}
                >
                  Заявка отправлена
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Заявка отправлена. С вами свяжутся по указанному номеру.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submitRequest}
                className="space-y-5"
              >
                <div>
                  <label className="text-sm font-semibold">
                    Ваше имя
                  </label>

                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например, Анна"
                    className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Телефон
                  </label>

                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 999 446-14-23"
                    className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Комментарий
                  </label>

                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Что нужно сделать?"
                    rows={5}
                    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: COLORS.blueSoft }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-[0.18em]"
                    style={{ color: COLORS.orange }}
                  >
                    Данные расчёта
                  </div>

                  <div className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                    {quoteText()}
                  </div>
                </div>

                <label className="flex items-start gap-3 text-xs leading-5 text-slate-500">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-orange-500"
                  />

                  <span>
                    Я согласен(на) на обработку моих персональных данных в
                    соответствии с{' '}
                    <a
                      href="/privacy"
                      className="font-semibold underline"
                    >
                      Политикой обработки персональных данных
                    </a>
                    .
                  </span>
                </label>

                {formStatus === 'error' ? (
                  <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                    {formError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-semibold tracking-[0.02em] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: COLORS.orange }}
                >
                  {formStatus === 'loading'
                    ? 'Отправляем…'
                    : 'Отправить заявку'}

                  <Send className="h-5 w-5" />
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Материалы в расчёт не входят и закупаются отдельно.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="bg-white px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-4xl">
          <div className="reveal text-center">
            <div
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: COLORS.orange }}
            >
              FAQ
            </div>

            <h2
              className="mt-3 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl"
              style={{ color: COLORS.blue }}
            >
              Частые вопросы
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((item, index) => {
              const open = openFaq === index

              return (
                <div
                  key={item.q}
                  className="reveal overflow-hidden rounded-3xl border border-slate-200"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(open ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 bg-white px-6 py-5 text-left font-semibold"
                  >
                    <span>{item.q}</span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                      style={{ color: COLORS.orange }}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      open
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-sm leading-7 text-slate-500">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="contacts"
        className="px-4 py-20 text-white sm:px-6 sm:py-24"
        style={{ backgroundColor: COLORS.blue }}
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-center">
          <div className="reveal">
            <div
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: COLORS.orange }}
            >
              Контакты
            </div>

            <h2 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-0.035em] sm:text-6xl">
              Нужна помощь с электрикой?
            </h2>

            <p className="mt-5 text-lg text-white/65">
              Красноярск и пригород
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" style={{ color: COLORS.orange }} />
                Ежедневно 7:00–22:00
              </span>

              <span className="inline-flex items-center gap-2">
                <ShieldCheck
                  className="h-4 w-4"
                  style={{ color: COLORS.orange }}
                />
                Гарантия до 5 лет
              </span>
            </div>
          </div>

          <div className="reveal flex flex-col gap-3 sm:min-w-[350px]">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 text-base font-semibold tracking-[0.02em] transition duration-300 hover:-translate-y-1"
              style={{ color: COLORS.blue }}
            >
              <Phone className="h-5 w-5" />
              {PHONE_DISPLAY}
            </a>

            <a
              href="#request"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-7 text-base font-semibold tracking-[0.02em] text-white transition duration-300 hover:-translate-y-1"
              style={{ backgroundColor: COLORS.orange }}
            >
              Оставить заявку
              <ArrowRight className="h-5 w-5" />
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-semibold transition hover:bg-white/15"
              >
                Telegram
              </a>

              <a
                href={MAX}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-semibold transition hover:bg-white/15"
              >
                MAX
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="px-4 py-9 text-white sm:px-6"
        style={{ backgroundColor: COLORS.blueSecond }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-extrabold tracking-[0.12em]">
              ЭЛЕКТРИК КРАСНОЯРСК
            </div>

            <div className="mt-2 text-sm text-white/45">
              Красноярск и пригород
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Навигация
            </div>

            <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
              <a href="#services" className="hover:text-white">
                Услуги
              </a>

              <a href="#prices" className="hover:text-white">
                Цены
              </a>

              <a href="#calculator" className="hover:text-white">
                Калькулятор
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Связь
            </div>

            <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
              <a href={`tel:${PHONE}`} className="hover:text-white">
                {PHONE_DISPLAY}
              </a>

              <a href={`mailto:${EMAIL}`} className="hover:text-white">
                {EMAIL}
              </a>

              <div>Красноярск и пригород</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Документы
            </div>

            <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
              <a href="/privacy" className="hover:text-white">
                Политика обработки персональных данных
              </a>

              <a href="#request" className="hover:text-white">
                Оставить заявку
              </a>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15"
              >
                Telegram
              </a>

              <a
                href={MAX}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15"
              >
                MAX
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/35">
          Материалы не входят в стоимость работ и закупаются отдельно.
        </div>
      </footer>
    </main>
  )
}

function CalculatorStep({
  number,
  title,
  children,
  last = false,
}: {
  number: string
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div
      className={`${last ? '' : 'border-b border-slate-100 pb-10'} ${
        number === '1' ? '' : 'mt-10'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: COLORS.blue }}
        >
          {number}
        </span>

        <h3
          className="text-2xl font-bold"
          style={{ color: COLORS.blue }}
        >
          {title}
        </h3>
      </div>

      <div className="mt-5">{children}</div>
    </div>
  )
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left font-semibold transition duration-300 ${
        active
          ? 'border-orange-400 bg-orange-50'
          : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-orange-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          style={{
            color: active ? COLORS.orange : '#243B53',
          }}
        >
          {children}
        </span>

        {active ? (
          <Check
            className="h-5 w-5 shrink-0"
            style={{ color: COLORS.orange }}
          />
        ) : null}
      </div>
    </button>
  )
}

function Counter({
  title,
  value,
  onChange,
}: {
  title: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="font-semibold"
        style={{ color: COLORS.blue }}
      >
        {title}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            onChange(Math.max(0, value - 1))
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold text-slate-700 hover:bg-slate-200"
        >
          −
        </button>

        <span
          className="text-2xl font-extrabold"
          style={{ color: COLORS.blue }}
        >
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-white transition hover:-translate-y-0.5"
          style={{ backgroundColor: COLORS.blue }}
        >
          +
        </button>
      </div>
    </div>
  )
}

function LightLine({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">{label}</span>

      <span className="font-semibold text-slate-900">
        {value.toLocaleString('ru-RU')} ₽
      </span>
    </div>
  )
}