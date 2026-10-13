import type { Product } from '@/types/product'
import ProductCard from './ProductCard'

interface ProductSectionProps {
  id?: string
  title: string
  subtitle?: string
  products: Product[]
}

export default function ProductSection({ id, title, subtitle, products }: ProductSectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-6">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}