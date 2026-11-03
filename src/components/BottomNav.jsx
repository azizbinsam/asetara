import { NavLink, useLocation } from 'react-router-dom'
import { Home, BookOpen, Building2, Wallet, User } from 'lucide-react'

// 5 tab: Beranda · Edukasi · Investasi · Portofolio · Akun
// Fitur lain (Simulator, Perbandingan, Akses & Keamanan, Zakat, dll.)
// dibuka lewat kartu di halaman Beranda.
const NAV_ITEMS = [
  { to: '/dashboard', icon: Home, label: 'Beranda' },
  { to: '/literasi', icon: BookOpen, label: 'Edukasi' },
  { to: '/investasi-syariah', icon: Building2, label: 'Investasi', matchPrefixes: ['/investasi-syariah', '/marketplace', '/tokenisasi'] },
  { to: '/dompet', icon: Wallet, label: 'Portofolio', matchPrefixes: ['/dompet', '/transaksi', '/sertifikat'] },
  { to: '/akun', icon: User, label: 'Akun' },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  function isActive(item) {
    const prefixes = item.matchPrefixes || [item.to]
    return prefixes.some((p) => pathname.startsWith(p))
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-0 border-t border-neutral-200 shadow-[0_-2px_8px_rgba(23,36,46,0.06)] z-50">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item)
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full text-[11px] font-medium transition-colors ${
                active ? 'text-navy-600' : 'text-neutral-400'
              }`}
            >
              {active && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-champagne-500" />}
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
