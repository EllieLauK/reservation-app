import BookingWizard from '@/components/BookingWizard'

export const metadata = {
  title: 'Book an Appointment — Luxe Nails',
}

export default function BookPage() {
  return (
    <div className="flex-1 bg-rose-50/50">
      <BookingWizard />
    </div>
  )
}
