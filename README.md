# ASETARA — Akses Finansial Lebih Setara

Platform edukasi, perencanaan, investasi, dan perlindungan keuangan. Prototype frontend (React + Vite + Tailwind v3), tanpa backend nyata. Seluruh data bersifat dummy/mock.

Basis kode berasal dari prototype PROPIN (tokenisasi properti syariah), yang fitur-fiturnya tetap dipertahankan di dalam ASETARA.

## Dokumentasi
- [`docs/ASETARA-FEATURES.md`](./docs/ASETARA-FEATURES.md) — 4 fitur baru ASETARA (Literasi, Simulator, Perbandingan, Akses & Keamanan)
- [`docs/SHARIA-PROPERTY-LEARNING-DIRECTORY.md`](./docs/SHARIA-PROPERTY-LEARNING-DIRECTORY.md) — fitur Investasi Properti Syariah (materi + direktori proyek)
- [`PRD.md`](./PRD.md) — PRD awal PROPIN (fitur lama)
- [`design.md`](./design.md) — Design system PROPIN (warna lama gold/hijau, sudah digantikan palette ASETARA di `tailwind.config.js`)

## Menjalankan Local

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Build Production

```bash
npm run build
npm run preview
```

## Deployment
Auto-deploy ke Vercel dari branch `main`.

## Tech Stack
React 19 · Vite · Tailwind CSS v3 · React Router 7 · Recharts · lucide-react
