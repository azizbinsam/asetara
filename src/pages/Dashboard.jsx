import { Link, useNavigate } from 'react-router-dom'
import {
  Bell, Store, Wallet, FileText, HandCoins, ArrowDownLeft, ArrowUpRight, ArrowRight, MapPin,
  BookOpen, PiggyBank, Scale, ShieldCheck, Award, Leaf, Bot, User,
} from 'lucide-react'
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useLiteracy } from '../context/literacyStore'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Logo from '../components/Logo'
import { usePortfolio } from '../context/portfolioStore'
import { useProperties } from '../context/propertiesStore'
import { formatRupiah, formatPercent, formatNumber } from '../utils/format'

import user from '../data/user.json'

// Menu cepat: memastikan semua fitur lama tetap bisa dibuka dari ponsel,
// walau bottom nav hanya memuat 5 tab.
const QUICK_MENU = [
  { icon: Store, label: 'Marketplace', to: '/marketplace' },
  { icon: Wallet, label: 'Dompet', to: '/dompet' },
  { icon: HandCoins, label: 'Auto-Zakat', to: '/zakat' },
  { icon: Award, label: 'Sertifikat', to: '/sertifikat' },
  { icon: Leaf, label: 'Dampak', to: '/dampak' },
  { icon: FileText, label: 'Laporan', to: '/laporan' },
  { icon: Bot, label: 'AI Asisten', to: '/ai-assistant' },
  { icon: User, label: 'Pengaturan', to: '/akun' },
]

// 4 pilar ASETARA
const PILLARS = [
  { icon: BookOpen, title: 'Pahami', desc: 'Literasi keuangan', to: '/literasi' },
  { icon: PiggyBank, title: 'Rencanakan', desc: 'Cek kesiapan finansial', to: '/perencanaan' },
  { icon: Scale, title: 'Bandingkan', desc: 'Pilih investasi tepat', to: '/perbandingan' },
  { icon: ShieldCheck, title: 'Akses dengan Aman', desc: 'Legalitas & anti-penipuan', to: '/akses-keamanan' },
]

function PillarsSection() {
  const { progress } = useLiteracy()
  return (
    <section className="mb-5 lg:mb-6">
      <p className="text-sm font-semibold text-neutral-700 mb-3">Mulai dari sini</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PILLARS.map(({ icon: Icon, title, desc, to }) => (
          <Link
            key={title}
            to={to}
            className="bg-neutral-0 border border-neutral-200 rounded-card shadow-card p-4 hover:border-champagne-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-champagne-50 flex items-center justify-center mb-3">
              <Icon size={20} className="text-champagne-700" />
            </div>
            <p className="text-sm font-bold text-neutral-800">{title}</p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {title === 'Pahami' && progress.done > 0 ? `${progress.done}/${progress.total} materi selesai` : desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

const TX_ICONS = {
  'Beli Token': { icon: ArrowDownLeft, bg: 'bg-teal-50', color: 'text-teal-600' },
  'Distribusi Sewa': { icon: ArrowDownLeft, bg: 'bg-teal-50', color: 'text-teal-600' },
  'Top Up': { icon: ArrowDownLeft, bg: 'bg-teal-50', color: 'text-teal-600' },
  'Zakat': { icon: ArrowUpRight, bg: 'bg-navy-50', color: 'text-navy-700' },
  'Withdraw': { icon: ArrowUpRight, bg: 'bg-navy-50', color: 'text-navy-700' },
}

function getTxIcon(type) {
  return TX_ICONS[type] || TX_ICONS['Beli Token']
}

function StatPill({ label, value, tone = 'default' }) {
  const toneStyles = {
    default: 'text-neutral-800',
    positive: 'text-teal-600',
    brand: 'text-navy-700',
  }
  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-200 px-4 py-3">
      <p className="text-[11px] text-neutral-500">{label}</p>
      <p className={`text-base font-bold mt-0.5 ${toneStyles[tone]}`}>{value}</p>
    </div>
  )
}

function PortfolioCard({ portfolio }) {
  return (
    <Card variant="brand">
      <p className="text-sm opacity-90">Total Portfolio</p>
      <p className="text-2xl md:text-3xl font-bold mt-1">{formatRupiah(portfolio.totalValue)}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm opacity-90">Total Return</span>
        <span className="text-sm font-semibold">
          +{formatRupiah(portfolio.totalReturn)} ({formatPercent(portfolio.totalReturnPercent)})
        </span>
      </div>
    </Card>
  )
}

function QuickMenuCard() {
  return (
    <Card variant="default" padding="sm">
      <div className="grid grid-cols-4 gap-2">
        {QUICK_MENU.map(({ icon: Icon, label, to }) => (
          <Link key={label} to={to} className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-navy-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center">
              <Icon size={18} className="text-navy-600" />
            </div>
            <span className="text-[11px] font-medium text-neutral-600 text-center">{label}</span>
          </Link>
        ))}
      </div>
    </Card>
  )
}

function ChartCard({ portfolio }) {
  return (
    <Card variant="default">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-neutral-700">Kinerja Portofolio</p>
        <Badge variant="success">+{formatPercent(portfolio.totalReturnPercent)}</Badge>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={portfolio.performanceHistory} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#939CA2' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [formatRupiah(value), 'Nilai']}
            contentStyle={{ borderRadius: 12, borderColor: '#E0DCD0', fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#477C7C"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#477C7C' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

function RecentTransactionsCard({ transactions, navigate }) {
  return (
    <Card variant="default">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-neutral-700">Transaksi Terbaru</p>
        <Link to="/dompet" className="text-xs text-navy-700 font-medium hover:underline flex items-center gap-1">
          Lihat Semua <ArrowRight size={12} />
        </Link>
      </div>
      {transactions.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-6">Belum ada transaksi</p>
      ) : (
        <div className="space-y-2">
          {transactions.slice(0, 4).map((tx) => {
            const { icon: Icon, bg, color } = getTxIcon(tx.type || 'Beli Token')
            return (
              <button
                key={tx.id}
                onClick={() => navigate(`/transaksi/${tx.id}`)}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors text-left"
              >
                <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                  <Icon size={16} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 truncate">{tx.type || 'Beli Token'}</p>
                  <p className="text-xs text-neutral-500 truncate">{tx.propertyName || 'ASETARA'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-neutral-800">{formatRupiah(tx.nominal)}</p>
                  <p className="text-[10px] text-neutral-400">
                    {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </Card>
  )
}

function FeaturedPropertiesCard({ properties, navigate }) {
  return (
    <Card variant="default">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-neutral-700">Properti Pilihan</p>
        <Link to="/marketplace" className="text-xs text-navy-700 font-medium hover:underline flex items-center gap-1">
          Lihat Semua <ArrowRight size={12} />
        </Link>
      </div>
      <div className="space-y-2">
        {properties.slice(0, 3).map((property) => (
          <button
            key={property.id}
            onClick={() => navigate(`/tokenisasi/${property.id}`)}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors text-left"
          >
            <img
              src={property.image}
              alt=""
              className="w-12 h-12 rounded-lg object-cover shrink-0 bg-neutral-100"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-800 truncate">{property.name}</p>
              <p className="text-xs text-neutral-500 flex items-center gap-1 truncate">
                <MapPin size={11} className="shrink-0" /> {property.location}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-semibold text-teal-600">{formatPercent(property.projectedReturnPercent)}/thn</p>
              <p className="text-[10px] text-neutral-400">{property.fundingPercent}% terdanai</p>
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { portfolio, transactions } = usePortfolio()
  const { activeProperties } = useProperties()

  return (
    <div>
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <Logo size={140} variant="horizontal" />
        <button className="text-neutral-500">
          <Bell size={20} />
        </button>
      </header>

      <div className="p-4 lg:p-0 lg:max-w-none">
        <p className="text-sm text-neutral-500 lg:hidden mb-4">
          {user.greeting}, Selamat datang kembali!
        </p>
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">
          {user.greeting}, {user.name}
        </h1>

        {/* Top stat row — desktop only, gives the dashboard more substance at a glance */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 mb-6">
          <StatPill label="Total Properti" value={formatNumber(portfolio.totalProperties)} />
          <StatPill label="Token Dimiliki" value={formatNumber(portfolio.totalTokens)} />
          <StatPill label="Rata-rata Return" value={formatPercent(portfolio.averageReturnPercent)} tone="positive" />
          <StatPill label="Total Return" value={formatRupiah(portfolio.totalReturn)} tone="brand" />
        </div>

        <PillarsSection />

        <div className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Left/main column */}
          <div className="lg:col-span-2 space-y-5 lg:space-y-6">
            <PortfolioCard portfolio={portfolio} />
            <ChartCard portfolio={portfolio} />
            <RecentTransactionsCard transactions={transactions} navigate={navigate} />
          </div>

          {/* Right column */}
          <div className="space-y-5 lg:space-y-6">
            <QuickMenuCard />
            <FeaturedPropertiesCard properties={activeProperties} navigate={navigate} />
          </div>
        </div>
      </div>
    </div>
  )
}