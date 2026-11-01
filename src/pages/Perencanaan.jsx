import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Calculator, ArrowRight, BookOpen, Info } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { formatRupiah, formatNumber } from '../utils/format'
import { GOALS, calculateReadiness } from '../utils/readiness'

const STORAGE_KEY = 'asetara_perencanaan'
const EMPTY = { income: '', expense: '', savings: '', goal: 'darurat' }

function loadForm() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...EMPTY, ...JSON.parse(stored) }
  } catch {
    // abaikan data rusak
  }
  return EMPTY
}

const STATUS = {
  siap: {
    label: 'Siap',
    badge: 'success',
    summary: 'Kamu sudah berada di jalur yang baik. Lanjutkan konsistensi untuk mencapai tujuan finansialmu.',
    advice:
      'Kondisi keuanganmu sudah cukup baik. Kamu bisa mulai mempertimbangkan investasi dengan nominal kecil terlebih dahulu.',
  },
  hampir: {
    label: 'Hampir siap',
    badge: 'brand',
    summary: 'Fondasimu sudah terbentuk, tinggal sedikit lagi. Perkuat bagian yang masih rendah di bawah ini.',
    advice:
      'Sebaiknya perkuat dana darurat dan kebiasaan menabung dulu. Pelajari risiko sebelum menambah investasi.',
  },
  persiapan: {
    label: 'Perlu persiapan',
    badge: 'warning',
    summary: 'Belum perlu terburu-buru berinvestasi. Mulai dari merapikan arus kas dan menyiapkan dana darurat.',
    advice:
      'Fokus dulu pada menabung rutin dan menekan pengeluaran. Investasi bisa menyusul saat kondisimu lebih siap.',
  },
}

// Digit saja -> angka, tampil dengan pemisah ribuan (1.000.000)
function CurrencyField({ id, label, value, onChange, hint, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-neutral-700 mb-1.5">
        {label}
      </label>
      <div
        className={`flex items-center h-11 rounded-xl border bg-neutral-0 focus-within:border-navy-600 ${
          error ? 'border-danger' : 'border-neutral-200'
        }`}
      >
        <span className="pl-3 pr-2 text-sm font-semibold text-neutral-500">Rp</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value === '' ? '' : formatNumber(value)}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 12)
            onChange(digits === '' ? '' : Number(digits))
          }}
          placeholder="0"
          className="flex-1 min-w-0 h-full pr-3 bg-transparent text-sm outline-none"
        />
      </div>
      {error ? (
        <p className="text-xs text-danger mt-1">{error}</p>
      ) : (
        hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>
      )}
    </div>
  )
}

function ScoreRing({ score }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="relative w-36 h-36 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-neutral-200" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          className="stroke-teal-600 transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-navy-800">{score}%</span>
        <span className="text-xs font-medium text-neutral-500">kesiapan</span>
      </div>
    </div>
  )
}

export default function Perencanaan() {
  const navigate = useNavigate()
  const resultRef = useRef(null)
  const [form, setForm] = useState(loadForm)
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  const setField = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const income = Number(form.income) || 0
    const expense = Number(form.expense) || 0
    const savings = Number(form.savings) || 0

    const next = {}
    if (income <= 0) next.income = 'Isi penghasilan bulanan lebih dari 0.'
    if (expense <= 0) next.expense = 'Isi pengeluaran bulanan lebih dari 0.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    } catch {
      // abaikan jika penyimpanan diblokir
    }
    setResult(calculateReadiness({ income, expense, savings, goal: form.goal }))
    // tunggu hasil dirender, lalu gulir ke kartu hasil (berguna di mobile)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const goalLabel = GOALS.find((g) => g.id === result?.goal)?.label
  const meta = result ? STATUS[result.status] : null

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600" aria-label="Kembali">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Financial Readiness Simulator</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-1">
          Financial Readiness Simulator
        </h1>
        <p className="text-sm text-neutral-600 mb-5">Kenali kesiapan finansialmu, sebelum berinvestasi.</p>

        <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
          {/* Form */}
          <Card>
            <p className="font-bold text-neutral-800 mb-4">Data Keuangan</p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <CurrencyField
                id="income"
                label="Penghasilan bulanan"
                value={form.income}
                onChange={setField('income')}
                error={errors.income}
              />
              <CurrencyField
                id="expense"
                label="Pengeluaran bulanan"
                value={form.expense}
                onChange={setField('expense')}
                error={errors.expense}
              />
              <CurrencyField
                id="savings"
                label="Dana yang tersedia"
                value={form.savings}
                onChange={setField('savings')}
                hint="Tabungan atau dana tunai yang siap dipakai."
              />
              <div>
                <label htmlFor="goal" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  Target keuangan
                </label>
                <select
                  id="goal"
                  value={form.goal}
                  onChange={(e) => setField('goal')(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-neutral-0 text-sm outline-none focus:border-navy-600"
                >
                  {GOALS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" fullWidth size="lg">
                <Calculator size={18} />
                Hitung Kesiapan
              </Button>
            </form>
          </Card>

          {/* Hasil */}
          <div ref={resultRef} className="scroll-mt-20 space-y-4">
            {!result ? (
              <Card variant="flat" className="text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-0 border border-neutral-200 flex items-center justify-center mx-auto mb-3">
                  <Calculator size={22} className="text-navy-600" />
                </div>
                <p className="font-semibold text-neutral-800">Hasil simulasi muncul di sini</p>
                <p className="text-sm text-neutral-600 mt-1">
                  Isi data keuanganmu lalu tekan Hitung Kesiapan.
                </p>
              </Card>
            ) : (
              <>
                <Card>
                  <div className="flex items-center gap-5">
                    <ScoreRing score={result.score} />
                    <div className="min-w-0">
                      <Badge variant={meta.badge}>{meta.label}</Badge>
                      <p className="text-sm text-neutral-700 mt-2">{meta.summary}</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-sage border border-teal-100 p-4">
                    <p className="text-xs font-medium text-neutral-600">Dana yang dapat disisihkan per bulan</p>
                    <p className="text-2xl font-bold text-navy-800 mt-0.5">{formatRupiah(result.monthlySave)}</p>
                    {result.surplus <= 0 && (
                      <p className="text-xs text-neutral-600 mt-1">
                        Pengeluaranmu sama dengan atau melebihi penghasilan, sehingga belum ada dana yang bisa disisihkan.
                      </p>
                    )}
                  </div>

                  {goalLabel && (
                    <p className="text-xs text-neutral-500 mt-3">Target: {goalLabel}</p>
                  )}
                </Card>

                <Card>
                  <p className="font-bold text-neutral-800 mb-3">Rincian skor</p>
                  <div className="space-y-4">
                    {result.factors.map((f) => (
                      <div key={f.id}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-neutral-700">{f.label}</span>
                          <span className="text-neutral-500 text-xs">bobot {f.weight}%</span>
                        </div>
                        <ProgressBar value={f.value} max={1} className="mt-1.5" />
                        <p className="text-xs text-neutral-500 mt-1">{f.detail}</p>
                      </div>
                    ))}
                  </div>
                  {result.goal === 'darurat' && (
                    <p className="text-xs text-neutral-600 mt-4 pt-3 border-t border-neutral-200">
                      Dana darurat ideal (6 × pengeluaran): <strong>{formatRupiah(result.emergencyTarget)}</strong>
                    </p>
                  )}
                </Card>

                <Card>
                  <p className="font-bold text-neutral-800">Rekomendasi</p>
                  <p className="text-sm text-neutral-700 mt-1">{meta.advice}</p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    {result.status === 'siap' ? (
                      <>
                        <Button onClick={() => navigate('/perbandingan')} fullWidth>
                          Bandingkan Investasi <ArrowRight size={16} />
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/marketplace')} fullWidth>
                          Lihat Marketplace
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => navigate('/literasi')} fullWidth>
                        <BookOpen size={16} /> Belajar di Literasi Keuangan
                      </Button>
                    )}
                  </div>
                  {result.status === 'siap' && (
                    <p className="text-xs text-neutral-500 mt-3">
                      Lewat token ASETARA, mulai dari Rp10.000.{' '}
                      <Link to="/marketplace" className="text-navy-600 font-semibold underline">
                        Jelajahi
                      </Link>
                    </p>
                  )}
                </Card>
              </>
            )}

            <div className="flex items-start gap-2 text-xs text-neutral-500 px-1">
              <Info size={14} className="shrink-0 mt-0.5" />
              <p>Hasil ini hanya ilustrasi berdasarkan rumus sederhana, bukan nasihat keuangan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
