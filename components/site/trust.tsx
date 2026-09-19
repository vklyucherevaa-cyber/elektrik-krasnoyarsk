import { trustFactors } from '@/lib/site-data'

export function Trust() {
  return (
    <section className="border-b border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustFactors.map((factor) => (
            <div key={factor.label} className="flex flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <factor.icon className="h-6 w-6" />
              </span>
              <div>
                <div className="text-3xl font-semibold tracking-tight text-primary">
                  {factor.value}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">{factor.label}</div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
