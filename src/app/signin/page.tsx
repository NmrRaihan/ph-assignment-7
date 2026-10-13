'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn } from '@/lib/auth-client'
import SocialLogin from '@/components/SocialLogin'

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('redirected')) {
      toast.error('এই পাতাটি দেখতে সাইন ইন করুন', { id: 'redirect' })
    }
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')

    if (!email || !password) {
      toast.error('ইমেইল ও পাসওয়ার্ড দিন')
      return
    }

    setLoading(true)
    const { error } = await signIn.email({ email, password })
    setLoading(false)

    if (error) {
      toast.error(error.message ?? 'সাইন ইন করা যায়নি')
      return
    }
    toast.success('সাইন ইন সফল হয়েছে')
    router.push('/')
    router.refresh()
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-sm text-base-content/60">আপনার অ্যাকাউন্টে প্রবেশ করুন।</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">ইমেইল</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input w-full" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
            <input id="password" name="password" type="password" placeholder="আপনার পাসওয়ার্ড" className="input w-full" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : 'সাইন ইন'}
          </button>
        </form>

        <div className="divider text-xs">অথবা</div>
        <SocialLogin />

        <p className="mt-6 text-center text-sm">
          নতুন ব্যবহারকারী?{' '}
          <Link href="/signup" className="font-semibold text-primary">নিবন্ধন করুন</Link>
        </p>
      </div>
    </main>
  )
}