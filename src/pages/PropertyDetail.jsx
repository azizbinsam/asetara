import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, MapPin, TrendingUp, Building2 } from 'lucide-react'
import { useProperties } from '../context/PropertiesContext'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import { formatRupiah, formatPercent, formatNumber } from '../utils/format'

const CATEGORY_GRADIENT = {
  apartemen: 'from-champagne-300 to-navy-600',
  vila: 'from-teal-300 to-teal-700',
  hotel: 'from-champagne-400 to-teal-700',
}

export default function PropertyDetail() {
  const { propertyId } = useParams()
  const navigate = useNavigate()
  const { activeProperties } = useProperties()

  const property = activeProperties.find((p) => p.id === propertyId)

  if (!property) {
    return (
      <div className="p-6 text-center">
        <p className="text-neutral-600">Properti tidak ditemukan.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/marketplace')}>
          Kembali ke Marketplace
        </Button>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3 lg:hidden">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800 truncate">{property.name}</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex items-center gap-1 text-sm text-neutral-500 hover:text-navy-600 mb-4"
        >
          <ChevronLeft size={16} /> Kembali ke Marketplace
        </button>

        {/* Hero image / gradient */}
        <div className="relative h-56 rounded-card overflow-hidden">
          {property.image ? (
            <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_GRADIENT[property.category] || 'from-champagne-300 to-navy-600'}`} />
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="success" withCheck className="!bg-white/90 backdrop-blur">
              Verified Syariah
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full bg-navy-500 text-white text-[11px] font-semibold flex items-center gap-1">
              <TrendingUp size={12} /> {formatPercent(property.projectedReturnPercent)}/thn
            </span>
          </div>
        </div>

        {/* Title & location */}
        <div className="flex items-start justify-between gap-2 mt-4">
          <div>
            <h1 className="text-lg font-bold text-neutral-800">{property.name}</h1>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={13} className="text-neutral-400" />
              <p className="text-sm text-neutral-500">{property.location}</p>
            </div>
          </div>
          <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-xs text-neutral-600 font-medium capitalize">
            <Building2 size={12} /> {property.category}
          </span>
        </div>

        {/* Description */}
        {property.description && (
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{property.description}</p>
        )}

        {/* Funding progress */}
        <Card variant="flat" className="mt-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-neutral-500">Dana Terkumpul</span>
            <span className="font-semibold text-neutral-700">{property.fundingPercent || 0}%</span>
          </div>
          <ProgressBar value={property.fundingPercent || 0} />
        </Card>

        {/* Key stats */}
        <Card variant="flat" className="mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-neutral-500 text-xs">Total Aset</p>
              <p className="font-semibold text-neutral-800">{formatRupiah(property.totalAsset)}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs">Jumlah Token</p>
              <p className="font-semibold text-neutral-800">{formatNumber(property.totalTokens)} Token</p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs">Harga per Token</p>
              <p className="font-semibold text-neutral-800">{formatRupiah(property.pricePerToken)}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs">Minimum Investasi</p>
              <p className="font-semibold text-neutral-800">{formatRupiah(property.minInvestment)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-neutral-500 text-xs">Estimasi Imbal Hasil (ERY)</p>
              <p className="font-semibold text-teal-700">{formatPercent(property.projectedReturnPercent)} / tahun</p>
            </div>
          </div>
        </Card>

        <Button
          variant="primary"
          fullWidth
          size="lg"
          className="mt-6"
          onClick={() => navigate(`/tokenisasi/${property.id}`)}
        >
          Lanjutkan ke Tokenisasi
        </Button>
      </div>
    </div>
  )
}