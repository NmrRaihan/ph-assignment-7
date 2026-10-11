import type { Product } from '@/types/product'

export type SortKey = 'default' | 'asc' | 'desc'

export function topRisers(list: Product[], n = 6) {
  return list
    .filter((p) => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n)
}

export function topFallers(list: Product[], n = 6) {
  return list
    .filter((p) => p.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n)
}

export function sortProducts(list: Product[], key: SortKey) {
  if (key === 'default') return list
  return [...list].sort((a, b) => (key === 'asc' ? a.today - b.today : b.today - a.today))
}

export function priceSummary(p: Product) {
  const min = Math.min(...p.markets.map((m) => m.min))
  const max = Math.max(...p.markets.map((m) => m.max))
  const avg = Math.round(
    p.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / p.markets.length,
  )
  return { min, max, avg }
}