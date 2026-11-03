import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Clock, Lightbulb, ArrowRight, CheckCircle2, Info } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { useLiteracy } from '../context/literacyStore'
import { CategoryIcon } from '../utils/literasiIcons'
import { getLiterasiHome } from '../utils/literasiPaths'

export default function LiterasiDetail() {
  const { materiId } = useParams()
  const navigate = useNavigate()
  const { categories, getMaterial, markRead, getStatus, quizResults } = useLiteracy()
  const material = getMaterial(materiId)

  // Membuka halaman ini otomatis menandai materi sebagai "sudah dibaca"
  useEffect(() => {
    if (material) markRead(material.id)
  }, [material, markRead])

  if (!material) {
    return (
      <div className="p-4 lg:p-0">
        <Card className="text-center py-10">
          <p className="font-bold text-neutral-800">Materi tidak ditemukan</p>
          <p className="text-sm text-neutral-600 mt-1 mb-4">Materi yang kamu cari mungkin sudah dipindahkan.</p>
          <Button onClick={() => navigate('/literasi')}>Kembali ke Literasi</Button>
        </Card>
      </div>
    )
  }

  const categoryLabel = categories.find((c) => c.id === material.category)?.label
  const home = getLiterasiHome(material.category)
  const result = quizResults[material.id]
  const done = getStatus(material.id) === 'selesai'

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(home.to)} className="text-neutral-600" aria-label="Kembali">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800 truncate">{material.title}</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-3xl">
        <Link to={home.to} className="hidden lg:inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-navy-700 mb-4">
          <ChevronLeft size={16} /> {home.label}
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-sage flex items-center justify-center">
            <CategoryIcon category={material.category} size={22} className="text-teal-700" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">{categoryLabel}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
              <Clock size={12} /> {material.duration} menit
            </span>
            {done && (
              <Badge variant="success" withCheck>
                Skor terbaik {Math.round((result.best / result.total) * 100)}%
              </Badge>
            )}
          </div>
        </div>

        <h1 className="hidden lg:block text-2xl font-bold text-neutral-800">{material.title}</h1>
        <p className="text-neutral-600 mt-1 mb-5">{material.summary}</p>

        {material.notice && (
          <div className="mb-5 flex items-start gap-2 rounded-xl bg-champagne-50 px-3 py-2.5 text-xs text-neutral-700">
            <Info size={14} className="mt-0.5 shrink-0 text-champagne-700" />
            <p>{material.notice}</p>
          </div>
        )}

        <Card className="space-y-6">
          {material.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold text-neutral-800 mb-2">{s.heading}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="text-neutral-700 leading-relaxed mb-3 last:mb-0">{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-2 mb-3 last:mb-0">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-neutral-700 leading-relaxed">
                      <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after && <p className="text-neutral-700 leading-relaxed">{s.after}</p>}
            </section>
          ))}
        </Card>

        {/* Poin kunci */}
        <div className="rounded-card bg-sage border border-teal-100 p-4 md:p-6 mt-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-champagne-700" />
            <p className="font-bold text-navy-800">Poin Kunci</p>
          </div>
          <ul className="space-y-2">
            {material.keyPoints.map((k, i) => (
              <li key={i} className="text-sm text-neutral-700 leading-relaxed flex gap-2">
                <span className="text-teal-700 font-bold">•</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="mt-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-neutral-800">Sudah paham? Uji pemahamanmu</p>
            <p className="text-sm text-neutral-600">{material.quiz.length} soal pilihan ganda, lengkap dengan pembahasan.</p>
          </div>
          <Button onClick={() => navigate(`/literasi/${material.id}/kuis`)}>
            {done ? 'Ulangi Kuis' : 'Mulai Kuis'} <ArrowRight size={16} />
          </Button>
        </Card>
      </div>
    </div>
  )
}
