import { appointments, clients, services, staff, getServiceById, getStaffById } from '@/lib/data'

const TODAY = '2026-06-11'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-stone-100 text-stone-600',
  cancelled: 'bg-red-100 text-red-600',
}

export default function AdminDashboard() {
  const todayAppts = appointments.filter(a => a.date === TODAY)
  const confirmed = appointments.filter(a => a.status === 'confirmed').length
  const completed = appointments.filter(a => a.status === 'completed').length
  const revenue = appointments
    .filter(a => a.status === 'completed')
    .reduce((sum, a) => sum + (getServiceById(a.serviceId)?.price ?? 0), 0)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Wednesday, June 11, 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Today's Appointments", value: todayAppts.length, color: 'text-rose-600' },
          { label: 'Confirmed', value: confirmed, color: 'text-green-600' },
          { label: 'Total Clients', value: clients.length, color: 'text-violet-600' },
          { label: 'Revenue (completed)', value: `$${revenue}`, color: 'text-amber-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
            <p className="text-stone-500 text-xs font-medium mb-1">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Today's appointments */}
      <div className="bg-white rounded-xl border border-stone-100 shadow-sm">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-semibold text-stone-900">Today's Appointments</h2>
          <a href="/admin/appointments" className="text-xs text-rose-600 hover:text-rose-700 font-medium">View all →</a>
        </div>
        {todayAppts.length === 0 ? (
          <p className="px-6 py-10 text-center text-stone-400 text-sm">No appointments today.</p>
        ) : (
          <div className="divide-y divide-stone-50">
            {todayAppts.map(appt => {
              const service = getServiceById(appt.serviceId)
              const member = getStaffById(appt.staffId)
              return (
                <div key={appt.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-stone-700 w-14 shrink-0">{appt.time}</div>
                    <div>
                      <p className="text-sm font-medium text-stone-900">{appt.clientName}</p>
                      <p className="text-xs text-stone-500">{service?.name} · {member?.name}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Staff on duty */}
      <div className="mt-6 bg-white rounded-xl border border-stone-100 shadow-sm">
        <div className="px-6 py-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-900">Staff on Duty Today</h2>
        </div>
        <div className="px-6 py-4 flex gap-4 flex-wrap">
          {staff
            .filter(s => s.availableDays.includes(3)) // Wednesday = 3
            .map(member => (
              <div key={member.id} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center text-sm font-bold text-white`}>
                  {member.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">{member.name}</p>
                  <p className="text-xs text-stone-500">{member.role}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
