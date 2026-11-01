import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, TrendingUp, Users, Building2, Star, MapPin } from 'lucide-react'
import Logo from '../components/Logo'
import FloatingAiAssistant from '../components/FloatingAiAssistant'

// ============ KALKULATOR COMPONENT ============
function KalkulatorSection() {
  const [nominal, setNominal] = useState(250000)
  const [returnRate, setReturnRate] = useState(10)
  const [years, setYears] = useState(5)

  const yearlyReturn = nominal * (returnRate / 100)
  const totalReturn = yearlyReturn * years
  const finalValue = nominal + totalReturn

  return (
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy-100 text-navy-700 text-xs font-semibold mb-4">
            SIMULASI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">Kalkulator Investasi</h2>
          <p className="text-neutral-500 mt-3 max-w-lg mx-auto">Hitung potensi return investasi properti syariah Anda dalam hitungan detik</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-700">Nominal Investasi</label>
                  <span className="text-sm font-bold text-navy-700">Rp {nominal.toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={100000000}
                  step={100000}
                  value={nominal}
                  onChange={(e) => setNominal(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-navy-600"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>Rp 100rb</span>
                  <span>Rp 100jt</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-700">Imbal Hasil Proyeksi</label>
                  <span className="text-sm font-bold text-navy-700">{returnRate}% /thn</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  step={0.5}
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-navy-600"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>1%</span>
                  <span>25%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 mb-3 block">Periode Investasi</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 5, 10].map((y) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                        years === y
                          ? 'bg-navy-600 text-white shadow-lg shadow-navy-600/25'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {y} Tahun
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="bg-gradient-to-br from-navy-500 via-navy-600 to-navy-800 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <p className="text-sm opacity-80 mb-1">Nilai Investasi Awal</p>
              <p className="text-3xl font-bold">Rp {nominal.toLocaleString('id-ID')}</p>

              <div className="my-6 h-px bg-white/20" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm opacity-80">Return per Tahun</span>
                  <span className="text-sm font-semibold">Rp {yearlyReturn.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-80">Total Return ({years} th)</span>
                  <span className="text-sm font-semibold">Rp {totalReturn.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-80">Zakat (2.5%)</span>
                  <span className="text-sm font-semibold">- Rp {Math.floor(totalReturn * 0.025).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="mt-6 p-5 bg-white/10 backdrop-blur rounded-xl border border-white/10">
                <p className="text-xs opacity-70 mb-1">Estimasi Nilai Akhir</p>
                <p className="text-3xl font-bold">Rp {Math.floor(finalValue * 0.975).toLocaleString('id-ID')}</p>
                <p className="text-xs opacity-60 mt-1">*Sudah dipotong zakat 2.5%</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-neutral-400 text-center mt-6">
          *Perhitungan bersifat simulasi. Return aktual dapat berbeda tergantung kondisi pasar.
        </p>
      </div>
    </section>
  )
}

// ============ HERO SECTION ============
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { image: '/images/hero-villa.jpg', title: 'Vila Eksklusif', location: 'Bali & Lombok' },
    { image: '/images/hero-apartment.jpg', title: 'Apartemen Modern', location: 'Jakarta & Surabaya' },
    { image: '/images/hero-hotel.jpg', title: 'Hotel Syariah', location: 'Yogyakarta & Bandung' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
            <Shield size={14} className="text-champagne-400" />
            <span className="text-sm text-white/90">Edukasi • Perencanaan • Investasi • Perlindungan</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Akses Finansial{' '}
            <span className="text-champagne-400">Lebih Setara</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
            Belajar, merencanakan, membandingkan, lalu berinvestasi properti syariah
            mulai dari Rp 10.000, dengan kepemilikan digital yang transparan.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-champagne-500 text-navy-800 rounded-xl font-semibold hover:bg-champagne-400 transition-all shadow-lg shadow-black/20"
            >
              Mulai Investasi
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              Masuk Akun
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: 'Rp 45M+', label: 'Dana Terkumpul' },
              { value: '1.240+', label: 'Investor Aktif' },
              { value: '12', label: 'Properti' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-champagne-400' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ FEATURES SECTION ============
function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: '100% Syariah Compliant',
      desc: 'Semua properti melalui screening syariah oleh Dewan Pengawas Syariah. Tanpa riba, gharar, dan maysir.',
      color: 'bg-teal-50 text-teal-600',
    },
    {
      icon: TrendingUp,
      title: 'Return Kompetitif',
      desc: 'Imbal hasil proyeksi 8-15% per tahun dari distribusi sewa properti. Historis track record terbuka.',
      color: 'bg-navy-50 text-navy-600',
    },
    {
      icon: Users,
      title: 'Akses untuk Semua',
      desc: 'Mulai investasi dari Rp 10.000. Tidak ada minimum saldo. Fleksibel top-up kapan saja.',
      color: 'bg-navy-50 text-navy-600',
    },
    {
      icon: Building2,
      title: 'Portofolio Diversifikasi',
      desc: 'Pilih dari apartemen, vila, dan hotel syariah di berbagai lokasi strategis Indonesia.',
      color: 'bg-champagne-100 text-champagne-700',
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy-100 text-navy-700 text-xs font-semibold mb-4">
            KEUNGGULAN
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">Mengapa Memilih ASETARA?</h2>
          <p className="text-neutral-500 mt-3 max-w-lg mx-auto">
            Satu platform untuk belajar, merencanakan, membandingkan, dan berinvestasi properti syariah dengan kepemilikan digital yang transparan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-neutral-200 shadow-card bg-white hover:border-navy-200 hover:shadow-lg hover:shadow-navy-600/5 transition-all duration-300 bg-white"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ PROPERTIES PREVIEW ============
function PropertiesPreview() {
  const properties = [
    {
      image: '/images/hero-apartment.jpg',
      name: 'Apartemen BSD Syariah',
      location: 'Tangerang Selatan',
      price: 'Rp 10.000',
      return: '12%',
      type: 'Apartemen',
      funded: 87,
    },
    {
      image: '/images/hero-villa.jpg',
      name: 'Vila Tanjung Lesung',
      location: 'Banten',
      price: 'Rp 10.000',
      return: '15%',
      type: 'Vila',
      funded: 62,
    },
    {
      image: '/images/hero-hotel.jpg',
      name: 'Hotel Malioboro Syariah',
      location: 'Yogyakarta',
      price: 'Rp 10.000',
      return: '10%',
      type: 'Hotel',
      funded: 95,
    },
  ]

  return (
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy-100 text-navy-700 text-xs font-semibold mb-4">
              PROPERTI PILIHAN
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">Properti Tersedia</h2>
            <p className="text-neutral-500 mt-2">Pilih properti syariah terbaik untuk portofolio Anda</p>
          </div>
          <Link
            to="/login"
            className="hidden md:inline-flex items-center gap-2 text-navy-700 font-semibold hover:text-navy-800 transition-colors"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-neutral-200 shadow-card overflow-hidden hover:shadow-xl hover:shadow-navy-600/5 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-neutral-700">
                    {p.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-navy-500 text-white text-xs font-semibold">
                    {p.return}/thn
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-neutral-800 mb-1">{p.name}</h3>
                <div className="flex items-center gap-1 text-sm text-neutral-500 mb-4">
                  <MapPin size={14} />
                  {p.location}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-neutral-400">Mulai dari</p>
                    <p className="text-lg font-bold text-navy-700">{p.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Imbal hasil</p>
                    <p className="text-sm font-semibold text-teal-700">{p.return}/thn</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Terkumpul</span>
                    <span className="font-semibold text-neutral-700">{p.funded}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-navy-500 to-navy-600 rounded-full transition-all"
                      style={{ width: `${p.funded}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-navy-700 font-semibold"
          >
            Lihat Semua Properti <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============ HOW IT WORKS ============
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Daftar & Verifikasi', desc: 'Buat akun gratis dan verifikasi KYC dalam 5 menit' },
    { num: '02', title: 'Pilih Properti', desc: 'Jelajahi marketplace dan pilih properti syariah favorit' },
    { num: '03', title: 'Beli Token', desc: 'Investasi mulai dari Rp 10.000 per token' },
    { num: '04', title: 'Terima Return', desc: 'Dapatkan distribusi sewa setiap bulan otomatis' },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy-100 text-navy-700 text-xs font-semibold mb-4">
            CARA KERJA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">Mulai Investasi dalam 4 Langkah</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-neutral-100" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-navy-600/20">
                <span className="text-xl font-bold text-white">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS ============
function Testimonials() {
  const testimonials = [
    {
      name: 'Siti Aminah',
      role: 'Guru SD',
      text: 'Saya bisa investasi properti dengan modal kecil. Sekarang punya token di 3 properti berbeda.',
      avatar: 'S',
    },
    {
      name: 'Ahmad Fauzi',
      role: 'Pegawai Swasta',
      text: 'Return konsisten tiap bulan. Platformnya transparan, bisa cek smart contract langsung.',
      avatar: 'A',
    },
    {
      name: 'Dewi Kusuma',
      role: 'Ibu Rumah Tangga',
      text: 'Auto-zakatnya sangat membantu. Zakat otomatis terpotong dari return, praktis!',
      avatar: 'D',
    },
  ]

  return (
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy-100 text-navy-700 text-xs font-semibold mb-4">
            TESTIMONI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">Apa Kata Investor?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-champagne-400 fill-champagne-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ CTA SECTION ============
function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-600 to-navy-800" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap Mulai Investasi Syariah?
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
          Bergabung dengan 1.240+ investor yang sudah mempercayakan investasi properti mereka di ASETARA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all shadow-lg"
          >
            Daftar Gratis
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
          >
            Masuk Akun
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <a href="/" className="inline-block bg-white rounded-xl px-3 py-2"><Logo size={150} variant="horizontal" /></a>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy-900 text-champagne-300 border border-navy-700">Prototype</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Platform akses finansial: edukasi, perencanaan, perbandingan investasi, dan perlindungan.
              Membuka akses investasi properti syariah untuk semua kalangan.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-champagne-400 transition-colors">Marketplace</Link></li>
              <li><Link to="/login" className="hover:text-champagne-400 transition-colors">Dompet</Link></li>
              <li><Link to="/login" className="hover:text-champagne-400 transition-colors">Laporan</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-champagne-400 transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="text-xs">© 2026 ASETARA. Hak Cipta Dilindungi.</p>
            <div className="flex items-start gap-2">
              <span className="text-navy-500 text-lg">⚠️</span>
              <p className="text-xs text-neutral-300 max-w-md">
                <strong>Disclaimer:</strong> Platform ini adalah prototype untuk demonstrasi. 
                Semua transaksi bersifat simulasi. Jangan transfer dana ke rekening apapun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============ MAIN LANDING PAGE ============
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Logo size={150} variant="horizontal" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#fitur" className="text-sm text-neutral-600 hover:text-navy-700 transition-colors">Fitur</a>
              <a href="#properti" className="text-sm text-neutral-600 hover:text-navy-700 transition-colors">Properti</a>
              <a href="#kalkulator" className="text-sm text-neutral-600 hover:text-navy-700 transition-colors">Kalkulator</a>
              <a href="#cara-kerja" className="text-sm text-neutral-600 hover:text-navy-700 transition-colors">Cara Kerja</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-neutral-600 hover:text-navy-700 transition-colors">
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      
      <div id="fitur">
        <FeaturesSection />
      </div>
      
      <div id="properti">
        <PropertiesPreview />
      </div>
      
      <div id="kalkulator">
        <KalkulatorSection />
      </div>
      
      <div id="cara-kerja">
        <HowItWorks />
      </div>
      
      <Testimonials />
      <CTASection />
      <Footer />
      <FloatingAiAssistant />
    </div>
  )
}