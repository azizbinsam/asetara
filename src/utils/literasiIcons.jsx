import { Wallet, PiggyBank, TrendingUp, MoonStar, TriangleAlert, ShieldCheck, BookOpen, Building2 } from 'lucide-react'

// Ikon tiap kategori materi. Kunci = id kategori di src/data/literasi.json
const CATEGORY_ICONS = {
  dasar: Wallet,
  menabung: PiggyBank,
  investasi: TrendingUp,
  syariah: MoonStar,
  risiko: TriangleAlert,
  keamanan: ShieldCheck,
  properti: Building2,
}

// Komponen kecil agar halaman cukup menulis <CategoryIcon category="dasar" size={20} />
export function CategoryIcon({ category, ...props }) {
  const Icon = CATEGORY_ICONS[category] || BookOpen
  return <Icon {...props} />
}
