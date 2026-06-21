import { cn } from '../../lib/cn'

export function MetricCard({
  label,
  value,
  hint,
  tone = 'cyan',
  className,
}: {
  label: string
  value: string
  hint?: string
  tone?: 'cyan' | 'emerald' | 'amber' | 'danger'
  className?: string
}) {
  const toneClass = {
    cyan: 'text-cyan',
    emerald: 'text-emerald',
    amber: 'text-amber',
    danger: 'text-danger',
  }

  return (
    <div className={cn('rounded-lg border border-slate-200 bg-white p-4', className)}>
      <div className="text-sm text-muted">{label}</div>
      <div className={cn('mt-2 text-2xl font-semibold tabular-nums', toneClass[tone])}>{value}</div>
      {hint ? <div className="mt-2 text-xs leading-5 text-muted">{hint}</div> : null}
    </div>
  )
}
