import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/session'
import UpdateNameForm from '@/components/UpdateNameForm'

export default async function UpdateProfilePage() {
  const session = await getServerSession()
  if (!session) redirect('/signin?redirected=1')

  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <UpdateNameForm currentName={session.user.name} />
      </div>
    </main>
  )
}