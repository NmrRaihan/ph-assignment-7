'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signOut, useSession } from '@/lib/auth-client'
import type { Category } from '@/types/product'
import BanglaDate from './BanglaDate'

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [signingOut, setSigningOut] = useState(false)

  const links = [
    { href: '/', label: 'হোম', icon: '🏠' },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.nameBn, icon: c.icon })),
  ]

  async function handleSignOut() {
    setSigningOut(true)
    const { error } = await signOut()
    setSigningOut(false)
    if (error) {
      toast.error('সাইন আউট করা যায়নি')
      return
    }
    toast.success('সাইন আউট সফল হয়েছে')
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-base-100 shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="block leading-tight">
          <span className="text-lg font-bold text-primary sm:text-xl">🛒 বাজার দর</span>
          <BanglaDate />
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-32 sm:h-10 sm:w-44" />
          ) : session ? (
            <>
              <Link href="/profile" className="btn btn-ghost btn-sm sm:btn-md">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-content">
                  {session.user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden max-w-28 truncate sm:inline">{session.user.name}</span>
              </Link>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="btn btn-outline btn-sm sm:btn-md"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300">
        <ul className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto whitespace-nowrap px-4 py-2">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    active
                      ? 'flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-content'
                      : 'flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-base-200'
                  }
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}