import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Slide({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('deck-slide relative flex h-full w-full flex-col overflow-hidden bg-navy p-10 text-white', className)}>
      {eyebrow || title ? (
        <header className="mb-5 shrink-0">
          {eyebrow ? <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">{eyebrow}</div> : null}
          {title ? <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-normal">{title}</h2> : null}
        </header>
      ) : null}
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  )
}
