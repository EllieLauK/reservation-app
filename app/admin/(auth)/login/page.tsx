'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error ?? 'Invalid credentials')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-purple-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-900/50">
            <span className="text-white text-2xl">✦</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Luxe Nails</h1>
          <p className="text-stone-400 text-sm mt-1">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-800 rounded-2xl p-6 shadow-xl border border-stone-700/50">
          <h2 className="text-base font-semibold text-white mb-5">Sign in to continue</h2>

          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-300 text-sm px-3 py-2.5 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                autoFocus
                placeholder="admin"
                className="w-full bg-stone-700/50 border border-stone-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-stone-700/50 border border-stone-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full mt-6 bg-purple-700 text-white py-2.5 rounded-lg font-medium hover:bg-purple-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-stone-600 text-xs mt-6">
          <a href="/" className="hover:text-stone-400 transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  )
}
