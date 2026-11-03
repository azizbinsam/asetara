import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Play, Pause, RotateCcw, BookOpen } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'
import { formatDuration } from '../utils/format'

// Pemutar video SIMULASI untuk prototype: tidak ada berkas video; hanya thumbnail, waktu berjalan,
// dan ringkasan isi. Pasang dengan key={video.id} supaya state mulai dari awal untuk tiap video.
export default function VideoDummyModal({ video, onClose }) {
  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const closeRef = useRef(null)

  const finished = elapsed >= video.duration
  const isPlaying = playing && !finished

  // Waktu berjalan 1 detik per detik selama diputar
  useEffect(() => {
    if (!isPlaying) return undefined
    const timer = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 1, video.duration))
    }, 1000)
    return () => clearInterval(timer)
  }, [isPlaying, video.duration])

  // Esc menutup; halaman di belakang tidak ikut ter-scroll
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  function togglePlay() {
    if (finished) {
      setElapsed(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  const ControlIcon = finished ? RotateCcw : isPlaying ? Pause : Play
  const controlLabel = finished ? 'Putar ulang' : isPlaying ? 'Jeda' : 'Putar'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        className="w-full max-w-2xl max-h-full overflow-y-auto rounded-card bg-neutral-0 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Layar video (simulasi) */}
        <div className="relative aspect-video bg-navy-gradient">
          {video.thumbnail && (
            <img src={video.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-navy-800/50" />
          <span className="absolute left-3 top-3 rounded-full bg-neutral-0/90 px-3 py-1 text-xs font-semibold text-navy-800">
            Video contoh
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup video"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-0/90 text-navy-800 hover:bg-neutral-0"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={controlLabel}
            className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-0/90 text-navy-700 hover:bg-neutral-0"
          >
            <ControlIcon size={26} className={ControlIcon === Play ? 'ml-1' : ''} />
          </button>
        </div>

        {/* Bilah waktu */}
        <div className="flex items-center gap-3 px-4 pt-3 text-xs text-neutral-600">
          <span className="w-10 tabular-nums">{formatDuration(elapsed)}</span>
          <input
            type="range"
            min={0}
            max={video.duration}
            value={elapsed}
            onChange={(e) => setElapsed(Number(e.target.value))}
            aria-label="Posisi video"
            className="flex-1 accent-navy-600"
          />
          <span className="w-10 text-right tabular-nums">{formatDuration(video.duration)}</span>
        </div>

        {/* Keterangan */}
        <div className="p-4 md:p-6 pt-3">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="brand">{video.category}</Badge>
            <span className="text-xs text-neutral-500">Pemutar simulasi untuk prototype INKLUSARA</span>
          </div>
          <h2 className="text-lg font-bold leading-snug text-neutral-800">{video.title}</h2>
          <p className="mt-1 text-sm text-neutral-600">{video.description}</p>

          <p className="mt-4 text-sm font-semibold text-neutral-700">Poin utama</p>
          <ul className="mt-2 space-y-1.5">
            {video.points.map((p) => (
              <li key={p} className="flex gap-2 text-sm leading-relaxed text-neutral-700">
                <span className="font-bold text-teal-700">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {video.materialId && (
            <Link to={`/literasi/${video.materialId}`} className="mt-5 inline-block">
              <Button variant="outline">
                <BookOpen size={16} /> Baca materinya
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
