import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ChevronLeft, MapPin, Info, ShieldCheck, TriangleAlert, ArrowUpRight, ArrowRight,
  Landmark, KeyRound, FileSignature, Coins, PieChart, Hourglass, Droplets, LogOut, Headset,
} from 'lucide-react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import ProgressBar from '../../components/ProgressBar'
import KelengkapanBadge from '../../components/KelengkapanBadge'
import { useProperties } from '../../context/propertiesStore'
import { buildProjects, formatTanggal, JENIS_LABEL, KATEGORI_LABEL, FRACTIONAL_WARNING } from '../../utils/direktori'

const BACK = '/investasi-syariah?tab=direktori'

const ICONS = {
  legalitas: Landmark,
  lokasiStatus: MapPin,
  hakKepemilikan: KeyRound,
  akad: FileSignature,
  modalBiaya: Coins,
  pembagianHasil: PieChart,
  risiko: TriangleAlert,
  jangkaWaktu: Hourglass,
  likuiditas: Droplets,
  mekanismeKeluar: LogOut,
  jalurPengaduan: Headset,
}

const CATEGORY_GRADIENT = {
  apartemen: 'from-champagne-300 to-navy-600',
  vila: 'from-teal-300 to-teal-700',
  hotel: 'from-champagne-400 to-teal-700',
  rumah: 'from-teal-200 to-navy-500',
  ruko: 'from-champagne-200 to-teal-600',
}

function scrollToInfo(key) {
  document.getElementById(`info-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ProyekDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { activeProperties } = useProperties()
  const projects = useMemo(() => buildProjects(activeProperties), [activeProperties])
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="p-4 lg:p-0">
        <Card className="text-center py-10">
          <p className="font-bold text-neutral-800">Proyek tidak ditemukan</p>
          <p className="text-sm text-neutral-600 mt-1 mb-4">Proyek yang kamu cari mungkin sudah tidak ada di direktori.</p>
          <Button onClick={() => navigate(BACK)}>Kembali ke Direktori Proyek</Button>
        </Card>
      </div>
    )
  }

  const gradient = CATEGORY_GRADIENT[project.kategori] || 'from-champagne-300 to-navy-600'
  const perlu = project.items.filter((i) => i.status !== 'lengkap')

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(BACK)} className="text-neutral-600" aria-label="Kembali">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800 truncate">{project.nama}</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-3xl">
        <Link to={BACK} className="hidden lg:inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-navy-700 mb-4">
          <ChevronLeft size={16} /> Kembali ke Direktori Proyek
        </Link>

        {/* Ringkasan proyek */}
        <div className="relative h-48 md:h-56 rounded-card overflow-hidden">
          {project.gambar ? (
            <img src={project.gambar} alt={project.nama} className="h-full w-full object-cover" />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${gradient}`} />
          )}
          <div className="absolute left-3 top-3">
            <KelengkapanBadge ok={project.terverifikasi} okLabel="Terverifikasi" className="!bg-white/90 backdrop-blur" />
          </div>
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-navy-800/80 px-2.5 py-1 text-[10px] font-semibold text-white">Data ilustrasi</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="brand">{JENIS_LABEL[project.jenis]}</Badge>
          <Badge variant="neutral">{KATEGORI_LABEL[project.kategori] || project.kategori}</Badge>
          <Badge variant="neutral">Akad: {project.akad}</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-neutral-800 hidden lg:block">{project.nama}</h1>
        <h2 className="mt-3 text-xl font-bold text-neutral-800 lg:hidden">{project.nama}</h2>
        <p className="mt-1 text-sm text-neutral-600">{project.penyedia}</p>
        <p className="mt-1 inline-flex items-center gap-1 text-sm text-neutral-500">
          <MapPin size={14} className="text-neutral-400" /> {project.lokasi}
        </p>
        <p className="mt-3 text-neutral-700 leading-relaxed">{project.ringkasan}</p>

        {/* Kelengkapan */}
        <Card className="mt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-neutral-800">Pemeriksaan awal informasi minimum</p>
              <p className="text-xs text-neutral-500 mt-0.5">Diperiksa {formatTanggal(project.pemeriksaan)} (tanggal ilustrasi)</p>
            </div>
            <span className="shrink-0 text-sm font-bold text-navy-700">{project.lengkap}/{project.total}</span>
          </div>
          <ProgressBar value={project.lengkap} max={project.total} variant={project.terverifikasi ? 'teal' : 'brand'} className="mt-3" />

          {perlu.length > 0 && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-champagne-50 px-3 py-2.5 text-xs text-neutral-700">
              <TriangleAlert size={14} className="mt-0.5 shrink-0 text-champagne-700" />
              <p>
                {perlu.length} informasi belum lengkap: {perlu.map((i) => i.label.toLowerCase()).join(', ')}.
                Pertimbangkan meminta kelengkapannya ke penyedia sebelum mengambil keputusan.
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.items.map((item, idx) => (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToInfo(item.key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:border-navy-300 ${
                  item.status === 'lengkap'
                    ? 'border-neutral-200 bg-neutral-0 text-neutral-700'
                    : 'border-champagne-300 bg-champagne-50 text-champagne-800'
                }`}
              >
                <span className="font-bold">{idx + 1}</span> {item.label}
              </button>
            ))}
          </div>
        </Card>

        <div className="mt-3 flex items-start gap-2 rounded-xl bg-sage px-3 py-2.5 text-xs text-neutral-700">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-teal-700" />
          <p>
            Pemeriksaan ini hanya memastikan informasinya ada dan dijelaskan, bukan menilai keabsahan dokumen atau
            kepatuhan syariah. Bukan fatwa, bukan jaminan hasil, dan bukan rekomendasi investasi. Seluruh data di
            halaman ini adalah ilustrasi.
          </p>
        </div>

        {project.fraksional && (
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-champagne-50 px-3 py-2.5 text-xs text-neutral-700">
            <Info size={14} className="mt-0.5 shrink-0 text-champagne-700" />
            <p>{FRACTIONAL_WARNING}</p>
          </div>
        )}

        {/* 11 informasi */}
        <div className="mt-6 space-y-4">
          {project.items.map((item, idx) => {
            const Icon = ICONS[item.key]
            const ok = item.status === 'lengkap'
            return (
              <section key={item.key} id={`info-${item.key}`} className="scroll-mt-20">
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-sage flex items-center justify-center">
                      <Icon size={20} className="text-teal-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-neutral-800">
                          {idx + 1}. {item.label}
                        </h3>
                        <KelengkapanBadge ok={ok} />
                      </div>
                      <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{item.ringkas}</p>
                    </div>
                  </div>

                  <dl className="mt-4">
                    {item.rincian.map(([label, nilai]) => (
                      <div key={label} className="py-2 border-t border-neutral-100 sm:flex sm:gap-4">
                        <dt className="text-xs font-semibold text-neutral-500 sm:w-48 sm:shrink-0">{label}</dt>
                        <dd className="mt-0.5 sm:mt-0 text-sm text-neutral-700">{nilai}</dd>
                      </div>
                    ))}
                  </dl>

                  {item.catatan && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-champagne-50 px-3 py-2.5 text-xs text-neutral-700">
                      <TriangleAlert size={14} className="mt-0.5 shrink-0 text-champagne-700" />
                      <p>
                        <span className="font-semibold">Yang belum ada:</span> {item.catatan}
                      </p>
                    </div>
                  )}
                </Card>
              </section>
            )
          })}
        </div>

        {/* Langkah lanjut */}
        <Card className="mt-6 space-y-3">
          <p className="font-bold text-neutral-800">Langkah berikutnya</p>
          <Link
            to="/literasi/membaca-informasi-proyek"
            className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 px-4 py-3 hover:border-navy-300 transition-colors"
          >
            <span className="text-sm text-neutral-700">Pelajari cara membaca informasi proyek</span>
            <ArrowRight size={16} className="text-navy-700 shrink-0" />
          </Link>
          <Link
            to="/akses-keamanan"
            className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 px-4 py-3 hover:border-navy-300 transition-colors"
          >
            <span className="text-sm text-neutral-700">Cek legalitas dan kenali tanda bahaya penawaran</span>
            <ArrowRight size={16} className="text-navy-700 shrink-0" />
          </Link>
          {project.propertyId && (
            <Link to={`/marketplace/${project.propertyId}`}>
              <Button variant="outline" fullWidth>
                Lihat di Marketplace <ArrowUpRight size={16} />
              </Button>
            </Link>
          )}
        </Card>
      </div>
    </div>
  )
}
