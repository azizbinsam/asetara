import { Link } from 'react-router-dom'
import { MapPin, TrendingUp } from 'lucide-react'
import Badge from './Badge'
import { formatRupiah, formatPercent } from '../utils/format'

const CATEGORY_GRADIENT = {
  apartemen: 'from-champagne-300 to-navy-600',
  vila: 'from-teal-300 to-teal-700',
  hotel: 'from-champagne-400 to-teal-700',
}

export default function PropertyCard({ property }) {
  return (
    <Link to={`/marketplace/${property.id}`} className="group block">
      <div className="bg-neutral-0 rounded-card border border-neutral-200 overflow-hidden hover:shadow-card-hover transition-shadow">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {property.image ? (
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_GRADIENT[property.category] || 'from-champagne-300 to-navy-600'}`} />
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="success" withCheck className="!bg-white/90 backdrop-blur">
              Verified Syariah
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-navy-500 text-white text-[10px] font-semibold">
              {formatPercent(property.projectedReturnPercent)}/thn
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-neutral-800 group-hover:text-navy-700 transition-colors">
                {property.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-neutral-400" />
                <p className="text-xs text-neutral-500">{property.location}</p>
              </div>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-600 font-medium capitalize">
              {property.category}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <p className="text-[10px] text-neutral-400">Harga/Token</p>
              <p className="text-sm font-bold text-navy-700">{formatRupiah(property.pricePerToken)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-neutral-400">Min. Investasi</p>
              <p className="text-sm font-semibold text-neutral-700">{formatRupiah(property.minInvestment)}</p>
            </div>
          </div>

          {/* Funding Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-neutral-500">Terkumpul</span>
              <span className="font-semibold text-neutral-700">{property.fundingPercent || 0}%</span>
            </div>
            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-navy-500 to-navy-600 rounded-full transition-all"
                style={{ width: `${property.fundingPercent || 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}