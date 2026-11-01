import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShieldCheck, Award } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { usePortfolio } from '../context/portfolioStore'
import { formatNumber, formatPercent } from '../utils/format'

import properties from '../data/properties.json'

export default function SertifikatList() {
  const navigate = useNavigate()
  const { holdings } = usePortfolio()

  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Sertifikat Kepemilikan</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-2xl">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">Sertifikat Kepemilikan (NFT)</h1>

        {holdings.length === 0 ? (
          <Card variant="default">
            <p className="text-sm text-neutral-500 text-center py-6">
              Belum ada sertifikat. Beli token properti untuk mendapatkan sertifikat NFT.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {holdings.map((holding) => {
              const property = properties.find((p) => p.id === holding.propertyId)
              if (!property) return null
              const ownershipPercent = (holding.tokens / holding.totalPropertyTokens) * 100

              return (
                <Link
                  key={holding.propertyId}
                  to={`/sertifikat/${holding.propertyId}`}
                  className="flex items-center gap-4 bg-neutral-0 border border-navy-200 rounded-card p-4 hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-navy-gradient flex items-center justify-center shrink-0">
                    <Award size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">{holding.propertyName}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {formatNumber(holding.tokens)} Token &middot; {formatPercent(ownershipPercent)} kepemilikan
                    </p>
                    <Badge variant="success" withCheck className="mt-1.5">Verified on Blockchain</Badge>
                  </div>
                  <ChevronRight size={18} className="text-neutral-400 shrink-0" />
                </Link>
              )
            })}
          </div>
        )}

        <div className="flex items-center gap-2 mt-5 text-xs text-neutral-400">
          <ShieldCheck size={14} />
          <span>Setiap sertifikat tercatat & dapat diverifikasi di blockchain ASETARA.</span>
        </div>
      </div>
    </div>
  )
}