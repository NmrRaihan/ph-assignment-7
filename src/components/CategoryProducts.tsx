'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/types/product'
import { sortProducts, type SortKey } from '@/lib/products'
import ProductCard from './ProductCard'

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>('default')
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort])

  if (products.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center rounded-xl bg-base-100 py-16 text-center ring-1 ring-base-300">
        <p className="text-4xl">🧺</p>
        <h2 className="mt-3 text-lg font-semibold">এই বিভাগে কোনো পণ্য নেই</h2>
        <Link href="/" className="btn btn-primary mt-5">হোম পেজে ফিরে যান</Link>
      </div>
    )
  }

  return (
    <>
      <div className="mt-5 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="সাজান"
          className="select select-sm w-auto sm:select-md"
        >
          <option value="default">সাজান: ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  )
}