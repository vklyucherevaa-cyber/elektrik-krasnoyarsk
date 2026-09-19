import { cn } from '@/lib/utils'

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
}: {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
        <span className="h-px w-6 bg-accent" aria-hidden />
        {label}
      </span>
      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
