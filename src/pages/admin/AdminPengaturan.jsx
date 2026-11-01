import { useState } from 'react'
import { Save, Bell, Shield, Globe, Database } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { toast } from '../../components/Toast'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Badge from '../../components/Badge'

const SETTINGS_SECTIONS = [
  {
    id: 'general',
    icon: Globe,
    title: 'Pengaturan Umum',
    items: [
      { key: 'platformName', label: 'Nama Platform', value: 'ASETARA', type: 'text' },
      { key: 'maintenance', label: 'Mode Maintenance', value: false, type: 'toggle' },
      { key: 'registration', label: 'Buka Pendaftaran', value: true, type: 'toggle' },
    ],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Keamanan',
    items: [
      { key: '2fa', label: 'Wajib 2FA untuk Admin', value: false, type: 'toggle' },
      { key: 'session', label: 'Durasi Sesi (jam)', value: '24', type: 'text' },
    ],
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifikasi',
    items: [
      { key: 'emailNotif', label: 'Notifikasi Email', value: true, type: 'toggle' },
      { key: 'zakatAlert', label: 'Alert Zakat Bulanan', value: true, type: 'toggle' },
    ],
  },
  {
    id: 'system',
    icon: Database,
    title: 'Sistem',
    items: [
      { key: 'backup', label: 'Auto Backup Harian', value: true, type: 'toggle' },
      { key: 'logRetention', label: 'Retensi Log (hari)', value: '90', type: 'text' },
    ],
  },
]

export default function AdminPengaturan() {
  const { user } = useAuth()
  const [settings, setSettings] = useState(() => {
    const initial = {}
    SETTINGS_SECTIONS.forEach((section) => {
      section.items.forEach((item) => {
        initial[item.key] = item.value
      })
    })
    return initial
  })
  const [saving, setSaving] = useState(false)

  function handleChange(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      toast('Pengaturan berhasil disimpan', 'success')
      setSaving(false)
    }, 800)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-800 mb-6">Pengaturan Admin</h1>

      {/* Admin Profile */}
      <Card variant="default" className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-xl">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p className="font-semibold text-neutral-800">{user?.name || 'Admin'}</p>
            <p className="text-sm text-neutral-500">{user?.email || ''}</p>
            <Badge variant="success" className="mt-1 text-[10px]">Administrator</Badge>
          </div>
        </div>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-6">
        {SETTINGS_SECTIONS.map((section) => (
          <Card key={section.id} variant="default">
            <div className="flex items-center gap-2 mb-4">
              <section.icon size={18} className="text-navy-600" />
              <h2 className="text-sm font-bold text-neutral-700">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                  <span className="text-sm text-neutral-700">{item.label}</span>
                  {item.type === 'toggle' ? (
                    <button
                      onClick={() => handleChange(item.key, !settings[item.key])}
                      className={`w-11 h-6 rounded-full transition-colors ${settings[item.key] ? 'bg-navy-600' : 'bg-neutral-300'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${settings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  ) : (
                    <input
                      type="text"
                      value={settings[item.key]}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      className="w-32 h-9 px-3 rounded-lg border border-neutral-200 text-sm text-right outline-none focus:border-navy-600"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <Button
        variant="primary"
        className="w-full mt-6"
        disabled={saving}
        onClick={handleSave}
      >
        <Save size={16} className="mr-2" />
        {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
      </Button>
    </div>
  )
}