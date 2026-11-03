import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ProgressBar from './ProgressBar'
import { usePropertiLearning } from '../hooks/usePropertiLearning'

// Soft gate: saran belajar sebelum membeli token. Bukan kunci keras (tidak ada yang diblokir)
// dan hilang sendiri setelah materi dasar Properti Syariah selesai.
export default function PelajariDuluBanner({ className = '' }) {
  const { done, total, complete } = usePropertiLearning()
  if (complete || total === 0) return null

  return (
    <div className={`rounded-card bg-champagne-50 border border-champagne-200 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-neutral-0 flex items-center justify-center">
          <BookOpen size={18} className="text-champagne-700" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-neutral-800">Pelajari dulu sebelum membeli token</p>
          <p className="mt-0.5 text-sm text-neutral-700 leading-relaxed">
            Kepemilikan fraksional punya ketentuan dan risiko khusus. Pahami akad, hak kepemilikan, dan cara
            membaca informasi proyek lewat materi singkat. Ini saran, bukan syarat; kamu tetap bisa melanjutkan.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-neutral-600">
            <span className="font-semibold">{done} dari {total} materi selesai</span>
          </div>
          <ProgressBar value={done} max={total} className="mt-1.5" />
          <Link
            to="/investasi-syariah?tab=materi"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:underline"
          >
            {done === 0 ? 'Mulai belajar' : 'Lanjutkan belajar'} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
