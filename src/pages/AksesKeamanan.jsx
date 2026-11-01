import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, Search, ShieldCheck, Landmark, Users, ScrollText, Phone, MessageCircle, Mail,
  Globe, ExternalLink, AlertTriangle, ChevronDown, BadgeCheck, Info,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import NextSteps from '../components/NextSteps'
import data from '../data/aksesKeamanan.json'

const { categories, guides, providers, tips, reportChannels, reportPrep, reportUrgent, sources, disclaimer, verifiedAt } = data

const TABS = [
  { id: 'panduan', label: 'Panduan Layanan' },
  { id: 'legalitas', label: 'Legalitas Penyedia' },
  { id: 'edukasi', label: 'Edukasi & Tips' },
  { id: 'lapor', label: 'Lapor Penipuan' },
]

const PROVIDER_ICONS = { ojk: ShieldCheck, bi: Landmark, bpjstk: Users, bpkh: ScrollText }
const CONTACT_ICONS = { phone: Phone, whatsapp: MessageCircle, email: Mail, web: Globe }

function ProviderIcon({ id, size = 20 }) {
  const Icon = PROVIDER_ICONS[id] || ShieldCheck
  return <Icon size={size} className="text-navy-600" />
}

function ContactIcon({ kind }) {
  const Icon = CONTACT_ICONS[kind] || Globe
  return <Icon size={14} />
}

const isExternal = (href) => href.startsWith('http')

function ContactLink({ kind, label, href }) {
  return (
    <a
      href={href}
      {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-0 px-3 py-1.5 text-xs font-medium text-navy-700 hover:border-navy-300"
    >
      <ContactIcon kind={kind} />
      {label}
    </a>
  )
}

function formatDate(iso) {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
}

export default function AksesKeamanan() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('panduan')
  const [category, setCategory] = useState('semua')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const filteredGuides = guides.filter((g) => {
    const matchCategory = category === 'semua' || g.category === category
    const matchQuery =
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      g.steps.some((s) => s.toLowerCase().includes(q))
    return matchCategory && matchQuery
  })

  function handleSearch(value) {
    setQuery(value)
    if (value.trim()) setTab('panduan')
  }

  const ojk = providers.find((p) => p.id === 'ojk')

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600" aria-label="Kembali">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Akses & Keamanan</h1>
      </header>

      <div className="p-4 lg:p-0">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-1">Financial Access & Safety Hub</h1>
        <p className="text-sm text-neutral-600 mb-5">Akses layanan keuangan, lebih aman, lebih mudah.</p>

        {/* Pencarian topik */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cari topik: rekening, tabungan, investasi..."
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-neutral-200 bg-neutral-0 text-sm outline-none focus:border-navy-600"
          />
        </div>

        {/* Dua aksi cepat */}
        <div className="grid gap-3 sm:grid-cols-2 mb-5">
          <Card>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <BadgeCheck size={20} className="text-teal-600" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-neutral-800">Cek Legalitas Penyedia</p>
                <p className="text-sm text-neutral-600 mt-0.5">Pastikan penyedia layanan berizin sebelum memakainya.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <a
                    href="https://www.ojk.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-btn bg-navy-600 px-3 py-2 text-sm font-semibold text-white shadow-navyGlow transition-all duration-200 hover:bg-navy-700"
                  >
                    Cek di OJK <ExternalLink size={14} />
                  </a>
                  <Button size="sm" variant="outline" onClick={() => setTab('legalitas')}>
                    Lihat caranya
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-champagne-50 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-champagne-600" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-neutral-800">Waspada Penipuan</p>
                <p className="text-sm text-neutral-600 mt-0.5">Kenali modus penipuan dan tips agar tetap aman bertransaksi.</p>
                <div className="mt-3">
                  <Button size="sm" variant="outline" onClick={() => setTab('edukasi')}>
                    Pelajari Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tab */}
        <div role="tablist" className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                tab === t.id
                  ? 'bg-navy-600 text-white border-navy-600'
                  : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-navy-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panduan Layanan */}
        {tab === 'panduan' && (
          <div>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-4 px-4 lg:mx-0 lg:px-0">
              {[{ id: 'semua', label: 'Semua' }, ...categories].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  aria-pressed={category === c.id}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    category === c.id
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-neutral-0 text-neutral-600 border-neutral-200 hover:border-teal-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {filteredGuides.length === 0 ? (
              <Card>
                <p className="text-sm text-neutral-600 text-center py-6">
                  Belum ada panduan yang cocok. Coba kata kunci atau kategori lain.
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredGuides.map((g) => (
                  <Card key={g.id} padding="none">
                    <details className="group">
                      <summary className="flex items-center gap-3 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-neutral-800">{g.title}</p>
                          <p className="text-sm text-neutral-600 mt-0.5">{g.summary}</p>
                        </div>
                        <ChevronDown size={18} className="shrink-0 text-neutral-500 transition-transform group-open:rotate-180" />
                      </summary>
                      <ol className="px-4 pb-4 space-y-2 list-decimal list-inside text-sm text-neutral-700 border-t border-neutral-200 pt-3 marker:font-semibold marker:text-navy-600">
                        {g.steps.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                    </details>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Legalitas Penyedia */}
        {tab === 'legalitas' && (
          <div className="space-y-4">
            <Card>
              <p className="font-bold text-neutral-800">Cara cek legalitas lewat OJK</p>
              <ol className="mt-3 space-y-2 list-decimal list-inside text-sm text-neutral-700 marker:font-semibold marker:text-navy-600">
                <li>Hubungi Kontak OJK 157 atau WhatsApp 081-157-157-157, lalu tanyakan nama entitas atau produknya.</li>
                <li>Kunjungi situs ojk.go.id atau portal Sikapi Uangmu (Investor Alert Portal).</li>
                <li>Kirim pertanyaan lewat email ke konsumen@ojk.go.id.</li>
              </ol>
              <div className="flex flex-wrap gap-2 mt-4">
                {ojk.contacts.map((c) => (
                  <ContactLink key={c.label} {...c} />
                ))}
              </div>
            </Card>

            <p className="text-sm font-semibold text-neutral-700">Lembaga resmi yang bisa kamu rujuk</p>
            <div className="grid gap-3 lg:grid-cols-2">
              {providers.map((p) => (
                <Card key={p.id}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                      <ProviderIcon id={p.id} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-800">{p.name}</p>
                      <p className="text-sm text-neutral-600 mt-0.5">{p.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.contacts.map((c) => (
                      <ContactLink key={c.label} {...c} />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Edukasi & Tips */}
        {tab === 'edukasi' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {tips.map((t) => (
              <Card key={t.title}>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-champagne-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-neutral-800">{t.title}</p>
                    <p className="text-sm text-neutral-600 mt-1">{t.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Lapor Penipuan */}
        {tab === 'lapor' && (
          <div className="space-y-4">
            <div className="rounded-card bg-champagne-50 border border-champagne-200 p-4">
              <p className="font-bold text-neutral-800">Terlanjur jadi korban?</p>
              <p className="text-sm text-neutral-700 mt-1">{reportUrgent}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {reportChannels.map((c) => (
                <Card key={c.id}>
                  <p className="font-bold text-neutral-800">{c.name}</p>
                  <p className="text-sm text-neutral-600 mt-1">{c.desc}</p>
                  <div className="mt-3">
                    <ContactLink kind={c.href.startsWith('tel:') ? 'phone' : 'web'} label={c.label} href={c.href} />
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <p className="font-bold text-neutral-800">Siapkan sebelum melapor</p>
              <ul className="mt-2 space-y-1.5 text-sm text-neutral-700 list-disc list-inside marker:text-teal-600">
                {reportPrep.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        <NextSteps className="mt-6" steps={['literasi', 'perencanaan']} />

        {/* Sumber & disclaimer */}
        <div className="mt-6 flex items-start gap-2 text-xs text-neutral-500 px-1">
          <Info size={14} className="shrink-0 mt-0.5" />
          <div>
            <p>
              {disclaimer} Diverifikasi {formatDate(verifiedAt)}.
            </p>
            <p className="mt-1.5">
              Sumber:{' '}
              {sources.map((s, i) => (
                <span key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline text-navy-600">
                    {s.label}
                  </a>
                  {i < sources.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
