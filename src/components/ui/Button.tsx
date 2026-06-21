import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'ghost' | 'outline'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald text-navy hover:bg-[#24d994] focus-visible:ring-emerald',
  secondary:
    'bg-cyan text-navy hover:bg-[#43c7d8] focus-visible:ring-cyan',
  dark: 'bg-navy text-white hover:bg-surface focus-visible:ring-cyan',
  ghost: 'bg-white/0 text-inherit hover:bg-white/10 focus-visible:ring-cyan',
  outline: 'border border-slate-300 bg-white text-ink hover:border-cyan hover:text-navy focus-visible:ring-cyan',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

type SharedProps = {
  variant?: ButtonVariant
  size?: keyof typeof sizes
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
