'use client'

import toast from 'react-hot-toast'
import { signIn } from '@/lib/auth-client'

export default function SocialLogin() {
  async function handleGithub() {
    const { error } = await signIn.social({ provider: 'github', callbackURL: '/' })
    if (error) {
      toast.error(error.message ?? 'গিটহাব দিয়ে সাইন ইন করা যায়নি')
    }
  }

  return (
    <button type="button" onClick={handleGithub} className="btn w-full">
      GitHub দিয়ে চালিয়ে যান
    </button>
  )
}