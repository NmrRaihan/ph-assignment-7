import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/session'

export default async function ProfilePage() {
  const session = await getServerSession()
  if (!session) redirect('/signin?redirected=1')
  const { user } = session

  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 text-center shadow-sm sm:p-8">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-content">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
        <p className="mt-1 text-base-content/60">{user.email}</p>
        <Link href="/profile/update" className="btn btn-primary mt-6 w-full">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </main>
  )
}