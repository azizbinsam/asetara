import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Download, FileText, Calendar } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { usePortfolio } from '../context/portfolioStore'
import { formatRupiah, formatPercent } from '../utils/format'

const REPORT_TYPES = [
  { id: 'monthly', label: 'Laporan Bulanan', desc: 'Ringkasan kinerja portofolio per bulan' },
  { id: 'annual', label: 'Laporan Tahunan', desc: 'Laporan komprehensif untuk perpajakan' },
  { id: 'zakat', label: 'Laporan Zakat', desc: 'Detail perhitungan dan penyaluran zakat' },
  { id: 'tax', label: 'Laporan Pajak', desc: 'Dokumen untuk pelaporan SPT' },
]

export default function Laporan() {
  const navigate = useNavigate()
  const { portfolio } = usePortfolio()
  const [selectedYear, setSelectedYear] = useState('2026')
  const [selectedMonth, setSelectedMonth] = useState('7')

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  function handleDownload(type) {
    // Simulate download
    const link = document.createElement('a')
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
      `LAPORAN ${type.label.toUpperCase()} - ASETARA\n` +
      `Periode: ${months[selectedMonth - 1]} ${selectedYear}\n` +
      `Total Portfolio: ${formatRupiah(portfolio.totalValue)}\n` +
      `Total Return: ${formatRupiah(portfolio.totalReturn)} (${formatPercent(portfolio.totalReturnPercent)})\n` +
      `Total Properti: ${portfolio.totalProperties}\n` +
      `\n--- Dokumen ini adalah simulasi ---`
    )
    link.download = `ASETARA-${type.id}-${selectedYear}-${selectedMonth}.txt`
    link.click()
  }

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Laporan</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Laporan</h1>

        {/* Period Selector + Summary — side by side on desktop */}
        <div className="grid gap-3 lg:grid-cols-3 mb-5">
          <Card variant="default" className="lg:col-span-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-neutral-500">
              <Calendar size={16} />
              <p className="text-xs font-medium">Pilih Periode</p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl border border-neutral-200 text-sm outline-none focus:border-navy-600"
              >
                {months.map((m, i) => (
                  <option key={i + 1} value={i + 1}>{m}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="h-10 px-3 rounded-xl border border-neutral-200 text-sm outline-none focus:border-navy-600"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </Card>

          <Card variant="brand" className="lg:col-span-2">
            <p className="text-xs opacity-90">Total Portfolio ({months[selectedMonth - 1]} {selectedYear})</p>
            <p className="text-2xl font-bold mt-1">{formatRupiah(portfolio.totalValue)}</p>
            <div className="flex items-center gap-6 mt-3 text-xs">
              <div>
                <p className="opacity-75">Return</p>
                <p className="font-semibold">+{formatRupiah(portfolio.totalReturn)}</p>
              </div>
              <div>
                <p className="opacity-75">Yield</p>
                <p className="font-semibold">{formatPercent(portfolio.averageReturnPercent)}</p>
              </div>
              <div>
                <p className="opacity-75">Properti</p>
                <p className="font-semibold">{portfolio.totalProperties}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Report Types */}
        <p className="text-sm font-semibold text-neutral-700 mb-3">Jenis Laporan</p>
        <div className="grid gap-3 lg:grid-cols-2">
          {REPORT_TYPES.map((type) => (
            <Card
              key={type.id}
             
              className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-700 shrink-0">
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-800">{type.label}</p>
                <p className="text-xs text-neutral-500">{type.desc}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => handleDownload(type)}
              >
                <Download size={14} className="mr-1" /> Unduh
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}