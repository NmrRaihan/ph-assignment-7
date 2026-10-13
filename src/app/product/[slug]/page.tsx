import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getProductBySlug } from '@/lib/api'
import { UNIT_BN, formatChange, formatPrice } from '@/lib/format'
import { priceSummary } from '@/lib/products'
import { getServerSession } from '@/lib/session'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession()
  if (!session) redirect('/signin?redirected=1')

  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const { min, max, avg } = priceSummary(product)
  const change = formatChange(product.change)

  const summary = [
    { label: 'সর্বনিম্ন দাম', value: min, color: 'text-green-700' },
    { label: 'সর্বোচ্চ দাম', value: max, color: 'text-red-600' },
    { label: 'গড় দাম', value: avg, color: 'text-base-content' },
  ]

  const history = [
    { label: 'গতকাল', value: product.yesterday },
    { label: 'গত সপ্তাহ', value: product.lastWeek },
    { label: 'গত মাস', value: product.lastMonth },
  ]

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <Link href="/" className="text-sm text-primary">← সব পণ্য</Link>

      <section className="mt-4 rounded-2xl bg-base-100 p-5 shadow-sm ring-1 ring-base-300 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-base-200 text-4xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold">{product.nameBn}</h1>
              <p className="mt-1 text-sm text-base-content/60">
                সারা দেশের {product.markets.length}টি বাজারের দামের ভিত্তিতে
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="badge badge-outline badge-primary"
                >
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <span className="badge badge-ghost">{UNIT_BN[product.unit]}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-2xl font-bold">{formatPrice(product.today)}</p>
            <span className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold ${change.color}`}>
              {change.text}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {summary.map((s) => (
            <div key={s.label} className="rounded-xl bg-base-200 p-4">
              <p className="text-xs text-base-content/60">{s.label}</p>
              <p className={`mt-1 text-xl font-bold ${s.color}`}>{formatPrice(s.value)}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-base-content/70">
          {history.map((h) => (
            <span key={h.label}>
              {h.label}: <strong>{formatPrice(h.value)}</strong>
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-4 overflow-x-auto rounded-xl bg-base-100 shadow-sm ring-1 ring-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => (
                <tr key={m.market}>
                  <td className="font-medium">{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{formatPrice(m.min)}</td>
                  <td className="text-right">{formatPrice(m.max)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}