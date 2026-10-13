import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Hind_Siliguri } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
})

export const metadata: Metadata = {
  title: 'বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে',
  description: 'চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর।',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={`${hind.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-base-200 text-base-content">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}