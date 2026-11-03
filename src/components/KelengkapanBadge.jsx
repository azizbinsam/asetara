import { Check, CircleAlert } from 'lucide-react'

// Chip status kelengkapan informasi. Warna "perlu dilengkapi" memakai keluarga champagne
// (bukan merah) agar tetap selaras dengan palet ASETARA.
export default function KelengkapanBadge({ ok, okLabel = 'Lengkap', noLabel = 'Perlu dilengkapi', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
        ok ? 'bg-teal-50 text-teal-700' : 'bg-champagne-100 text-champagne-800'
      } ${className}`}
    >
      {ok ? <Check size={12} strokeWidth={3} /> : <CircleAlert size={12} strokeWidth={2.5} />}
      {ok ? okLabel : noLabel}
    </span>
  )
}
