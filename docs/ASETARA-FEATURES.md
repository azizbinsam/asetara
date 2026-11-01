# ASETARA — Dokumentasi Fitur Baru

> **Akses Finansial Lebih Setara**
> Edukasi • Perencanaan • Investasi • Perlindungan — *Satu Platform, Banyak Solusi untuk Masa Depanmu*

Dokumen ini merangkum 4 fitur baru ASETARA berdasarkan mockup mobile dan desktop: **Rencanakan · Pahami · Bandingkan · Akses dengan Aman**.

---

## 1. Brand & Desain

### 1.1 Logo
- Wordmark **ASETARA** huruf kapital, tebal, dengan jarak antarhuruf lebar. Pada huruf "A" terdapat ikon bintang/sparkle emas kecil.
- Ikon: lima balok gedung bertingkat (hijau teal, biru, navy, emas) di atas atap rumah dengan jendela kecil emas. Melambangkan properti dan akses finansial.
- Tagline: *Akses Finansial Lebih Setara*, diapit garis emas tipis.

### 1.2 Color Palette

> ⚠️ **Perlu konfirmasi:** ada dua versi palette (lihat bagian Pertanyaan di akhir). Dokumen ini sementara memakai **versi lengkap** karena memiliki peran warna yang jelas.

| Nama | Hex | Penggunaan |
|---|---|---|
| Slate Navy | `#263F50` | Warna utama: navbar, heading, teks penting |
| Muted Teal | `#477C7C` | Warna sekunder: tombol, progres, ikon aktif |
| Champagne Gold | `#C6A66A` | Aksen: ikon, highlight, ilustrasi, penanda fitur |
| Warm Cream | `#F7F4EC` | Latar utama halaman, bersih dan hangat |
| Pure White | `#FFFFFF` | Kartu fitur, form input, panel konten |
| Soft Sage | `#E4EEEA` | Latar kartu sekunder, status positif, area edukasi |

Versi alternatif (sederhana): Slate Navy `#314351`, Muted Teal `#536d7b`, Gold `#c8a97e`.

### 1.3 Design Tokens (CSS)

```css
:root {
  --color-navy:   #263F50;
  --color-teal:   #477C7C;
  --color-gold:   #C6A66A;
  --color-cream:  #F7F4EC;
  --color-white:  #FFFFFF;
  --color-sage:   #E4EEEA;
}
```

### 1.4 Gaya UI (dari mockup)
- Latar halaman krem hangat, konten di kartu putih dengan sudut membulat dan bayangan halus.
- Tombol utama berwarna teal/navy, teks putih, dengan ikon panah (→).
- Ikon fitur berada dalam kotak membulat berwarna emas/krem.
- Badge risiko: **Rendah** (hijau), **Sedang** (oranye/emas).
- Kotak "Dampak" memakai latar krem dengan ikon lampu/peringatan.

---

## 2. Navigasi

### Mobile (bottom tab)
`Beranda` · `Edukasi` · `Portofolio` · `Akun`

Header: tombol kembali, logo ASETARA, ikon notifikasi.

### Desktop (sidebar kiri)
`Beranda` · `Literasi Keuangan` · `Perencanaan Finansial` · `Simulasi Investasi` · `Marketplace Properti` · `Akses & Keamanan` · `AI Asisten` · `Pengaturan`

Topbar: kolom pencarian (*"Cari materi, artikel, atau topik"*) dan profil pengguna (contoh: *Sinta Dewi*).

### Pemetaan menu ke fitur

| Fitur | Mobile | Desktop |
|---|---|---|
| Financial Literacy Center | Tab Edukasi | Literasi Keuangan |
| Financial Readiness Simulator | (belum jelas) | Perencanaan Finansial |
| Smart Investment Comparison | (belum jelas) | Simulasi Investasi |
| Financial Access & Safety Hub | (belum jelas) | Akses & Keamanan |

---

## 3. Fitur

### 3.1 Financial Literacy Center — *Edukasi keuangan digital*

**Deskripsi:** Berisi materi singkat tentang cara mengatur uang, menabung, investasi, risiko keuangan, keuangan syariah, dan keamanan transaksi digital. Dilengkapi kuis untuk menguji pemahaman.

**Judul halaman:** *Literasi Keuangan* / *Pusat Literasi Keuangan* — "Belajar bertahap, pahami lebih dalam."

**Komponen UI:**
- Filter kategori (chip/tab): `Semua`, `Keuangan Dasar`, `Investasi`, `Syariah`. Di desktop ditambah `Menabung`, `Risiko`, `Keuangan Syariah`, `Keamanan Digital`.
- Daftar **Materi Edukasi** (mobile, berupa list):

| Materi | Durasi | Deskripsi |
|---|---|---|
| Cara Mengatur Keuangan | 8 menit | Kelola pemasukan dan pengeluaran dengan bijak |
| Menabung untuk Masa Depan | 6 menit | Mulai dari nominal kecil, dampaknya besar |
| Investasi Syariah | 10 menit | Pilihan investasi yang halal dan berkah |
| Risiko Keuangan | 7 menit | Kenali risiko, siapkan strategi |

- **Materi Populer** (desktop, berupa kartu dengan tombol *Mulai Belajar*): Dasar-Dasar Keuangan (10 menit), Strategi Menabung untuk Masa Depan (8 menit), Investasi Syariah untuk Pemula (12 menit), Keamanan Transaksi Digital (10 menit).
- **Kuis Pemahaman** — "Uji pemahamanmu setelah belajar." Tombol `Mulai Kuis`.

**Alur pengguna:**
1. Masuk ke menu Edukasi / Literasi Keuangan
2. Pilih materi pembelajaran
3. Pelajari konten (video, artikel, infografis) dan ikuti kuis
4. Lihat hasil dan rekomendasi pembelajaran selanjutnya; dapatkan sertifikat/insight

**Dampak:** Meningkatkan literasi dan kesiapan masyarakat dalam menggunakan layanan keuangan.

---

### 3.2 Financial Readiness Simulator — *Simulasi kesiapan finansial*

**Deskripsi:** Pengguna memasukkan penghasilan, pengeluaran, dana yang tersedia, dan target keuangan. Sistem menghitung simulasi dana yang dapat disisihkan serta memberikan gambaran kesiapan sebelum berinvestasi.

**Judul halaman:** *Financial Readiness Simulator* — "Kenali kesiapan finansialmu, sebelum berinvestasi."

**Form input (Data Keuangan):**

| Field | Contoh di mockup | Tipe |
|---|---|---|
| Penghasilan bulanan | Rp 5.000.000 (mobile) / Rp 8.000.000 (desktop) | Currency |
| Pengeluaran bulanan | Rp 3.000.000 / Rp 5.000.000 | Currency |
| Dana yang tersedia | Rp 500.000 / Rp 2.000.000 | Currency |
| Target keuangan | Pendidikan anak / Dana darurat (6 bulan) | Dropdown |

Tombol: `Hitung Kesiapan` / `Hitung Simulasi`.

**Hasil simulasi:**
- Indikator lingkaran progres berisi persentase dan status **Siap** (contoh 68% di mobile, 62% di desktop).
- **Dana yang dapat disisihkan** per bulan (contoh Rp 1.200.000 / Rp 1.500.000).
- Teks ringkasan, misalnya: *"Kamu sudah berada di jalur yang baik. Lanjutkan konsistensi untuk mencapai tujuan finansialmu."*
- **Rekomendasi** (desktop): *"Kondisi keuanganmu sudah cukup baik. Kamu bisa mulai mempertimbangkan investasi dengan nominal kecil terlebih dahulu."* Tombol `Lihat Detail`.

**Alur pengguna:**
1. Isi data keuangan (penghasilan, pengeluaran, dana tersedia, target)
2. Sistem menghitung simulasi dana yang bisa disisihkan
3. Lihat hasil dan rekomendasi sesuai kondisi finansial
4. Atur rencana keuangan (versi mobile)

**Dampak:** Membantu pengguna menyesuaikan rencana keuangan dengan kemampuan ekonominya, bukan memaksakan investasi.

---

### 3.3 Smart Investment Comparison — *Perbandingan pilihan investasi*

**Deskripsi:** Membantu pengguna membandingkan produk berdasarkan modal awal, biaya, jangka waktu, risiko, dan potensi hasil. Untuk tahap awal, fokus pada pilihan investasi **properti** yang tersedia di ASETARA.

**Judul halaman:** *Smart Investment Comparison* / *Bandingkan Investasi Properti* — "Pilih investasi yang paling sesuai denganmu."

**Komponen UI:**
- Tab jenis investasi: `Properti Syariah` (aktif), `Reksa Dana`, serta `Sukuk` (mobile) atau `Saham` (desktop).
- **Kartu properti** (foto, nama, lokasi, harga, badge risiko, jangka waktu).
- **Detail Perbandingan** (tabel, maksimal 3 produk):

| Kriteria | Rumah Syariah | Apartemen | Ruko |
|---|---|---|---|
| Lokasi | Serang, Banten | Harmony Residence (mobile) / Tangerang Selatan (desktop) | Kawasan Bisnis (mobile) / Bekasi (desktop) |
| Modal awal | Rp 300.000.000 | Rp 450.000.000 | Rp 700.000.000 |
| Biaya tambahan | 5% (mobile) / 1–2% (desktop) | 7% / 2–3% | 10% / 2–4% |
| Potensi hasil per tahun | 8–10% (mobile) / 7–10% (desktop) | 10–12% / 8–12% | 12–15% / 10–11% |
| Risiko | Rendah | Sedang | Sedang |
| Jangka waktu | 10 tahun | 15 tahun / 12 tahun | 20 tahun / 15 tahun |

> Angka di atas hanya data ilustrasi dari mockup. Lihat bagian Pertanyaan karena nilai mobile dan desktop berbeda.

- Tombol: `Lihat Rekomendasi Terbaik` (mobile) / `Lihat Detail Perbandingan` (desktop).

**Alur pengguna:**
1. Pilih jenis investasi (misalnya properti syariah)
2. Bandingkan beberapa produk berdasarkan kriteria
3. Lihat rekomendasi yang sesuai dengan profil
4. Simpan pilihan atau lanjut ke tahap investasi / ambil keputusan investasi

**Dampak:** Membantu masyarakat memahami pilihan investasi sebelum mengambil keputusan.

---

### 3.4 Financial Access & Safety Hub — *Pusat akses dan keamanan keuangan*

**Deskripsi:** Berisi panduan akses rekening, tabungan, investasi, pembiayaan, persyaratan, biaya, pemeriksaan legalitas penyedia, serta edukasi untuk mengenali penipuan. Informasi legalitas bersumber dari regulator atau lembaga resmi.

**Judul halaman:** *Financial Access & Safety Hub* / *Akses & Keamanan Keuangan* — "Akses layanan keuangan, lebih aman, lebih mudah."

**Komponen UI:**
- Kolom pencarian topik (*rekening, tabungan, investasi, dll.*).
- Kategori layanan: `Rekening & Tabungan`, `Investasi`, `Pembiayaan`, serta `Legalitas & Regulasi` (mobile) atau `Asuransi` (desktop).
- Tab desktop: `Panduan Layanan`, `Legalitas Penyedia`, `Edukasi & Tips`, `Lapor Penipuan`.
- **Panduan Akses Layanan** (list, link *Lihat Semua*):
  - Cara Membuka Rekening Bank: langkah mudah membuka rekening di bank resmi
  - Syarat & Biaya Tabungan: informasi lengkap persyaratan dan biaya admin
  - Mengakses Pembiayaan: jenis pembiayaan, syarat, dan proses pengajuan
- **Cek Legalitas Penyedia**: tombol `Cek di OJK` (tautan eksternal).
- **Waspada Penipuan**: kenali modus penipuan dan tips agar tetap aman bertransaksi, tombol `Pelajari Sekarang`.
- **Rekomendasi Penyedia Resmi** (desktop): logo OJK, Bank Indonesia, BPJS Ketenagakerjaan, BPKH.

**Alur pengguna:**
1. Cari / pilih layanan yang dibutuhkan (rekening, investasi, pembiayaan, dll.)
2. Baca informasi persyaratan, biaya, dan penyedia
3. Cek legalitas penyedia / akses tautan resmi atau hubungi pihak terkait
4. Terapkan tips keamanan untuk menghindari penipuan, lalu gunakan layanan dengan aman

**Dampak:** Membantu pengguna mengetahui cara mengakses layanan keuangan yang sesuai dan menggunakannya secara lebih aman.

---

## 4. Ringkasan Fitur

| # | Fitur | Tujuan | Input utama | Output utama |
|---|---|---|---|---|
| 01 | Financial Literacy Center | Edukasi | Pilihan materi, jawaban kuis | Skor, sertifikat/insight, rekomendasi belajar |
| 02 | Financial Readiness Simulator | Perencanaan | Penghasilan, pengeluaran, dana, target | Persentase kesiapan, dana disisihkan, rekomendasi |
| 03 | Smart Investment Comparison | Investasi | Jenis investasi, produk yang dibandingkan | Tabel perbandingan, rekomendasi terbaik |
| 04 | Financial Access & Safety Hub | Perlindungan | Kata kunci layanan | Panduan, cek legalitas OJK, tips anti-penipuan |

---

## 5. Catatan Implementasi (Checklist)

- [ ] Halaman Literasi Keuangan (list materi, filter kategori, detail materi, kuis, sertifikat)
- [ ] Halaman Financial Readiness Simulator (form, kalkulasi, kartu hasil, rekomendasi)
- [ ] Halaman Smart Investment Comparison (tab jenis investasi, kartu produk, tabel perbandingan)
- [ ] Halaman Financial Access & Safety Hub (pencarian, panduan, cek legalitas, waspada penipuan)
- [ ] Update navigasi (bottom tab mobile dan sidebar desktop)
- [ ] Terapkan design tokens warna ASETARA
- [ ] Layout responsif mobile dan desktop

---

## 6. Pertanyaan Terbuka

1. Versi color palette mana yang dipakai (sederhana atau lengkap)?
2. Rumus perhitungan "% Siap" dan "dana yang dapat disisihkan" di simulator.
3. Perbedaan data antara mockup mobile dan desktop (tab Sukuk vs Saham, biaya, jangka waktu, lokasi properti): mana yang menjadi acuan?
4. Stack dan struktur repo GitHub yang dipakai.
