import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, FileText, Target, Clock, ArrowRight, CheckCircle2, Info } from 'lucide-react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import ProgressBar from '../../components/ProgressBar'
import VideoDummyModal from '../../components/VideoDummyModal'
import { useLiteracy } from '../../context/literacyStore'
import { formatDuration } from '../../utils/format'
import videos from '../../data/videoEdukasi.json'

const CATEGORY = 'properti' // id kategori "Properti Syariah" di src/data/literasi.json

const FILTERS = [
  { id: 'semua', label: 'Semua' },
  { id: 'video', label: 'Video' },
  { id: 'artikel', label: 'Artikel' },
  { id: 'kuis', label: 'Kuis' },
]

export default function MateriTab() {
  const { materials, getStatus, quizResults } = useLiteracy()
  const [filter, setFilter] = useState('semua')
  const [activeVideo, setActiveVideo] = useState(null)

  const items = materials.filter((m) => m.category === CATEGORY)
  const topicVideos = videos.filter((v) => v.topic === CATEGORY)
  const done = items.filter((m) => getStatus(m.id) === 'selesai').length

  const sections = [
    { id: 'video', title: 'Video', count: topicVideos.length },
    { id: 'artikel', title: 'Artikel', count: items.length },
    { id: 'kuis', title: 'Kuis', count: items.length },
  ].filter((s) => filter === 'semua' || filter === s.id)

  return (
    <div>
      {/* Progres jalur belajar */}
      <div className="rounded-card bg-sage border border-teal-100 p-4 md:p-6">
        <p className="text-lg font-bold text-navy-800">Jalur Belajar Properti Syariah</p>
        <p className="text-sm text-neutral-600 mt-0.5">
          Pelajari dasar, akad, hak kepemilikan, dan cara membaca informasi proyek.
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-neutral-700">
            {done} dari {items.length} materi selesai
          </span>
          <span className="text-neutral-500">Materi selesai setelah kuisnya dikerjakan</span>
        </div>
        <ProgressBar value={done} max={items.length || 1} className="mt-2" />
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-champagne-50 px-3 py-2.5 text-xs text-neutral-700">
        <Info size={14} className="mt-0.5 shrink-0 text-champagne-700" />
        <p>
          Materi bersifat edukasi umum dan belum ditinjau ahli syariah maupun penasihat hukum. Bukan fatwa,
          bukan nasihat hukum, dan bukan rekomendasi investasi.
        </p>
      </div>

      {/* Filter jenis materi */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0" role="group" aria-label="Jenis materi">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              filter === f.id
                ? 'bg-navy-600 text-white border-navy-600'
                : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-navy-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {sections.map((section) => (
        <section key={section.id} className="mt-3">
          <h2 className="mb-3 font-bold text-neutral-800">
            {section.title} <span className="font-normal text-neutral-500">({section.count})</span>
          </h2>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {section.id === 'video' &&
              topicVideos.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVideo(v)}
                  className="group block w-full text-left"
                >
                  <Card padding="none" className="h-full overflow-hidden group-hover:border-navy-300 transition-colors">
                    <div className="relative aspect-video bg-navy-gradient">
                      {v.thumbnail && (
                        <img
                          src={v.thumbnail}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-navy-800/40" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-0/90">
                          <Play size={20} className="ml-0.5 text-navy-700" />
                        </span>
                      </span>
                      <span className="absolute bottom-2 right-2 rounded bg-navy-800/80 px-2 py-0.5 text-xs text-white">
                        {formatDuration(v.duration)}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="brand">Video</Badge>
                        <Badge variant="neutral">Contoh</Badge>
                      </div>
                      <p className="font-bold leading-snug text-neutral-800">{v.title}</p>
                      <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{v.description}</p>
                    </div>
                  </Card>
                </button>
              ))}

            {section.id === 'artikel' &&
              items.map((m) => {
                const status = getStatus(m.id)
                return (
                  <Link key={m.id} to={`/literasi/${m.id}`} className="group block">
                    <Card className="flex h-full flex-col group-hover:border-navy-300 transition-colors">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage">
                          <FileText size={20} className="text-teal-700" />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <Badge variant="brand">Artikel</Badge>
                            <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                              <Clock size={12} /> {m.duration} menit
                            </span>
                          </div>
                          <p className="font-bold leading-snug text-neutral-800">{m.title}</p>
                          <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{m.summary}</p>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3 text-sm">
                        <span className="text-neutral-500">
                          {status === 'selesai' ? 'Selesai' : status === 'dibaca' ? 'Sudah dibaca' : 'Belum dibaca'}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-navy-700">
                          {status === 'baru' ? 'Baca' : status === 'dibaca' ? 'Lanjutkan' : 'Baca lagi'}
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </Card>
                  </Link>
                )
              })}

            {section.id === 'kuis' &&
              items.map((m) => {
                const result = quizResults[m.id]
                return (
                  <Link key={m.id} to={`/literasi/${m.id}/kuis`} className="group block">
                    <Card className="flex h-full flex-col group-hover:border-navy-300 transition-colors">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-champagne-50">
                          <Target size={20} className="text-champagne-700" />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <Badge variant="brand">Kuis</Badge>
                            <span className="text-xs text-neutral-500">{m.quiz.length} soal</span>
                          </div>
                          <p className="font-bold leading-snug text-neutral-800">Kuis: {m.title}</p>
                          <p className="mt-1 text-sm text-neutral-600">Lengkap dengan pembahasan tiap soal.</p>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3 text-sm">
                        {result ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-teal-700">
                            <CheckCircle2 size={16} /> Skor terbaik {Math.round((result.best / result.total) * 100)}%
                          </span>
                        ) : (
                          <span className="text-neutral-500">Belum dikerjakan</span>
                        )}
                        <span className="inline-flex items-center gap-1 font-semibold text-navy-700">
                          {result ? 'Ulangi Kuis' : 'Mulai Kuis'}
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </Card>
                  </Link>
                )
              })}
          </div>
        </section>
      ))}

      {activeVideo && (
        <VideoDummyModal key={activeVideo.id} video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  )
}
