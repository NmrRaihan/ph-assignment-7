import type { Product } from '@/types/product'
import { UNIT_SHORT_BN, formatChange, toBn } from '@/lib/format'

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <div className="marquee overflow-hidden border-b border-base-300 bg-base-100 py-2 text-sm">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-8 pr-8"
          >
            {products.map((p) => {
              const change = formatChange(p.change)
              return (
                <span key={p.id} className="flex items-center gap-2 whitespace-nowrap">
                  <span>{p.image}</span>
                  <span className="font-medium">{p.nameBn}</span>
                  <span>{toBn(p.today)} টাকা/{UNIT_SHORT_BN[p.unit]}</span>
                  <span className={`rounded px-1.5 text-xs font-semibold ${change.color}`}>
                    {change.text}
                  </span>
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}