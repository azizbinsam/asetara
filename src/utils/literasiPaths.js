// Tujuan tombol "kembali" bergantung pada asal materi: materi Properti Syariah dibuka dari hub
// Investasi Properti Syariah, materi lain dari halaman Literasi Keuangan.
export function getLiterasiHome(category) {
  if (category === 'properti') {
    return { to: '/investasi-syariah?tab=materi', label: 'Kembali ke Investasi Properti Syariah' }
  }
  return { to: '/literasi', label: 'Kembali ke Literasi Keuangan' }
}
