import { useLiteracy } from '../context/literacyStore'

// Soft gate Tahap 7d: "materi dasar" = semua materi kategori Properti Syariah di literasi.json
// (kini 4). Materi dihitung selesai setelah kuisnya dikerjakan, sama seperti di tab Materi.
// Ubah GATE_CATEGORY bila definisi materi dasar berubah.
export const GATE_CATEGORY = 'properti'

export function usePropertiLearning() {
  const { materials, getStatus } = useLiteracy()
  const items = materials.filter((m) => m.category === GATE_CATEGORY)
  const done = items.filter((m) => getStatus(m.id) === 'selesai').length
  return { done, total: items.length, complete: items.length > 0 && done === items.length }
}
