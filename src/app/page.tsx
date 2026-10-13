import { getProducts } from '@/lib/api'
import { toBn } from '@/lib/format'
import { topFallers, topRisers } from '@/lib/products'
import Hero from '@/components/Hero'
import ProductSection from '@/components/ProductSection'

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="flex-1 pb-10">
      <Hero />
      <ProductSection
        title="আজ দাম বেড়েছে ▲"
        subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
        products={topRisers(products)}
      />
      <ProductSection
        title="আজ দাম কমেছে ▼"
        subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে"
        products={topFallers(products)}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`${toBn(products.length)}টি নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম`}
        products={products}
      />
    </main>
  )
}