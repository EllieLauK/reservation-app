export type ServiceCategory = 'manicure' | 'pedicure' | 'nail-art' | 'gel' | 'acrylic'

export type Service = {
  id: string
  name: string
  category: ServiceCategory
  duration: number
  price: number
  description: string
}

export type Staff = {
  id: string
  name: string
  role: string
  bio: string
  specialties: string[]
  availableDays: number[] // 0=Sun ... 6=Sat
  initials: string
  color: string
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type Appointment = {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  staffId: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  status: AppointmentStatus
  notes?: string
  createdAt: string
}

export type Client = {
  id: string
  name: string
  email: string
  phone: string
  visitCount: number
  lastVisit: string
  notes?: string
}

export const services: Service[] = [
  { id: 's1', name: 'Classic Manicure', category: 'manicure', duration: 30, price: 25, description: 'Shape, buff, and polish your nails to perfection.' },
  { id: 's2', name: 'Gel Manicure', category: 'gel', duration: 45, price: 40, description: 'Long-lasting gel polish that stays chip-free for weeks.' },
  { id: 's3', name: 'Classic Pedicure', category: 'pedicure', duration: 45, price: 35, description: 'Soak, exfoliate, and polish for beautiful feet.' },
  { id: 's4', name: 'Gel Pedicure', category: 'gel', duration: 60, price: 50, description: 'Gel polish pedicure for long-lasting beautiful toes.' },
  { id: 's5', name: 'Nail Art', category: 'nail-art', duration: 30, price: 20, description: 'Custom designs — florals, gems, gradients, and more.' },
  { id: 's6', name: 'Full Set Acrylic', category: 'acrylic', duration: 90, price: 65, description: 'Full acrylic set with your choice of shape and length.' },
  { id: 's7', name: 'Acrylic Fill', category: 'acrylic', duration: 60, price: 45, description: 'Fill in your existing acrylics to keep them looking fresh.' },
  { id: 's8', name: 'SNS / Dip Powder', category: 'acrylic', duration: 60, price: 50, description: 'Odorless, lightweight dip powder for strong, natural-looking nails.' },
]

export const staff: Staff[] = [
  {
    id: 'st1', name: 'Lily Chen', role: 'Senior Nail Technician',
    bio: '8 years of experience specializing in gel and acrylic nails.',
    specialties: ['Gel', 'Acrylics', 'Nail Art'],
    availableDays: [1, 2, 3, 4, 5],
    initials: 'LC', color: 'bg-rose-300',
  },
  {
    id: 'st2', name: 'Sophie Nguyen', role: 'Nail Artist',
    bio: 'Creative artist with a passion for intricate, one-of-a-kind designs.',
    specialties: ['Nail Art', 'Gel', 'SNS'],
    availableDays: [2, 3, 4, 5, 6],
    initials: 'SN', color: 'bg-violet-300',
  },
  {
    id: 'st3', name: 'Emma Park', role: 'Nail Technician',
    bio: 'Detail-oriented technician focused on natural nail health and care.',
    specialties: ['Classic Manicure', 'Pedicure', 'Gel'],
    availableDays: [1, 3, 4, 5, 6],
    initials: 'EP', color: 'bg-amber-300',
  },
]

export const appointments: Appointment[] = [
  { id: 'a1', clientName: 'Jessica Wang', clientEmail: 'jessica@example.com', clientPhone: '416-555-0101', serviceId: 's2', staffId: 'st1', date: '2026-06-11', time: '10:00', status: 'confirmed', createdAt: '2026-06-01T10:00:00Z' },
  { id: 'a2', clientName: 'Michelle Lee', clientEmail: 'michelle@example.com', clientPhone: '416-555-0102', serviceId: 's3', staffId: 'st3', date: '2026-06-11', time: '11:00', status: 'confirmed', createdAt: '2026-06-02T11:00:00Z' },
  { id: 'a3', clientName: 'Amy Tran', clientEmail: 'amy@example.com', clientPhone: '416-555-0103', serviceId: 's5', staffId: 'st2', date: '2026-06-11', time: '14:00', status: 'pending', createdAt: '2026-06-03T09:00:00Z' },
  { id: 'a4', clientName: 'Priya Sharma', clientEmail: 'priya@example.com', clientPhone: '416-555-0104', serviceId: 's6', staffId: 'st1', date: '2026-06-12', time: '09:00', status: 'confirmed', createdAt: '2026-06-04T14:00:00Z' },
  { id: 'a5', clientName: 'Rachel Kim', clientEmail: 'rachel@example.com', clientPhone: '416-555-0105', serviceId: 's7', staffId: 'st1', date: '2026-06-12', time: '11:00', status: 'pending', createdAt: '2026-06-05T10:00:00Z' },
  { id: 'a6', clientName: 'Diana Chen', clientEmail: 'diana@example.com', clientPhone: '416-555-0106', serviceId: 's4', staffId: 'st3', date: '2026-06-10', time: '10:00', status: 'completed', createdAt: '2026-06-01T08:00:00Z' },
  { id: 'a7', clientName: 'Tiffany Wong', clientEmail: 'tiffany@example.com', clientPhone: '416-555-0107', serviceId: 's1', staffId: 'st3', date: '2026-06-09', time: '13:00', status: 'completed', createdAt: '2026-05-30T12:00:00Z' },
]

export const clients: Client[] = [
  { id: 'c1', name: 'Jessica Wang', email: 'jessica@example.com', phone: '416-555-0101', visitCount: 5, lastVisit: '2026-06-11' },
  { id: 'c2', name: 'Michelle Lee', email: 'michelle@example.com', phone: '416-555-0102', visitCount: 3, lastVisit: '2026-06-11' },
  { id: 'c3', name: 'Amy Tran', email: 'amy@example.com', phone: '416-555-0103', visitCount: 8, lastVisit: '2026-06-11' },
  { id: 'c4', name: 'Priya Sharma', email: 'priya@example.com', phone: '416-555-0104', visitCount: 2, lastVisit: '2026-06-12' },
  { id: 'c5', name: 'Rachel Kim', email: 'rachel@example.com', phone: '416-555-0105', visitCount: 1, lastVisit: '2026-06-12' },
  { id: 'c6', name: 'Diana Chen', email: 'diana@example.com', phone: '416-555-0106', visitCount: 4, lastVisit: '2026-06-10' },
  { id: 'c7', name: 'Tiffany Wong', email: 'tiffany@example.com', phone: '416-555-0107', visitCount: 6, lastVisit: '2026-06-09' },
]

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
]

export function getServiceById(id: string) {
  return services.find(s => s.id === id)
}

export function getStaffById(id: string) {
  return staff.find(s => s.id === id)
}

export function formatPrice(price: number) {
  return `$${price}`
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${m}min` : `${h}h`
}

export function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-CA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}
