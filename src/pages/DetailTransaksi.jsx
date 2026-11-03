import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, CheckCircle2, Circle } from 'lucide-react'
import { usePortfolio } from '../context/portfolioStore'
import { formatRupiah, formatNumber } from '../utils/format'
import Badge from '../components/Badge'
import Button from '../components/Button'

const STEPS = [
  { key: 'investor', title: 'Investor', desc: (tx) => `Membeli ${formatNumber(tx.tokenAmount)} Token ${tx.propertyName}` },
  { key: 'contract', title: 'Smart Contract', desc: () => 'Memverifikasi pembayaran' },
  { key: 'verified', title: 'Verified', desc: () => 'Pembayaran berhasil diverifikasi' },
  { key: 'ownership', title: 'Ownership Updated', desc: () => 'Kepemilikan token berhasil diperbarui di blockchain' },
  { key: 'completed', title: 'Completed', desc: () => 'Transaksi selesai' },
]

function findTransaction(txId, contextTransactions) {
  // 1. Try context first
  const fromContext = contextTransactions.find((t) => t.id === txId)
  if (fromContext) return fromContext

  // 2. Fallback to localStorage
  try {
    const stored = JSON.parse(localStorage.getItem('inklusara_portfolio') || '{}')
    const fromStorage = stored.transactions?.find((t) => t.id === txId)
    if (fromStorage) return fromStorage
  } catch {
    // ignore
  }

  return null
}

export default function DetailTransaksi() {
  const { txId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { transactions } = usePortfolio()

  const [transaction, setTransaction] = useState(() => findTransaction(txId, transactions))
  const justPurchased = Boolean(location.state?.justPurchased)
  const [visibleSteps, setVisibleSteps] = useState(justPurchased ? 0 : STEPS.length)

  // Keep checking for transaction if not found immediately
  useEffect(() => {
    if (transaction) return
    const timer = setInterval(() => {
      const found = findTransaction(txId, transactions)
      if (found) {
        setTransaction(found)
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [txId, transactions, transaction])

  useEffect(() => {
    if (!justPurchased || visibleSteps >= STEPS.length) return
    const timer = setTimeout(() => setVisibleSteps((v) => v + 1), 550)
    return () => clearTimeout(timer)
  }, [visibleSteps, justPurchased])

  if (!transaction) {
    return (
      <div className="p-6 text-center">
        <p className="text-neutral-600">Transaksi tidak ditemukan.</p>
        <p className="text-xs text-neutral-400 mt-2">ID: {txId}</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/dompet')}>
          Kembali ke Dompet
        </Button>
      </div>
    )
  }

  const isFullyRevealed = visibleSteps >= STEPS.length

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3 lg:hidden">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">Detail Transaksi</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-xl">
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex items-center gap-1 text-sm text-neutral-500 hover:text-navy-600 mb-4"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        <div className="space-y-5 relative pl-8 border-l-2 border-neutral-200 mt-2">
          {STEPS.map((step, i) => {
            const isDone = i < visibleSteps
            return (
              <div key={step.key} className="relative">
                <div
                  className={`absolute -left-[41px] w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDone ? 'bg-teal-600' : 'bg-neutral-200'
                  }`}
                >
                  {isDone ? <CheckCircle2 size={14} className="text-white" /> : <Circle size={10} className="text-neutral-400" />}
                </div>
                <p className={`text-sm font-bold transition-colors ${isDone ? 'text-neutral-800' : 'text-neutral-400'}`}>
                  {step.title}
                </p>
                <p className={`text-xs mt-0.5 transition-colors ${isDone ? 'text-neutral-500' : 'text-neutral-300'}`}>
                  {step.desc(transaction)}
                </p>
              </div>
            )
          })}
        </div>

        {isFullyRevealed && (
          <div className="mt-8 bg-neutral-0 border border-neutral-200 rounded-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">Status Transaksi</p>
              <Badge variant="success" withCheck>{transaction.status}</Badge>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-neutral-500">Tx Hash</p>
              <p className="text-sm font-mono text-neutral-700">{transaction.txHash}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-neutral-500">Nominal</p>
              <p className="text-sm font-semibold text-neutral-800">{formatRupiah(transaction.nominal)}</p>
            </div>

            {justPurchased && (
              <Button variant="primary" fullWidth className="mt-5" onClick={() => navigate('/dompet')}>
                Lihat di Dompet
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}