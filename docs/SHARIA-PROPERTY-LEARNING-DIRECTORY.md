# Sharia Property Investment Learning & Directory

Fitur ASETARA ke-5 (tambahan setelah 4 fitur di `ASETARA-FEATURES.md`). Mockup: hero "Investasi Properti Syariah Lebih Mudah, Lebih Terpercaya", dua tab (Materi Edukasi · Direktori Proyek), kartu materi Video/Artikel/Kuis, kartu proyek dengan badge Terverifikasi, banner transparansi.

## Deskripsi (dari pemilik proyek)
Materi investasi properti syariah dan direktori informasi proyek/penyedia yang telah melalui pemeriksaan awal.
Informasi minimum yang harus ada:
1. Legalitas penyedia
2. Lokasi dan status proyek
3. Hak/kepemilikan investor
4. Akad
5. Modal dan biaya
6. Pembagian hasil
7. Risiko
8. Jangka waktu
9. Likuiditas
10. Mekanisme pengalihan/keluar
11. Jalur pengaduan

Jika memakai kepemilikan bersama/fraksional: hak hukum, pencatatan kepemilikan, pengelolaan aset, pembagian hasil, dan mekanisme keluar **harus ditelaah penasihat hukum dan ahli syariah**.

## Posisi di alur
Pahami → Rencanakan → Bandingkan → **Pelajari properti syariah + cek direktori** → Investasi (Marketplace token) → Pantau.

## Keputusan yang disepakati
1. **"Terverifikasi" = pemeriksaan awal kelengkapan 11 informasi minimum**. Tiap butir berstatus Lengkap / Perlu dilengkapi. Bukan fatwa, bukan penilaian kepatuhan syariah, bukan jaminan hasil, bukan rekomendasi investasi. Semua data prototype adalah ilustrasi (beri label "Data ilustrasi").
2. Direktori memuat dua jenis proyek dengan label jelas: **Kepemilikan langsung** (mis. akad Murabahah) dan **Fraksional/token**. Proyek token yang sudah ada di `properties.json` ikut masuk dengan 11 informasi lengkap. Proyek fraksional selalu menampilkan peringatan "perlu telaah penasihat hukum dan ahli syariah".
3. Menu baru **Investasi Properti Syariah** (grup Investasi). Mobile: tab "Marketplace" → **"Investasi"** (aktif juga di `/marketplace` dan `/tokenisasi/*`). Marketplace token tetap ada. Label menu perbandingan: **"Perbandingan Produk"**. Tidak ada halaman "Simulasi Investasi" baru.
4. Imbal hasil ditulis sebagai **estimasi, tidak dijamin**, disertai mekanisme pembagian hasil.
5. Materi memakai mesin Literasi (kategori baru "Properti Syariah"): kartu Video, Artikel, Kuis. **Video asli tidak tersedia → kartu video dibuat dummy (diputuskan Aziz di 7b, menggantikan "Segera hadir"):** klik membuka pemutar simulasi dengan label "Video contoh". Isi materi akad/fraksional wajib ditinjau ahli syariah dan hukum; sampai itu terjadi, tiap materi menampilkan catatan "belum ditinjau" (field `notice` di `literasi.json`).
6. **Soft gate**: banner "Pelajari dulu" di Marketplace dan Detail Tokenisasi selama materi dasar belum selesai; bukan kunci keras.
7. Klaim di Landing "100% Syariah Compliant / screening Dewan Pengawas Syariah" disesuaikan dengan aturan nomor 1 (Tahap 7d).

## Tahap
| Tahap | Isi | Status |
|---|---|---|
| 7a | Hub `/investasi-syariah` (hero, tab, banner), navigasi baru | Selesai (menunggu verifikasi di browser) |
| 7b | Tab Materi Edukasi: materi + kuis properti syariah (`MateriTab.jsx`, data `literasi.json`), video dummy | Selesai (menunggu verifikasi di browser) |
| 7c | Tab Direktori Proyek: data, kartu, filter, halaman detail 11 informasi (`DirektoriTab.jsx`, `ProyekDetail.jsx`) | Selesai (menunggu verifikasi di browser) |
| 7d | Soft gate, penyambung antar fitur, AI Assistant, penyesuaian klaim Landing, HANDOFF | Berikutnya |

## Struktur kode (Tahap 7a)
- `src/pages/InvestasiSyariah.jsx` — hub. Tab disimpan di URL (`?tab=materi|direktori`).
- `src/pages/investasiSyariah/MateriTab.jsx` — selesai di 7b. `DirektoriTab.jsx` — placeholder pada 7a, diisi di 7c.
- Gambar hero memakai `/images/hero-apartment.jpg`. Foto mockup (rumah+koin, dokumen, timbangan, gedung) belum ada; taruh file di `public/images/` bila tersedia.

## Struktur kode (Tahap 7b)
- **Materi:** kategori baru `properti` ("Properti Syariah") di `src/data/literasi.json` dengan 4 materi (`dasar-properti-syariah`, `akad-properti-syariah`, `hak-kepemilikan-properti`, `membaca-informasi-proyek`), masing-masing 4 soal. Field opsional baru `notice` ditampilkan `LiterasiDetail.jsx` sebagai catatan "belum ditinjau ahli syariah/penasihat hukum". Materi ini juga muncul di `/literasi` (filter kategori) dan ikut progres/rekomendasi Literasi.
- **Tab Materi (`MateriTab.jsx`):** progres jalur belajar (materi dihitung selesai setelah kuisnya dikerjakan), filter Semua/Video/Artikel/Kuis, kartu Video (modal), Artikel (`/literasi/:id`), Kuis (`/literasi/:id/kuis`).
- **Video dummy:** data di `src/data/videoEdukasi.json` (`topic`: `properti` dipakai tab Materi, `umum` dipakai tab Video Edukasi AI Assistant; `thumbnail` boleh `null`; `materialId` opsional untuk tombol "Baca materinya"). Komponen `components/VideoDummyModal.jsx` = pemutar simulasi (thumbnail, waktu berjalan, slider, poin utama; Esc/klik latar menutup). Pasang dengan `key={video.id}`. Tidak ada berkas video; label "Video contoh" sengaja ditampilkan. Mengganti ke video sungguhan: tambah field URL di JSON dan ganti layar simulasi dengan `<video>` atau embed.
- **Gambar:** hanya foto stok yang sudah ada di `public/images/` (`hero-apartment/villa/hotel.jpg`) dipakai sebagai thumbnail; tidak ada gambar baru. Video `umum` memakai gradien.
- **Navigasi kembali:** `utils/literasiPaths.js` (`getLiterasiHome`) mengarahkan tombol kembali materi Properti Syariah ke `/investasi-syariah?tab=materi`, materi lain ke `/literasi`.
- AI Assistant: tab Video Edukasi kini membuka modal dummy yang sama (toast "segera hadir" dihapus); jawaban "materi literasi" memakai jumlah materi dari data. Intent AI khusus properti syariah menyusul di 7d.
## Struktur kode (Tahap 7c)
- **Data:** `src/data/direktoriProyek.json` — 10 proyek ilustrasi, tiap proyek punya `informasi` berisi 11 butir (`legalitas`, `lokasiStatus`, `hakKepemilikan`, `akad`, `modalBiaya`, `pembagianHasil`, `risiko`, `jangkaWaktu`, `likuiditas`, `mekanismeKeluar`, `jalurPengaduan`). Tiap butir: `status` (`lengkap` | `perlu`), `ringkas`, `rincian` (pasangan [label, nilai]), dan `catatan` (hanya bila `perlu`: apa yang belum ada). Daftar 11 butir + labelnya ada di `INFO_ITEMS` (`src/utils/direktori.js`).
- **Isi data:** 6 proyek **fraksional/token** (`propertyId` = id di `properties.json`, semua 11/11 lengkap) dan 4 proyek **kepemilikan langsung**: Perumahan Amanah Rangkasbitung (Murabahah, 11/11), Apartemen Studio Bekasi Barat (Murabahah, 11/11), Ruko Niaga Amanah Serang (Ijarah Muntahiya Bittamlik, 10/11), Rumah Indent Cikarang Syariah (Istishna', 8/11). Dua yang terakhir sengaja belum lengkap untuk memperlihatkan status "Perlu dilengkapi". Nama penyedia, angka, dan tanggal pemeriksaan semuanya rekaan.
- **Penggabungan:** `buildProjects(properties)` di `src/utils/direktori.js`. Proyek token mengambil nama, lokasi, kategori, foto, deskripsi, dan angka modal/estimasi imbal hasil dari `properties.json` (via `useProperties().activeProperties`), jadi angkanya selalu sama dengan Marketplace; baris otomatis disisipkan ke butir Lokasi/Status, Modal dan biaya, dan Pembagian hasil. Properti yang dinonaktifkan/dihapus admin otomatis hilang dari direktori. Properti baru dari admin **tidak** muncul sampai punya entri di `direktoriProyek.json`.
- **"Terverifikasi"** = `lengkap === 11`. Proyek dengan butir kurang tetap ditampilkan dengan badge "Perlu dilengkapi" (warna champagne, bukan merah).
- **Tab Direktori (`DirektoriTab.jsx`):** pencarian (nama/lokasi/penyedia/akad), filter jenis (Kepemilikan langsung / Fraksional), filter kategori (dibangun dari data), centang "Hanya yang 11 informasinya lengkap", penghitung hasil, keadaan kosong + reset. Kartu: `components/ProyekCard.jsx`. Badge status: `components/KelengkapanBadge.jsx`.
- **Halaman detail:** route `/investasi-syariah/proyek/:projectId` (`pages/investasiSyariah/ProyekDetail.jsx`). Berisi ringkasan, progres kelengkapan + navigasi cepat ke 11 butir, kotak catatan (bukan fatwa/jaminan/rekomendasi), peringatan telaah penasihat hukum & ahli syariah (`FRACTIONAL_WARNING`) khusus proyek fraksional, 11 kartu informasi, dan langkah berikutnya (materi "Membaca Informasi Proyek", Akses & Keamanan, tautan ke `/marketplace/:id` untuk proyek token). Tombol kembali ke `/investasi-syariah?tab=direktori`. Tab Investasi di mobile dan menu Sidebar otomatis aktif karena prefix `/investasi-syariah`.
- **Gambar:** proyek token memakai foto dari `properties.json`; proyek langsung memakai gradien per kategori (tidak ada gambar baru).
- **Catatan jujur untuk 7d:** butir Likuiditas/Mekanisme keluar proyek token menyebut penjualan ke sesama pemegang token lewat platform, tetapi fitur jual-kembali token belum ada di prototype; teks tersebut harus tetap berlabel ilustrasi dan disesuaikan bila fiturnya dibuat.
