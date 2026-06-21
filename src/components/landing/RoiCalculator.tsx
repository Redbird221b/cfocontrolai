import { useMemo, useState } from 'react'
import { calculateRoi, defaultRoiAssumptions, defaultRoiInputs, type RoiInputs } from '../../lib/roi'
import { formatSum } from '../../lib/formatting'
import { Card } from '../ui/Card'

const fields: Array<{ key: keyof RoiInputs; label: string; step: number; suffix: string }> = [
  { key: 'monthlyRevenue', label: 'Месячная выручка', step: 10_000_000, suffix: 'сум' },
  { key: 'totalReceivables', label: 'Общая дебиторка', step: 10_000_000, suffix: 'сум' },
  { key: 'overdueReceivables', label: 'Просроченная дебиторка', step: 5_000_000, suffix: 'сум' },
  { key: 'financeEmployees', label: 'Финансовые сотрудники', step: 1, suffix: 'чел.' },
  { key: 'manualHoursPerMonth', label: 'Часы ручной работы в месяц', step: 5, suffix: 'часов' },
  { key: 'hourlyCost', label: 'Средняя стоимость часа', step: 10_000, suffix: 'сум' },
  { key: 'annualFinancingRate', label: 'Стоимость привлечённого финансирования', step: 0.01, suffix: 'годовая доля' },
  { key: 'pilotCost', label: 'Стоимость пилота', step: 500_000, suffix: 'сум' },
]

export function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>(defaultRoiInputs)
  const result = useMemo(() => calculateRoi(inputs), [inputs])

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="shadow-none">
        <h3 className="text-xl font-semibold text-ink">Исходные данные</h3>
        <div className="mt-5 grid gap-4">
          {fields.map((field) => (
            <label key={field.key} className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">{field.label}</span>
              <div className="flex rounded-md border border-slate-300 focus-within:ring-2 focus-within:ring-cyan">
                <input
                  type="number"
                  min="0"
                  step={field.step}
                  value={inputs[field.key]}
                  onChange={(event) =>
                    setInputs((current) => ({ ...current, [field.key]: Number(event.target.value) }))
                  }
                  className="min-w-0 flex-1 border-0 bg-white text-ink focus:ring-0"
                />
                <span className="flex items-center border-l border-slate-200 px-3 text-xs text-muted">{field.suffix}</span>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <Card className="bg-navy text-white shadow-none">
        <h3 className="text-xl font-semibold">Сценарная оценка</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Result label="Стоимость ручного процесса" value={formatSum(result.manualProcessCost)} />
          <Result label="Стоимость капитала в просрочке в месяц" value={formatSum(result.monthlyCapitalCostInOverdue)} />
          <Result
            label="Диапазон высвобождения времени"
            value={`${Math.round(result.timeReleaseLowHours)}–${Math.round(result.timeReleaseHighHours)} часов`}
          />
          <Result
            label="Сценарная стоимость времени"
            value={`${formatSum(result.timeReleaseLowValue)} – ${formatSum(result.timeReleaseHighValue)}`}
          />
          <Result
            label="Фокус на просроченной дебиторке"
            value={`${formatSum(result.receivableFocusLowValue)} – ${formatSum(result.receivableFocusHighValue)}`}
          />
          <Result
            label="Улучшение cash visibility"
            value={`${formatSum(result.cashVisibilityLowValue)} – ${formatSum(result.cashVisibilityHighValue)}`}
          />
        </div>
        <div className="mt-6 rounded-lg border border-emerald/30 bg-emerald/10 p-4">
          <div className="text-sm text-slate-300">Оценочный срок окупаемости пилота по выбранным допущениям</div>
          <div className="mt-2 text-2xl font-semibold text-emerald">
            {result.paybackMonthsLow && result.paybackMonthsHigh
              ? `${result.paybackMonthsLow.toFixed(1)}–${result.paybackMonthsHigh.toFixed(1)} мес.`
              : 'недостаточно данных'}
          </div>
        </div>
        <div className="mt-5 rounded-lg bg-surface p-4 text-sm leading-6 text-slate-300">
          <p>Расчёт является сценарной оценкой и не является гарантией финансового результата.</p>
          <p className="mt-3">
            Видимые допущения: высвобождение времени {defaultRoiAssumptions.timeReleaseLow * 100}%–
            {defaultRoiAssumptions.timeReleaseHigh * 100}%, фокус по просрочке{' '}
            {defaultRoiAssumptions.receivableFocusLow * 100}%–{defaultRoiAssumptions.receivableFocusHigh * 100}%,
            cash visibility {defaultRoiAssumptions.visibilityLow * 100}%–{defaultRoiAssumptions.visibilityHigh * 100}% от
            месячной выручки.
          </p>
        </div>
      </Card>
    </div>
  )
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface p-4">
      <div className="text-xs uppercase tracking-[0.12em] text-slate-400">{label}</div>
      <div className="mt-2 text-lg font-semibold tabular-nums text-white">{value}</div>
    </div>
  )
}
