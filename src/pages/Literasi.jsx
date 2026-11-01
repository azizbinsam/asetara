import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Clock, Search, CheckCircle2, ArrowRight, Target } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { useLiteracy } from '../context/literacyStore'
import { CategoryIcon } from '../utils/literasiIcons'

export default function Literasi() {
  const navigate = useNavigate()
  const { categories, materials, progress, getStatus, quizResults, getRecommendations } = useLiteracy()
  const [activeCategory, setActiveCategory] = useState('semua')
  const [query, setQuery] = useState('')

  const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? ''

  const q = query.trim().toLowerCase()
  const filtered = materials.filter((m) => {
    const matchCategory = activeCategory === 'semua' || m.category === activeCategory
    const matchQuery = !q || m.title.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q)
    return matchCategory && matchQuery
  })

  // Tombol "Mulai Kuis": arahkan ke materi pertama yang kuisnya belum dikerjakan
  const nextForQuiz = getRecommendations(null, 1)[0] || materials[0]

  return (
    <div className="p-4 lg:p-0 pb-8">
      <h1 className="text-xl font-bold text-neutral-800 mb-4 lg:mb-6">Literasi Keuangan</h1>

      {/* Ringkasan progres belajar */}
      <div className="rounded-card bg-sage border border-teal-100 p-4 md:p-6 mb-5">
        <p className="text-lg font-bold text-navy-800">Pusat Literasi Keuangan</p>
        <p className="text-sm text-neutral-600 mt-0.5">Belajar bertahap, pahami lebih dalam.</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-neutral-700">
            {progress.done} dari {progress.total} materi selesai
          </span>
          {progress.done > 0 && (
            <span className="text-neutral-600">Rata-rata skor kuis {progress.averageScore}%</span>
          )}
        </div>
        <ProgressBar value={progress.done} max={progress.total} className="mt-2" />
      </div>

      {/* Pencarian + filter kategori */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari materi atau topik"
          className="w-full h-11 pl-9 pr-3 rounded-xl border border-neutral-200 bg-neutral-0 text-sm outline-none focus:border-navy-600"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
        {[{ id: 'semua', label: 'Semua' }, ...categories].map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === c.id
                ? 'bg-navy-600 text-white border-navy-600'
                : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-navy-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Daftar materi */}
      {filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-neutral-600 text-center py-6">
            Belum ada materi yang cocok. Coba kata kunci atau kategori lain.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m) => {
            const status = getStatus(m.id)
            const result = quizResults[m.id]
            return (
              <Link key={m.id} to={`/literasi/${m.id}`} className="block group">
                <Card className="h-full flex flex-col group-hover:border-navy-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-sage flex items-center justify-center">
                      <CategoryIcon category={m.category} size={20} className="text-teal-700" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-800 leading-snug">{m.title}</p>
                      <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{m.summary}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
                    <Badge variant="brand">{categoryLabel(m.category)}</Badge>
                    {m.popular && <Badge variant="neutral">Populer</Badge>}
                    <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                      <Clock size={12} /> {m.duration} menit
                    </span>
                  </div>
                  <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between text-sm">
                    {status === 'selesai' ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-teal-700">
                        <CheckCircle2 size={16} /> Skor terbaik {Math.round((result.best / result.total) * 100)}%
                      </span>
                    ) : (
                      <span className="text-neutral-500">{status === 'dibaca' ? 'Sudah dibaca' : 'Belum dimulai'}</span>
                    )}
                    <span className="inline-flex items-center gap-1 font-semibold text-navy-700">
                      {status === 'selesai' ? 'Ulangi' : status === 'dibaca' ? 'Lanjutkan' : 'Mulai Belajar'}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {/* Kuis pemahaman */}
      <Card className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-champagne-50 flex items-center justify-center">
          <Target size={20} className="text-champagne-700" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-neutral-800">Kuis Pemahaman</p>
          <p className="text-sm text-neutral-600">Uji pemahamanmu setelah belajar.</p>
        </div>
        <Button onClick={() => navigate(`/literasi/${nextForQuiz.id}/kuis`)}>Mulai Kuis</Button>
      </Card>
    </div>
  )
}
