import { useNavigate } from 'react-router-dom'
import { ChevronLeft, TrendingUp, Users, Building2, Heart } from 'lucide-react'
import Card from '../components/Card'

const IMPACT_STATS = [
  { icon: Building2, label: 'Properti Tertokenisasi', value: '12', unit: 'properti' },
  { icon: Users, label: 'Investor Terdaftar', value: '1.240', unit: 'orang' },
  { icon: TrendingUp, label: 'Dana Terkumpul', value: 'Rp 45 M', unit: '' },
  { icon: Heart, label: 'Zakat Tersalurkan', value: 'Rp 1.2 M', unit: '' },
]

const SDG_ITEMS = [
  { number: '1', title: 'No Poverty', desc: 'Akses investasi untuk semua kalangan' },
  { number: '8', title: 'Decent Work', desc: 'Menciptakan lapangan kerja di sektor properti' },
  { number: '9', title: 'Industry & Innovation', desc: 'Inovasi teknologi blockchain syariah' },
  { number: '11', title: 'Sustainable Cities', desc: 'Pengembangan properti berkelanjutan' },
]

export default function Dampak() {
  const navigate = useNavigate()

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Dampak Sosial</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Dampak Sosial</h1>

        <p className="text-sm text-neutral-600 mb-6 lg:max-w-2xl">
          ASETARA berkomitmen menciptakan dampak positif melalui tokenisasi properti syariah yang inklusif dan berkelanjutan.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {IMPACT_STATS.map(({ icon: Icon, label, value, unit }) => (
            <Card key={label} variant="default" className="text-center py-5">
              <Icon size={24} className="text-navy-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-neutral-800">{value}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
              {unit && <p className="text-[10px] text-neutral-400">{unit}</p>}
            </Card>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* SDG Alignment */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-sm font-bold text-neutral-800 mb-3">Kontribusi SDG</h2>
            <div className="space-y-2">
              {SDG_ITEMS.map(({ number, title, desc }) => (
                <Card key={number} variant="flat" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-sm shrink-0">
                    {number}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{title}</p>
                    <p className="text-xs text-neutral-500">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div>
            <h2 className="text-sm font-bold text-neutral-800 mb-3">Cerita Investor</h2>
            <Card variant="brand">
              <p className="text-sm italic text-white-400 leading-relaxed">
                "Sebelum ASETARA, saya tidak pernah bisa berinvestasi di properti karena modal yang dibutuhkan sangat besar. Sekarang, dengan Rp 250 ribu, saya sudah bisa memiliki bagian dari apartemen di BSD."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-navy-800 font-bold text-xs">
                  RA
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Rina Aminah</p>
                  <p className="text-[10px] text-white-500">Investor sejak 2026</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}