import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Card({
  children,
  className,
  as: Component = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
}) {
  return (
    <Component className={cn('rounded-lg border border-slate-200 bg-white p-5', className)}>
      {children}
    </Component>
  )
}
