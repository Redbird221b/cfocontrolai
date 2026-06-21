import { Container } from '../components/ui/Container'
import { brand } from '../config/brand'
import { contactConfig } from '../config/contact'
import { appPath } from '../lib/paths'

export function PrivacyPage() {
  return (
    <main className="min-h-screen bg-paper py-16 text-ink">
      <Container className="max-w-4xl">
        <a href={appPath('/')} className="text-sm font-semibold text-cyan">
          ← На главную
        </a>
        <h1 className="mt-8 text-4xl font-semibold">{brand.name}: политика конфиденциальности</h1>
        <div className="mt-8 space-y-5 rounded-lg border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
          <p>
            Эта страница является шаблоном политики для проекта CFO Control AI. Финальная редакция должна быть
            согласована с юристом до запуска платного пилота.
          </p>
          <p>
            На текущем frontend-only этапе сайт не содержит формы заявки, не отправляет данные на backend и не сохраняет
            контактные данные в localStorage. Коммерческие кнопки открывают Telegram или email-контакт.
          </p>
          <p>
            Данные клиента не используются для обучения общей модели без отдельного согласия. Для внешних AI API должна
            применяться минимизация и маскирование данных.
          </p>
          <p>
            По вопросам обработки данных: <a className="font-semibold text-cyan" href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>.
          </p>
        </div>
      </Container>
    </main>
  )
}
