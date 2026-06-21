import { Mail, MessageCircle } from 'lucide-react'
import { contactConfig } from '../../config/contact'
import { ButtonLink } from '../ui/Button'

export function TelegramContactCard() {
  return (
    <div id="contact" className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="rounded-lg bg-navy p-5 text-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald text-navy">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold">Написать в Telegram</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          На текущем этапе сайт не собирает заявки и не сохраняет контактные данные. Нажмите кнопку, чтобы перейти в
          Telegram и договориться о коротком разборе финансового процесса.
        </p>
        <ButtonLink href={contactConfig.telegramUrl} target="_blank" rel="noreferrer" size="lg" className="mt-6 w-full">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Открыть Telegram
        </ButtonLink>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-700">
        <a
          href={contactConfig.telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3 transition hover:border-cyan hover:text-navy"
        >
          <MessageCircle className="h-4 w-4 text-cyan" aria-hidden="true" />
          @{contactConfig.telegramUsername}
        </a>
        <a
          href={`mailto:${contactConfig.email}`}
          className="flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3 transition hover:border-cyan hover:text-navy"
        >
          <Mail className="h-4 w-4 text-cyan" aria-hidden="true" />
          {contactConfig.email}
        </a>
      </div>
    </div>
  )
}
