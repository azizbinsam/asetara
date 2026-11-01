import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Camera, Shield, Bell, Moon, FileText, HelpCircle, LogOut, ChevronRight, Award, BarChart3, FileBarChart } from 'lucide-react'
import { useAuth } from '../context/authStore'
import { toast } from '../components/toastStore'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'

const MENU_SECTIONS = [
  {
    title: 'Akun',
    items: [
      { icon: Camera, label: 'Foto Profil', action: 'upload' },
      { icon: Shield, label: 'Keamanan & 2FA', to: '#' },
      { icon: Bell, label: 'Notifikasi', to: '#' },
    ],
  },
  {
    title: 'Preferensi',
    items: [
      { icon: Moon, label: 'Mode Gelap', toggle: true },
      { icon: FileText, label: 'Bahasa', value: 'Bahasa Indonesia' },
    ],
  },
  {
    title: 'Bantuan',
    items: [
      { icon: HelpCircle, label: 'Pusat Bantuan', to: '#' },
      { icon: FileText, label: 'Syarat & Ketentuan', to: '#' },
    ],
  },
  {
    title: 'Lainnya',
    items: [
      { icon: Award, label: 'Sertifikat Kepemilikan (NFT)', to: '/sertifikat' },
      { icon: BarChart3, label: 'Dampak Investasi', to: '/dampak' },
      { icon: FileBarChart, label: 'Laporan & Transparansi', to: '/laporan' },
    ],
  },
]

export default function Akun() {
  const navigate = useNavigate()
  const { user, logout, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [saving, setSaving] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const fileInputRef = useRef(null)

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      updateProfile({ name, email, phone })
      toast('Profil berhasil diperbarui', 'success')
      setSaving(false)
    }, 600)
  }

  function handleLogout() {
    logout()
    toast('Anda telah keluar', 'info')
    navigate('/login', { replace: true })
  }

  function handlePhotoClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result })
        toast('Foto profil diperbarui', 'success')
      }
      reader.readAsDataURL(file)
    }
  }

  const hasChanges = name !== (user?.name || '') || email !== (user?.email || '') || phone !== (user?.phone || '')

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Pengaturan</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Pengaturan</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          {/* Kolom kiri: profil & form */}
          <div>
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handlePhotoClick}
                className="relative w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 text-2xl font-bold overflow-hidden group"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  (user?.name || 'U').charAt(0).toUpperCase()
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={20} className="text-white" />
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div>
                <p className="text-lg font-bold text-neutral-800">{user?.name || 'User'}</p>
                <p className="text-sm text-neutral-500">{user?.email || ''}</p>
                <Badge variant="success" className="mt-1 text-[10px]">
                  {user?.kycStatus || 'Terverifikasi'}
                </Badge>
              </div>
            </div>

            {/* Form */}
            <Card variant="default">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1.5">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 "
                    className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
                  />
                </div>
              </div>
              <Button
                variant="primary"
                className="w-full mt-4"
                disabled={!hasChanges || saving}
                onClick={handleSave}
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </Card>
          </div>

          {/* Kolom kanan: menu & logout */}
          <div className="mt-6 lg:mt-0">
            {MENU_SECTIONS.map((section) => (
              <div key={section.title} className="mb-6">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2 px-1">
                  {section.title}
                </p>
                <Card padding="sm">
                  <div className="divide-y divide-neutral-100">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-neutral-50 transition-colors"
                        onClick={
                          item.action === 'upload'
                            ? handlePhotoClick
                            : item.to && item.to !== '#'
                            ? () => navigate(item.to)
                            : undefined
                        }
                      >
                        <item.icon size={18} className="text-neutral-500" />
                        <span className="flex-1 text-sm text-neutral-700">{item.label}</span>
                        {item.toggle ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); setDarkMode(!darkMode) }}
                            className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-navy-600' : 'bg-neutral-300'}`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                          </button>
                        ) : item.value ? (
                          <span className="text-xs text-neutral-500">{item.value}</span>
                        ) : (
                          <ChevronRight size={16} className="text-neutral-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}

            {/* Logout */}
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" /> Keluar Akun
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}