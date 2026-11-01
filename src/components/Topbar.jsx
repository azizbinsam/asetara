import { Search, Bell, LogOut, Shield } from 'lucide-react'
import { useAuth } from '../context/authStore'
import { useNavigate } from 'react-router-dom'
import { toast } from '../components/toastStore'

export default function Topbar() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    toast('Anda telah keluar dari akun', 'info')
    navigate('/', { replace: true })
  }

  return (
    <>
      {/* Admin viewing user banner */}
      {isAdmin && (
        <div className="bg-navy-600 text-white text-xs px-4 py-1.5 flex items-center justify-center gap-2">
          <Shield size={14} />
          <span>Anda login sebagai Admin, sedang melihat tampilan User</span>
        </div>
      )}
      <header className="h-16 border-b border-neutral-200 bg-neutral-0 flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-2 text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 w-72">
          <Search size={16} />
          <span className="text-sm">Cari materi, artikel, atau topik</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-neutral-500 hover:text-navy-600 relative">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-neutral-800">{user?.name || 'Guest'}</p>
              <p className="text-[11px] text-neutral-400">{isAdmin ? 'Administrator' : 'Investor'}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center text-white text-sm font-semibold">
              {(user?.name || 'G').charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="text-neutral-400 hover:text-red-500 transition-colors"
              title="Keluar"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}