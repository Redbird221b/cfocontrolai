import { useState } from 'react'
import { AlertTriangle, ArrowRight, CheckCircle2, FileText, ListChecks, WalletCards } from 'lucide-react'
import { actionQueue, documentQueue } from '../../data/demoActions'
import { futurePayments } from '../../data/demoCashFlow'
import { agingBuckets, receivables } from '../../data/demoReceivables'
import { Button } from '../ui/Button'
import { MetricCard } from '../ui/MetricCard'
import { CashFlowChart } from './CashFlowChart'
import { cn } from '../../lib/cn'

const tabs = ['Обзор', 'Cash Flow', 'Дебиторка', 'Документы', 'Действия'] as const
type DashboardTab = (typeof tabs)[number]

export function DashboardMockup({ compact = false }: { compact?: boolean }) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('Обзор')
  const visibleTabs = compact ? tabs.slice(0, 3) : tabs

  return (
    <section
      className={cn(
        'overflow-hidden rounded-lg border border-white/10 bg-white text-ink',
        compact ? 'p-4' : 'p-4 sm:p-5',
      )}
      aria-label="Демонстрационный интерфейс CFO Control AI"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-navy">
            <WalletCards className="h-4 w-4 text-cyan" aria-hidden="true" />
            AI FinanceOps Dashboard
          </div>
          <p className="mt-1 text-xs text-muted">Демоданные. Не являются финансовым обещанием.</p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Разделы демонстрационного dashboard">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'rounded-md px-3 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
                activeTab === tab ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={cn('mt-4', compact ? 'space-y-4' : 'min-h-[440px]')}>
        {activeTab === 'Обзор' ? <Overview /> : null}
        {activeTab === 'Cash Flow' ? <CashFlow /> : null}
        {activeTab === 'Дебиторка' ? <Receivables /> : null}
        {activeTab === 'Документы' ? <Documents /> : null}
        {activeTab === 'Действия' ? <Actions /> : null}
      </div>
    </section>
  )
}

function Overview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Денежная позиция" value="1,84 млрд" hint="общий баланс по счетам" tone="cyan" />
        <MetricCard label="Свободный остаток" value="620 млн" hint="после обязательных платежей" tone="emerald" />
        <MetricCard label="Просроченная дебиторка" value="126 млн" hint="3 контрагента в приоритете" tone="amber" />
        <MetricCard label="Риск на 14 дней" value="78 млн" hint="стрессовый сценарий W4–W6" tone="danger" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="font-semibold text-ink">13-недельный прогноз</h3>
            <span className="text-xs text-muted">млн сум</span>
          </div>
          <CashFlowChart />
        </div>
        <div className="rounded-lg border border-amber/30 bg-amber/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-ink">Предупреждение</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                В стрессовом сценарии на неделе W6 свободный cash снижается до 120 млн сум. Следующее действие:
                связаться с 4 контрагентами и обновить план платежей.
              </p>
            </div>
          </div>
          <Button className="mt-5 w-full" variant="dark">
            Открыть действия <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function CashFlow() {
  const [scenario, setScenario] = useState<'base' | 'optimistic' | 'stress' | 'all'>('all')

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-lg border border-slate-200 p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold text-ink">Сценарии cash flow</h3>
          <div className="flex flex-wrap gap-2">
            {(['all', 'base', 'optimistic', 'stress'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setScenario(item)}
                className={cn(
                  'rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
                  scenario === item ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600',
                )}
              >
                {item === 'all' ? 'Все' : item === 'base' ? 'Базовый' : item === 'optimistic' ? 'Оптимистичный' : 'Стрессовый'}
              </button>
            ))}
          </div>
        </div>
        <CashFlowChart scenario={scenario} />
      </div>
      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="font-semibold text-ink">Будущие платежи</h3>
        <div className="mt-4 space-y-3">
          {futurePayments.map((payment) => (
            <div key={`${payment.date}-${payment.counterparty}`} className="grid grid-cols-[52px_1fr_auto] gap-3 text-sm">
              <span className="font-semibold text-navy">{payment.date}</span>
              <span className="text-slate-700">{payment.counterparty}</span>
              <span className={payment.amount.startsWith('+') ? 'font-semibold text-emerald' : 'font-semibold text-amber'}>
                {payment.amount}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-lg bg-amber/10 p-3 text-sm leading-6 text-slate-700">
          Потенциальный кассовый разрыв отмечается в стрессовом сценарии и требует подтверждения плана поступлений.
        </p>
      </div>
    </div>
  )
}

function Receivables() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="font-semibold text-ink">Aging buckets</h3>
        <div className="mt-4 space-y-3">
          {agingBuckets.map((bucket) => (
            <div key={bucket.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{bucket.label}</span>
                <span className="font-semibold">{bucket.value} млн</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-cyan" style={{ width: `${Math.min(bucket.value, 80)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="font-semibold text-ink">Приоритет взыскания</h3>
        <div className="mt-4 space-y-3">
          {receivables.map((row) => (
            <article key={row.company} className="rounded-lg border border-slate-200 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-semibold text-navy">{row.company}</h4>
                <span className="font-semibold text-amber">{row.amount}</span>
              </div>
              <p className="mt-2 text-sm text-muted">
                {row.overdueDays} дней просрочки, вероятность оплаты {row.probability}. Ответственный: {row.owner}.
              </p>
              <p className="mt-2 text-sm text-slate-700">{row.action}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function Documents() {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <h3 className="flex items-center gap-2 font-semibold text-ink">
        <FileText className="h-5 w-5 text-cyan" aria-hidden="true" />
        Очередь документов
      </h3>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {documentQueue.map((document) => (
          <article key={document.name} className="rounded-lg border border-slate-200 p-4">
            <h4 className="font-semibold text-navy">{document.name}</h4>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Поля</dt>
                <dd className="font-semibold">{document.fields}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Confidence</dt>
                <dd className="font-semibold text-cyan">{document.confidence}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Статус</dt>
                <dd className="font-semibold">{document.status}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}

function Actions() {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <h3 className="flex items-center gap-2 font-semibold text-ink">
        <ListChecks className="h-5 w-5 text-emerald" aria-hidden="true" />
        Задачи на сегодня
      </h3>
      <div className="mt-4 space-y-3">
        {actionQueue.map((action) => (
          <article key={action.title} className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-[1fr_auto]">
            <div>
              <h4 className="font-semibold text-navy">{action.title}</h4>
              <p className="mt-2 text-sm text-muted">
                Приоритет: {action.priority}. Ответственный: {action.owner}.
              </p>
              <p className="mt-2 text-sm text-slate-700">Ожидаемый сценарный эффект: {action.effect}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {action.status}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
