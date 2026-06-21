import { cashFlowSeries } from '../../data/demoCashFlow'

type Scenario = 'base' | 'optimistic' | 'stress' | 'all'
type SeriesKey = Exclude<Scenario, 'all'>

const seriesConfig: Record<SeriesKey, { label: string; color: string }> = {
  base: { label: 'Базовый', color: '#22B8CF' },
  optimistic: { label: 'Оптимистичный', color: '#16C784' },
  stress: { label: 'Стрессовый', color: '#F59E0B' },
}

const chart = {
  width: 640,
  height: 260,
  left: 44,
  right: 18,
  top: 18,
  bottom: 34,
  max: 1200,
}

const plotWidth = chart.width - chart.left - chart.right
const plotHeight = chart.height - chart.top - chart.bottom

function pointFor(value: number, index: number) {
  const x = chart.left + (index / (cashFlowSeries.length - 1)) * plotWidth
  const y = chart.top + (1 - value / chart.max) * plotHeight
  return `${x.toFixed(1)},${y.toFixed(1)}`
}

function polylineFor(key: SeriesKey) {
  return cashFlowSeries.map((item, index) => pointFor(item[key], index)).join(' ')
}

export function CashFlowChart({ scenario = 'all' }: { scenario?: Scenario }) {
  const show = (name: SeriesKey) => scenario === 'all' || scenario === name

  return (
    <div className="h-64 w-full" aria-label="13-недельный прогноз cash flow, демоданные">
      <svg viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" className="h-full w-full overflow-visible">
        <title>13-недельный прогноз cash flow</title>
        <desc>Демоданные: базовый, оптимистичный и стрессовый сценарии в миллионах сум.</desc>
        {[0, 300, 600, 900, 1200].map((tick) => {
          const y = chart.top + (1 - tick / chart.max) * plotHeight
          return (
            <g key={tick}>
              <line x1={chart.left} x2={chart.width - chart.right} y1={y} y2={y} stroke="#D7E1EA" strokeDasharray="4 4" />
              <text x={chart.left - 12} y={y + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
                {tick}
              </text>
            </g>
          )
        })}
        {cashFlowSeries.map((item, index) => {
          const x = chart.left + (index / (cashFlowSeries.length - 1)) * plotWidth
          return (
            <g key={item.week}>
              <line x1={x} x2={x} y1={chart.top} y2={chart.height - chart.bottom} stroke="#E2E8F0" strokeDasharray="4 4" />
              {index % 2 === 0 ? (
                <text x={x} y={chart.height - 12} textAnchor="middle" className="fill-slate-500 text-[11px]">
                  {item.week}
                </text>
              ) : null}
            </g>
          )
        })}
        {(Object.keys(seriesConfig) as SeriesKey[]).map((key) =>
          show(key) ? (
            <polyline
              key={key}
              points={polylineFor(key)}
              fill="none"
              stroke={seriesConfig[key].color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : null,
        )}
        <g transform={`translate(${chart.left}, 0)`}>
          {(Object.keys(seriesConfig) as SeriesKey[]).map((key, index) =>
            show(key) ? (
              <g key={key} transform={`translate(${index * 132}, 0)`}>
                <line x1="0" x2="18" y1="4" y2="4" stroke={seriesConfig[key].color} strokeWidth="4" strokeLinecap="round" />
                <text x="24" y="8" className="fill-slate-600 text-[11px] font-semibold">
                  {seriesConfig[key].label}
                </text>
              </g>
            ) : null,
          )}
        </g>
      </svg>
    </div>
  )
}
