import { staff, appointments, getServiceById } from '@/lib/data'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function StaffPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Staff</h1>
        <p className="text-stone-500 text-sm mt-1">{staff.length} team members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {staff.map(member => {
          const memberAppts = appointments.filter(a => a.staffId === member.id)
          const completedAppts = memberAppts.filter(a => a.status === 'completed')
          const revenue = completedAppts.reduce((sum, a) => sum + (getServiceById(a.serviceId)?.price ?? 0), 0)

          return (
            <div key={member.id} className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-full ${member.color} flex items-center justify-center text-xl font-bold text-white`}>
                  {member.initials}
                </div>
                <div>
                  <h2 className="font-semibold text-stone-900">{member.name}</h2>
                  <p className="text-sm text-rose-600">{member.role}</p>
                </div>
              </div>

              <p className="text-sm text-stone-500 mb-4">{member.bio}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map(s => (
                    <span key={s} className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Schedule</p>
                <div className="flex gap-1">
                  {DAY_NAMES.map((day, i) => (
                    <div
                      key={day}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                        ${member.availableDays.includes(i) ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-400'}`}
                    >
                      {day[0]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-100 pt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-stone-400">Total Bookings</p>
                  <p className="text-lg font-bold text-stone-900">{memberAppts.length}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Revenue</p>
                  <p className="text-lg font-bold text-rose-600">${revenue}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
