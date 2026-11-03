import direktori from '../data/direktoriProyek.json'
import { formatRupiah, formatPercent, formatNumber } from './format'

// 11 informasi minimum (urutan sesuai deskripsi pemilik proyek).
// Isi tiap butir per proyek ada di src/data/direktoriProyek.json (field `informasi`).
export const INFO_ITEMS = [
  { key: 'legalitas', label: 'Legalitas penyedia' },
  { key: 'lokasiStatus', label: 'Lokasi dan status proyek' },
  { key: 'hakKepemilikan', label: 'Hak/kepemilikan investor' },
  { key: 'akad', label: 'Akad' },
  { key: 'modalBiaya', label: 'Modal dan biaya' },
  { key: 'pembagianHasil', label: 'Pembagian hasil' },
  { key: 'risiko', label: 'Risiko' },
  { key: 'jangkaWaktu', label: 'Jangka waktu' },
  { key: 'likuiditas', label: 'Likuiditas' },
  { key: 'mekanismeKeluar', label: 'Mekanisme pengalihan/keluar' },
  { key: 'jalurPengaduan', label: 'Jalur pengaduan' },
]

export const JENIS_LABEL = {
  langsung: 'Kepemilikan langsung',
  fraksional: 'Fraksional (token)',
}

export const KATEGORI_LABEL = {
  apartemen: 'Apartemen',
  vila: 'Vila',
  hotel: 'Hotel',
  rumah: 'Rumah',
  ruko: 'Ruko',
}

export const FRACTIONAL_WARNING =
  'Kepemilikan fraksional (token): hak hukum, pencatatan kepemilikan, pengelolaan aset, pembagian hasil, dan mekanisme keluar perlu ditelaah penasihat hukum dan ahli syariah sebelum kamu memutuskan.'

// Data proyek token mengikuti properties.json (nama, lokasi, kategori, foto, angka modal & estimasi),
// jadi perubahan dari halaman admin ikut terbawa. Proyek token yang dinonaktifkan/dihapus admin
// otomatis tidak tampil di direktori.
export function buildProjects(properties) {
  const byId = new Map(properties.map((p) => [p.id, p]))

  return direktori.projects.flatMap((entry) => {
    const property = entry.propertyId ? byId.get(entry.propertyId) : null
    if (entry.propertyId && !property) return []

    const items = INFO_ITEMS.map((def) => {
      const info = entry.informasi[def.key]
      return { ...def, ...info, rincian: withAutoRows(def.key, info.rincian, property) }
    })
    const lengkap = items.filter((i) => i.status === 'lengkap').length

    return [
      {
        id: entry.id,
        jenis: entry.jenis,
        fraksional: entry.jenis === 'fraksional',
        propertyId: entry.propertyId,
        nama: property ? property.name : entry.nama,
        lokasi: property ? property.location : entry.lokasi,
        kategori: property ? property.category : entry.kategori,
        gambar: property ? property.image : entry.gambar,
        ringkasan: property ? property.description : entry.ringkasan,
        modalAwal: property
          ? { label: 'Min. investasi', nilai: property.minInvestment }
          : entry.modalAwal,
        penyedia: entry.penyedia,
        akad: entry.akad,
        pemeriksaan: entry.pemeriksaan,
        items,
        lengkap,
        total: items.length,
        terverifikasi: lengkap === items.length,
      },
    ]
  })
}

// Baris otomatis dari data token, supaya angka di direktori selalu sama dengan Marketplace.
function withAutoRows(key, rincian, property) {
  if (!property) return rincian
  if (key === 'lokasiStatus') {
    return [...rincian, ['Penghimpunan token', `${property.fundingPercent || 0}% terkumpul`]]
  }
  if (key === 'modalBiaya') {
    return [
      ['Harga per token', formatRupiah(property.pricePerToken)],
      ['Minimum investasi', formatRupiah(property.minInvestment)],
      ['Total token', formatNumber(property.totalTokens)],
      ['Nilai aset', formatRupiah(property.totalAsset)],
      ...rincian,
    ]
  }
  if (key === 'pembagianHasil') {
    return [
      ['Estimasi imbal hasil', `${formatPercent(property.projectedReturnPercent)} per tahun (estimasi, tidak dijamin)`],
      ...rincian,
    ]
  }
  return rincian
}

export function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
