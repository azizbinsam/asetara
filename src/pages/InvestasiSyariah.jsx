import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MoonStar, ArrowRight, BookOpen, MapPin, ShieldCheck, Store, ArrowUpRight } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import MateriTab from './investasiSyariah/MateriTab'
import DirektoriTab from './investasiSyariah/DirektoriTab'

const TABS = [
  { id: 'materi', label: 'Materi Edukasi', icon: BookOpen },
  { id: 'direktori', label: 'Direktori Proyek', icon: MapPin },
]

export default function InvestasiSyariah() {
  // Tab disimpan di URL (?tab=direktori) supaya bisa di-bookmark, dibagikan, dan tombol kembali bekerja
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = TABS.some((t) => t.id === searchParams.get('tab')) ? searchParams.get('tab') : 'materi'
  const tabsRef = useRef(null)

  function selectTab(id) {
    setSearchParams({ tab: id }, { replace: true })
  }

  function handleStartLearning() {
    selectTab('materi')
    tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="p-4 lg:p-0 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-card bg-navy-gradient text-white shadow-navyGlow">
        <img
          src="/images/hero-apartment.jpg"
          alt=""
          className="absolute inset-y-0 right-0 h-full w-full md:w-3/5 object-cover opacity-30 md:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-700/85 md:via-navy-700/60 to-transparent" />
        <div className="relative z-10 p-5 md:p-8 max-w-xl">
          <span className="inline-flex items-center gap-2 bg-neutral-0 text-navy-800 rounded-full px-3 py-1.5 text-sm font-semibold">
            <MoonStar size={16} className="text-champagne-700" />
            Sharia Property Investment
          </span>
          <h1 className="mt-4 text-2xl md:text-4xl font-bold leading-tight">
            Investasi Properti Syariah Lebih Mudah, Lebih Terpercaya
          </h1>
          <p className="mt-3 text-white/90 text-sm md:text-base leading-relaxed">
            Pelajari konsep investasi properti syariah, lalu lihat proyek yang informasi minimumnya
            telah melalui pemeriksaan awal.
          </p>
          <button
            onClick={handleStartLearning}
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-champagne-500 text-navy-800 font-semibold hover:bg-champagne-400 transition-colors shadow-lg shadow-black/20"
          >
            Mulai Belajar <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Tab */}
      <div ref={tabsRef} className="scroll-mt-20 mt-6 flex gap-2" role="tablist" aria-label="Bagian halaman">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => selectTab(id)}
            className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3 md:px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap border transition-colors ${
              activeTab === id
                ? 'bg-navy-600 text-white border-navy-600'
                : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-navy-300'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4">{activeTab === 'materi' ? <MateriTab /> : <DirektoriTab />}</div>

      {/* Hubungan ke marketplace token */}
      <Card className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-champagne-50 flex items-center justify-center">
          <Store size={20} className="text-champagne-700" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-neutral-800">Siap melihat pilihan investasi token?</p>
          <p className="text-sm text-neutral-600 mt-0.5">
            Kepemilikan fraksional (token) perlu ditelaah penasihat hukum dan ahli syariah sebelum kamu memutuskan.
          </p>
        </div>
        <Link to="/marketplace">
          <Button variant="outline">Lihat Marketplace <ArrowUpRight size={16} /></Button>
        </Link>
      </Card>

      {/* Banner transparansi (kata-katanya sengaja tidak menjanjikan hasil/fatwa) */}
      <section className="mt-6 rounded-card bg-sage border border-teal-100 p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-neutral-0 flex items-center justify-center">
          <ShieldCheck size={24} className="text-navy-600" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-navy-800">Transparansi &amp; Keamanan Informasi</p>
          <p className="text-sm text-neutral-700 mt-1 leading-relaxed">
            Proyek di direktori diperiksa awal kelengkapan informasi minimumnya: legalitas penyedia, hak investor,
            akad, biaya, risiko, mekanisme keluar, dan jalur pengaduan. Pemeriksaan ini bukan jaminan hasil,
            bukan rekomendasi investasi, dan bukan fatwa kepatuhan syariah.
          </p>
        </div>
        <Link to="/akses-keamanan">
          <Button variant="outline">Pelajari Lebih Lanjut <ArrowRight size={16} /></Button>
        </Link>
      </section>

      <p className="mt-4 text-xs text-neutral-500">
        Seluruh data proyek dan penyedia di prototype ini adalah data ilustrasi, bukan penawaran investasi.
      </p>
    </div>
  )
}
