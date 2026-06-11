'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left text-xs text-stone-500 hover:text-red-400 transition-colors flex items-center gap-2"
    >
      <span>⎋</span> Sign out
    </button>
  )
}
