'use client'

import { useState } from 'react'
import { Star, Quote, Plus, Check } from 'lucide-react'

import { SectionHeading } from './section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { submitReview } from '@/app/actions/reviews'
import { serviceOptions } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Review = {
  id: number
  authorName: string
  rating: number
  body: string
  service: string | null
  createdAt: Date | string
}

function Stars({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`Оценка ${value} из 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            'h-4 w-4',
            n <= value
              ? 'fill-accent text-accent'
              : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  )
}

export function ReviewsSection({
  reviews = [],
}: {
  reviews?: Review[]
}) {
  const avg =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : '5.0'

  return (
    <section
      id="reviews"
      className="scroll-mt-20 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            label="Отзывы"
            title="Что говорят заказчики"
            description="Отзывы публикуются после модерации. Оставить свой может каждый, кто пользовался услугами."
          />

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-3xl font-semibold text-primary">
                {avg}
              </span>
              <Stars value={Math.round(Number(avg))} />
            </div>

            <ReviewDialog />
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border bg-secondary/40 p-10 text-center">
            <p className="text-muted-foreground">
              Пока отзывов нет. Станьте первым, кто оставит отзыв о работе.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <Stars value={review.rating} />
                  <Quote className="h-6 w-6 text-accent/40" />
                </div>

                <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                  {review.body}
                </blockquote>

                <figcaption className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-semibold text-primary">
                    {review.authorName}
                  </span>

                  {review.service ? (
                    <span className="text-xs text-muted-foreground">
                      {review.service}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ReviewDialog() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [authorName, setName] = useState('')
  const [service, setService] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'done' | 'error'
  >('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const res = await submitReview({
      authorName,
      rating,
      body,
      service,
    })

    if (res.ok) {
      setStatus('done')
    } else {
      setStatus('error')
      setError(res.error ?? 'Не удалось отправить отзыв.')
    }
  }

  function reset() {
    setRating(5)
    setName('')
    setService('')
    setBody('')
    setStatus('idle')
    setError('')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)

        if (!value) {
          setTimeout(reset, 200)
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="border-border bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Оставить отзыв
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        {status === 'done' ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check className="h-7 w-7" />
            </span>

            <DialogTitle>Спасибо за отзыв!</DialogTitle>

            <DialogDescription>
              Отзыв отправлен на модерацию и появится на сайте после проверки.
            </DialogDescription>

            <Button
              onClick={() => setOpen(false)}
              className="mt-2"
            >
              Закрыть
            </Button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Оставить отзыв</DialogTitle>

              <DialogDescription>
                Поделитесь впечатлением о работе. Отзыв появится после
                модерации.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <Label>Оценка</Label>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Поставить оценку ${n}`}
                  >
                    <Star
                      className={cn(
                        'h-7 w-7 transition-colors',
                        n <= (hover || rating)
                          ? 'fill-accent text-accent'
                          : 'fill-muted text-muted',
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="review-name">
                Ваше имя
              </Label>

              <Input
                id="review-name"
                value={authorName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Ирина"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="review-service">
                Услуга (необязательно)
              </Label>

              <select
                id="review-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Не указывать</option>

                {serviceOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="review-body">
                Отзыв
              </Label>

              <Textarea
                id="review-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Расскажите, как прошли работы"
                rows={4}
                required
              />
            </div>

            {error ? (
              <p className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <DialogFooter>
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {status === 'loading'
                  ? 'Отправка…'
                  : 'Отправить отзыв'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}