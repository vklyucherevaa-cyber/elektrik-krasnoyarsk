'use client'

import { useMemo, useState } from 'react'
import { Calculator as CalcIcon, ArrowRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type ObjectType = 'apartment' | 'house' | 'commercial'
type WorkType = 'full' | 'partial' | 'panel' | 'light'
type Complexity = 'standard' | 'premium'

const objectTypes: { id: ObjectType; label: string; base: number }[] = [
  { id: 'apartment', label: 'Квартира', base: 1100 },
  { id: 'house', label: 'Дом / коттедж', base: 1300 },
  { id: 'commercial', label: 'Коммерция', base: 1500 },
]

const workTypes: { id: WorkType; label: string; factor: number; hint: string }[] = [
  { id: 'full', label: 'Электрика под ключ', factor: 1, hint: 'Полная разводка' },
  { id: 'partial', label: 'Частичная замена', factor: 0.6, hint: 'Отдельные линии' },
  { id: 'panel', label: 'Сборка щита', factor: 0.35, hint: 'Щит и автоматика' },
  { id: 'light', label: 'Освещение', factor: 0.4, hint: 'Свет и розетки' },
]

const complexity: { id: Complexity; label: string; factor: number }[] = [
  { id: 'standard', label: 'Стандарт', factor: 1 },
  { id: 'premium', label: 'Премиум-материалы', factor: 1.35 },
]

function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value / 100) * 100) + ' ₽'
}

export function Calculator() {
  const [area, setArea] = useState(60)
  const [object, setObject] = useState<ObjectType>('apartment')
  const [work, setWork] = useState<WorkType>('full')
  const [comp, setComp] = useState<Complexity>('standard')

  const estimate = useMemo(() => {
    const base = objectTypes.find((o) => o.id === object)!.base
    const wf = workTypes.find((w) => w.id === work)!.factor
    const cf = complexity.find((c) => c.id === comp)!.factor
    const total = area * base * wf * cf
    return { low: total * 0.9, high: total * 1.15 }
  }, [area, object, work, comp])

  return (
    <section id="calculator" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Калькулятор"
          title="Прикиньте стоимость за минуту"
          description="Онлайн-расчёт даёт ориентир по бюджету. Финальная смета формируется после выезда и зависит от состояния объекта и выбранных материалов."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground">Площадь объекта</Label>
                <span className="text-sm font-semibold text-primary">{area} м²</span>
              </div>
              <input
                type="range"
                min={20}
                max={300}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-accent"
                aria-label="Площадь объекта в квадратных метрах"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>20 м²</span>
                <span>300 м²</span>
              </div>
            </div>

            <CalcGroup label="Тип объекта">
              {objectTypes.map((o) => (
                <ChoiceButton
                  key={o.id}
                  active={object === o.id}
                  onClick={() => setObject(o.id)}
                  title={o.label}
                />
              ))}
            </CalcGroup>

            <CalcGroup label="Вид работ">
              {workTypes.map((w) => (
                <ChoiceButton
                  key={w.id}
                  active={work === w.id}
                  onClick={() => setWork(w.id)}
                  title={w.label}
                  hint={w.hint}
                />
              ))}
            </CalcGroup>

            <CalcGroup label="Материалы">
              {complexity.map((c) => (
                <ChoiceButton
                  key={c.id}
                  active={comp === c.id}
                  onClick={() => setComp(c.id)}
                  title={c.label}
                />
              ))}
            </CalcGroup>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
            <div className="flex flex-col gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent">
                <CalcIcon className="h-6 w-6" />
              </span>
              <span className="mt-4 text-sm uppercase tracking-[0.2em] text-white/60">
                Ориентировочно
              </span>
              <div className="text-3xl font-semibold sm:text-4xl">
                {formatRub(estimate.low)}
                <span className="mx-2 text-white/40">—</span>
                {formatRub(estimate.high)}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Расчёт учитывает площадь, тип объекта, объём и класс материалов. Точная цена — после
                бесплатного замера.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="#request">
                Заказать точный расчёт
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CalcGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">{children}</div>
    </div>
  )
}

function ChoiceButton({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean
  onClick: () => void
  title: string
  hint?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-start rounded-xl border px-4 py-3 text-left transition-all',
        active
          ? 'border-accent bg-accent/10 ring-1 ring-accent'
          : 'border-border bg-background hover:border-accent/40',
      )}
    >
      <span className="text-sm font-medium text-foreground">{title}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </button>
  )
}
