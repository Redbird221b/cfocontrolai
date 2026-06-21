export function formatSum(value: number, suffix = 'сум') {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ` ${suffix}`
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}
