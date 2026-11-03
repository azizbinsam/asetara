import { BookOpen } from 'lucide-react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'

// Placeholder: akan diganti dengan daftar materi (Video / Artikel / Kuis) pada Tahap 7b.
export default function MateriTab() {
  return (
    <Card className="text-center py-10">
      <div className="w-12 h-12 mx-auto rounded-full bg-sage flex items-center justify-center mb-3">
        <BookOpen size={22} className="text-teal-700" />
      </div>
      <p className="font-bold text-neutral-800">Materi Edukasi Investasi Properti Syariah</p>
      <p className="text-sm text-neutral-600 mt-1 max-w-md mx-auto">
        Materi tentang akad, hak kepemilikan, risiko, dan cara membaca informasi proyek sedang disiapkan.
      </p>
      <Badge variant="neutral" className="mt-3">Segera hadir</Badge>
    </Card>
  )
}
