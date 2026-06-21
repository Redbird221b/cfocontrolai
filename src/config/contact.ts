const env = import.meta.env
const telegramPhone = env.VITE_TELEGRAM_PHONE || '+00903554-09-74'
const telegramUsername = env.VITE_TELEGRAM_USERNAME || 'redbird221b'

export const contactConfig = {
  telegramPhone,
  telegramUsername,
  telegramUrl: env.VITE_TELEGRAM_URL || `https://t.me/${telegramUsername}`,
  email: env.VITE_CONTACT_EMAIL || 'hello@cfocontrol.ai',
  phone: env.VITE_CONTACT_PHONE || telegramPhone,
  bookingUrl: env.VITE_BOOKING_URL || 'https://calendly.com/cfocontrol/finance-review',
  siteUrl: env.VITE_PUBLIC_SITE_URL || 'https://cfocontrol.ai',
}
