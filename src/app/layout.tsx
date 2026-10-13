import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Hind_Siliguri, Noto_Color_Emoji } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { getCategories, getProducts } from '@/lib/api'
import Navbar from '@/components/Navbar'
import PriceTicker from '@/components/PriceTicker'
import Footer from '@/components/Footer'
import './globals.css'

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
})

const emoji = Noto_Color_Emoji({
  subsets: ['emoji'],
  weight: '400',
  variable: '--font-emoji',
})

export const metadata: Metadata = {
  title: 'বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে',
  description: 'চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর।',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ])

  return (
    <html lang="bn" data-theme="bazar" className={`${hind.variable} ${emoji.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-base-200 text-base-content">
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  )
}