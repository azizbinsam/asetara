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
5. Materi memakai mesin Literasi (kategori baru "Properti Syariah"): kartu Video, Artikel, Kuis. **Video asli tidak tersedia** → "Segera hadir" atau tautan YouTube dari pemilik proyek. Isi materi akad/fraksional wajib ditinjau ahli syariah dan hukum.
6. **Soft gate**: banner "Pelajari dulu" di Marketplace dan Detail Tokenisasi selama materi dasar belum selesai; bukan kunci keras.
7. Klaim di Landing "100% Syariah Compliant / screening Dewan Pengawas Syariah" disesuaikan dengan aturan nomor 1 (Tahap 7d).

## Tahap
| Tahap | Isi | Status |
|---|---|---|
| 7a | Hub `/investasi-syariah` (hero, tab, banner), navigasi baru | Selesai (menunggu verifikasi di browser) |
| 7b | Tab Materi Edukasi: materi + kuis properti syariah (`MateriTab.jsx`, data `literasi.json`) | Berikutnya |
| 7c | Tab Direktori Proyek: data, kartu, filter, halaman detail 11 informasi (`DirektoriTab.jsx`) | Menunggu |
| 7d | Soft gate, penyambung antar fitur, AI Assistant, penyesuaian klaim Landing, HANDOFF | Menunggu |

## Struktur kode (Tahap 7a)
- `src/pages/InvestasiSyariah.jsx` — hub. Tab disimpan di URL (`?tab=materi|direktori`).
- `src/pages/investasiSyariah/MateriTab.jsx` dan `DirektoriTab.jsx` — masih placeholder "Segera hadir"; diganti pada 7b/7c.
- Gambar hero memakai `/images/hero-apartment.jpg`. Foto mockup (rumah+koin, dokumen, timbangan, gedung) belum ada; taruh file di `public/images/` bila tersedia.
