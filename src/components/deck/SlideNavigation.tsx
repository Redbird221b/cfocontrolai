import { ArrowLeft, ArrowRight, Download, Grid2X2, Home, Maximize2 } from 'lucide-react'
import { Button, ButtonLink } from '../ui/Button'
import { appPath } from '../../lib/paths'

export function SlideNavigation({
  index,
  total,
  onPrev,
  onNext,
  onOverview,
  onPrint,
  onFullscreen,
}: {
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  onOverview: () => void
  onPrint: () => void
  onFullscreen: () => void
}) {
  return (
    <div className="deck-nav fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy px-4 py-3 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onPrev} aria-label="Предыдущий слайд">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <div className="min-w-20 text-center text-sm font-semibold tabular-nums">
            {index + 1} / {total}
          </div>
          <Button variant="ghost" size="sm" onClick={onNext} aria-label="Следующий слайд">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="h-2 min-w-40 flex-1 rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-emerald" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ButtonLink href={appPath('/')} variant="ghost" size="sm" aria-label="Перейти на лендинг">
            <Home className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <Button variant="ghost" size="sm" onClick={onOverview} aria-label="Обзор всех слайдов">
            <Grid2X2 className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onFullscreen} aria-label="Открыть полноэкранный режим">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="secondary" size="sm" onClick={onPrint}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Экспорт PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
