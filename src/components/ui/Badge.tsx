import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Badge({
  children,
  tone = 'cyan',
  className,
}: {
  children: ReactNode
  tone?: 'cyan' | 'emerald' | 'amber' | 'dark' | 'light'
  className?: string
}) {
  const styles = {
    cyan: 'border-cyan/30 bg-cyan/10 text-cyan',
    emerald: 'border-emerald/30 bg-emerald/10 text-emerald',
    amber: 'border-amber/40 bg-amber/10 text-amber',
    dark: 'border-white/15 bg-white/10 text-white',
    light: 'border-slate-200 bg-slate-50 text-slate-700',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold leading-none',
        styles[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
