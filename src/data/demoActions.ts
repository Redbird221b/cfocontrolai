export const actionQueue = [
  {
    title: 'Связаться с 4 контрагентами',
    priority: 'Высокий',
    effect: 'до 126 млн сум в зоне внимания',
    status: 'Сегодня',
    owner: 'Менеджер продаж',
  },
  {
    title: 'Проверить платёж поставщику',
    priority: 'Средний',
    effect: 'снизить риск дефицита на 38 млн сум',
    status: 'До 14:00',
    owner: 'Финансовый оператор',
  },
  {
    title: 'Обновить план обязательных платежей',
    priority: 'Средний',
    effect: 'актуализировать прогноз W4–W6',
    status: 'Завтра',
    owner: 'Финансовый директор',
  },
]

export const documentQueue = [
  { name: 'Счёт INV-1842', fields: '8 из 9', confidence: '92%', status: 'Проверено' },
  { name: 'Накладная TN-771', fields: '6 из 8', confidence: '74%', status: 'На проверке' },
  { name: 'Договор поставки', fields: '11 из 13', confidence: '81%', status: 'Нужна сверка' },
]
