import { ChevronDown } from 'lucide-react'
import { faqItems } from '../../content/faq'

export function FAQ() {
  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {faqItems.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
            <span>{item.question}</span>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
