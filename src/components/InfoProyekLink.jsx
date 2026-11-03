import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardCheck, ArrowRight } from 'lucide-react'
import Card from './Card'
import { useProperties } from '../context/propertiesStore'
import { buildProjects, FRACTIONAL_WARNING } from '../utils/direktori'

// Penyambung dari halaman token ke Direktori Proyek: ringkas kelengkapan 11 informasi + tautan detail.
// Tidak tampil bila properti belum punya entri di direktoriProyek.json.
export default function InfoProyekLink({ propertyId, className = '' }) {
  const { activeProperties } = useProperties()
  const project = useMemo(
    () => buildProjects(activeProperties).find((p) => p.propertyId === propertyId),
    [activeProperties, propertyId]
  )
  if (!project) return null

  return (
    <Link to={`/investasi-syariah/proyek/${project.id}`} className={`block ${className}`}>
      <Card className="hover:border-navy-300 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-sage flex items-center justify-center">
            <ClipboardCheck size={18} className="text-teal-700" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-neutral-800">Cek 11 informasi minimum proyek</p>
            <p className="mt-0.5 text-sm text-neutral-600">
              {project.lengkap} dari {project.total} informasi lengkap: akad, hak investor, biaya, risiko, mekanisme
              keluar, dan jalur pengaduan.
            </p>
            <p className="mt-2 text-xs text-neutral-600">{FRACTIONAL_WARNING}</p>
          </div>
          <ArrowRight size={16} className="mt-1 shrink-0 text-navy-600" />
        </div>
      </Card>
    </Link>
  )
}
