import type { ReactNode } from 'react'
import { Badge } from './Badge'
import { cn } from '../../lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  children,
  inverted = false,
  className,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
  inverted?: boolean
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? <Badge tone={inverted ? 'dark' : 'light'}>{eyebrow}</Badge> : null}
      <h2 className={cn('mt-4 text-3xl font-semibold tracking-normal sm:text-4xl', inverted ? 'text-white' : 'text-ink')}>
        {title}
      </h2>
      {children ? (
        <p className={cn('mt-4 text-base leading-7 sm:text-lg', inverted ? 'text-slate-300' : 'text-muted')}>{children}</p>
      ) : null}
    </div>
  )
}
