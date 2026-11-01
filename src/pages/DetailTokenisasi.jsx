import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useProperties } from '../context/PropertiesContext'
import { usePortfolio } from '../context/PortfolioContext'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { formatRupiah, formatPercent, formatNumber } from '../utils/format'

const CATEGORY_GRADIENT = {
  apartemen: 'from-champagne-300 to-navy-600',
  vila: 'from-teal-300 to-teal-700',
  hotel: 'from-champagne-400 to-teal-700',
}

export default function DetailTokenisasi() {
  const { propertyId } = useParams()
  const navigate = useNavigate()
  const { activeProperties } = useProperties()
  const { transactions, addPurchase } = usePortfolio()

  const property = activeProperties.find((p) => p.id === propertyId)
  const [nominal, setNominal] = useState(property?.minInvestment ?? 0)
  const [submitting, setSubmitting] = useState(false)
  const [pendingTxId, setPendingTxId] = useState(null)

  // Watch for transaction to appear in context, then navigate
  useEffect(() => {
    if (!pendingTxId) return

    const found = transactions.find((t) => t.id === pendingTxId)
    if (found) {
      navigate(`/transaksi/${pendingTxId}`, { state: { justPurchased: true } })
    }
  }, [transactions, pendingTxId, navigate])

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

  const tokenAmount = Math.floor(nominal / property.pricePerToken)
  const ownershipPercent = (tokenAmount / property.totalTokens) * 100
  const isValid = nominal >= property.minInvestment && tokenAmount > 0

  function handleNominalChange(e) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setNominal(Number(raw))
  }

  function handleBuy() {
    if (!isValid || submitting) return
    setSubmitting(true)

    const txId = addPurchase({ property, tokenAmount, nominal })
    setPendingTxId(txId)

    // Safety fallback: if useEffect doesn't trigger within 2s, force navigation
    setTimeout(() => {
      navigate(`/transaksi/${txId}`, { state: { justPurchased: true } })
    }, 2000)
  }

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3 lg:hidden">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Detail Tokenisasi</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex items-center gap-1 text-sm text-neutral-500 hover:text-navy-600 mb-4"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        <div className="relative h-44 rounded-card overflow-hidden flex items-end p-4">
          {property.image ? (
            <img src={property.image} alt={property.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_GRADIENT[property.category]}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge variant="success" withCheck className="absolute top-3 right-3 !bg-white/90">
            Verified Syariah
          </Badge>
          <span className="relative text-white font-semibold capitalize">{property.category}</span>
        </div>

        <h2 className="text-lg font-bold text-neutral-800 mt-4">{property.name}</h2>
        <p className="text-sm text-neutral-500">{property.location}</p>

        <Card className="mt-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
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
              <p className="text-neutral-500 text-xs">Imbal Hasil (Proyeksi)</p>
              <p className="font-semibold text-teal-700">{formatPercent(property.projectedReturnPercent)} / tahun</p>
            </div>
          </div>
        </Card>

        <Card variant="default" className="mt-4 text-center">
          <p className="text-xs text-neutral-500">Anda membeli</p>
          <p className="text-2xl font-bold text-navy-700 mt-1">{formatNumber(tokenAmount)} Token</p>
          <p className="text-xs text-neutral-500 mt-1">
            ({ownershipPercent > 0 ? ownershipPercent.toFixed(3).replace('.', ',') : '0'}% kepemilikan)
          </p>
        </Card>

        <div className="mt-4">
          <label className="text-sm font-medium text-neutral-700">Nominal Pembelian</label>
          <div className="mt-1.5 flex items-center border border-neutral-200 rounded-btn px-3 py-2.5 bg-neutral-0 focus-within:border-navy-500">
            <span className="text-neutral-500 text-sm mr-1">Rp</span>
            <input
              type="text"
              inputMode="numeric"
              value={nominal ? new Intl.NumberFormat('id-ID').format(nominal) : ''}
              onChange={handleNominalChange}
              className="flex-1 outline-none text-sm font-semibold text-neutral-800 bg-transparent"
              placeholder="0"
            />
          </div>
          {!isValid && (
            <p className="text-xs text-danger mt-1.5">
              Minimum investasi {formatRupiah(property.minInvestment)}
            </p>
          )}
        </div>

        <Button
          variant="primary"
          fullWidth
          size="lg"
          className="mt-6"
          disabled={!isValid || submitting}
          onClick={handleBuy}
        >
          {submitting ? 'Memproses...' : 'Beli Token'}
        </Button>
      </div>
    </div>
  )
}