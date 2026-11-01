import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { useProperties } from '../../context/PropertiesContext'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import { formatRupiah, formatPercent, formatNumber } from '../../utils/format'

const CATEGORY_OPTIONS = [
  { value: 'apartemen', label: 'Apartemen' },
  { value: 'vila', label: 'Vila' },
  { value: 'hotel', label: 'Hotel' },
]

const EMPTY_PROPERTY = {
  name: '',
  location: '',
  category: 'apartemen',
  totalAsset: 0,
  totalTokens: 1000000,
  pricePerToken: 10000,
  minInvestment: 10000,
  projectedReturnPercent: 10,
  fundingPercent: 0,
}

export default function AdminProperti() {
  const { properties, activeProperties, addProperty, updateProperty, togglePropertyStatus, deleteProperty } = useProperties()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_PROPERTY)

  const filtered = properties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (editingId) {
      updateProperty(editingId, form)
    } else {
      addProperty(form)
    }
    setShowForm(false)
    setEditingId(null)
    setForm(EMPTY_PROPERTY)
  }

  function handleEdit(property) {
    setForm({ ...property })
    setEditingId(property.id)
    setShowForm(true)
  }

  function handleAdd() {
    setForm(EMPTY_PROPERTY)
    setEditingId(null)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-neutral-800">Manajemen Properti</h1>
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={16} className="mr-1" /> Tambah Properti
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-neutral-800">{properties.length}</p>
          <p className="text-xs text-neutral-500">Total</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-teal-600">{activeProperties.length}</p>
          <p className="text-xs text-neutral-500">Aktif</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <p className="text-xl font-bold text-navy-600">{properties.length - activeProperties.length}</p>
          <p className="text-xs text-neutral-500">Nonaktif</p>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-neutral-0 border border-neutral-200 rounded-xl px-3 py-2.5 mb-4">
        <Search size={16} className="text-neutral-400" />
        <input
          type="text"
          placeholder="Cari properti..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none bg-transparent"
        />
      </div>

      {/* Form */}
      {showForm && (
        <Card variant="default" className="mb-6">
          <h2 className="text-sm font-bold text-neutral-700 mb-4">
            {editingId ? 'Edit Properti' : 'Tambah Properti Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Nama Properti</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full h-10 px-3 rounded-lg border border-neutral-200 text-sm outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Lokasi</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                className="w-full h-10 px-3 rounded-lg border border-neutral-200 text-sm outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-neutral-200 text-sm outline-none focus:border-navy-600"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Total Aset (Rp)</label>
              <input
                type="number"
                value={form.totalAsset}
                onChange={(e) => setForm({ ...form, totalAsset: Number(e.target.value) })}
                required
                className="w-full h-10 px-3 rounded-lg border border-neutral-200 text-sm outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Harga per Token (Rp)</label>
              <input
                type="number"
                value={form.pricePerToken}
                onChange={(e) => setForm({ ...form, pricePerToken: Number(e.target.value) })}
                required
                className="w-full h-10 px-3 rounded-lg border border-neutral-200 text-sm outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Min. Investasi (Rp)</label>
              <input
                type="number"
                value={form.minInvestment}
                onChange={(e) => setForm({ ...form, minInvestment: Number(e.target.value) })}
                required
                className="w-full h-10 px-3 rounded-lg border border-neutral-200 text-sm outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Return Proyeksi (%)</label>
              <input
                type="number"
                step="0.01"
                value={form.projectedReturnPercent}
                onChange={(e) => setForm({ ...form, projectedReturnPercent: Number(e.target.value) })}
                required
                className="w-full h-10 px-3 rounded-lg border border-neutral-200 text-sm outline-none focus:border-navy-600"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" variant="primary" className="flex-1">
                {editingId ? 'Simpan Perubahan' : 'Tambah Properti'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Batal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Table */}
      <Card padding="sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Properti</th>
                <th className="text-left py-3 px-3 font-semibold text-neutral-600">Kategori</th>
                <th className="text-right py-3 px-3 font-semibold text-neutral-600">Harga/Token</th>
                <th className="text-right py-3 px-3 font-semibold text-neutral-600">Return</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Status</th>
                <th className="text-center py-3 px-3 font-semibold text-neutral-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50">
                  <td className="py-3 px-3">
                    <p className="font-medium text-neutral-800">{p.name}</p>
                    <p className="text-xs text-neutral-500">{p.location}</p>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-navy-50 text-navy-700 capitalize">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium">{formatRupiah(p.pricePerToken)}</td>
                  <td className="py-3 px-3 text-right text-teal-600">{formatPercent(p.projectedReturnPercent)}</td>
                  <td className="py-3 px-3 text-center">
                    <Badge variant={p.status === 'Aktif' ? 'success' : 'neutral'}>
                      {p.status || 'Aktif'}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => togglePropertyStatus(p.id)} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500">
                        {p.status === 'Aktif' ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => deleteProperty(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-8">Tidak ada properti ditemukan.</p>
        )}
      </Card>
    </div>
  )
}