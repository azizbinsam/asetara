import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Card from './Card'
import { NEXT_STEPS } from '../utils/nextSteps'

// Penyambung antar fitur: kartu tautan "langkah berikutnya" di akhir halaman.
export default function NextSteps({ steps, title = 'Langkah berikutnya', className = '' }) {
  const items = steps.map((key) => NEXT_STEPS[key]).filter(Boolean)
  if (items.length === 0) return null

  return (
    <section className={className} aria-label={title}>
      <p className="font-bold text-neutral-800 mb-3">{title}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.to} to={item.to} className="block">
              <Card className="h-full flex items-start gap-3 hover:border-navy-300 transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-champagne-50 flex items-center justify-center">
                  <Icon size={18} className="text-champagne-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-800">{item.title}</p>
                  <p className="text-sm text-neutral-600 mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-navy-600 shrink-0 mt-1" />
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
