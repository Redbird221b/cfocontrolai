import { ShieldCheck } from 'lucide-react'
import { cn } from '../../lib/cn'

type ArchitectureVariant = 'landing' | 'deck'

const layers = [
  {
    title: 'Источники данных',
    items: ['банковские выписки', '1С / ERP', 'Excel', 'счета и накладные', 'договоры', 'CRM', 'ручной план платежей'],
  },
  {
    title: 'Безопасный ingestion',
    items: ['CSV / XLSX import', 'read-only API', 'OCR', 'document parser', 'validation', 'schema mapping', 'deduplication'],
  },
  {
    title: 'Единая финансовая модель',
    items: [
      'транзакции',
      'контрагенты',
      'счета',
      'обязательства',
      'дебиторка',
      'календарь платежей',
      'финансовые категории',
      'история действий',
    ],
  },
  {
    title: 'Intelligence layer',
    items: [
      'rules engine',
      'классификация транзакций',
      'OCR и извлечение полей',
      'cash-flow forecasting',
      'receivables scoring',
      'anomaly detection',
      'RAG по договорам',
      'LLM для объяснения результатов',
    ],
  },
  {
    title: 'Human-in-the-loop',
    items: [
      'очередь проверки',
      'уровень confidence',
      'исправление категорий',
      'подтверждение исключений',
      'финансовый оператор',
      'эскалация эксперту',
    ],
  },
  {
    title: 'Действия',
    items: [
      'Telegram-отчёт',
      'веб-кабинет',
      'список задач',
      'напоминания',
      'запрос акта сверки',
      'банковский пакет',
      'отчёт собственнику',
    ],
  },
  {
    title: 'Результаты',
    items: [
      'ежедневная денежная позиция',
      '13-недельный прогноз',
      'раннее обнаружение разрыва',
      'управляемая дебиторка',
      'меньше ручной работы',
      'готовность к финансированию',
    ],
  },
]

const guardrails = [
  'tenant isolation',
  'encryption',
  'RBAC',
  'audit log',
  'backups',
  'monitoring',
  'data retention policy',
  'consent management',
]

const explainers = [
  'LLM не рассчитывает финансовую отчётность.',
  'Расчёты выполняет детерминированный финансовый движок.',
  'LLM объясняет результат и работает с текстом.',
  'Низкая уверенность автоматически направляет задачу оператору.',
  'Система не проводит платежи самостоятельно.',
  'Система не принимает окончательное кредитное решение.',
  'Данные клиента не используются для общей модели без отдельного согласия.',
]

export function SystemArchitecture({ variant = 'landing' }: { variant?: ArchitectureVariant }) {
  const isDeck = variant === 'deck'

  return (
    <figure
      className={cn(
        'rounded-lg border border-cyan/20 bg-navy p-4 text-white',
        isDeck ? 'deck-architecture h-full' : 'sm:p-5',
      )}
    >
      <figcaption className="sr-only">
        Архитектура CFO Control AI: источники данных, ingestion, финансовая модель, intelligence layer,
        human-in-the-loop, действия, результаты и защитный слой.
      </figcaption>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className={cn('font-semibold', isDeck ? 'text-xl' : 'text-2xl')}>Архитектура системы</h3>
          <p className="mt-1 text-sm text-slate-300">Финансовый движок считает. LLM объясняет. Человек подтверждает исключения.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald/30 bg-emerald/10 px-3 py-2 text-xs font-semibold text-emerald">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Защитный слой вокруг всей цепочки
        </div>
      </div>

      <div className="hidden gap-2 xl:grid xl:grid-cols-7" aria-hidden="true">
        {layers.map((layer, index) => (
          <div
            key={layer.title}
            className="relative rounded-lg border border-white/12 bg-surface p-3"
          >
            {index < layers.length - 1 ? (
              <div className="absolute -right-2 top-1/2 h-0.5 w-2 bg-cyan" />
            ) : null}
            <div className="text-sm font-semibold text-cyan">{layer.title}</div>
            <ul className={cn('mt-3 space-y-2 text-slate-200', isDeck ? 'text-[11px]' : 'text-xs')}>
              {layer.items.map((item) => (
                <li key={item} className="rounded-md bg-surface px-2 py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid gap-3 xl:hidden">
        {layers.map((layer) => (
          <details key={layer.title} className="rounded-lg border border-white/12 bg-surface p-3">
            <summary className="cursor-pointer font-semibold text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
              {layer.title}
            </summary>
            <ul className="mt-3 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              {layer.items.map((item) => (
                <li key={item} className="rounded-md bg-surface px-2 py-1">
                  {item}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className={cn('mt-4 grid gap-3', isDeck ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-[1.1fr_0.9fr]')}>
        <div className="rounded-lg border border-emerald/30 bg-emerald/10 p-3">
          <h4 className="text-sm font-semibold text-emerald">Feedback loop</h4>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            Исправления оператора → новые обучающие метки → улучшение моделей. Изменения проходят контроль и не
            подменяют проверяемые финансовые расчёты.
          </p>
        </div>
        <div className="rounded-lg border border-white/12 bg-surface p-3">
          <h4 className="text-sm font-semibold text-cyan">Сквозная безопасность</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {guardrails.map((item) => (
              <span key={item} className="rounded-full border border-white/12 px-2 py-1 text-[11px] text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!isDeck ? (
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300 md:grid-cols-2">
          {explainers.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </figure>
  )
}
