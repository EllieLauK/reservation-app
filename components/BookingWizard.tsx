'use client'

import { useState } from 'react'
import { services, staff, TIME_SLOTS, getServiceById, getStaffById, formatPrice, formatDuration, formatDate } from '@/lib/data'
import type { Dictionary } from '@/lib/i18n'

type BookingData = {
  serviceId: string
  staffId: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

type Props = {
  dict: Dictionary['booking']
  categories: Dictionary['categories']
  locale: string
}

function StepIndicator({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {labels.map((label, i) => {
        const num = i + 1
        const done = num < step
        const active = num === step
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
              ${done ? 'bg-rose-600 text-white' : active ? 'bg-rose-600 text-white ring-4 ring-rose-100' : 'bg-stone-100 text-stone-400'}`}>
              {done ? '✓' : num}
            </div>
            <span className={`text-sm hidden sm:block ${active ? 'text-stone-900 font-medium' : 'text-stone-400'}`}>{label}</span>
            {i < labels.length - 1 && <div className={`h-px w-8 sm:w-12 ${done ? 'bg-rose-400' : 'bg-stone-200'}`} />}
          </div>
        )
      })}
    </div>
  )
}

function ServiceStep({
  selected, onSelect, dict, categories,
}: {
  selected: string
  onSelect: (id: string) => void
  dict: Dictionary['booking']['service']
  categories: Dictionary['categories']
}) {
  const [filter, setFilter] = useState<string>('all')
  const categoryKeys = ['manicure', 'pedicure', 'gel', 'nail-art', 'acrylic'] as const
  const filtered = filter === 'all' ? services : services.filter(s => s.category === filter)

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-1">{dict.title}</h2>
      <p className="text-stone-500 mb-6">{dict.desc}</p>
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
            ${filter === 'all' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
        >
          {dict.all}
        </button>
        {categoryKeys.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${filter === cat ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
          >
            {categories[cat]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(service => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`text-left p-4 rounded-xl border-2 transition-all
              ${selected === service.id
                ? 'border-rose-500 bg-rose-50 shadow-md'
                : 'border-stone-100 bg-white hover:border-rose-200 hover:shadow-sm'}`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-stone-900">{service.name}</span>
              <span className="font-bold text-rose-600 text-sm ml-2 shrink-0">{formatPrice(service.price)}</span>
            </div>
            <p className="text-xs text-stone-500 mb-2">{service.description}</p>
            <span className="text-xs text-stone-400">{formatDuration(service.duration)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StaffStep({ selected, onSelect, dict }: {
  selected: string
  onSelect: (id: string) => void
  dict: Dictionary['booking']['staff']
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-1">{dict.title}</h2>
      <p className="text-stone-500 mb-6">{dict.desc}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {staff.map(member => (
          <button
            key={member.id}
            onClick={() => onSelect(member.id)}
            className={`text-left p-5 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-3
              ${selected === member.id
                ? 'border-rose-500 bg-rose-50 shadow-md'
                : 'border-stone-100 bg-white hover:border-rose-200 hover:shadow-sm'}`}
          >
            <div className={`w-14 h-14 rounded-full ${member.color} flex items-center justify-center text-xl font-bold text-white`}>
              {member.initials}
            </div>
            <div>
              <p className="font-semibold text-stone-900">{member.name}</p>
              <p className="text-xs text-rose-600 mb-2">{member.role}</p>
              <p className="text-xs text-stone-500">{member.bio}</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              {member.specialties.map(s => (
                <span key={s} className="text-xs bg-white border border-rose-100 text-rose-700 px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Calendar({
  selectedDate, onSelect, availableDays, dayLabels,
}: {
  selectedDate: string
  onSelect: (date: string) => void
  availableDays: number[]
  dayLabels: string[]
}) {
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstDay = month.getDay()

  function toDateStr(day: number) {
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function isAvailable(day: number) {
    const d = new Date(year, monthIndex, day)
    d.setHours(0, 0, 0, 0)
    return d >= today && availableDays.includes(d.getDay())
  }

  const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' })
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div className="bg-white rounded-xl border border-stone-100 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMonth(new Date(year, monthIndex - 1, 1))} className="p-1.5 rounded-lg hover:bg-rose-50 text-stone-500 hover:text-rose-700 transition-colors">‹</button>
        <span className="font-semibold text-stone-900 text-sm">{monthName}</span>
        <button onClick={() => setMonth(new Date(year, monthIndex + 1, 1))} className="p-1.5 rounded-lg hover:bg-rose-50 text-stone-500 hover:text-rose-700 transition-colors">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map(d => (
          <div key={d} className="text-center text-xs font-medium text-stone-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = toDateStr(day)
          const available = isAvailable(day)
          const isSelected = selectedDate === dateStr
          return (
            <button
              key={i}
              disabled={!available}
              onClick={() => onSelect(dateStr)}
              className={`h-9 w-9 rounded-full text-sm font-medium mx-auto flex items-center justify-center transition-colors
                ${isSelected ? 'bg-rose-600 text-white' : ''}
                ${!isSelected && available ? 'text-stone-800 hover:bg-rose-50' : ''}
                ${!available ? 'text-stone-300 cursor-not-allowed' : ''}`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DateTimeStep({
  selectedDate, selectedTime, staffId, dict,
  onDateSelect, onTimeSelect,
}: {
  selectedDate: string
  selectedTime: string
  staffId: string
  dict: Dictionary['booking']['datetime']
  onDateSelect: (d: string) => void
  onTimeSelect: (t: string) => void
}) {
  const member = getStaffById(staffId)
  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-1">{dict.title}</h2>
      <p className="text-stone-500 mb-6">{member ? `${member.name} ${dict.available}` : dict.title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Calendar
          selectedDate={selectedDate}
          onSelect={(d) => { onDateSelect(d); onTimeSelect('') }}
          availableDays={member?.availableDays ?? [1, 2, 3, 4, 5]}
          dayLabels={dict.days}
        />
        <div>
          <p className="text-sm font-medium text-stone-700 mb-3">
            {selectedDate ? `${dict.availableTimes} — ${formatDate(selectedDate)}` : dict.selectDate}
          </p>
          {selectedDate && (
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => onTimeSelect(slot)}
                  className={`py-2 rounded-lg text-sm font-medium border transition-colors
                    ${selectedTime === slot
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-rose-300 hover:text-rose-700'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ConfirmStep({
  data, dict, onSubmit, submitting,
  onNameChange, onEmailChange, onPhoneChange, onNotesChange,
}: {
  data: BookingData
  dict: Dictionary['booking']['confirm']
  onSubmit: () => void
  submitting: boolean
  onNameChange: (v: string) => void
  onEmailChange: (v: string) => void
  onPhoneChange: (v: string) => void
  onNotesChange: (v: string) => void
}) {
  const service = getServiceById(data.serviceId)
  const member = getStaffById(data.staffId)

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-1">{dict.title}</h2>
      <p className="text-stone-500 mb-6">{dict.desc}</p>

      <div className="bg-rose-50 rounded-xl p-4 mb-6 border border-rose-100">
        <p className="text-sm font-semibold text-stone-700 mb-3">{dict.summary}</p>
        <div className="grid grid-cols-2 gap-y-1.5 text-sm">
          <span className="text-stone-500">{dict.service}</span><span className="font-medium text-stone-900">{service?.name}</span>
          <span className="text-stone-500">{dict.duration}</span><span className="font-medium text-stone-900">{service ? formatDuration(service.duration) : ''}</span>
          <span className="text-stone-500">{dict.price}</span><span className="font-medium text-rose-600">{service ? formatPrice(service.price) : ''}</span>
          <span className="text-stone-500">{dict.technician}</span><span className="font-medium text-stone-900">{member?.name}</span>
          <span className="text-stone-500">{dict.date}</span><span className="font-medium text-stone-900">{data.date ? formatDate(data.date) : ''}</span>
          <span className="text-stone-500">{dict.time}</span><span className="font-medium text-stone-900">{data.time}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{dict.name} *</label>
          <input type="text" value={data.name} onChange={e => onNameChange(e.target.value)} placeholder="Jane Smith"
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{dict.phone} *</label>
          <input type="tel" value={data.phone} onChange={e => onPhoneChange(e.target.value)} placeholder="416-555-0100"
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1">{dict.email} *</label>
          <input type="email" value={data.email} onChange={e => onEmailChange(e.target.value)} placeholder="jane@example.com"
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1">{dict.notes}</label>
          <textarea value={data.notes} onChange={e => onNotesChange(e.target.value)} placeholder={dict.notesPlaceholder} rows={3}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 resize-none" />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting || !data.name || !data.email || !data.phone}
        className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-100"
      >
        {submitting ? dict.submitting : dict.submit}
      </button>
    </div>
  )
}

function SuccessStep({ data, dict, locale }: { data: BookingData; dict: Dictionary['booking']['success']; locale: string }) {
  const service = getServiceById(data.serviceId)
  const member = getStaffById(data.staffId)

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✨</div>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">{dict.title}</h2>
      <p className="text-stone-500 mb-8 max-w-sm mx-auto">{dict.desc} {data.name.split(' ')[0]}!</p>
      <div className="bg-rose-50 rounded-xl p-5 text-left max-w-sm mx-auto border border-rose-100 mb-8">
        <p className="text-sm font-semibold text-stone-700 mb-3">{dict.details}</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-stone-500">{dict.details.split(' ')[0]}</span><span className="font-medium">{service?.name}</span></div>
          <div className="flex justify-between"><span className="text-stone-500">{dict.with}</span><span className="font-medium">{member?.name}</span></div>
          <div className="flex justify-between"><span className="text-stone-500">Date</span><span className="font-medium">{data.date ? formatDate(data.date) : ''}</span></div>
          <div className="flex justify-between"><span className="text-stone-500">Time</span><span className="font-medium">{data.time}</span></div>
          <div className="flex justify-between"><span className="text-stone-500">{dict.total}</span><span className="font-semibold text-rose-600">{service ? formatPrice(service.price) : ''}</span></div>
        </div>
      </div>
      <a href={`/${locale}`} className="inline-block text-rose-600 font-medium hover:text-rose-700 text-sm">{dict.back}</a>
    </div>
  )
}

export default function BookingWizard({ dict, categories, locale }: Props) {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [data, setData] = useState<BookingData>({
    serviceId: '', staffId: '', date: '', time: '',
    name: '', email: '', phone: '', notes: '',
  })

  function update(patch: Partial<BookingData>) {
    setData(prev => ({ ...prev, ...patch }))
  }

  async function handleSubmit() {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setStep(5)
  }

  const canNext: Record<number, boolean> = {
    1: !!data.serviceId,
    2: !!data.staffId,
    3: !!data.date && !!data.time,
    4: !!data.name && !!data.email && !!data.phone,
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {step < 5 && <StepIndicator step={step} labels={dict.steps} />}

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8">
        {step === 1 && <ServiceStep selected={data.serviceId} onSelect={id => update({ serviceId: id })} dict={dict.service} categories={categories} />}
        {step === 2 && <StaffStep selected={data.staffId} onSelect={id => update({ staffId: id })} dict={dict.staff} />}
        {step === 3 && (
          <DateTimeStep
            selectedDate={data.date} selectedTime={data.time} staffId={data.staffId} dict={dict.datetime}
            onDateSelect={d => update({ date: d })} onTimeSelect={t => update({ time: t })}
          />
        )}
        {step === 4 && (
          <ConfirmStep
            data={data} dict={dict.confirm} onSubmit={handleSubmit} submitting={submitting}
            onNameChange={v => update({ name: v })} onEmailChange={v => update({ email: v })}
            onPhoneChange={v => update({ phone: v })} onNotesChange={v => update({ notes: v })}
          />
        )}
        {step === 5 && <SuccessStep data={data} dict={dict.success} locale={locale} />}
      </div>

      {step < 4 && step < 5 && (
        <div className="flex justify-between mt-4">
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-0">
            {dict.back}
          </button>
          <button onClick={() => setStep(s => s + 1)} disabled={!canNext[step]}
            className="px-6 py-2.5 rounded-xl text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {dict.continue}
          </button>
        </div>
      )}
      {step === 4 && (
        <div className="mt-4">
          <button onClick={() => setStep(3)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors">
            {dict.back}
          </button>
        </div>
      )}
    </div>
  )
}
