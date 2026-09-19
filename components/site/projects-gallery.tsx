import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { SectionHeading } from './section-heading'

type Project = {
  id: number
  title: string
  category: string | null
  location: string | null
  description: string | null
  imageUrl: string
  featured: boolean
}

export function ProjectsGallery({ projects = [] }: { projects?: Project[] }) {
  if (projects.length === 0) return null

  return (
    <section id="projects" className="scroll-mt-20 bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Работы"
          title="Объекты, которые говорят за меня"
          description="Небольшая часть выполненных проектов по Красноярску. Каждый — это аккуратный монтаж, подписанный щит и довольный заказчик."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={
                'group relative overflow-hidden rounded-2xl border border-border bg-card ' +
                (project.featured && index === 0 ? 'sm:col-span-2 lg:row-span-2' : '')
              }
            >
              <div
                className={
                  'relative w-full overflow-hidden ' +
                  (project.featured && index === 0 ? 'aspect-[4/3] lg:h-full lg:aspect-auto' : 'aspect-[4/3]')
                }
              >
                <Image
                  src={project.imageUrl || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
                  {project.category ? (
                    <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {project.category}
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  {project.location ? (
                    <span className="flex items-center gap-1.5 text-sm text-white/75">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </span>
                  ) : null}
                  {project.description ? (
                    <p className="text-sm leading-relaxed text-white/80">{project.description}</p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
