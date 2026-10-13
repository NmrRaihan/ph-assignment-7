'use client'

import { useSyncExternalStore } from 'react'

const formatter = new Intl.DateTimeFormat('bn-BD', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const subscribe = () => () => {}

// Empty on the server, the real date in the browser, so the two never disagree.
export default function BanglaDate() {
  const text = useSyncExternalStore(subscribe, () => formatter.format(new Date()), () => '')
  return <span className="block min-h-4 text-xs text-base-content/60">{text}</span>
}