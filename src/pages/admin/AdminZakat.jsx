import { useState, useMemo } from 'react'
import { Search, HandCoins, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'
import { useProperties } from '../../context/PropertiesContext'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import { formatRupiah, formatNumber } from '../../utils/format'

// Mock zakat data per property
const MOCK_ZAKAT_DATA = [
  { propertyId: 'apartemen-bsd', propertyName: 'Apartemen BSD', nisabStatus: 'Wajib Zakat', haulDate: '2026-01-15', zakatAmount: 3125000, distributed: true, distributionDate: '2026-07-15', recipient: 'LAZISNU' },
  { propertyId: 'vila-tanjung', propertyName: 'Vila Tanjung Lesung', nisabStatus: 'Wajib Zakat', haulDate: '2026-02-20', zakatAmount: 5625000, distributed: true, distributionDate: '2026-07-20', recipient: 'Dompet Dhuafa' },
  { propertyId: 'hotel-jogja', propertyName: 'Hotel Jogja Syariah', nisabStatus: 'Belum Nisab', haulDate: null, zakatAmount: 0, distributed: false, distributionDate: null, recipient: '-' },
  { propertyId: 'apartemen-kemang', propertyName: 'Apartemen Kemang Village', nisabStatus: 'Wajib Zakat', haulDate: '2026-03-10', zakatAmount: 2187500, distributed: false, distributionDate: null, recipient: '-' },
  { propertyId: 'vila-puncak', propertyName: 'Vila Puncak Syariah', nisabStatus: 'Belum Nisab', haulDate: null, zakatAmount: 0, distributed: false, distributionDate: null, recipient: '-' },
]

const STATUS_FILTERS = ['Semua', 'Wajib Zakat', 'Belum Nisab', 'Sudah Disalurkan', 'Menunggu']

export default function AdminZakat() {
  const { holdings } = usePortfolio()
  const { activeProperties } = useProperties()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua')

  // Combine mock data with real holdings
  const zakatData = useMemo(() => {
    return activeProperties.map((prop) => {
      const mock = MOCK_ZAKAT_DATA.find((m) => m.propertyId === prop.id)
      const holding = holdings.find((h) => h.propertyId === prop.id)
      const estimatedZakat = holding ? (holding.tokens * prop.pricePerToken) * 0.025 : 0
      
      return {
        propertyId: prop.id,
        propertyName: prop.name,
        nisabStatus: mock?.nisabStatus || 'Belum Nisab',
        haulDate: mock?.haulDate,
        zakatAmount: mock?.zakatAmount || estimatedZakat,
        distributed: mock?.distributed || false,
        distributionDate: mock?.distributionDate,
        recipient: mock?.recipient || '-',
        tokens: holding?.tokens || 0,
      }
    })
  }, [activeProperties, holdings])

  const filtered = zakatData.filter((z) => {
    const matchSearch = z.propertyName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'Semua' || 
      (statusFilter === 'Wajib Zakat' && z.nisabStatus === 'Wajib Zakat') ||
      (statusFilter === 'Belum Nisab' && z.nisabStatus === 'Belum Nisab') ||
      (statusFilter === 'Sudah Disalurkan' && z.distributed) ||
      (statusFilter === 'Menunggu' && z.nisabStatus === 'Wajib Zakat' && !z.distributed)
    return matchSearch && matchStatus
  })

  const totalZakat = zakatData.filter((z) => z.nisabStatus === 'Wajib Zakat').reduce((sum, z) => sum + z.zakatAmount, 0)
  const totalDistributed = zakatData.filter((z) => z.distributed).reduce((sum, z) => sum + z.zakatAmount, 0)
  const totalPending = totalZakat - totalDistributed
  const wajibCount = zakatData.filter((z) => z.nisabStatus === 'Wajib Zakat').length

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-800 mb-6">Monitoring Auto Zakat</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-neutral-800">{wajibCount}</p>
          <p className="text-xs text-neutral-500">Wajib Zakat</p>
        </Card>
        <Card variant="brand" className="text-center py-4">
          <p className="text-xl font-bold text-white">{formatRupiah(totalZakat)}</p>
          <p className="text-xs text-white">Total Zakat</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-teal-600">{formatRupiah(totalDistributed)}</p>
          <p className="text-xs text-neutral-500">Sudah Disalurkan</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-navy-600">{formatRupiah(totalPending)}</p>
          <p className="text-xs text-neutral-500">Menunggu</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-neutral-0 border border-neutral-200 rounded-xl px-3 py-2.5 flex-1">
          <Search size={16} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Cari properti..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                statusFilter === f ? 'bg-navy-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card padding="sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Properti</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Status Nisab</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Haul</th>
                <th className="text-right py-3 px-3 font-semibold text-neutral-600">Jumlah Zakat</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Distribusi</th>
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Penerima</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((z) => (
                <tr key={z.propertyId} className="hover:bg-neutral-50">
                  <td className="py-3 px-3">
                    <p className="font-medium text-neutral-800">{z.propertyName}</p>
                    <p className="text-xs text-neutral-500">{formatNumber(z.tokens)} token dimiliki</p>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Badge
                      variant={z.nisabStatus === 'Wajib Zakat' ? 'success' : 'neutral'}
                      className="text-[10px]"
                    >
                      {z.nisabStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center text-xs text-neutral-500">
                    {z.haulDate ? new Date(z.haulDate).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="py-3 px-3 text-right font-medium">
                    {z.zakatAmount > 0 ? formatRupiah(z.zakatAmount) : '-'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {z.distributed ? (
                      <div className="flex items-center justify-center gap-1 text-teal-600">
                        <CheckCircle2 size={14} />
                        <span className="text-xs">{new Date(z.distributionDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    ) : z.nisabStatus === 'Wajib Zakat' ? (
                      <div className="flex items-center justify-center gap-1 text-navy-600">
                        <AlertTriangle size={14} />
                        <span className="text-xs">Menunggu</span>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-xs text-neutral-600">{z.recipient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-8">Tidak ada data zakat.</p>
        )}
      </Card>
    </div>
  )
}