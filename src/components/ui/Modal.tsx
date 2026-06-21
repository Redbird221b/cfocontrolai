import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

export function Modal({
  title,
  open,
  onClose,
  children,
}: {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-ink">{title}</h2>
          <Button variant="ghost" size="sm" className="text-ink hover:bg-slate-100" onClick={onClose} aria-label="Закрыть окно">
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
