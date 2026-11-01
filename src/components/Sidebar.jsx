import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Store, Wallet, HandCoins, Settings,
  Bot, Leaf, FileBarChart, BookOpen, PiggyBank, Scale, ShieldCheck,
} from 'lucide-react'
import Logo from './Logo'

// Menu dikelompokkan supaya sidebar tetap rapi walau item-nya banyak.
const NAV_GROUPS = [
  {
    title: null,
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Beranda' },
    ],
  },
  {
    title: 'Belajar & Rencana',
    items: [
      { to: '/literasi', icon: BookOpen, label: 'Literasi Keuangan', matchPrefixes: ['/literasi'] },
      { to: '/perencanaan', icon: PiggyBank, label: 'Perencanaan Finansial' },
      { to: '/perbandingan', icon: Scale, label: 'Simulasi Investasi' },
      { to: '/akses-keamanan', icon: ShieldCheck, label: 'Akses & Keamanan' },
    ],
  },
  {
    title: 'Investasi',
    items: [
      { to: '/marketplace', icon: Store, label: 'Marketplace Properti', matchPrefixes: ['/marketplace', '/tokenisasi'] },
      { to: '/dompet', icon: Wallet, label: 'Dompet & Transaksi', matchPrefixes: ['/dompet', '/transaksi', '/sertifikat'] },
      { to: '/zakat', icon: HandCoins, label: 'Auto-Zakat' },
    ],
  },
  {
    title: 'Lainnya',
    items: [
      { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
      { to: '/dampak', icon: Leaf, label: 'Dampak Sosial' },
      { to: '/laporan', icon: FileBarChart, label: 'Laporan' },
      { to: '/akun', icon: Settings, label: 'Pengaturan', matchPrefixes: ['/akun'] },
    ],
  },
]

export default function Sidebar() {
  const location = useLocation()

  function isActive(item) {
    if (item.matchPrefixes) {
      return item.matchPrefixes.some((p) => location.pathname.startsWith(p))
    }
    return location.pathname === item.to
  }

  return (
    <aside className="w-60 shrink-0 bg-neutral-0 border-r border-neutral-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-neutral-200">
        <Logo size={170} variant="horizontal" />
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
            {group.title && (
              <p className="px-3 text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mb-1">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(item)
                      ? 'bg-navy-50 text-navy-700 border-l-[3px] border-navy-600'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 border-l-[3px] border-transparent'
                  }`}
                >
                  <item.icon
                    size={18}
                    className={isActive(item) ? 'text-navy-600' : 'text-neutral-400'}
                    strokeWidth={isActive(item) ? 2.5 : 2}
                  />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-neutral-200">
        <NavLink
          to="/akun"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-xs">
            S
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">Sinta Dewi</p>
            <p className="text-[11px] text-neutral-400 truncate">Investor</p>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}