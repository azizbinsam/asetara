import { useState } from 'react'
import { Search, CheckCircle2, XCircle, Mail, Phone, Calendar } from 'lucide-react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'

// Mock investor data
const MOCK_INVESTORS = [
  { id: 'inv-1', name: 'Sinta Dewi', email: 'sinta@asetara.id', phone: '+62 812-3456-7890', kycStatus: 'Terverifikasi', totalInvested: 12500000, joinDate: '2026-01-15', properties: 3 },
  { id: 'inv-2', name: 'Ahmad Fauzi', email: 'ahmad@email.com', phone: '+62 813-9876-5432', kycStatus: 'Terverifikasi', totalInvested: 45000000, joinDate: '2026-02-20', properties: 5 },
  { id: 'inv-3', name: 'Dewi Kusuma', email: 'dewi@email.com', phone: '+62 811-2345-6789', kycStatus: 'Menunggu', totalInvested: 0, joinDate: '2026-07-18', properties: 0 },
  { id: 'inv-4', name: 'Budi Santoso', email: 'budi@email.com', phone: '+62 814-5678-9012', kycStatus: 'Terverifikasi', totalInvested: 82000000, joinDate: '2025-11-10', properties: 8 },
  { id: 'inv-5', name: 'Rina Wulandari', email: 'rina@email.com', phone: '+62 815-6789-0123', kycStatus: 'Ditolak', totalInvested: 0, joinDate: '2026-06-05', properties: 0 },
]

const KYC_FILTERS = ['Semua', 'Terverifikasi', 'Menunggu', 'Ditolak']

function formatRupiahShort(value) {
  if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)} M`
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)} jt`
  return `Rp ${value.toLocaleString('id-ID')}`
}

export default function AdminInvestor() {
  const [investors, setInvestors] = useState(MOCK_INVESTORS)
  const [search, setSearch] = useState('')
  const [kycFilter, setKycFilter] = useState('Semua')

  const filtered = investors.filter((inv) => {
    const matchSearch = inv.name.toLowerCase().includes(search.toLowerCase()) || inv.email.toLowerCase().includes(search.toLowerCase())
    const matchKyc = kycFilter === 'Semua' || inv.kycStatus === kycFilter
    return matchSearch && matchKyc
  })

  function handleVerify(id) {
    setInvestors((prev) => prev.map((inv) => inv.id === id ? { ...inv, kycStatus: 'Terverifikasi' } : inv))
  }

  function handleReject(id) {
    setInvestors((prev) => prev.map((inv) => inv.id === id ? { ...inv, kycStatus: 'Ditolak' } : inv))
  }

  const stats = {
    total: investors.length,
    verified: investors.filter((i) => i.kycStatus === 'Terverifikasi').length,
    pending: investors.filter((i) => i.kycStatus === 'Menunggu').length,
    rejected: investors.filter((i) => i.kycStatus === 'Ditolak').length,
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-800 mb-6">Manajemen Investor</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-neutral-800">{stats.total}</p>
          <p className="text-xs text-neutral-500">Total</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-teal-600">{stats.verified}</p>
          <p className="text-xs text-neutral-500">Terverifikasi</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-navy-600">{stats.pending}</p>
          <p className="text-xs text-neutral-500">Menunggu</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-red-500">{stats.rejected}</p>
          <p className="text-xs text-neutral-500">Ditolak</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-neutral-0 border border-neutral-200 rounded-xl px-3 py-2.5 flex-1">
          <Search size={16} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Cari investor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-2">
          {KYC_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setKycFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                kycFilter === f ? 'bg-navy-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
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
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Investor</th>
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Kontak</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">KYC</th>
                <th className="text-right py-3 px-3 font-semibold text-neutral-600">Investasi</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Properti</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-neutral-50">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-xs">
                        {inv.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">{inv.name}</p>
                        <p className="text-xs text-neutral-500 flex items-center gap-1">
                          <Calendar size={10} /> {new Date(inv.joinDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-xs text-neutral-600 flex items-center gap-1">
                      <Mail size={10} /> {inv.email}
                    </p>
                    <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <Phone size={10} /> {inv.phone}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Badge
                      variant={inv.kycStatus === 'Terverifikasi' ? 'success' : inv.kycStatus === 'Menunggu' ? 'warning' : 'danger'}
                    >
                      {inv.kycStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right font-medium">{formatRupiahShort(inv.totalInvested)}</td>
                  <td className="py-3 px-3 text-center">{inv.properties}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center gap-1">
                      {inv.kycStatus === 'Menunggu' && (
                        <>
                          <button
                            onClick={() => handleVerify(inv.id)}
                            className="p-1.5 rounded-lg hover:bg-teal-50 text-teal-600"
                            title="Verifikasi"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                          <button
                            onClick={() => handleReject(inv.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                            title="Tolak"
                          >
                            <XCircle size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-8">Tidak ada investor ditemukan.</p>
        )}
      </Card>
    </div>
  )
}