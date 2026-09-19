'use client'

import { useState } from 'react'
import { Check, ShieldCheck, Clock, Wallet } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { submitRequest } from '@/app/actions/requests'
import { serviceOptions } from '@/lib/site-data'

const perks = [
  { icon: Wallet, text: 'Бесплатный выезд и смета' },
  { icon: Clock, text: 'Ответлю в течение 15 минут' },
  { icon: ShieldCheck, text: 'Договор и гарантия 3 года' },
]

export function RequestForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const res = await submitRequest({ name, phone, service, message })
    if (res.ok) {
      setStatus('done')
      setName('')
      setPhone('')
      setService('')
      setMessage('')
    } else {
      setStatus('error')
      setError(res.error ?? 'Не удалось отправить заявку.')
    }
  }

  return (
    <section id="request" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-10 bg-primary p-8 text-primary-foreground sm:p-10 lg:p-12">
              <div>
                <SectionHeading
                  label="Заявка"
                  title="Оставьте заявку на расчёт"
                  className="[&_h2]:text-white [&_span]:text-accent"
                />
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-white/70">
                  Опишите задачу — перезвоню, уточню детали и предложу решение. Никакого спама и
                  навязчивых звонков.
                </p>
              </div>
              <ul className="flex flex-col gap-4">
                {perks.map((perk) => (
                  <li key={perk.text} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent">
                      <perk.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-white/85">{perk.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              {status === 'done' ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-8 w-8" />
                  </span>
                  <h3 className="text-2xl font-semibold text-primary">Заявка отправлена</h3>
                  <p className="max-w-sm text-muted-foreground">
                    Спасибо! Свяжусь с вами в ближайшее время, чтобы уточнить детали.
                  </p>
                  <Button variant="outline" onClick={() => setStatus('idle')} className="mt-2">
                    Отправить ещё одну
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="req-name">Как вас зовут</Label>
                    <Input
                      id="req-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="req-phone">Телефон</Label>
                    <Input
                      id="req-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="req-service">Какая нужна услуга</Label>
                    <select
                      id="req-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Выберите услугу</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="req-message">Комментарий (необязательно)</Label>
                    <Textarea
                      id="req-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Коротко опишите объект и задачу"
                      rows={3}
                    />
                  </div>

                  {error ? <p className="text-sm text-destructive">{error}</p> : null}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {status === 'loading' ? 'Отправка…' : 'Отправить заявку'}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
