import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProducts } from '@/lib/api'
import { toBn } from '@/lib/format'
import CategoryProducts from '@/components/CategoryProducts'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const all = await getProducts()
  const products = all.filter((p) => p.category === slug)

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">{toBn(products.length)}টি পণ্য</p>
        </div>
      </div>
      <CategoryProducts products={products} />
    </main>
  )
}