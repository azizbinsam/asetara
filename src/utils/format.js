export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value) {
  return `${value.toFixed(2).replace('.', ',')}%`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}

// Detik -> "m:ss" (mis. 320 -> "5:20")
export function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
