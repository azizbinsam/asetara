# HANDOFF: Catatan Proyek ASETARA

Dokumen ini dibuat agar pekerjaan bisa dilanjutkan di sesi/akun Claude lain tanpa kehilangan konteks.
**Perbarui file ini setiap selesai satu tahap** (cukup bagian "Status Tahap" dan "Keputusan").

## 1. Gambaran proyek
- **ASETARA** — "Akses Finansial Lebih Setara": edukasi, perencanaan, investasi, dan perlindungan keuangan.
- Prototype **frontend saja** (tanpa backend/blockchain asli). Semua data dummy (`src/data/*.json`).
- Basis kode berasal dari **PROPIN** (tokenisasi properti syariah). **Semua fitur lama PROPIN tetap dipertahankan** (Marketplace, Tokenisasi, Dompet, Zakat, Sertifikat NFT, Dampak, Laporan, AI Assistant, Admin).
- Fitur baru ASETARA ada di `docs/ASETARA-FEATURES.md` (4 fitur): Literasi Keuangan, Financial Readiness Simulator, Smart Investment Comparison, Financial Access & Safety Hub.
- Repo: https://github.com/azizbinsam/asetara — kerja langsung di branch **`main`** (tanpa branch tambahan). Deploy otomatis ke Vercel dari `main`.

## 2. Stack & perintah
React 19 · Vite · Tailwind CSS v3 · React Router 7 · Recharts · lucide-react.
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```
Lint (`npx eslint .`): Tahap 6c membersihkan temuan yang bisa dideteksi tanpa menjalankan eslint (import/variabel tak terpakai, export non-komponen di file `.jsx`, `setState` di dalam `useEffect`, `Date.now()`/`Math.random()` di `AiAssistant`). Jalankan `npx eslint .` dan perbaiki sisa temuan jika masih ada. Jangan menambah temuan baru.

## 3. Design system (WAJIB diikuti)
Token ada di `tailwind.config.js`. Jangan pakai warna bawaan Tailwind (blue/purple/emerald) kecuali merah untuk error.
| Token | Hex | Peran |
|---|---|---|
| `navy-600` | #263F50 | Warna utama (tombol, heading, nav aktif) |
| `teal-600` | #477C7C | Sekunder (progres, status positif); `teal-50` = Soft Sage |
| `champagne-500` | #C6A66A | Aksen (ikon pilar, bintang, highlight) |
| `cream` / `neutral-50` | #F7F4EC | Latar halaman |
| `neutral-0` | #FFFFFF | Kartu |
| `neutral-400..700` | #617078 … #35444F | Teks muted → teks utama (sudah lolos kontras 4.5:1) |

Aturan yang dipelajari dari audit visual:
- Kartu di atas latar krem harus **putih + `border-neutral-200` + shadow** (`<Card>` default). Jangan pakai `bg-neutral-50` untuk kartu di halaman (menyatu dengan latar). `Card variant="flat"` hanya untuk kotak "cekung" **di dalam** kartu putih.
- Teks muted pakai `text-neutral-500` ke atas untuk teks penting; `neutral-400` hanya untuk ikon/placeholder.
- Font: **Inter** saja. Logo: `<Logo variant="full | horizontal | icon" />` (file di `public/`).
- Pola halaman: mobile punya header sticky + tombol kembali (`lg:hidden`), desktop punya judul `h1` (`hidden lg:block`). Lihat `src/pages/Laporan.jsx`.

## 4. Navigasi
- Desktop: `src/components/Sidebar.jsx` (grup: Beranda · Belajar & Rencana · Investasi · Lainnya).
- Mobile: `src/components/BottomNav.jsx` — 5 tab: Beranda · Edukasi · **Investasi** · Portofolio · Akun (tab Investasi juga aktif di `/marketplace` dan `/tokenisasi/*`). Fitur lain dibuka lewat kartu "Mulai dari sini" dan menu cepat di `Dashboard.jsx`.
- Route fitur baru: `/literasi`, `/literasi/:materiId`, `/literasi/:materiId/kuis`, `/perencanaan`, `/perbandingan` (menu: "Perbandingan Produk"), `/akses-keamanan`, `/investasi-syariah`.

## 5. Status Tahap
| Tahap | Isi | Status |
|---|---|---|
| 1 | Rebrand PROPIN → ASETARA, token warna, logo, navigasi, 4 halaman placeholder | Selesai |
| 1b | Perapian: kartu menyatu, kontras teks, warna liar, grafik portofolio | Selesai |
| 2 | **Literasi Keuangan** (7 materi, 28 soal kuis, progres tersimpan, rekomendasi) | Selesai |
| 3 | **Financial Readiness Simulator** (`src/pages/Perencanaan.jsx`, rumus di `src/utils/readiness.js`) | Selesai (menunggu verifikasi di browser) |
| 4 | **Smart Investment Comparison** (`PerbandinganInvestasi.jsx`, data `perbandingan.json`, logika `utils/comparison.js`) | Selesai (menunggu verifikasi di browser) |
| 5 | **Financial Access & Safety Hub** (`AksesKeamanan.jsx`, data `aksesKeamanan.json`) | Selesai (menunggu verifikasi di browser) |
| 6a | Penyambung antar fitur (`NextSteps`) + rapikan teks tokenisasi di Landing/Dampak | Selesai (menunggu verifikasi di browser) |
| 6b | Update AI Assistant: saran & jawaban mock untuk fitur ASETARA, tab video bertema ASETARA | Selesai (menunggu verifikasi di browser) |
| 6c | Bersihkan lint (import tak terpakai, fast refresh, set-state-in-effect) & hapus file/aset tak terpakai | Selesai (menunggu verifikasi `npm run build` + `npx eslint .`) |
| 7a–7d | **Sharia Property Investment Learning & Directory** — rincian lengkap di `docs/SHARIA-PROPERTY-LEARNING-DIRECTORY.md` | 7a selesai (menunggu verifikasi), 7b–7d menunggu |

### Struktur Tahap 2 (Literasi)
- Data: `src/data/literasi.json` (kategori, materi, soal). Edit isi materi/soal di sini tanpa menyentuh kode.
- State: `src/context/LiteracyContext.jsx` (Provider) + `src/context/literacyStore.js` (hook `useLiteracy`). Disimpan di `localStorage` kunci `asetara_literasi`.
- Halaman: `Literasi.jsx` (daftar+filter+cari), `LiterasiDetail.jsx`, `LiterasiKuis.jsx` (soal → hasil → ulasan → rekomendasi).
- Dashboard: kartu "Pahami" menampilkan `x/7 materi selesai`.

## 6. Keputusan yang sudah disepakati
1. Fitur lama **tidak dihapus**; fitur ASETARA bersifat tambahan.
2. Palette **lengkap** (navy/teal/champagne/cream/sage); font Inter.
3. Mobile 5 tab (lihat bagian 4).
4. Data perbandingan investasi **dipisah** dari data token (`properties.json`). Di halaman perbandingan beri kotak: *"Lewat token ASETARA, mulai dari Rp10.000"* sebagai penghubung ke marketplace.
5. Data mockup mobile vs desktop berbeda → pakai versi **desktop** sebagai acuan; tab investasi: Properti Syariah (aktif), Reksa Dana, **Sukuk** ("Segera hadir").
6. Klaim yang belum tentu benar (mis. "terdaftar & diawasi OJK", "pertama di Indonesia") **dihapus** dari teks. Info regulasi/OJK di Tahap 5 harus bersumber resmi dan diverifikasi, bukan dikarang. Semua angka hasil investasi diberi disclaimer "ilustrasi, bukan nasihat keuangan".
7. Sertifikat belajar di Literasi **ditunda** (hanya insight + rekomendasi), agar tidak bingung dengan Sertifikat Kepemilikan NFT.

### Struktur Tahap 3 (Simulator)
- Rumus & konstanta (50%, 20%, 6 bulan, 70%, ambang 60/40) ada di `src/utils/readiness.js`; ubah di sana tanpa menyentuh halaman.
- Halaman: `Perencanaan.jsx` (form Data Keuangan → lingkaran skor, dana disisihkan, rincian 3 faktor, rekomendasi). Input terakhir disimpan di `localStorage` kunci `asetara_perencanaan`.
- Status tiga tingkat: **Siap** (≥60), **Hampir siap** (40–59), **Perlu persiapan** (<40). Tingkat 40–59 adalah tambahan; mohon dikonfirmasi.
- Rekomendasi "Siap" menaut ke `/perbandingan` dan `/marketplace`; lainnya ke `/literasi`.
- Target keuangan saat ini hanya memengaruhi label dan info dana darurat ideal, belum memengaruhi skor.

### Struktur Tahap 4 (Perbandingan Investasi)
- Data: `src/data/perbandingan.json` (tab, 3 produk dari mockup desktop: Rumah Syariah/Apartemen/Ruko). Terpisah dari `properties.json`; rentang biaya dan hasil disimpan sebagai `min`/`max`.
- Logika: `src/utils/comparison.js` (maks. 3 / min. 2 produk, 3 prioritas: risiko terendah, hasil tertinggi, modal terkecil, dengan pemecah seri). Mudah ditambah produk di JSON tanpa mengubah kode.
- Halaman: tab (hanya Properti Syariah aktif; Reksa Dana dan Sukuk "Segera hadir") → kartu produk → tabel Detail Perbandingan → pilih prioritas → Rekomendasi → Simpan Pilihan / Lanjut ke Marketplace. State di `localStorage` kunci `asetara_perbandingan`.
- Kotak penghubung token mengambil nominal dari `minInvestment` terkecil di `properties.json` (kini Rp10.000).
- Kolom "Ilustrasi hasil per tahun" = modal awal × rentang potensi hasil. Biaya tambahan ditampilkan terpisah, tidak dikurangkan dari hasil (data belum menjelaskan apakah sekali bayar atau tahunan).

### Struktur Tahap 5 (Akses & Keamanan)
- Data: `src/data/aksesKeamanan.json` (kategori, 5 panduan, 4 lembaga resmi, tips, kanal lapor, sumber, `verifiedAt`). Semua konten tinggal diedit di JSON.
- Halaman: pencarian topik, dua kartu aksi (Cek Legalitas / Waspada Penipuan), 4 tab (Panduan Layanan, Legalitas Penyedia, Edukasi & Tips, Lapor Penipuan). Panduan memakai `<details>` bawaan browser.
- **Sumber diverifikasi 1 November 2026 lewat pencarian web ke situs resmi lembaga**: OJK (Kontak 157, WA 081-157-157-157, konsumen@ojk.go.id, sikapiuangmu.ojk.go.id, iasc.ojk.go.id, sipasti.ojk.go.id), Bank Indonesia (131, bicara@bi.go.id, bicara131.bi.go.id), BPJS Ketenagakerjaan (175, care@bpjsketenagakerjaan.go.id), BPKH (bpkh.go.id), Komdigi (cekrekening.id).
- Aturan: tidak ada angka statistik (jumlah entitas diblokir, dll.) karena cepat usang; tidak ada klaim "ASETARA terdaftar/diawasi OJK"; nomor telepon BPKH sengaja tidak dimuat karena berbeda-beda antar dokumen. Saat menambah kontak, verifikasi ke situs resmi dan perbarui `verifiedAt`.
- Logo lembaga tidak dipakai (hanya ikon + nama). Kategori "Asuransi" (mockup desktop) belum ada karena belum ada konten terverifikasi; kategori "Legalitas & Regulasi" (mockup mobile) dipakai.

### Struktur Tahap 6a (Penyambung antar fitur)
- Komponen `src/components/NextSteps.jsx` + katalog `src/utils/nextSteps.js` (kunci: `literasi`, `perencanaan`, `perbandingan`, `aksesKeamanan`, `marketplace`). Pakai: `<NextSteps steps={['perencanaan', 'aksesKeamanan']} />`; props opsional `title`, `className`. Teks/rute diubah di katalog, bukan di halaman.
- Dipasang di: akhir `Literasi`, layar hasil `LiterasiKuis`, hasil `Perencanaan` ("Sebelum berinvestasi" → Akses & Keamanan), `PerbandinganInvestasi` (→ Perencanaan, Akses & Keamanan), `AksesKeamanan` (→ Literasi, Perencanaan).
- Teks tokenisasi: kalimat "smart contract" / "teknologi blockchain" di hero & kartu Keunggulan `LandingPage.jsx` serta deskripsi `Dampak.jsx` diganti ke bahasa ASETARA ("kepemilikan digital yang transparan", "akses finansial yang lebih setara").
- Keputusan Aziz: **statistik (Rp 45M+, 1.240+ investor, 12 properti), imbal hasil 8–15%, dan klaim Dewan Pengawas Syariah di Landing/Dampak dibiarkan apa adanya.** Testimoni yang menyebut smart contract juga tidak diubah.
- Catatan line ending: working copy Windows memakai CRLF, repo LF; `git status` bisa menampilkan banyak file "modified" padahal isinya sama. Opsi: tambahkan `.gitattributes` berisi `* text=auto`.

### Struktur Tahap 6b (AI Assistant)
- Semua jawaban ada di `src/utils/aiResponses.js`: daftar `INTENTS` (urutan = prioritas, topik spesifik di atas), tiap topik punya `keywords`, `text`, dan `link` opsional `{ to, label }`. Tambah topik cukup dengan menambah satu objek. `getMockResponse(input)` kini mengembalikan **objek `{ text, link }`** (dulu string). Juga ada `GREETING`, `SUGGESTIONS`, dan `getTypingDelay`.
- Topik: penipuan, legalitas, dana darurat, skor kesiapan, Reksa Dana/Sukuk ("Segera hadir"), perbandingan, risiko, literasi, smart contract, zakat, cara beli token, token, sapaan, default. Angka di jawaban mengikuti `utils/readiness.js` (50/20/6 bulan/70%/ambang 60 dan 40); jika konstanta di sana diubah, perbarui teks jawaban kesiapan/dana darurat.
- Jawaban menampilkan tombol tautan ke halaman fitur. Di popup melayang (`FloatingAiAssistant`) tautan juga menutup popup.
- Perbaikan bug lama: kata kunci `token` dulu mengalahkan `beli` sehingga "cara membeli token?" dijawab definisi token; kini `beli` dicek lebih dulu. Klik kartu video dulu tidak berfungsi (`Card` tidak meneruskan `onClick`); kini dibungkus `<button>`.
- Tab Video Edukasi: 6 judul bertema ASETARA (mengikuti materi Literasi). Videonya masih contoh, jadi klik hanya memunculkan toast "segera hadir".
- `Date.now()`/`Math.random()` dihapus dari `AiAssistant.jsx` dan `FloatingAiAssistant.jsx` (id pesan pakai `useRef` counter, jeda ketik deterministik).
- Tooltip "Tanya AI Assistant, gratis!" pada tombol melayang belum diubah.

### Struktur Tahap 6c (Pembersihan)
- Import/variabel tak terpakai dihapus (PropertyCard, DompetTransaksi, AdminDashboard, AdminProperti, AdminInvestor, AdminZakat).
- Pemisahan store (lihat bagian 8): `authStore.js`, `propertiesStore.js`, `portfolioStore.js`, `toastStore.js`; ±30 file konsumen diubah path impornya.
- `AuthContext`: sesi dibaca sinkron lewat `useState(readStoredUser)` (bukan `useEffect` + `setUser`), sehingga `isLoading` selalu `false` (properti dipertahankan agar `ProtectedRoute`/`AdminRoute` tidak berubah).
- `AdminLayout`: drawer menutup otomatis saat pindah rute lewat state `openedAt` (pathname saat dibuka), bukan `useEffect`.
- Dihapus karena tidak pernah diimpor/dirutekan: `pages/Investasi.jsx`, `pages/TransaksiList.jsx`, `pages/Wallet.jsx`, `components/PlaceholderPage.jsx`, `src/assets/hero.png`, `src/assets/vite.svg`, `public/icons.svg`.
- Tooltip tombol AI melayang: ", gratis!" dihapus (klaim tak terverifikasi).
- Hasil nyata setelah push 6c: `npm run build` lolos; `npx eslint` awalnya 3 error (`password`/`reject` tak terpakai di `AuthContext`) + 1 warning (`exhaustive-deps` di `HeroSection`). Diperbaiki: `login(email)`/`register(name, email)` tanpa parameter password (validasi password tetap di form), dan `HERO_SLIDES` dipindah ke level modul.
- Belum dicek (butuh eslint sungguhan): aturan `react-hooks` lain (`static-components`, `refs`, `immutability`). `PortfolioProvider` masih memanggil `loadFromStorage()` setiap render (bukan temuan lint, bisa dioptimalkan nanti).

### Rumus Simulator (diimplementasikan di Tahap 3)
- Dana disisihkan per bulan = 50% × (penghasilan − pengeluaran)
- Skor kesiapan = 40% × min(rasio tabungan ÷ 20%, 1) + 40% × min(dana tersedia ÷ (6 × pengeluaran), 1) + 20% × (pengeluaran ≤ 70% penghasilan ? 1 : 0)
- Status "Siap" jika skor ≥ 60%. Rasio tabungan = (penghasilan − pengeluaran) ÷ penghasilan.
- Dengan input mockup (5jt/3jt/0,5jt dan 8jt/5jt/2jt) hasilnya ≈ 61% dan ≈ 63%.

## 7. Cara kerja dengan Claude
1. Claude mengerjakan satu tahap, menguji build + lint + alur di browser, lalu memberi **zip** file yang berubah.
2. Aziz mengekstrak zip ke `D:\Website\asetara` (timpa), `npm run dev` untuk cek, lalu:
   ```bash
   git add .
   git commit -m "pesan commit"
   git push
   ```
3. Aziz memberi kabar "sudah push" → Claude clone ulang `main` dan menganalisa sebelum tahap berikutnya.

## 8. Catatan teknis penting
- `tailwind.config.js`: skala `neutral` didefinisikan lengkap (0–900); jangan mengandalkan kelas netral yang tidak didefinisikan.
- Hindari `Date.now()`/`Math.random()` saat render (aturan lint `react-hooks/purity`); panggil di event handler.
- Hindari membuat komponen saat render (mis. `const Icon = fn()`); gunakan komponen kecil seperti `CategoryIcon` di `src/utils/literasiIcons.jsx`.
- Context + hook dipisah dari Provider agar fast refresh tidak error: `context/literacyStore.js`, `authStore.js`, `propertiesStore.js`, `portfolioStore.js`; fungsi `toast()` ada di `components/toastStore.js`. Impor hook/`toast` dari file *Store*, impor Provider/`ToastContainer` dari file komponennya. File `.jsx` hanya boleh mengekspor komponen.
- Gambar properti hero ada di `public/images/`; sebagian kartu properti memakai URL luar.
