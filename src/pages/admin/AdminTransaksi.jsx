import { useState } from 'react'
import { Search, ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react'
import { usePortfolio } from '../../context/portfolioStore'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import { formatRupiah, formatNumber } from '../../utils/format'

const STATUS_FILTERS = ['Semua', 'Executed', 'Pending', 'Failed']
const TYPE_FILTERS = ['Semua', 'Beli Token', 'Jual Token', 'Distribusi Sewa', 'Top Up', 'Withdraw', 'Zakat']

const TX_TYPE_ICONS = {
  'Beli Token': { icon: ArrowDownLeft, color: 'text-teal-600', bg: 'bg-teal-50' },
  'Jual Token': { icon: ArrowUpRight, color: 'text-navy-700', bg: 'bg-navy-50' },
  'Distribusi Sewa': { icon: ArrowDownLeft, color: 'text-navy-600', bg: 'bg-navy-50' },
  'Top Up': { icon: ArrowDownLeft, color: 'text-teal-600', bg: 'bg-teal-50' },
  'Withdraw': { icon: ArrowUpRight, color: 'text-red-500', bg: 'bg-red-50' },
  'Zakat': { icon: ArrowUpRight, color: 'text-navy-700', bg: 'bg-navy-50' },
}

function getTxStyle(type) {
  return TX_TYPE_ICONS[type] || TX_TYPE_ICONS['Beli Token']
}

export default function AdminTransaksi() {
  const { transactions } = usePortfolio()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [typeFilter, setTypeFilter] = useState('Semua')

  // Add some mock admin transactions
  const allTransactions = [
    ...transactions,
    { id: 'tx-admin-1', propertyName: 'Platform', type: 'Top Up', nominal: 5000000, status: 'Executed', createdAt: '2026-07-18T10:00:00Z', txHash: '0xabc123' },
    { id: 'tx-admin-2', propertyName: 'Platform', type: 'Withdraw', nominal: 2500000, status: 'Pending', createdAt: '2026-07-18T14:30:00Z', txHash: '0xdef456' },
    { id: 'tx-admin-3', propertyName: 'Apartemen BSD', type: 'Distribusi Sewa', nominal: 1250000, status: 'Executed', createdAt: '2026-07-17T09:00:00Z', txHash: '0xghi789' },
  ]

  const filtered = allTransactions.filter((tx) => {
    const matchSearch = tx.propertyName?.toLowerCase().includes(search.toLowerCase()) || tx.txHash?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'Semua' || tx.status === statusFilter
    const matchType = typeFilter === 'Semua' || tx.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const totalVolume = filtered.reduce((sum, tx) => sum + (tx.nominal || 0), 0)
  const totalCount = filtered.length

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-800 mb-6">Monitoring Transaksi</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-neutral-800">{totalCount}</p>
          <p className="text-xs text-neutral-500">Total Transaksi</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-teal-600">{formatRupiah(totalVolume)}</p>
          <p className="text-xs text-neutral-500">Total Volume</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-navy-600">
            {allTransactions.filter((t) => t.status === 'Executed').length}
          </p>
          <p className="text-xs text-neutral-500">Executed</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-navy-600">
            {allTransactions.filter((t) => t.status === 'Pending').length}
          </p>
          <p className="text-xs text-neutral-500">Pending</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-neutral-0 border border-neutral-200 rounded-xl px-3 py-2.5 flex-1">
          <Search size={16} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Cari properti atau tx hash..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1 bg-neutral-100 rounded-lg px-2">
            <Filter size={12} className="text-neutral-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-medium text-neutral-600 py-2 outline-none"
            >
              {STATUS_FILTERS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1 bg-neutral-100 rounded-lg px-2">
            <Filter size={12} className="text-neutral-500" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-xs font-medium text-neutral-600 py-2 outline-none"
            >
              {TYPE_FILTERS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <Card padding="sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Tipe</th>
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Properti</th>
                <th className="text-right py-3 px-3 font-semibold text-neutral-600">Nominal</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Token</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Status</th>
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Waktu</th>
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((tx) => {
                const { icon: Icon, color, bg } = getTxStyle(tx.type || 'Beli Token')
                return (
                  <tr key={tx.id} className="hover:bg-neutral-50">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center`}>
                          <Icon size={14} className={color} />
                        </div>
                        <span className="text-sm text-neutral-700">{tx.type || 'Beli Token'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-neutral-700">{tx.propertyName || '-'}</td>
                    <td className="py-3 px-3 text-right font-medium">{formatRupiah(tx.nominal)}</td>
                    <td className="py-3 px-3 text-center text-sm text-neutral-500">
                      {tx.tokenAmount ? formatNumber(tx.tokenAmount) : '-'}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Badge
                        variant={tx.status === 'Executed' ? 'success' : tx.status === 'Pending' ? 'warning' : 'danger'}
                        className="text-[10px]"
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-xs text-neutral-500">
                      {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3">
                      <code className="text-xs text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
                        {tx.txHash?.slice(0, 10)}...
                      </code>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-8">Tidak ada transaksi ditemukan.</p>
        )}
      </Card>
    </div>
  )
}