// Logika Smart Investment Comparison (ilustrasi, bukan nasihat keuangan).

export const MAX_COMPARE = 3
export const MIN_COMPARE = 2

export const PRIORITIES = [
  { id: 'risiko', label: 'Risiko paling rendah' },
  { id: 'hasil', label: 'Potensi hasil tertinggi' },
  { id: 'modal', label: 'Modal awal terkecil' },
]

const RISK_RANK = { rendah: 1, sedang: 2, tinggi: 3 }
const midReturn = (p) => (p.returnMin + p.returnMax) / 2

// Urutan pembanding per prioritas; seri dipecah dengan kriteria berikutnya.
const COMPARATORS = {
  risiko: (a, b) => RISK_RANK[a.risk] - RISK_RANK[b.risk] || midReturn(b) - midReturn(a) || a.minCapital - b.minCapital,
  hasil: (a, b) => midReturn(b) - midReturn(a) || RISK_RANK[a.risk] - RISK_RANK[b.risk] || a.minCapital - b.minCapital,
  modal: (a, b) => a.minCapital - b.minCapital || RISK_RANK[a.risk] - RISK_RANK[b.risk] || midReturn(b) - midReturn(a),
}

export function pickBest(products, priority) {
  if (products.length === 0) return null
  return [...products].sort(COMPARATORS[priority])[0]
}

export function formatRange(min, max, suffix = '%') {
  const fmt = (n) => String(n).replace('.', ',')
  return min === max ? `${fmt(min)}${suffix}` : `${fmt(min)}–${fmt(max)}${suffix}`
}

// Ringkas nominal: 21000000 -> "Rp21 jt", 1500000000 -> "Rp1,5 M"
export function formatCompactRupiah(value) {
  const fmt = (n) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(n)
  if (value >= 1e9) return `Rp${fmt(value / 1e9)} M`
  if (value >= 1e6) return `Rp${fmt(value / 1e6)} jt`
  return `Rp${fmt(value)}`
}

export function yearlyReturnRange(p) {
  return [(p.minCapital * p.returnMin) / 100, (p.minCapital * p.returnMax) / 100]
}

export function recommendationReason(product, priority) {
  const range = formatRange(product.returnMin, product.returnMax)
  if (priority === 'risiko') {
    return `${product.name} berisiko ${product.risk} dengan potensi hasil ${range} per tahun, paling cocok untuk prioritas risiko terendah di antara pilihanmu.`
  }
  if (priority === 'hasil') {
    return `${product.name} punya potensi hasil ${range} per tahun, rata-rata tertinggi di antara pilihanmu (risiko ${product.risk}).`
  }
  return `${product.name} butuh modal awal paling kecil di antara pilihanmu, dengan risiko ${product.risk} dan potensi hasil ${range} per tahun.`
}
