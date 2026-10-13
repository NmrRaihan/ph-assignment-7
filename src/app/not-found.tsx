import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-5xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 max-w-md text-base-content/60">
        আপনি যে পাতাটি খুঁজছেন তা নেই, অথবা লিংকটি ভুল।
      </p>
      <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link>
    </main>
  )
}