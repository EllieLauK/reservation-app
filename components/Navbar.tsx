'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-rose-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-rose-700 tracking-tight">
          Luxe Nails
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/#services" className="text-sm text-stone-500 hover:text-rose-700 transition-colors hidden sm:block">
            Services
          </Link>
          <Link href="/#team" className="text-sm text-stone-500 hover:text-rose-700 transition-colors hidden sm:block">
            Our Team
          </Link>
          <Link
            href="/book"
            className="bg-rose-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
