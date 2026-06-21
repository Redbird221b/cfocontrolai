import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  FileCheck2,
  LockKeyhole,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react'
import { FinanceOpsLoop } from '../components/architecture/FinanceOpsLoop'
import { SystemArchitecture } from '../components/architecture/SystemArchitecture'
import { DashboardMockup } from '../components/dashboard/DashboardMockup'
import { RoiCalculator } from '../components/landing/RoiCalculator'
import { TelegramContactCard } from '../components/landing/TelegramContactCard'
import { Badge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { FAQ } from '../components/ui/FAQ'
import { PricingCard } from '../components/ui/PricingCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { brand } from '../config/brand'
import { contactConfig } from '../config/contact'
import {
  aiModules,
  clientOutcomes,
  clientRequirements,
  heroBadges,
  marketFootnote,
  marketStats,
  navItems,
  pilotResults,
  pilotWeeks,
  pricingPlans,
  problemCards,
  processSteps,
  securityItems,
  serviceComparison,
  trustSources,
} from '../content/landing'
import { sources } from '../content/sources'
import { appPath } from '../lib/paths'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main className="landing-main">
        <Hero />
        <TrustStrip />
        <Problems />
        <MarketProof />
        <Outcomes />
        <Process />
        <Architecture />
        <AiModules />
        <ProductDemo />
        <ServiceSystem />
        <Pilot />
        <RoiSection />
        <Security />
        <Pricing />
        <ContactSection />
        <FAQSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="z-40 border-b border-white/10 bg-navy text-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald text-sm font-bold text-navy">
              CFO
            </span>
            <span>{brand.name}</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm font-medium lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <ButtonLink href={contactConfig.telegramUrl} target="_blank" rel="noreferrer" size="sm">
              Написать в Telegram
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-current/20 lg:hidden"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
        {open ? (
          <nav className="grid gap-2 border-t border-current/10 py-4 lg:hidden" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-md px-2 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <ButtonLink
              href={contactConfig.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              Написать в Telegram
            </ButtonLink>
          </nav>
        ) : null}
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Container className="relative grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
        <div>
          <Badge tone="dark">AI + финансовый оператор + проверяемые расчёты</Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            {brand.mainMessage}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{brand.subMessage}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={contactConfig.telegramUrl} target="_blank" rel="noreferrer" size="lg">
              Написать в Telegram <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#architecture" size="lg" variant="ghost" className="border border-white/20">
              Посмотреть архитектуру
            </ButtonLink>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {heroBadges.map((badge) => (
              <Badge key={badge} tone="dark">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <DashboardMockup compact />
        </div>
      </Container>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="border-b border-slate-200 bg-white py-6">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-lg font-semibold text-ink">Одна финансовая картина вместо шести разрозненных источников.</p>
          <div className="flex flex-wrap gap-2">
            {trustSources.map((source) => (
              <Badge key={source} tone="light">
                {source}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Problems() {
  return (
    <section id="capabilities" className="py-20">
      <Container>
        <SectionHeading title="Проблема не в отсутствии данных. Проблема в том, что они не превращаются в решения.">
          Деньги, документы и обязательства уже есть в банке, 1С, Excel и переписках. Управляемость появляется только
          тогда, когда эти данные становятся прогнозом и действиями.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card) => (
            <Card key={card.now} as="article">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">Сейчас</div>
              <p className="mt-2 min-h-12 text-base font-semibold text-ink">{card.now}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                С CFO Control AI
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{card.withProduct}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

function MarketProof() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow="Рыночное подтверждение" title="Финансовая прозрачность становится условием доступа к капиталу.">
            Показываем только проверяемые рыночные показатели и не переносим их на результаты продукта.
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            {marketStats.map((stat) => (
              <Card key={stat.value} className="shadow-none">
                <div className="text-3xl font-semibold text-navy">{stat.value}</div>
                <p className="mt-3 text-sm leading-6 text-muted">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-5xl text-sm leading-6 text-muted">
          {marketFootnote}{' '}
          <a className="font-semibold text-cyan underline-offset-4 hover:underline" href={sources.worldBankMsme.url} target="_blank" rel="noreferrer">
            {sources.worldBankMsme.title}
          </a>
        </p>
      </Container>
    </section>
  )
}

function Outcomes() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Что получает клиент" title="Результаты, которые видит собственник и финансовая команда." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {clientOutcomes.map((outcome, index) => (
            <div key={outcome} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold text-cyan">{String(index + 1).padStart(2, '0')}</div>
              <p className="mt-2 text-sm font-semibold leading-6 text-ink">{outcome}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="bg-navy py-20 text-white">
      <Container>
        <SectionHeading inverted eyebrow="Как работает сервис" title="От выгрузок к ежедневному финансовому решению.">
          Пилот начинается без сложной интеграции. Каждый этап закрывает конкретный риск качества данных.
        </SectionHeading>
        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-white/12 bg-surface p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan text-sm font-bold text-navy">
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Architecture() {
  return (
    <section id="architecture" className="py-20">
      <Container>
        <SectionHeading eyebrow="Архитектура" title="Система, где AI встроен в контролируемый финансовый процесс.">
          Диаграмма показывает, какие данные входят в систему, где считаются финансовые показатели, где участвует LLM и
          когда задача уходит человеку.
        </SectionHeading>
        <div className="mt-10">
          <SystemArchitecture variant="landing" />
        </div>
      </Container>
    </section>
  )
}

function AiModules() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading eyebrow="AI-модули" title="ИИ работает там, где нужна скорость обработки, но не заменяет контроль.">
          Финансовые расчёты остаются в проверяемом движке. Модели помогают классифицировать, извлекать, прогнозировать
          и объяснять.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiModules.map((module) => (
            <Card key={module.title} as="article" className="shadow-none">
              <h3 className="text-lg font-semibold text-navy">{module.title}</h3>
              <dl className="mt-4 space-y-3 text-sm leading-6">
                <ModuleRow label="Вход" value={module.input} />
                <ModuleRow label="ИИ" value={module.ai} />
                <ModuleRow label="Человек" value={module.human} />
                <ModuleRow label="Результат" value={module.result} />
              </dl>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ModuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-cyan">{label}</dt>
      <dd className="text-muted">{value}</dd>
    </div>
  )
}

function ProductDemo() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Демо продукта" title="Интерфейс показывает не только цифры, но и следующие действия.">
          Все показатели ниже являются демонстрационными. Они нужны, чтобы показать логику продукта, а не обещать
          результат конкретной компании.
        </SectionHeading>
        <div className="mt-10">
          <DashboardMockup />
        </div>
      </Container>
    </section>
  )
}

function ServiceSystem() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading eyebrow="Service as a System" title="Не ещё один кабинет. Управляемый финансовый процесс." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Comparison title="Обычный SaaS" items={serviceComparison.saas} tone="amber" />
          <Comparison title="CFO Control AI" items={serviceComparison.system} tone="emerald" />
        </div>
        <div className="mt-8">
          <FinanceOpsLoop />
        </div>
      </Container>
    </section>
  )
}

function Comparison({ title, items, tone }: { title: string; items: string[]; tone: 'amber' | 'emerald' }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-paper p-5">
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <Check className={`mt-1 h-4 w-4 shrink-0 ${tone === 'emerald' ? 'text-emerald' : 'text-amber'}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Pilot() {
  return (
    <section id="pilot" className="py-20">
      <Container>
        <SectionHeading eyebrow="Пилот на 30 дней" title="Начинаем без сложной интеграции">
          Один месяц данных достаточно, чтобы показать денежную позицию, дебиторку, риски и качество будущей автоматизации.
        </SectionHeading>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {pilotWeeks.map((week) => (
            <Card key={week.title} as="article">
              <h3 className="text-lg font-semibold text-navy">{week.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                {week.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <InfoList title="Что требуется от клиента" items={clientRequirements} icon={<FileCheck2 className="h-5 w-5" />} />
          <InfoList title="Результат пилота" items={pilotResults} icon={<BarChart3 className="h-5 w-5" />} />
        </div>
      </Container>
    </section>
  )
}

function InfoList({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
        <span className="text-cyan">{icon}</span>
        {title}
      </h3>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RoiSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading eyebrow="ROI-калькулятор" title="Оцените экономический эффект как сценарий, а не обещание.">
          Расчёт показывает диапазон по вашим вводным и видимым допущениям. Его нужно уточнять после просмотра данных.
        </SectionHeading>
        <div className="mt-10">
          <RoiCalculator />
        </div>
      </Container>
    </section>
  )
}

function Security() {
  return (
    <section id="security" className="bg-navy py-20 text-white">
      <Container>
        <SectionHeading inverted eyebrow="Безопасность" title="ИИ рекомендует. Проверяемый финансовый движок рассчитывает. Человек подтверждает исключения.">
          Архитектура подготовлена к дальнейшему аудиту информационной безопасности. Сертификаты не заявляются без
          подтверждения.
        </SectionHeading>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg border border-white/12 bg-surface p-4">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden="true" />
              <span className="text-sm leading-6 text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <Container>
        <SectionHeading eyebrow="Стоимость" title="Три шага сотрудничества: диагностика, пилот, регулярный FinanceOps.">
          Цены указаны как ориентир и не являются юридически обязательной офертой.
        </SectionHeading>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Контакт" title="Обсудить разбор финансового процесса">
              На текущем этапе сайт работает без backend и без формы заявки. Все коммерческие кнопки ведут в Telegram.
            </SectionHeading>
            <div className="mt-8 rounded-lg border border-cyan/20 bg-paper p-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
                <ShieldCheck className="h-5 w-5 text-emerald" aria-hidden="true" />
                Что разберём
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Банк, 1С, дебиторку, обязательные платежи, документы и точки, где ручная работа мешает управлению cash
                flow.
              </p>
            </div>
          </div>
          <TelegramContactCard />
        </div>
      </Container>
    </section>
  )
}

function FAQSection() {
  return (
    <section id="faq" className="py-20">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Вопросы, которые обычно возникают до пилота." />
        <div className="mt-10">
          <FAQ />
        </div>
      </Container>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-navy py-20 text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge tone="dark">Следующий шаг</Badge>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold sm:text-4xl">Узнайте о кассовом разрыве до того, как он станет проблемой</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Покажем, как объединить данные банка, 1С и дебиторки в единую систему финансового управления.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href={contactConfig.telegramUrl} target="_blank" rel="noreferrer" size="lg">
              Написать в Telegram
            </ButtonLink>
            <ButtonLink href="#pilot" size="lg" variant="ghost" className="border border-white/20">
              Посмотреть 30-дневный пилот
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr_0.7fr]">
          <div>
            <div className="text-lg font-semibold text-navy">{brand.name}</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              {brand.category} {brand.market}. Сервис не является банком или кредитной организацией.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Навигация</h3>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-cyan">
                  {item.label}
                </a>
              ))}
              <a href={appPath('/deck')} className="hover:text-cyan">
                Презентация
              </a>
              <a href={appPath('/privacy')} className="hover:text-cyan">
                Политика конфиденциальности
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Контакты</h3>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <a href={contactConfig.telegramUrl} target="_blank" rel="noreferrer" className="hover:text-cyan">
                Telegram
              </a>
              <a href={`mailto:${contactConfig.email}`} className="hover:text-cyan">
                {contactConfig.email}
              </a>
              <a href={`tel:${contactConfig.phone.replace(/[^\d+]/g, '')}`} className="hover:text-cyan">
                {contactConfig.phone}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-muted">
          © {new Date().getFullYear()} {brand.name}. Ориентиры стоимости не являются публичной офертой.
        </div>
      </Container>
    </footer>
  )
}
