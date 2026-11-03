import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Home, Building2, Store, Check, Sparkles, Bookmark, ArrowRight, Info } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import NextSteps from '../components/NextSteps'
import { toast } from '../components/toastStore'
import data from '../data/perbandingan.json'
import properties from '../data/properties.json'
import { formatRupiah } from '../utils/format'
import {
  MAX_COMPARE,
  MIN_COMPARE,
  PRIORITIES,
  pickBest,
  formatRange,
  formatCompactRupiah,
  yearlyReturnRange,
  recommendationReason,
} from '../utils/comparison'

const STORAGE_KEY = 'asetara_perbandingan'
const { tabs, products, riskLabels } = data
const DEFAULTS = { selected: products.slice(0, MAX_COMPARE).map((p) => p.id), priority: 'risiko', savedId: null }

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const valid = (parsed.selected || []).filter((id) => products.some((p) => p.id === id)).slice(0, MAX_COMPARE)
      return {
        selected: valid.length >= MIN_COMPARE ? valid : DEFAULTS.selected,
        priority: PRIORITIES.some((x) => x.id === parsed.priority) ? parsed.priority : DEFAULTS.priority,
        savedId: products.some((p) => p.id === parsed.savedId) ? parsed.savedId : null,
      }
    }
  } catch {
    // abaikan data rusak
  }
  return DEFAULTS
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // abaikan jika penyimpanan diblokir
  }
}

const ICONS = { rumah: Home, apartemen: Building2, ruko: Store }
function ProductIcon({ type, size = 22 }) {
  const Icon = ICONS[type] || Building2
  return <Icon size={size} className="text-champagne-600" />
}

const riskBadge = (risk) => (risk === 'rendah' ? 'success' : 'warning')

export default function PerbandinganInvestasi() {
  const navigate = useNavigate()
  const [state, setState] = useState(loadState)
  const [showRec, setShowRec] = useState(false)
  const { selected, priority, savedId } = state

  const update = (patch) => {
    const next = { ...state, ...patch }
    setState(next)
    saveState(next)
  }

  const compared = products.filter((p) => selected.includes(p.id))
  const best = showRec ? pickBest(compared, priority) : null
  const minToken = Math.min(...properties.map((p) => p.minInvestment))

  function toggle(id) {
    const isOn = selected.includes(id)
    if (isOn && selected.length <= MIN_COMPARE) return
    if (!isOn && selected.length >= MAX_COMPARE) return
    update({ selected: isOn ? selected.filter((x) => x !== id) : [...selected, id] })
    setShowRec(false)
  }

  function handleSave() {
    if (!best) return
    update({ savedId: best.id })
    toast(`${best.name} disimpan sebagai pilihanmu`)
  }

  const rows = [
    { label: 'Lokasi', render: (p) => p.location },
    { label: 'Modal awal', render: (p) => formatRupiah(p.minCapital) },
    { label: 'Biaya tambahan', render: (p) => formatRange(p.feeMin, p.feeMax) },
    { label: 'Potensi hasil per tahun', render: (p) => formatRange(p.returnMin, p.returnMax) },
    {
      label: 'Ilustrasi hasil per tahun',
      render: (p) => {
        const [lo, hi] = yearlyReturnRange(p)
        return `${formatCompactRupiah(lo)} – ${formatCompactRupiah(hi)}`
      },
    },
    { label: 'Risiko', render: (p) => <Badge variant={riskBadge(p.risk)}>{riskLabels[p.risk]}</Badge> },
    { label: 'Jangka waktu', render: (p) => `${p.years} tahun` },
  ]

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600" aria-label="Kembali">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Smart Investment Comparison</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-1">Smart Investment Comparison</h1>
        <p className="text-sm text-neutral-600 mb-5">Pilih investasi yang paling sesuai denganmu.</p>

        {/* Tab jenis investasi */}
        <div role="tablist" className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.active}
              aria-disabled={!t.active}
              disabled={!t.active}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
                t.active
                  ? 'bg-navy-600 text-white border-navy-600'
                  : 'bg-neutral-0 text-neutral-500 border-neutral-200 cursor-not-allowed'
              }`}
            >
              {t.label}
              {!t.active && <span className="text-xs font-semibold text-champagne-700">Segera hadir</span>}
            </button>
          ))}
        </div>

        {/* Kartu produk */}
        <p className="text-sm font-semibold text-neutral-700 mb-2">
          Pilih produk untuk dibandingkan ({selected.length}/{MAX_COMPARE})
        </p>
        <div className="grid gap-3 sm:grid-cols-3 mb-5">
          {products.map((p) => {
            const isOn = selected.includes(p.id)
            const locked = (isOn && selected.length <= MIN_COMPARE) || (!isOn && selected.length >= MAX_COMPARE)
            return (
              <Card key={p.id} className={isOn ? 'border-teal-600' : ''}>
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-champagne-50 flex items-center justify-center shrink-0">
                    <ProductIcon type={p.type} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-neutral-800">{p.name}</p>
                    <p className="text-xs text-neutral-500">{p.location}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-navy-800 mt-3">{formatRupiah(p.minCapital)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={riskBadge(p.risk)}>Risiko {riskLabels[p.risk].toLowerCase()}</Badge>
                  <span className="text-xs text-neutral-500">{p.years} tahun</span>
                </div>
                <Button
                  variant={isOn ? 'secondary' : 'outline'}
                  size="sm"
                  fullWidth
                  disabled={locked}
                  onClick={() => toggle(p.id)}
                  className="mt-3"
                >
                  {isOn ? (
                    <>
                      <Check size={16} /> Dibandingkan
                    </>
                  ) : (
                    'Bandingkan'
                  )}
                </Button>
              </Card>
            )
          })}
        </div>

        {/* Detail perbandingan */}
        <p className="text-sm font-semibold text-neutral-700 mb-2">Detail Perbandingan</p>
        <Card padding="none" className="overflow-x-auto mb-5">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="sticky left-0 bg-neutral-0 text-left font-semibold text-neutral-500 text-xs p-3 w-40">
                  Kriteria
                </th>
                {compared.map((p) => (
                  <th
                    key={p.id}
                    className={`text-left font-bold text-neutral-800 p-3 ${best?.id === p.id ? 'bg-champagne-50' : ''}`}
                  >
                    {p.name}
                    {best?.id === p.id && (
                      <span className="block text-xs font-semibold text-champagne-700">Rekomendasi</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-neutral-200 last:border-0">
                  <th scope="row" className="sticky left-0 bg-neutral-0 text-left font-medium text-neutral-600 p-3">
                    {row.label}
                  </th>
                  {compared.map((p) => (
                    <td key={p.id} className={`p-3 text-neutral-800 ${best?.id === p.id ? 'bg-champagne-50' : ''}`}>
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Prioritas + rekomendasi */}
        <Card className="mb-5">
          <p className="font-bold text-neutral-800">Apa prioritas utamamu?</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {PRIORITIES.map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  update({ priority: x.id })
                  setShowRec(false)
                }}
                aria-pressed={priority === x.id}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  priority === x.id
                    ? 'bg-navy-600 text-white border-navy-600'
                    : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-navy-300'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <Button onClick={() => setShowRec(true)} fullWidth className="mt-4 sm:w-auto">
            <Sparkles size={16} /> Lihat Rekomendasi Terbaik
          </Button>

          {best && (
            <div className="mt-4 rounded-xl bg-sage border border-teal-100 p-4">
              <p className="text-xs font-medium text-neutral-600">Rekomendasi untukmu</p>
              <p className="text-lg font-bold text-navy-800">{best.name}</p>
              <p className="text-sm text-neutral-700 mt-1">{recommendationReason(best, priority)}</p>
              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <Button variant="outline" onClick={handleSave} disabled={savedId === best.id}>
                  <Bookmark size={16} /> {savedId === best.id ? 'Tersimpan' : 'Simpan Pilihan'}
                </Button>
                <Button onClick={() => navigate('/marketplace')}>
                  Lanjut ke Marketplace <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}
          {savedId && !best && (
            <p className="text-xs text-neutral-600 mt-3">
              Pilihan tersimpan: <strong>{products.find((p) => p.id === savedId)?.name}</strong>
            </p>
          )}
        </Card>

        {/* Penghubung ke token */}
        <div className="rounded-card bg-navy-50 border border-navy-100 p-4 mb-4">
          <p className="text-sm font-semibold text-navy-800">
            Lewat token ASETARA, mulai dari {formatRupiah(minToken)}
          </p>
          <p className="text-sm text-neutral-600 mt-0.5">
            Tidak perlu modal ratusan juta untuk mulai mengenal investasi properti syariah.{' '}
            <Link to="/marketplace" className="text-navy-600 font-semibold underline">
              Lihat Marketplace
            </Link>
          </p>
        </div>

        <NextSteps className="mb-4" steps={['perencanaan', 'investasiSyariah', 'aksesKeamanan']} />

        <div className="flex items-start gap-2 text-xs text-neutral-500 px-1">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>
            Angka di halaman ini adalah data ilustrasi untuk simulasi, bukan nasihat keuangan atau jaminan hasil.
            Selalu pelajari risiko sebelum berinvestasi.
          </p>
        </div>
      </div>
    </div>
  )
}
