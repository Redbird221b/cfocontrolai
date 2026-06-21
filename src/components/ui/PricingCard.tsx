import { Check } from 'lucide-react'
import { ButtonLink } from './Button'
import { cn } from '../../lib/cn'
import { contactConfig } from '../../config/contact'

export type PricingPlan = {
  name: string
  price: string
  cta: string
  featured: boolean
  note?: string
  items: string[]
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className={cn(
        'rounded-lg border p-6',
        plan.featured ? 'border-emerald bg-navy text-white' : 'border-slate-200 bg-white text-ink',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        {plan.featured ? (
          <span className="rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-navy">Пилот</span>
        ) : null}
      </div>
      <div className={cn('mt-5 text-3xl font-semibold', plan.featured ? 'text-emerald' : 'text-navy')}>{plan.price}</div>
      {plan.note ? <p className="mt-3 text-sm leading-6 text-slate-300">{plan.note}</p> : null}
      <ul className={cn('mt-6 space-y-3 text-sm', plan.featured ? 'text-slate-200' : 'text-muted')}>
        {plan.items.map((item) => (
          <li key={item} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href={contactConfig.telegramUrl}
        target="_blank"
        rel="noreferrer"
        variant={plan.featured ? 'primary' : 'outline'}
        className="mt-7 w-full"
      >
        {plan.cta}
      </ButtonLink>
    </article>
  )
}
