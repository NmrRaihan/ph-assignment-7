'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { updateUser } from '@/lib/auth-client'

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = String(new FormData(e.currentTarget).get('name') ?? '').trim()
    if (!name) {
      toast.error('নাম লিখুন')
      return
    }

    setLoading(true)
    const { error } = await updateUser({ name })
    setLoading(false)

    if (error) {
      toast.error(error.message ?? 'তথ্য আপডেট করা যায়নি')
      return
    }
    toast.success('তথ্য আপডেট হয়েছে')
    router.push('/profile')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">নাম</label>
        <input id="name" name="name" type="text" defaultValue={currentName} className="input w-full" />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? <span className="loading loading-spinner loading-sm" /> : 'আপডেট করুন'}
      </button>
    </form>
  )
}