import { appointments, getServiceById, getStaffById, formatDate } from '@/lib/data'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-stone-100 text-stone-600',
  cancelled: 'bg-red-100 text-red-600',
}

export default function AppointmentsPage() {
  const sorted = [...appointments].sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date)
    if (dateCompare !== 0) return dateCompare
    return a.time.localeCompare(b.time)
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Appointments</h1>
          <p className="text-stone-500 text-sm mt-1">{appointments.length} total bookings</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              {['Client', 'Service', 'Technician', 'Date', 'Time', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {sorted.map(appt => {
              const service = getServiceById(appt.serviceId)
              const member = getStaffById(appt.staffId)
              return (
                <tr key={appt.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-stone-900">{appt.clientName}</p>
                    <p className="text-xs text-stone-400">{appt.clientEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-stone-700">{service?.name}</td>
                  <td className="px-4 py-3 text-stone-700">{member?.name}</td>
                  <td className="px-4 py-3 text-stone-500">{appt.date}</td>
                  <td className="px-4 py-3 text-stone-700 font-medium">{appt.time}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[appt.status]}`}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
