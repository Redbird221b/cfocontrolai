export const receivables = [
  {
    company: 'Tashkent Retail Group',
    amount: '48 млн сум',
    overdueDays: 21,
    probability: '62%',
    action: 'Отправить акт сверки и согласовать дату оплаты',
    owner: 'Азиза',
  },
  {
    company: 'Samarkand Distribution',
    amount: '36 млн сум',
    overdueDays: 14,
    probability: '71%',
    action: 'Позвонить финансовому менеджеру до 16:00',
    owner: 'Руслан',
  },
  {
    company: 'Fergana Market',
    amount: '24 млн сум',
    overdueDays: 8,
    probability: '83%',
    action: 'Напомнить о счёте и приложить закрывающие документы',
    owner: 'Дилшод',
  },
]

export const agingBuckets = [
  { label: '0–7 дней', value: 42 },
  { label: '8–30 дней', value: 68 },
  { label: '31–60 дней', value: 38 },
  { label: '60+ дней', value: 20 },
]
