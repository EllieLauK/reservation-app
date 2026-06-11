import { clients, appointments, getServiceById, getStaffById } from '@/lib/data'

export default function ClientsPage() {
  const sorted = [...clients].sort((a, b) => b.visitCount - a.visitCount)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Clients</h1>
        <p className="text-stone-500 text-sm mt-1">{clients.length} clients in your records</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              {['Client', 'Contact', 'Visits', 'Last Visit', 'Recent Service'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {sorted.map(client => {
              const clientAppts = appointments
                .filter(a => a.clientEmail === client.email)
                .sort((a, b) => b.date.localeCompare(a.date))
              const lastAppt = clientAppts[0]
              const lastService = lastAppt ? getServiceById(lastAppt.serviceId) : null
              const lastStaff = lastAppt ? getStaffById(lastAppt.staffId) : null

              return (
                <tr key={client.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-xs font-bold text-rose-600">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-stone-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-stone-700">{client.email}</p>
                    <p className="text-xs text-stone-400">{client.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-stone-900">{client.visitCount}</span>
                      {client.visitCount >= 5 && (
                        <span className="text-xs bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full font-medium">VIP</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-500">{client.lastVisit}</td>
                  <td className="px-4 py-3">
                    {lastService ? (
                      <div>
                        <p className="text-stone-700">{lastService.name}</p>
                        <p className="text-xs text-stone-400">with {lastStaff?.name}</p>
                      </div>
                    ) : (
                      <span className="text-stone-400">—</span>
                    )}
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
