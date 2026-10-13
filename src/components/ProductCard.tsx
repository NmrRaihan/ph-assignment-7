import Link from 'next/link'
import type { Product } from '@/types/product'
import { UNIT_BN, formatChange, formatPrice } from '@/lib/format'

export default function ProductCard({ product }: { product: Product }) {
  const change = formatChange(product.change)

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl bg-base-100 p-4 shadow-sm ring-1 ring-base-300 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-base-content/60">{UNIT_BN[product.unit]}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 border-t border-base-300 pt-3">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold">{formatPrice(product.today)}</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${change.color}`}>
          {change.text}
        </span>
      </div>
    </Link>
  )
}