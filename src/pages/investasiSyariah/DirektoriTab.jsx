import { MapPin } from 'lucide-react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'

// Placeholder: akan diganti dengan direktori proyek + detail 11 informasi minimum pada Tahap 7c.
export default function DirektoriTab() {
  return (
    <Card className="text-center py-10">
      <div className="w-12 h-12 mx-auto rounded-full bg-sage flex items-center justify-center mb-3">
        <MapPin size={22} className="text-teal-700" />
      </div>
      <p className="font-bold text-neutral-800">Direktori Proyek</p>
      <p className="text-sm text-neutral-600 mt-1 max-w-md mx-auto">
        Informasi proyek dan penyedia yang telah melalui pemeriksaan awal kelengkapan informasi minimum.
      </p>
      <Badge variant="neutral" className="mt-3">Segera hadir</Badge>
    </Card>
  )
}
