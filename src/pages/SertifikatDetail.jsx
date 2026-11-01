import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { ChevronLeft, ShieldCheck, X } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { generateTokenId } from '../utils/blockchain'
import { formatNumber, formatPercent } from '../utils/format'
import { usePortfolio } from '../context/portfolioStore'

import user from '../data/user.json'
import properties from '../data/properties.json'

function VerifyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50 flex items-center justify-center p-4">
      <div className="bg-neutral-0 rounded-card max-w-sm w-full p-6 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600">
          <X size={18} />
        </button>
        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck size={22} className="text-teal-600" />
        </div>
        <h3 className="font-bold text-neutral-800">Sertifikat Terverifikasi</h3>
        <p className="text-sm text-neutral-500 mt-2">
          This is a prototype simulation. Pada produk final, verifikasi akan menampilkan data langsung dari blockchain.
        </p>
        <Button variant="primary" fullWidth className="mt-5" onClick={onClose}>Tutup</Button>
      </div>
    </div>
  )
}

export default function SertifikatDetail() {
  const { tokenId: propertyId } = useParams()
  const navigate = useNavigate()
  const { holdings, transactions } = usePortfolio()
  const [showVerify, setShowVerify] = useState(false)

  const holding = holdings.find((h) => h.propertyId === propertyId)
  const property = properties.find((p) => p.id === propertyId)

  if (!holding || !property) {
    return (
      <div className="p-6 text-center">
        <p className="text-neutral-600">Sertifikat tidak ditemukan.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/sertifikat')}>
          Kembali ke Sertifikat
        </Button>
      </div>
    )
  }

  const relatedTx = transactions
    .filter((t) => t.propertyId === propertyId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0]
  const issuedDate = relatedTx
    ? new Date(relatedTx.createdAt)
    : new Date('2026-05-12T09:30:00.000Z')
  const ownershipPercent = (holding.tokens / holding.totalPropertyTokens) * 100
  const tokenId = generateTokenId(propertyId)
  const qrValue = `https://asetara.app/verify/${tokenId}`

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Detail Sertifikat</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex items-center gap-1 text-sm text-neutral-500 hover:text-navy-600 mb-4"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        {/* Certificate card */}
        <div className="relative rounded-card border-2 border-navy-300 p-1">
          <div className="rounded-[12px] border border-navy-600 bg-neutral-0 p-6 text-center relative overflow-hidden">
            <span className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-sans text-6xl font-bold text-navy-50 opacity-70">
              ASETARA
            </span>

            <div className="relative">
              <p className="font-sans text-lg font-bold text-navy-700">ASETARA</p>
              <p className="text-[11px] tracking-widest text-neutral-400 uppercase mt-0.5">
                Sertifikat Kepemilikan Digital
              </p>

              <div className="my-4 border-t border-dashed border-navy-200" />

              <p className="text-xs text-neutral-500">Token ID</p>
              <p className="text-sm font-mono font-bold text-neutral-800">{tokenId}</p>

              <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                <div>
                  <p className="text-[11px] text-neutral-500">Nama Pemilik</p>
                  <p className="text-sm font-semibold text-neutral-800">{user.name}</p>
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500">Properti</p>
                  <p className="text-sm font-semibold text-neutral-800">{property.name}</p>
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500">Jumlah Token</p>
                  <p className="text-sm font-semibold text-neutral-800">{formatNumber(holding.tokens)} Token</p>
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500">Persentase Kepemilikan</p>
                  <p className="text-sm font-semibold text-neutral-800">{formatPercent(ownershipPercent)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-neutral-500">Tanggal Terbit</p>
                  <p className="text-sm font-semibold text-neutral-800">
                    {issuedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <div className="bg-navy-50 border border-navy-200 rounded-btn p-3">
                  <QRCodeSVG value={qrValue} size={110} fgColor="#172733" bgColor="transparent" />
                </div>
              </div>

              <Badge variant="success" withCheck className="mt-4">Verified on Blockchain</Badge>
            </div>
          </div>
        </div>

        <Button variant="outline" fullWidth className="mt-5" onClick={() => setShowVerify(true)}>
          <ShieldCheck size={16} />
          Verifikasi di Blockchain
        </Button>
      </div>

      {showVerify && <VerifyModal onClose={() => setShowVerify(false)} />}
    </div>
  )
}