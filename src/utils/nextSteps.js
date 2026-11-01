import { BookOpen, PiggyBank, Scale, ShieldCheck, Store } from 'lucide-react'

// Katalog langkah lanjutan antar fitur ASETARA. Ubah teks/rute di sini;
// halaman cukup memanggil <NextSteps steps={['perencanaan', ...]} />.
export const NEXT_STEPS = {
  literasi: {
    to: '/literasi',
    icon: BookOpen,
    title: 'Belajar Literasi Keuangan',
    desc: 'Pahami dasar-dasar keuangan lewat materi singkat dan kuis.',
  },
  perencanaan: {
    to: '/perencanaan',
    icon: PiggyBank,
    title: 'Cek Kesiapan Finansial',
    desc: 'Hitung dana darurat dan skor kesiapanmu sebelum berinvestasi.',
  },
  perbandingan: {
    to: '/perbandingan',
    icon: Scale,
    title: 'Bandingkan Investasi',
    desc: 'Lihat perbedaan risiko, modal, dan potensi hasil antar produk.',
  },
  aksesKeamanan: {
    to: '/akses-keamanan',
    icon: ShieldCheck,
    title: 'Cek Legalitas & Waspada Penipuan',
    desc: 'Pastikan penyedia layanan resmi dan kenali modus penipuan.',
  },
  marketplace: {
    to: '/marketplace',
    icon: Store,
    title: 'Jelajahi Marketplace',
    desc: 'Lihat properti syariah yang bisa dimiliki lewat token.',
  },
}
