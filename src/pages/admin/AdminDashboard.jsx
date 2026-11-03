import { useMemo } from 'react'
import { Users, Building2, ArrowLeftRight, HandCoins, AlertTriangle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import { formatRupiah } from '../../utils/format'

// Mock admin data
const PLATFORM_METRICS = {
  totalInvestors: 1247,
  totalProperties: 12,
  activeProperties: 10,
  totalTransactions: 3842,
  totalVolume: 45200000000,
  monthlyGrowth: 12.5,
  zakatCollected: 1200000000,
}

const REVENUE_DATA = [
  { month: 'Jan', value: 2800000000 },
  { month: 'Feb', value: 3200000000 },
  { month: 'Mar', value: 2900000000 },
  { month: 'Apr', value: 3500000000 },
  { month: 'Mei', value: 3800000000 },
  { month: 'Jun', value: 4200000000 },
]

const INVESTOR_GROWTH = [
  { month: 'Jan', new: 120, active: 450 },
  { month: 'Feb', new: 145, active: 580 },
  { month: 'Mar', new: 98, active: 650 },
  { month: 'Apr', new: 167, active: 780 },
  { month: 'Mei', new: 203, active: 950 },
  { month: 'Jun', new: 189, active: 1247 },
]

const RECENT_ALERTS = [
  { id: 1, type: 'warning', message: 'Vila Puncak Syariah funding mencapai 95%', time: '2 jam lalu' },
  { id: 2, type: 'info', message: '5 investor baru menunggu verifikasi KYC', time: '5 jam lalu' },
  { id: 3, type: 'success', message: 'Hotel Malioboro Syariah fully funded', time: '1 hari lalu' },
]

const METRIC_CARDS = [
  { icon: Users, label: 'Total Investor', value: PLATFORM_METRICS.totalInvestors, change: '+15%', color: 'blue' },
  { icon: Building2, label: 'Properti Aktif', value: PLATFORM_METRICS.activeProperties, change: '+2', color: 'teal' },
  { icon: ArrowLeftRight, label: 'Transaksi', value: PLATFORM_METRICS.totalTransactions, change: '+8%', color: 'brand' },
  { icon: HandCoins, label: 'Zakat Terkumpul', value: formatRupiah(PLATFORM_METRICS.zakatCollected), change: '+22%', color: 'purple' },
]

export default function AdminDashboard() {
  const totalVolumeFormatted = useMemo(() => formatRupiah(PLATFORM_METRICS.totalVolume), [])

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-800 mb-6">Dashboard Admin</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {METRIC_CARDS.map(({ icon: Icon, label, value, change, color }) => (
          <Card key={label} variant="default">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-neutral-500">{label}</p>
                <p className="text-xl font-bold text-neutral-800 mt-1">{value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                color === 'blue' ? 'bg-navy-50 text-navy-600' :
                color === 'teal' ? 'bg-teal-50 text-teal-600' :
                color === 'brand' ? 'bg-navy-50 text-navy-600' :
                'bg-champagne-100 text-champagne-700'
              }`}>
                <Icon size={20} />
              </div>
            </div>
            <p className="text-xs text-teal-600 font-medium mt-2">{change} dari bulan lalu</p>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card variant="default">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neutral-700">Volume Transaksi</h2>
            <Badge variant="success">+{PLATFORM_METRICS.monthlyGrowth}%</Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={REVENUE_DATA}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `Rp ${v/1000000000}M`} />
              <Tooltip formatter={(v) => [formatRupiah(v), 'Volume']} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#477C7C" fill="url(#adminTeal)" />
              <defs>
                <linearGradient id="adminTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#477C7C" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#477C7C" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neutral-700">Pertumbuhan Investor</h2>
            <p className="text-xs text-neutral-400">Baru vs Aktif</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={INVESTOR_GROWTH}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="new" fill="#477C7C" radius={[4, 4, 0, 0]} name="Baru" />
              <Bar dataKey="active" fill="#C9A15F" radius={[4, 4, 0, 0]} name="Aktif" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Alerts & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="default" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-neutral-700 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-3">
            {RECENT_ALERTS.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  alert.type === 'warning' ? 'bg-navy-50 text-navy-600' :
                  alert.type === 'success' ? 'bg-teal-50 text-teal-600' :
                  'bg-navy-50 text-navy-600'
                }`}>
                  <AlertTriangle size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-700">{alert.message}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="brand">
          <p className="text-xs opacity-90">Total Volume Platform</p>
          <p className="text-2xl font-bold mt-1">{totalVolumeFormatted}</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="opacity-75">Target 2026</span>
              <span className="font-semibold">Rp 100 M</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '45%' }} />
            </div>
            <p className="text-xs opacity-75">45% tercapai</p>
          </div>
        </Card>
      </div>
    </div>
  )
}