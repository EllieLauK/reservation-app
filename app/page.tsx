import Link from 'next/link'
import { services, staff, formatPrice, formatDuration } from '@/lib/data'

const CATEGORY_LABELS: Record<string, string> = {
  manicure: 'Manicure',
  pedicure: 'Pedicure',
  gel: 'Gel',
  'nail-art': 'Nail Art',
  acrylic: 'Acrylic',
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-rose-500 font-medium text-sm tracking-widest uppercase mb-4">Premium Nail Salon</p>
          <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-6">
            Beautiful nails,<br />
            <span className="text-rose-600">effortlessly booked.</span>
          </h1>
          <p className="text-lg text-stone-500 mb-10 max-w-md mx-auto">
            Reserve your appointment online in minutes. No calls, no waiting — just gorgeous nails.
          </p>
          <Link
            href="/book"
            className="inline-block bg-rose-600 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
          >
            Book an Appointment
          </Link>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-rose-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-100 rounded-full opacity-50 blur-3xl" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose a Service', desc: 'Browse our menu and pick what you\'re in the mood for.' },
              { step: '2', title: 'Pick Your Stylist', desc: 'Select your preferred nail tech and a time that works for you.' },
              { step: '3', title: 'Relax & Enjoy', desc: 'Show up and let us take care of the rest.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 font-bold text-lg flex items-center justify-center">
                  {step}
                </div>
                <h3 className="font-semibold text-stone-900">{title}</h3>
                <p className="text-sm text-stone-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-rose-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-2 text-center">Our Services</h2>
          <p className="text-stone-500 text-center mb-12">From a quick refresh to a full set — we have you covered.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-2xl p-5 shadow-sm border border-rose-50 hover:shadow-md transition-shadow">
                <span className="inline-block text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full mb-3">
                  {CATEGORY_LABELS[service.category]}
                </span>
                <h3 className="font-semibold text-stone-900 mb-1">{service.name}</h3>
                <p className="text-sm text-stone-500 mb-4">{service.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-400">{formatDuration(service.duration)}</span>
                  <span className="font-semibold text-stone-900">{formatPrice(service.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/book"
              className="inline-block bg-rose-600 text-white px-7 py-3 rounded-full font-medium hover:bg-rose-700 transition-colors"
            >
              Book a Service
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-2">Meet Our Team</h2>
          <p className="text-stone-500 mb-12">Skilled, passionate, and here to make you feel great.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {staff.map(member => (
              <div key={member.id} className="flex flex-col items-center gap-3">
                <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center text-2xl font-semibold text-white shadow-md`}>
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">{member.name}</h3>
                  <p className="text-sm text-rose-600 mb-2">{member.role}</p>
                  <p className="text-sm text-stone-500">{member.bio}</p>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.specialties.map(s => (
                    <span key={s} className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-rose-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for beautiful nails?</h2>
        <p className="text-rose-100 mb-8 max-w-md mx-auto">
          Book your appointment today — spots fill up fast!
        </p>
        <Link
          href="/book"
          className="inline-block bg-white text-rose-600 px-8 py-3.5 rounded-full font-semibold hover:bg-rose-50 transition-colors shadow-lg"
        >
          Book Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-6 text-center text-sm">
        <p className="font-semibold text-white mb-1">Luxe Nails</p>
        <p>123 Beauty Lane, Toronto, ON &nbsp;·&nbsp; (416) 555-0100</p>
        <p className="mt-4 text-stone-600">
          <Link href="/admin" className="hover:text-stone-400 transition-colors">Admin</Link>
        </p>
      </footer>
    </main>
  )
}
