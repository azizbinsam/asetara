import { useMemo, useState } from 'react'
import { Search, Info, SearchX } from 'lucide-react'
import Card from '../../components/Card'
import ProyekCard from '../../components/ProyekCard'
import { useProperties } from '../../context/propertiesStore'
import { buildProjects, JENIS_LABEL, KATEGORI_LABEL } from '../../utils/direktori'

const JENIS_FILTERS = [
  { id: 'semua', label: 'Semua jenis' },
  { id: 'langsung', label: JENIS_LABEL.langsung },
  { id: 'fraksional', label: JENIS_LABEL.fraksional },
]

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
        active
          ? 'bg-navy-600 text-white border-navy-600'
          : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-navy-300'
      }`}
    >
      {children}
    </button>
  )
}

export default function DirektoriTab() {
  const { activeProperties } = useProperties()
  const projects = useMemo(() => buildProjects(activeProperties), [activeProperties])

  const [search, setSearch] = useState('')
  const [jenis, setJenis] = useState('semua')
  const [kategori, setKategori] = useState('semua')
  const [hanyaLengkap, setHanyaLengkap] = useState(false)

  // Chip kategori hanya menampilkan kategori yang benar-benar ada di data
  const kategoriOptions = useMemo(() => {
    const ids = [...new Set(projects.map((p) => p.kategori))]
    return [
      { id: 'semua', label: 'Semua kategori' },
      ...ids.map((id) => ({ id, label: KATEGORI_LABEL[id] || id })),
    ]
  }, [projects])

  const q = search.trim().toLowerCase()
  const filtered = projects.filter((p) => {
    if (jenis !== 'semua' && p.jenis !== jenis) return false
    if (kategori !== 'semua' && p.kategori !== kategori) return false
    if (hanyaLengkap && !p.terverifikasi) return false
    if (!q) return true
    return [p.nama, p.lokasi, p.penyedia, p.akad].some((v) => v.toLowerCase().includes(q))
  })

  const filterAktif = search !== '' || jenis !== 'semua' || kategori !== 'semua' || hanyaLengkap

  function resetFilter() {
    setSearch('')
    setJenis('semua')
    setKategori('semua')
    setHanyaLengkap(false)
  }

  return (
    <div>
      <div className="rounded-card bg-sage border border-teal-100 p-4 md:p-6">
        <p className="text-lg font-bold text-navy-800">Direktori Proyek</p>
        <p className="mt-0.5 text-sm text-neutral-600">
          Setiap proyek diperiksa awal kelengkapan 11 informasi minimum: legalitas penyedia, lokasi dan status,
          hak investor, akad, modal dan biaya, pembagian hasil, risiko, jangka waktu, likuiditas, mekanisme keluar,
          dan jalur pengaduan.
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-champagne-50 px-3 py-2.5 text-xs text-neutral-700">
        <Info size={14} className="mt-0.5 shrink-0 text-champagne-700" />
        <p>
          &ldquo;Terverifikasi&rdquo; berarti 11 informasi minimum sudah tersedia, bukan berarti proyek dinilai aman
          atau layak. Ini bukan fatwa, bukan penilaian kepatuhan syariah, bukan jaminan hasil, dan bukan rekomendasi
          investasi. Proyek yang masih ada informasi kurang tetap ditampilkan agar kamu tahu apa yang belum jelas.
        </p>
      </div>

      {/* Cari + filter */}
      <div className="mt-4 flex items-center gap-2 bg-neutral-0 border border-neutral-200 rounded-xl px-3 py-2.5">
        <Search size={18} className="text-neutral-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari proyek, lokasi, penyedia, atau akad..."
          aria-label="Cari proyek"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0" role="group" aria-label="Jenis proyek">
        {JENIS_FILTERS.map((f) => (
          <Chip key={f.id} active={jenis === f.id} onClick={() => setJenis(f.id)}>
            {f.label}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0" role="group" aria-label="Kategori properti">
        {kategoriOptions.map((f) => (
          <Chip key={f.id} active={kategori === f.id} onClick={() => setKategori(f.id)}>
            {f.label}
          </Chip>
        ))}
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
        <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
          <input
            type="checkbox"
            checked={hanyaLengkap}
            onChange={(e) => setHanyaLengkap(e.target.checked)}
            className="h-4 w-4 accent-teal-600"
          />
          Hanya yang 11 informasinya lengkap
        </label>
        <p className="text-xs text-neutral-500" aria-live="polite">
          Menampilkan {filtered.length} dari {projects.length} proyek
        </p>
      </div>

      {filtered.length === 0 ? (
        <Card className="mt-4 text-center py-10">
          <div className="w-12 h-12 mx-auto rounded-full bg-sage flex items-center justify-center mb-3">
            <SearchX size={22} className="text-teal-700" />
          </div>
          <p className="font-bold text-neutral-800">Tidak ada proyek yang cocok</p>
          <p className="text-sm text-neutral-600 mt-1">Coba ubah kata kunci atau longgarkan filter.</p>
          {filterAktif && (
            <button
              type="button"
              onClick={resetFilter}
              className="mt-3 text-sm font-medium text-navy-700 hover:underline"
            >
              Reset filter
            </button>
          )}
        </Card>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProyekCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
