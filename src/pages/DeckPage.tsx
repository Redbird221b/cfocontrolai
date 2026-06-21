import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Bot, Building2, Check, FileText, ShieldCheck, WalletCards } from 'lucide-react'
import { FinanceOpsLoop } from '../components/architecture/FinanceOpsLoop'
import { SystemArchitecture } from '../components/architecture/SystemArchitecture'
import { DashboardMockup } from '../components/dashboard/DashboardMockup'
import { Slide } from '../components/deck/Slide'
import { SlideNavigation } from '../components/deck/SlideNavigation'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { contactConfig } from '../config/contact'
import { aiModules, marketStats, pilotWeeks, pricingPlans, processSteps, securityItems } from '../content/landing'
import { beforeAfter, deckMeta, deckSlideTitles, economicValue, targetClientProfile } from '../content/deck'
import { marketFootnote } from '../content/landing'
import { sources } from '../content/sources'
import { RoiCalculator } from '../components/landing/RoiCalculator'

type DeckSlide = {
  title: string
  node: React.ReactNode
}

export function DeckPage() {
  const [searchParams] = useSearchParams()
  const printMode = searchParams.get('print') === '1'
  const [index, setIndex] = useState(0)
  const [overview, setOverview] = useState(false)
  const slides = useDeckSlides()

  const goTo = useCallback((next: number) => {
    setIndex(Math.min(Math.max(next, 0), slides.length - 1))
    setOverview(false)
  }, [slides.length])

  useEffect(() => {
    if (printMode) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        goTo(index + 1)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(index - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goTo, index, printMode])

  const requestFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }

    void document.documentElement.requestFullscreen()
  }

  if (printMode) {
    return (
      <main className="deck-print bg-navy">
        {slides.map((slide) => (
          <div key={slide.title} className="deck-page">
            {slide.node}
          </div>
        ))}
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-navy pb-24">
      <div className="mx-auto flex min-h-screen max-w-[1600px] items-center justify-center p-4">
        {overview ? (
          <Overview slides={slides} current={index} onSelect={goTo} />
        ) : (
          <div className="deck-frame aspect-video w-full overflow-hidden rounded-lg border border-white/10">
            {slides[index]?.node}
          </div>
        )}
      </div>
      <SlideNavigation
        index={index}
        total={slides.length}
        onPrev={() => goTo(index - 1)}
        onNext={() => goTo(index + 1)}
        onOverview={() => setOverview((current) => !current)}
        onPrint={() => window.print()}
        onFullscreen={requestFullscreen}
      />
    </main>
  )
}

function useDeckSlides() {
  return useMemo<DeckSlide[]>(
    () => [
      {
        title: deckSlideTitles[0],
        node: (
          <Slide>
            <div className="grid h-full grid-cols-[0.95fr_1.05fr] gap-10">
              <div className="flex flex-col justify-center">
                <Badge tone="dark">{deckMeta.market}</Badge>
                <h1 className="mt-8 text-6xl font-semibold leading-tight tracking-normal">{deckMeta.title}</h1>
                <p className="mt-5 text-3xl leading-tight text-slate-200">{deckMeta.subtitle}</p>
              </div>
              <div className="flex items-center">
                <FlowVisual />
              </div>
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[1],
        node: (
          <Slide eyebrow="Проблема" title="Финансовые данные есть. Управляемой картины денег нет.">
            <div className="grid h-full grid-cols-[0.85fr_1.15fr] gap-8">
              <div className="space-y-4 text-xl text-slate-200">
                {['поздний отчёт', 'кассовый разрыв', 'просроченная дебиторка', 'ручная сверка', 'сложная подготовка к финансированию'].map((item) => (
                  <div key={item} className="rounded-lg border border-white/12 bg-surface p-4">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <SourceCluster />
              </div>
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[2],
        node: (
          <Slide eyebrow="Рыночная возможность" title="Доступ к капиталу требует прозрачной финансовой картины.">
            <div className="grid h-full content-center gap-5">
              <div className="grid gap-5 md:grid-cols-3">
                {marketStats.map((stat) => (
                  <div key={stat.value} className="rounded-lg border border-white/12 bg-surface p-6">
                    <div className="text-5xl font-semibold text-emerald">{stat.value}</div>
                    <p className="mt-4 text-lg leading-7 text-slate-200">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-6 text-slate-300">
                {marketFootnote}{' '}
                <a href={sources.worldBankMsme.url} className="text-cyan underline">
                  {sources.worldBankMsme.title}
                </a>
              </p>
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[3],
        node: (
          <Slide eyebrow="Целевой клиент" title="Профиль компании для первого платного пилота.">
            <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-8">
              <div className="rounded-lg border border-white/12 bg-surface p-6">
                <Building2 className="h-10 w-10 text-cyan" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold">Fictional company profile</h3>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Импортёр продуктов питания с отсрочками платежей, несколькими банковскими счетами и отчётностью в 1С +
                  Excel.
                </p>
              </div>
              <div className="grid content-center gap-3 sm:grid-cols-2">
                {targetClientProfile.map((item) => (
                  <div key={item} className="rounded-lg border border-white/12 bg-surface p-4 text-lg font-semibold">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[4],
        node: (
          <Slide eyebrow="Решение" title="Не ещё один dashboard. Управляемый финансовый процесс.">
            <div className="grid h-full items-center gap-6">
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  ['AI', 'классификация, OCR, прогноз, аномалии, объяснения'],
                  ['Финансовый движок', 'проверяемые расчёты, категории, календарь платежей'],
                  ['Финансовый оператор', 'исключения, подтверждения, контроль регламента'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-lg border border-white/12 bg-surface p-6">
                    <h3 className="text-3xl font-semibold text-emerald">{title}</h3>
                    <p className="mt-4 text-lg leading-7 text-slate-200">{text}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 text-2xl font-semibold">
                {['данные', 'прогноз', 'решение', 'действие', 'контроль'].map((item, itemIndex) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="rounded-lg bg-cyan px-4 py-3 text-navy">{item}</span>
                    {itemIndex < 4 ? <ArrowRight className="h-6 w-6 text-emerald" aria-hidden="true" /> : null}
                  </div>
                ))}
              </div>
              <div className="scale-[0.88] origin-top">
                <FinanceOpsLoop compact />
              </div>
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[5],
        node: (
          <Slide eyebrow="Как работает" title="От одного месяца данных к регулярному FinanceOps.">
            <div className="grid h-full grid-cols-3 gap-4 content-center">
              {processSteps.concat({ title: 'Измеряем результат', text: 'Фиксируем выполнение действий и возвращаем исправления в модель.' }).map((step, stepIndex) => (
                <div key={step.title} className="rounded-lg border border-white/12 bg-surface p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald text-lg font-bold text-navy">
                    {stepIndex + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
                </div>
              ))}
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[6],
        node: (
          <Slide className="p-5" eyebrow="Архитектура системы" title="Контролируемая цепочка от источников до действий.">
            <SystemArchitecture variant="deck" />
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[7],
        node: (
          <Slide eyebrow="Где участвует ИИ" title="Модели помогают, человек подтверждает исключения.">
            <div className="grid h-full gap-3 md:grid-cols-3">
              {aiModules.map((module) => (
                <div key={module.title} className="rounded-lg border border-white/12 bg-surface p-4">
                  <h3 className="text-lg font-semibold text-cyan">{module.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    <strong className="text-emerald">ИИ:</strong> {module.ai}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    <strong className="text-amber">Человек:</strong> {module.human}
                  </p>
                </div>
              ))}
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[8],
        node: (
          <Slide className="p-6" eyebrow="Пример интерфейса" title="Демоданные: позиция, прогноз, риск, дебиторка и действия.">
            <DashboardMockup compact />
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[9],
        node: (
          <Slide eyebrow="До и после" title="Сервис меняет не отчёт, а процесс управления деньгами.">
            <div className="grid h-full grid-cols-2 gap-6">
              <BeforeAfter title="До" items={beforeAfter.before} tone="amber" />
              <BeforeAfter title="После" items={beforeAfter.after} tone="emerald" />
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[10],
        node: (
          <Slide eyebrow="30-дневный пилот" title="Начинаем с выгрузок, без доступа на проведение платежей.">
            <div className="grid h-full grid-cols-4 gap-4 content-center">
              {pilotWeeks.map((week) => (
                <div key={week.title} className="rounded-lg border border-white/12 bg-surface p-4">
                  <h3 className="text-2xl font-semibold text-emerald">{week.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-200">
                    {week.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[11],
        node: (
          <Slide className="p-7" eyebrow="Экономическая ценность" title="Сценарная оценка без гарантированных обещаний.">
            <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-5">
              <div className="grid content-start gap-3">
                {economicValue.map((item) => (
                  <div key={item} className="rounded-lg border border-white/12 bg-surface p-4 text-lg font-semibold">
                    {item}
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-lg bg-paper text-ink">
                <RoiCalculator />
              </div>
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[12],
        node: (
          <Slide eyebrow="Безопасность" title="Trust architecture без неподтверждённых сертификатов.">
            <div className="grid h-full grid-cols-3 gap-4 content-center">
              {securityItems.slice(0, 9).map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/12 bg-surface p-4 text-lg">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[13],
        node: (
          <Slide eyebrow="Модель сотрудничества" title="Диагностика, пилот, регулярный FinanceOps, масштабирование.">
            <div className="grid h-full grid-cols-3 gap-5 content-center">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-lg border border-white/12 bg-surface p-6">
                  <h3 className="text-2xl font-semibold text-cyan">{plan.name}</h3>
                  <p className="mt-4 text-3xl font-semibold text-emerald">{plan.price}</p>
                  <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-200">
                    {plan.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="absolute bottom-8 left-10 text-sm text-slate-300">Стоимость зависит от объёма данных и количества юридических лиц.</p>
          </Slide>
        ),
      },
      {
        title: deckSlideTitles[14],
        node: (
          <Slide eyebrow="Следующий шаг" title="Начнём с одного месяца данных">
            <div className="grid h-full grid-cols-[1fr_0.6fr] items-center gap-10">
              <div>
                <p className="max-w-3xl text-3xl leading-snug text-slate-200">
                  Покажем денежную позицию, дебиторку, риски и прогноз без сложной интеграции.
                </p>
                <div className="mt-10 inline-flex rounded-lg bg-emerald px-6 py-4 text-2xl font-semibold text-navy">
                  Запустить 30-дневный пилот
                </div>
              </div>
              <div className="rounded-lg border border-white/12 bg-white p-6 text-ink">
                <QrPlaceholder />
                <p className="mt-4 text-center text-sm text-muted">{contactConfig.siteUrl}</p>
              </div>
            </div>
          </Slide>
        ),
      },
    ],
    [],
  )
}

function FlowVisual() {
  return (
    <div className="w-full rounded-lg border border-white/12 bg-surface p-6">
      <div className="grid gap-5">
        {[
          ['Банк + 1С + Документы', WalletCards],
          ['AI + FinanceOps', Bot],
          ['Решения и действия', FileText],
        ].map(([label, Icon], index) => (
          <div key={String(label)} className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-cyan text-navy">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="flex-1 rounded-lg border border-white/12 bg-surface p-4 text-2xl font-semibold">{String(label)}</div>
            {index < 2 ? <ArrowRight className="h-8 w-8 text-emerald" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function SourceCluster() {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {['Банк', '1С', 'Excel', 'Документы', 'CRM', 'Telegram'].map((item) => (
        <div key={item} className="rounded-lg border border-cyan/30 bg-cyan/10 p-6 text-center text-2xl font-semibold">
          {item}
        </div>
      ))}
      <div className="col-span-2 rounded-lg border border-amber/40 bg-amber/10 p-6 text-center text-xl text-amber">
        Нет единой модели, прогноза и очереди действий
      </div>
    </div>
  )
}

function BeforeAfter({ title, items, tone }: { title: string; items: string[]; tone: 'amber' | 'emerald' }) {
  return (
    <div className="rounded-lg border border-white/12 bg-surface p-6">
      <h3 className={`text-3xl font-semibold ${tone === 'emerald' ? 'text-emerald' : 'text-amber'}`}>{title}</h3>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-xl text-slate-200">
            <Check className={`mt-1 h-5 w-5 shrink-0 ${tone === 'emerald' ? 'text-emerald' : 'text-amber'}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QrPlaceholder() {
  const cells = Array.from({ length: 49 }, (_, index) => index)

  return (
    <div className="mx-auto grid h-52 w-52 grid-cols-7 gap-1 rounded-lg border border-slate-200 bg-white p-3" aria-label="QR-placeholder для ссылки на лендинг">
      {cells.map((cell) => {
        const filled = cell % 2 === 0 || cell % 5 === 0 || [0, 1, 7, 8, 5, 6, 12, 13, 35, 36, 42, 43].includes(cell)
        return <div key={cell} className={filled ? 'rounded-sm bg-navy' : 'rounded-sm bg-slate-100'} />
      })}
    </div>
  )
}

function Overview({
  slides,
  current,
  onSelect,
}: {
  slides: DeckSlide[]
  current: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="w-full max-w-7xl rounded-lg border border-white/10 bg-white p-6 text-ink">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Обзор презентации</h1>
        <Button variant="dark" onClick={() => onSelect(current)}>
          Вернуться к слайду
        </Button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => onSelect(slideIndex)}
            className={`rounded-lg border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
              current === slideIndex ? 'border-emerald bg-emerald/10' : 'border-slate-200 bg-paper hover:border-cyan'
            }`}
          >
            <div className="text-sm font-semibold text-cyan">{String(slideIndex + 1).padStart(2, '0')}</div>
            <div className="mt-2 text-lg font-semibold">{slide.title}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
