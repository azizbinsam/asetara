export const SUGGESTIONS = [
  'Bagaimana cara membeli token?',
  'Apa itu smart contract?',
  'Bagaimana perhitungan zakat?',
  'Risiko investasi apa saja?',
]

export const MOCK_RESPONSES = {
  'token': 'Tokenisasi properti adalah pembagian kepemilikan properti menjadi unit-unit digital (token) yang dapat dibeli oleh banyak investor. Setiap token mewakili bagian kepemilikan properti tersebut.',
  'beli': 'Untuk membeli token: 1) Pilih properti di Marketplace, 2) Klik "Beli Token", 3) Masukkan nominal investasi, 4) Konfirmasi pembelian. Minimum investasi bervariasi per properti.',
  'smart contract': 'Smart contract adalah program otomatis di blockchain yang mengeksekusi transaksi tanpa perantara. Di ASETARA, smart contract mengatur pembagian keuntungan dan kepemilikan token.',
  'zakat': 'Auto-Zakat di ASETARA menghitung zakat harta (2,5%) secara otomatis setiap tahun haul. Zakat dipotong dari distribusi sewa dan disalurkan ke lembaga amil zakat mitra.',
  'risiko': 'Risiko investasi di ASETARA: 1) Risiko pasar properti, 2) Risiko likuiditas (penjualan token terbatas), 3) Risiko regulasi, 4) Risiko teknologi blockchain. Pastikan memahami sebelum investasi.',
  'default': 'Terima kasih atas pertanyaannya. Saya adalah AI Assistant ASETARA yang dapat membantu Anda memahami tokenisasi properti syariah. Silakan tanyakan tentang: cara beli token, smart contract, zakat, atau strategi investasi.',
}

export function getMockResponse(input) {
  const lower = input.toLowerCase()
  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) return response
  }
  return MOCK_RESPONSES.default
}