import literasiData from '../data/literasi.json'

// Jawaban mock AI Assistant INKLUSARA (tanpa backend). Semua angka bersifat ilustrasi.
// Tambah topik baru dengan menambah satu objek di INTENTS; urutan = prioritas
// (topik yang lebih spesifik harus di atas). `link` opsional: tombol tautan di bawah jawaban.

export const GREETING =
  'Halo! Saya AI Assistant INKLUSARA. Saya bisa membantu seputar literasi keuangan, kesiapan finansial, perbandingan investasi, mengenali penipuan, dan properti syariah. Mau mulai dari mana?'

export const SUGGESTIONS = [
  'Apakah saya siap berinvestasi?',
  'Berapa dana darurat yang ideal?',
  'Bagaimana mengenali investasi bodong?',
  'Bagaimana membandingkan investasi?',
  'Apa arti proyek Terverifikasi?',
  'Apa itu akad Murabahah dan Ijarah?',
  'Bagaimana cara membeli token?',
]

const INTENTS = [
  {
    id: 'direktori',
    keywords: ['direktori', 'terverifikasi', 'informasi minimum', '11 informasi', 'verified'],
    text: '"Terverifikasi" di Direktori Proyek berarti 11 informasi minimum proyek sudah tersedia: legalitas penyedia, lokasi dan status, hak investor, akad, modal dan biaya, pembagian hasil, risiko, jangka waktu, likuiditas, mekanisme keluar, dan jalur pengaduan. Ini pemeriksaan awal kelengkapan, bukan fatwa, bukan penilaian kepatuhan syariah, bukan jaminan hasil, dan bukan rekomendasi investasi. Proyek yang informasinya kurang tetap ditampilkan dengan status "Perlu dilengkapi".',
    link: { to: '/investasi-syariah?tab=direktori', label: 'Buka Direktori Proyek' },
  },
  {
    id: 'akad',
    keywords: ['akad', 'murabahah', 'ijarah', 'istishna', 'musyarakah', 'mudharabah'],
    text: 'Akad adalah kesepakatan yang menentukan hak dan kewajiban kedua pihak. Contoh yang umum di properti: Murabahah (jual beli, harga pokok dan margin disepakati di awal), Ijarah (sewa atas manfaat properti), Istishna\' (pesan-bangun dengan bayar bertahap), dan Musyarakah (kemitraan modal). Penyedia yang menyebut akad tertentu belum tentu sesuai syariah; INKLUSARA tidak menilai itu, jadi telaah ahli syariah tetap penting.',
    link: { to: '/literasi/akad-properti-syariah', label: 'Baca materi Akad' },
  },
  {
    id: 'fraksional',
    keywords: ['fraksional', 'kepemilikan bersama', 'patungan'],
    text: 'Kepemilikan fraksional (token) berarti kamu memegang sebagian kepemilikan bersama atas aset. Hak hukum, pencatatan kepemilikan, pengelolaan aset, pembagian hasil, dan mekanisme keluarnya perlu ditelaah penasihat hukum dan ahli syariah sebelum kamu memutuskan. Token juga tidak bisa dicairkan kapan saja, dan imbal hasil hanya estimasi.',
    link: { to: '/literasi/hak-kepemilikan-properti', label: 'Baca materi Hak Kepemilikan' },
  },
  {
    id: 'pengaduan',
    keywords: ['pengaduan', 'keluhan', 'komplain'],
    text: 'Setiap proyek di Direktori memuat jalur pengaduan bertahap: ke penyedia lebih dulu, lalu lembaga yang berwenang. Untuk layanan keuangan berizin kamu bisa menghubungi Kontak OJK 157, tetapi kewenangan lembaga bergantung pada jenis dan izin penyelenggara, jadi tanyakan dulu sebelum berinvestasi.',
    link: { to: '/akses-keamanan', label: 'Buka Akses & Keamanan' },
  },
  {
    id: 'penipuan',
    keywords: ['penipuan', 'tipu', 'scam', 'bodong', 'phishing', 'otp', 'waspada'],
    text: 'Beberapa tanda bahaya penipuan investasi: menjanjikan untung tinggi, pasti, dan cepat; mendesak kamu segera transfer; atau meminta PIN, kata sandi, dan OTP. Jangan pernah membagikan PIN, kata sandi, atau OTP kepada siapa pun, dan periksa legalitas penyedia lewat kanal resmi sebelum menyetor uang. Halaman Akses & Keamanan memuat tips lengkap dan kanal untuk melapor.',
    link: { to: '/akses-keamanan', label: 'Buka Akses & Keamanan' },
  },
  {
    id: 'legalitas',
    keywords: ['legal', 'izin', 'ojk', 'resmi', 'terdaftar', 'diawasi', 'lapor'],
    text: 'Sebelum berinvestasi, pastikan penyedia layanan punya izin dari lembaga yang berwenang dan cek lewat kanal resmi lembaganya, bukan hanya dari klaim penyedia. Izin yang "sedang diurus" belum berarti legal. Perlu diingat, INKLUSARA saat ini adalah prototype dengan data contoh. Halaman Akses & Keamanan merangkum lembaga resmi, cara mengecek legalitas, dan kanal pengaduan.',
    link: { to: '/akses-keamanan', label: 'Cek Legalitas & Lapor' },
  },
  {
    id: 'properti-syariah',
    keywords: ['properti syariah', 'investasi properti', 'syariah properti'],
    text: 'Investasi Properti Syariah di INKLUSARA punya dua bagian: Materi Edukasi (dasar, akad, hak kepemilikan, dan cara membaca informasi proyek) dan Direktori Proyek. Alurnya: pelajari dulu, cek 11 informasi minimum proyek, lalu baru pertimbangkan investasi. Semua data proyek di prototype ini adalah ilustrasi, bukan penawaran investasi.',
    link: { to: '/investasi-syariah', label: 'Buka Investasi Properti Syariah' },
  },
  {
    id: 'darurat',
    keywords: ['darurat'],
    text: 'Dana darurat ideal di simulator INKLUSARA adalah 6 kali pengeluaran bulanan. Contoh: pengeluaran Rp3 juta per bulan berarti targetnya Rp18 juta. Angka ini ilustrasi, bukan nasihat keuangan; kebutuhan tiap orang bisa berbeda. Kamu bisa membaca materinya atau menghitung kondisimu di Perencanaan.',
    link: { to: '/literasi/dana-darurat', label: 'Baca materi Dana Darurat' },
  },
  {
    id: 'kesiapan',
    keywords: ['skor', 'kesiapan', 'siap investasi', 'siap berinvestasi', 'perencanaan', 'simulator', 'sisihkan'],
    text: 'Skor kesiapan di Perencanaan dihitung dari tiga hal: rasio tabungan (40%, targetnya 20% dari penghasilan), kecukupan dana tersedia terhadap 6 bulan pengeluaran (40%), dan pengeluaran yang tidak melebihi 70% penghasilan (20%). Skor 60 ke atas berarti Siap, 40–59 Hampir siap, dan di bawah 40 Perlu persiapan. Ini ilustrasi berdasarkan rumus sederhana, bukan nasihat keuangan.',
    link: { to: '/perencanaan', label: 'Hitung kesiapanmu' },
  },
  {
    id: 'reksadana-sukuk',
    keywords: ['reksa dana', 'reksadana', 'sukuk'],
    text: 'Reksa Dana dan Sukuk sudah ada sebagai tab di halaman Perbandingan Investasi, tetapi masih berstatus "Segera hadir". Saat ini yang bisa dibandingkan baru Properti Syariah.',
    link: { to: '/perbandingan', label: 'Buka Perbandingan Investasi' },
  },
  {
    id: 'perbandingan',
    keywords: ['banding', 'apartemen', 'ruko', 'rumah syariah', 'mana yang'],
    text: 'Di Perbandingan Investasi kamu bisa memilih 2–3 produk properti syariah, lalu melihat perbedaan risiko, modal, dan ilustrasi potensi hasilnya. Pilih prioritasmu (risiko terendah, hasil tertinggi, atau modal terkecil) dan INKLUSARA akan menyarankan satu produk. Angka yang tampil adalah data ilustrasi, bukan jaminan hasil.',
    link: { to: '/perbandingan', label: 'Bandingkan Investasi' },
  },
  {
    id: 'risiko',
    keywords: ['risiko'],
    text: 'Risiko yang perlu dipahami sebelum berinvestasi: 1) risiko pasar properti, 2) risiko likuiditas (penjualan token terbatas), 3) risiko regulasi, 4) risiko teknologi. Semakin tinggi potensi hasil, biasanya semakin tinggi pula risikonya. Pastikan kamu memahaminya sebelum berinvestasi.',
    link: { to: '/literasi/risiko-keuangan', label: 'Baca materi Risiko Keuangan' },
  },
  {
    id: 'belajar',
    keywords: ['belajar', 'materi', 'literasi', 'kuis', 'pemula', 'dasar investasi', 'dasar keuangan'],
    text: `Literasi Keuangan punya ${literasiData.materials.length} materi singkat, antara lain Cara Mengatur Keuangan, Dana Darurat, Dasar Investasi, Investasi Syariah untuk Pemula, Risiko Keuangan, dan Keamanan Transaksi Digital, serta materi Properti Syariah di halaman Investasi Properti Syariah. Setiap materi dilengkapi kuis beserta pembahasan.`,
    link: { to: '/literasi', label: 'Mulai Belajar' },
  },
  {
    id: 'smart-contract',
    keywords: ['smart contract'],
    text: 'Smart contract adalah program otomatis di blockchain yang menjalankan aturan transaksi tanpa perantara. Pada fitur token INKLUSARA, konsep ini dipakai untuk mengatur pembagian hasil dan kepemilikan token. Catatan: di prototype ini semuanya disimulasikan dengan data contoh.',
  },
  {
    id: 'zakat',
    keywords: ['zakat'],
    text: 'Auto-Zakat menghitung zakat harta (2,5%) secara otomatis setiap tahun haul. Zakat dipotong dari distribusi sewa dan disalurkan ke lembaga amil zakat mitra. Di prototype ini prosesnya disimulasikan.',
    link: { to: '/zakat', label: 'Buka Auto-Zakat' },
  },
  {
    id: 'beli',
    keywords: ['beli', 'membeli', 'mulai investasi', 'cara investasi'],
    text: 'Untuk membeli token: 1) Pilih properti di Marketplace, 2) Klik "Beli Token", 3) Masukkan nominal investasi, 4) Konfirmasi pembelian. Minimum investasi bervariasi per properti. Sebelum membeli, sebaiknya pelajari materi properti syariah, cek 11 informasi minimum proyek di Direktori, lalu cek kesiapan finansialmu dan bandingkan pilihan yang ada.',
    link: { to: '/marketplace', label: 'Jelajahi Marketplace' },
  },
  {
    id: 'token',
    keywords: ['token'],
    text: 'Tokenisasi properti adalah pembagian kepemilikan properti menjadi unit-unit digital (token) yang dapat dibeli oleh banyak investor. Setiap token mewakili bagian kepemilikan properti tersebut.',
    link: { to: '/marketplace', label: 'Jelajahi Marketplace' },
  },
]

const DEFAULT_RESPONSE = {
  text: 'Terima kasih atas pertanyaannya. Saya bisa membantu seputar: literasi keuangan, kesiapan finansial (dana darurat dan skor), perbandingan investasi, mengenali penipuan dan cek legalitas, properti syariah (materi, akad, dan direktori proyek), serta cara kerja token, zakat, dan marketplace. Coba tanyakan salah satunya.',
  link: null,
}

const GREETING_PATTERN = /^(halo|hai|hi|hello|selamat)\b/

// Mengembalikan { text, link } — link berupa { to, label } atau null.
export function getMockResponse(input) {
  const lower = input.toLowerCase().trim()
  if (GREETING_PATTERN.test(lower) && lower.length <= 20) {
    return { text: GREETING, link: null }
  }
  const hit = INTENTS.find((intent) => intent.keywords.some((k) => lower.includes(k)))
  if (hit) return { text: hit.text, link: hit.link ?? null }
  return DEFAULT_RESPONSE
}

// Jeda "mengetik" berdasarkan panjang jawaban (deterministik, tanpa Math.random).
export function getTypingDelay(response) {
  return 600 + Math.min(response.text.length, 300) * 2
}
