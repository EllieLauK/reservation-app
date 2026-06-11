import Link from 'next/link'
import type { Metadata } from 'next'
import LogoutButton from '@/components/LogoutButton'

export const metadata: Metadata = {
  title: 'Admin — Luxe Nails',
}

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/appointments', label: 'Appointments', icon: '📅' },
  { href: '/admin/staff', label: 'Staff', icon: '👥' },
  { href: '/admin/clients', label: 'Clients', icon: '♡' },
  { href: '/admin/content', label: 'Content Editor', icon: '✏️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside className="w-56 bg-stone-900 text-stone-300 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-stone-800">
          <p className="text-white font-semibold text-lg">Luxe Nails</p>
          <p className="text-stone-500 text-xs mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4 px-3">
          {NAV.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 hover:text-white transition-colors mb-1"
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-stone-800 space-y-2">
          <Link href="/" className="block text-xs text-stone-500 hover:text-stone-300 transition-colors">
            ← Back to site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
