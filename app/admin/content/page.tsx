'use client'

import { useState } from 'react'
import { services, staff } from '@/lib/data'
import type { Service, Staff } from '@/lib/data'

type Tab = 'salon' | 'services' | 'staff'

const CATEGORY_OPTIONS = ['manicure', 'pedicure', 'gel', 'nail-art', 'acrylic'] as const

function SalonInfoEditor() {
  const [info, setInfo] = useState({
    name: 'Luxe Nails',
    tagline: 'Premium Nail Salon',
    heroTitle: 'Beautiful nails,',
    heroTitleAccent: 'effortlessly booked.',
    heroDesc: 'Reserve your appointment online in minutes. No calls, no waiting — just gorgeous nails.',
    ctaTitle: 'Ready for beautiful nails?',
    ctaDesc: 'Book your appointment today — spots fill up fast!',
    address: '123 Beauty Lane, Toronto, ON',
    phone: '(416) 555-0100',
  })
  const [saved, setSaved] = useState(false)

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-stone-500">Edit the text shown on your public-facing website. Changes here will be reflected when connected to a live database.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {([
          ['name', 'Salon Name'],
          ['tagline', 'Badge / Tagline'],
          ['address', 'Address'],
          ['phone', 'Phone Number'],
        ] as [keyof typeof info, string][]).map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
            <input
              type="text"
              value={info[key]}
              onChange={e => setInfo(p => ({ ...p, [key]: e.target.value }))}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {([
          ['heroTitle', 'Hero Headline (line 1)'],
          ['heroTitleAccent', 'Hero Headline (line 2, accent)'],
          ['heroDesc', 'Hero Description'],
          ['ctaTitle', 'CTA Section Title'],
          ['ctaDesc', 'CTA Section Description'],
        ] as [keyof typeof info, string][]).map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
            <input
              type="text"
              value={info[key]}
              onChange={e => setInfo(p => ({ ...p, [key]: e.target.value }))}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
        ))}
      </div>
      <button
        onClick={save}
        className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors
          ${saved ? 'bg-green-600 text-white' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
      >
        {saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </div>
  )
}

function ServicesEditor() {
  const [items, setItems] = useState<Service[]>(services)
  const [saved, setSaved] = useState(false)

  function update(id: string, field: keyof Service, value: string | number) {
    setItems(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-500">Edit service names, descriptions, durations, and prices.</p>
      <div className="space-y-3">
        {items.map(service => (
          <div key={service.id} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Name</label>
                <input
                  type="text"
                  value={service.name}
                  onChange={e => update(service.id, 'name', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Category</label>
                <select
                  value={service.category}
                  onChange={e => update(service.id, 'category', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                >
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Price ($)</label>
                <input
                  type="number"
                  value={service.price}
                  onChange={e => update(service.id, 'price', Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Duration (min)</label>
                <input
                  type="number"
                  value={service.duration}
                  onChange={e => update(service.id, 'duration', Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Description</label>
              <input
                type="text"
                value={service.description}
                onChange={e => update(service.id, 'description', e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={save}
        className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors
          ${saved ? 'bg-green-600 text-white' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
      >
        {saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </div>
  )
}

function StaffEditor() {
  const [items, setItems] = useState<Staff[]>(staff)
  const [saved, setSaved] = useState(false)

  function update(id: string, field: keyof Staff, value: string | string[] | number[]) {
    setItems(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-500">Edit staff names, roles, bios, and available days.</p>
      <div className="space-y-4">
        {items.map(member => (
          <div key={member.id} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {member.initials}
              </div>
              <p className="font-medium text-stone-900">{member.name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={e => update(member.id, 'name', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Role / Title</label>
                <input
                  type="text"
                  value={member.role}
                  onChange={e => update(member.id, 'role', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-500 mb-1">Bio</label>
                <input
                  type="text"
                  value={member.bio}
                  onChange={e => update(member.id, 'bio', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-500 mb-1">Specialties (comma-separated)</label>
                <input
                  type="text"
                  value={member.specialties.join(', ')}
                  onChange={e => update(member.id, 'specialties', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-2">Available Days</label>
              <div className="flex gap-2 flex-wrap">
                {DAY_NAMES.map((day, i) => {
                  const active = member.availableDays.includes(i)
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        const next = active
                          ? member.availableDays.filter(d => d !== i)
                          : [...member.availableDays, i].sort()
                        update(member.id, 'availableDays', next)
                      }}
                      className={`w-10 h-10 rounded-full text-xs font-medium transition-colors
                        ${active ? 'bg-rose-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-rose-300'}`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={save}
        className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors
          ${saved ? 'bg-green-600 text-white' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
      >
        {saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </div>
  )
}

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>('salon')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'salon', label: 'Salon Info' },
    { id: 'services', label: 'Services' },
    { id: 'staff', label: 'Staff' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Content Editor</h1>
        <p className="text-stone-500 text-sm mt-1">Manage what your clients see on the website.</p>
      </div>

      <div className="flex gap-1 bg-stone-100 rounded-xl p-1 w-fit mb-8">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${tab === id ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6 max-w-3xl">
        {tab === 'salon' && <SalonInfoEditor />}
        {tab === 'services' && <ServicesEditor />}
        {tab === 'staff' && <StaffEditor />}
      </div>
    </div>
  )
}
