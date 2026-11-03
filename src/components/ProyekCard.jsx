import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import Badge from './Badge'
import KelengkapanBadge from './KelengkapanBadge'
import ProgressBar from './ProgressBar'
import { formatRupiah } from '../utils/format'
import { JENIS_LABEL, KATEGORI_LABEL } from '../utils/direktori'

const CATEGORY_GRADIENT = {
  apartemen: 'from-champagne-300 to-navy-600',
  vila: 'from-teal-300 to-teal-700',
  hotel: 'from-champagne-400 to-teal-700',
  rumah: 'from-teal-200 to-navy-500',
  ruko: 'from-champagne-200 to-teal-600',
}

export default function ProyekCard({ project }) {
  const gradient = CATEGORY_GRADIENT[project.kategori] || 'from-champagne-300 to-navy-600'

  return (
    <Link to={`/investasi-syariah/proyek/${project.id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-card border border-neutral-200 bg-neutral-0 transition-shadow hover:border-navy-300">
        <div className="relative h-40 overflow-hidden">
          {project.gambar ? (
            <img
              src={project.gambar}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${gradient}`} />
          )}
          <div className="absolute left-3 top-3">
            <KelengkapanBadge
              ok={project.terverifikasi}
              okLabel="Terverifikasi"
              className="!bg-white/90 backdrop-blur"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute bottom-2 left-3 rounded-full bg-neutral-0/90 px-2.5 py-1 text-[10px] font-semibold text-navy-700">
            {JENIS_LABEL[project.jenis]}
          </span>
          <span className="absolute bottom-2 right-3 rounded-full bg-navy-800/80 px-2.5 py-1 text-[10px] font-semibold text-white">
            Data ilustrasi
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-bold leading-snug text-neutral-800 transition-colors group-hover:text-navy-700">
            {project.nama}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-500">{project.penyedia}</p>
          <div className="mt-1 flex items-center gap-1">
            <MapPin size={12} className="text-neutral-400" />
            <p className="text-xs text-neutral-500">{project.lokasi}</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="brand">{KATEGORI_LABEL[project.kategori] || project.kategori}</Badge>
            <Badge variant="neutral">{project.akad}</Badge>
          </div>

          {project.modalAwal && (
            <div className="mt-3">
              <p className="text-[10px] text-neutral-400">{project.modalAwal.label}</p>
              <p className="text-sm font-bold text-navy-700">{formatRupiah(project.modalAwal.nilai)}</p>
            </div>
          )}

          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-neutral-500">Informasi minimum</span>
              <span className="font-semibold text-neutral-700">
                {project.lengkap} dari {project.total} lengkap
              </span>
            </div>
            <ProgressBar value={project.lengkap} max={project.total} variant={project.terverifikasi ? 'teal' : 'brand'} />
          </div>

          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-navy-700">
            Lihat 11 informasi <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
