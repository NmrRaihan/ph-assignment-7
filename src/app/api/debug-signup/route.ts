import dns from 'node:dns'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        name: 'Debug User',
        email: `debug${Date.now()}@example.com`,
        password: 'password1234',
      },
    })
    return Response.json({ ok: true, res })
  } catch (e) {
    const err = e as { message?: string }
    return Response.json(
      { ok: false, message: err.message, dnsServers: dns.getServers() },
      { status: 500 },
    )
  }
}