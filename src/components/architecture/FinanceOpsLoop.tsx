import { cn } from '../../lib/cn'

const steps = [
  'Данные поступают',
  'Система проверяет качество',
  'Модели создают прогноз и рекомендации',
  'Оператор подтверждает исключения',
  'Создаются действия',
  'Ответственный выполняет действие',
  'Система измеряет результат',
  'Исправления возвращаются в модель',
]

export function FinanceOpsLoop({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={cn('rounded-lg border border-slate-200 bg-white p-5', compact && 'p-4')}>
      <figcaption className="sr-only">
        Замкнутый цикл FinanceOps: данные, проверка качества, прогноз, оператор, действия, выполнение, измерение
        результата и возврат исправлений.
      </figcaption>
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan">FinanceOps Loop</div>
          <h3 className={cn('mt-3 font-semibold text-ink', compact ? 'text-2xl' : 'text-3xl')}>
            Из данных — в выполненное финансовое действие
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted">
            Сервис не заканчивается отчётом. Он создаёт задачу, фиксирует ответственного и возвращает результат в модель
            для следующего цикла.
          </p>
        </div>
        <div className="relative grid gap-3 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-slate-200 bg-paper p-3"
            >
              <div className="text-xs font-semibold text-cyan">0{index + 1}</div>
              <div className="mt-1 text-sm font-semibold text-ink">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}
