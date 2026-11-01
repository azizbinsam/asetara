import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, HandCoins, CalendarClock, History } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { usePortfolio } from '../context/portfolioStore'
import { formatRupiah, formatPercent } from '../utils/format'

import zakat from '../data/zakat.json'

export default function AutoZakat() {
  const navigate = useNavigate()
  const { portfolio } = usePortfolio()
  const [showHistory, setShowHistory] = useState(false)

  const currentAmount = portfolio.totalValue
  const isWajibZakat = currentAmount >= zakat.nisabThreshold
  const estimatedZakat = currentAmount * (zakat.zakatPercent / 100)

  const startDate = new Date(zakat.haul.startDate)
  const endDate = new Date(zakat.haul.endDate)
  const dateFormat = { day: 'numeric', month: 'long', year: 'numeric' }

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Auto-Zakat</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Auto-Zakat</h1>

        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
          {/* Kolom kiri: status, estimasi, info haul */}
          <div className="lg:col-span-2 space-y-4">
            <Card variant="default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-navy-50 flex items-center justify-center">
                    <HandCoins size={16} className="text-navy-600" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">Status Zakat</p>
                </div>
                <Badge variant={isWajibZakat ? 'warning' : 'neutral'}>
                  {isWajibZakat ? 'Wajib Zakat' : 'Belum Wajib'}
                </Badge>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                  <span>Nisab Tercapai</span>
                  <span className="font-semibold text-neutral-700">
                    {formatRupiah(currentAmount)} / {formatRupiah(zakat.nisabThreshold)}
                  </span>
                </div>
                <ProgressBar value={currentAmount} max={zakat.nisabThreshold} variant="brand" />
              </div>
            </Card>

            <Card variant="brand">
              <p className="text-sm opacity-90">Estimasi Zakat</p>
              <p className="text-2xl md:text-3xl font-bold mt-1">{formatRupiah(estimatedZakat)}</p>
              <p className="text-sm opacity-90 mt-1">{formatPercent(zakat.zakatPercent)} dari total aset zakatable</p>
            </Card>

            <Card variant="default">
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock size={16} className="text-neutral-600" />
                <p className="text-sm font-semibold text-neutral-700">Info Haul</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs text-neutral-500">Mulai</p>
                  <p className="font-semibold text-neutral-800">{startDate.toLocaleDateString('id-ID', dateFormat)}</p>
                </div>
                <div className="text-neutral-300">&rarr;</div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500">Berakhir</p>
                  <p className="font-semibold text-neutral-800">{endDate.toLocaleDateString('id-ID', dateFormat)}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                {zakat.haul.daysRemaining} hari lagi menuju akhir haul ({zakat.haul.totalDays} hari periode).
              </p>
            </Card>
          </div>

          {/* Kolom kanan: mitra penyaluran & riwayat */}
          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 text-xs font-bold shrink-0">
                  B
                </span>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Disalurkan via {zakat.partner}</p>
                  <p className="text-[11px] text-neutral-500">Kerja sama simulasi untuk keperluan prototype</p>
                </div>
              </div>
              <Badge variant="success" withCheck>Mitra Resmi</Badge>
            </Card>

            <Button variant="outline" fullWidth onClick={() => setShowHistory((v) => !v)}>
              <History size={16} />
              {showHistory ? 'Sembunyikan Riwayat Zakat' : 'Lihat Riwayat Zakat'}
            </Button>

            {showHistory && (
              <Card variant="default" padding="sm">
                {zakat.history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{item.periodLabel}</p>
                      <p className="text-xs text-neutral-500">
                        {new Date(item.date).toLocaleDateString('id-ID', dateFormat)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-neutral-800">{formatRupiah(item.amount)}</p>
                      <Badge variant="success">{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}