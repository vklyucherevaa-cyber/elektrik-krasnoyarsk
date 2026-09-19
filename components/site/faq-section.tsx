import { SectionHeading } from './section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faq } from '@/lib/site-data'

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label="Вопросы"
            title="Отвечаю на частые вопросы"
            description="Если не нашли ответ — позвоните или оставьте заявку, отвечу лично и без навязчивости."
          />

          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium text-primary hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
