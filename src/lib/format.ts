import type { Product } from '@/types/product'

const bnInt = new Intl.NumberFormat('bn-BD')
const bnPct = new Intl.NumberFormat('bn-BD', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export const UNIT_BN: Record<Product['unit'], string> = {
  kg: 'প্রতি কেজি',
  litre: 'প্রতি লিটার',
  dozen: 'প্রতি ডজন',
  piece: 'প্রতি পিস',
}

export function toBn(n: number) {
  return bnInt.format(n)
}

export function formatPrice(n: number) {
  return `${bnInt.format(n)} টাকা`
}

export function formatChange(change: Product['change']) {
  const value = bnPct.format(Math.abs(change.pct))
  if (change.dir === 'up') return { text: `▲ ${value}%`, color: 'text-green-700 bg-green-100' }
  if (change.dir === 'down') return { text: `▼ ${value}%`, color: 'text-red-700 bg-red-100' }
  return { text: `—${value}%`, color: 'text-gray-600 bg-gray-100' }
}