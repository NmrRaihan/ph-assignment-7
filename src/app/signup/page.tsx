'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signUp } from '@/lib/auth-client'
import SocialLogin from '@/components/SocialLogin'

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')

    if (!name || !email || !password) {
      toast.error('সব ঘর পূরণ করুন')
      return
    }
    if (password.length < 8) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে')
      return
    }

    setLoading(true)
    const { error } = await signUp.email({ name, email, password })
    setLoading(false)

    if (error) {
      toast.error(error.message ?? 'নিবন্ধন করা যায়নি')
      return
    }
    toast.success('নিবন্ধন সফল হয়েছে! এখন সাইন ইন করুন')
    router.push('/signin')
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">নতুন অ্যাকাউন্ট খুলুন</h1>
        <p className="mt-1 text-sm text-base-content/60">আজকের বাজার দর দেখতে নিবন্ধন করুন।</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">নাম</label>
            <input id="name" name="name" type="text" placeholder="আপনার নাম" className="input w-full" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">ইমেইল</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input w-full" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
            <input id="password" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : 'নিবন্ধন করুন'}
          </button>
        </form>

        <div className="divider text-xs">অথবা</div>
        <SocialLogin />

        <p className="mt-6 text-center text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে?{' '}
          <Link href="/signin" className="font-semibold text-primary">সাইন ইন করুন</Link>
        </p>
      </div>
    </main>
  )
}