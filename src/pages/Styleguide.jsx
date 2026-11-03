import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'

export default function Styleguide() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10 space-y-10">
      <div>
        <h1 className="font-sans text-3xl font-bold text-navy-700">INKLUSARA</h1>
        <p className="text-neutral-600 mt-1">Styleguide — Part 2 Verification</p>
      </div>

      {/* Colors */}
<section>
  <h2 className="text-lg font-semibold text-neutral-800 mb-3">Palet Warna</h2>
  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-50">
      <span className="text-[10px] font-mono text-neutral-800 bg-white/60 px-1 rounded">navy-50</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-100">
      <span className="text-[10px] font-mono text-neutral-800 bg-white/60 px-1 rounded">navy-100</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-200">
      <span className="text-[10px] font-mono text-neutral-800 bg-white/60 px-1 rounded">navy-200</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-champagne-300">
      <span className="text-[10px] font-mono text-neutral-800 bg-white/60 px-1 rounded">navy-300</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-champagne-400">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">navy-400</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-500">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">navy-500</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-600">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">navy-600</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-700">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">navy-700</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-800">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">navy-800</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-navy-900">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">navy-900</span>
    </div>
  </div>
  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-3">
    <div className="rounded-card h-16 flex items-end p-2 bg-teal-50">
      <span className="text-[10px] font-mono text-neutral-800 bg-white/60 px-1 rounded">teal-50</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-teal-100">
      <span className="text-[10px] font-mono text-neutral-800 bg-white/60 px-1 rounded">teal-100</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-teal-300">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">teal-300</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-teal-600">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">teal-600</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-teal-700">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">teal-700</span>
    </div>
    <div className="rounded-card h-16 flex items-end p-2 bg-teal-800">
      <span className="text-[10px] font-mono text-white bg-black/30 px-1 rounded">teal-800</span>
    </div>
  </div>
</section>

      {/* Buttons */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Beli Token</Button>
          <Button variant="secondary">Verifikasi di Blockchain</Button>
          <Button variant="outline">Lihat Detail</Button>
          <Button variant="ghost">Batal</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">Cards</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card variant="brand">
            <p className="text-sm opacity-90">Total Portfolio</p>
            <p className="text-2xl font-bold mt-1">Rp125.750.000</p>
            <p className="text-sm mt-1 opacity-90">+Rp12.450.000 (11,02%)</p>
          </Card>
          <Card variant="default">
            <p className="text-sm text-neutral-600">Apartemen BSD</p>
            <p className="text-lg font-bold text-neutral-800 mt-1">Rp25.000 / token</p>
            <Badge variant="success" withCheck className="mt-2">Verified Syariah</Badge>
          </Card>
          <Card variant="flat">
            <p className="text-sm text-neutral-600 mb-2">Pendanaan Properti</p>
            <ProgressBar value={72} variant="teal" showLabel />
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" withCheck>Executed</Badge>
          <Badge variant="warning">Wajib Zakat</Badge>
          <Badge variant="neutral">Risiko Rendah</Badge>
          <Badge variant="brand">Verified Syariah</Badge>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">Tipografi</h2>
        <p className="font-sans text-2xl text-navy-700">INKLUSARA — Wordmark (Playfair Display)</p>
        <p className="text-3xl font-bold text-neutral-800 mt-2">Heading H1 — Inter Bold</p>
        <p className="text-neutral-600 mt-1">Body text — Inter Regular, untuk paragraf & deskripsi.</p>
      </section>
    </div>
  )
}