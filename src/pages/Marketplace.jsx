import { useState } from 'react'
import { Search } from 'lucide-react'
import { useProperties } from '../context/PropertiesContext'
import PropertyCard from '../components/PropertyCard'

const FILTERS = [
  { value: 'semua', label: 'Semua' },
  { value: 'apartemen', label: 'Apartemen' },
  { value: 'vila', label: 'Vila' },
  { value: 'hotel', label: 'Hotel' },
]

export default function Marketplace() {
  const { activeProperties } = useProperties()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('semua')

  const filtered = activeProperties.filter((p) => {
    const matchFilter = filter === 'semua' || p.category === filter
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3">
        <h1 className="font-bold text-neutral-800">Marketplace Properti</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Marketplace Properti</h1>

        <div className="flex items-center gap-2 bg-neutral-0 border border-neutral-200 rounded-xl px-3 py-2.5 mb-4">
          <Search size={18} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Cari properti atau lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === value
                  ? 'bg-navy-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-sm">Tidak ada properti untuk filter ini</p>
            <button
              onClick={() => { setFilter('semua'); setSearch('') }}
              className="mt-3 text-navy-700 text-sm font-medium hover:underline"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}