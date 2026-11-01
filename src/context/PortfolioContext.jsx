import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import initialTransactions from '../data/transactions.json'
import initialHoldings from '../data/holdings.json'
import portfolioBase from '../data/portfolio.json'
import { generateTxHash } from '../utils/blockchain'

const PortfolioContext = createContext(null)

const STORAGE_KEY = 'asetara_portfolio'

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        transactions: parsed.transactions || initialTransactions,
        holdings: parsed.holdings || initialHoldings,
      }
    }
  } catch {
    // ignore parse errors
  }
  return {
    transactions: initialTransactions,
    holdings: initialHoldings,
  }
}

export function PortfolioProvider({ children, properties }) {
  const stored = loadFromStorage()
  const [holdings, setHoldings] = useState(stored.holdings)
  const [transactions, setTransactions] = useState(stored.transactions)

  // Persist to localStorage whenever holdings or transactions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ holdings, transactions }))
  }, [holdings, transactions])

  const portfolio = useMemo(() => {
    let totalValue = 0
    let weightedReturnSum = 0

    holdings.forEach((holding) => {
      const property = properties.find((p) => p.id === holding.propertyId)
      if (!property) return
      const value = holding.tokens * property.pricePerToken
      totalValue += value
      weightedReturnSum += value * property.projectedReturnPercent
    })

    const averageReturnPercent = totalValue > 0 ? weightedReturnSum / totalValue : 0
    const totalReturn = totalValue * (averageReturnPercent / 100)
    const totalTokens = holdings.reduce((sum, h) => sum + h.tokens, 0)

    // Riwayat dummy berskala ~100 juta, sedangkan total nilai asli bisa jauh lebih kecil.
    // Menimpa hanya titik terakhir membuat grafik anjlok, jadi seluruh titik diskalakan
    // dengan rasio yang sama: bentuk grafik tetap, dan titik terakhir = total nilai.
    const lastPoint = portfolioBase.performanceHistory[portfolioBase.performanceHistory.length - 1]
    const scale = lastPoint && lastPoint.value ? totalValue / lastPoint.value : 1
    const performanceHistory = portfolioBase.performanceHistory.map((point) => ({
      ...point,
      value: Math.round(point.value * scale),
    }))

    return {
      totalValue,
      totalReturn,
      totalReturnPercent: averageReturnPercent,
      totalProperties: holdings.length,
      totalTokens,
      averageReturnPercent,
      performanceHistory,
    }
  }, [holdings, properties])

  function addPurchase({ property, tokenAmount, nominal }) {
    const txId = `tx-${Date.now()}`
    const txHash = generateTxHash()

    const transaction = {
      id: txId,
      propertyId: property.id,
      propertyName: property.name,
      tokenAmount,
      nominal,
      txHash,
      status: 'Executed',
      createdAt: new Date().toISOString(),
    }

    setTransactions((prev) => [transaction, ...prev])

    setHoldings((prev) => {
      const existing = prev.find((h) => h.propertyId === property.id)
      if (existing) {
        return prev.map((h) =>
          h.propertyId === property.id
            ? { ...h, tokens: h.tokens + tokenAmount }
            : h
        )
      }
      return [
        ...prev,
        {
          propertyId: property.id,
          propertyName: property.name,
          tokens: tokenAmount,
          totalPropertyTokens: property.totalTokens,
        },
      ]
    })

    return txId
  }

  const value = {
    holdings,
    transactions,
    portfolio,
    addPurchase,
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}