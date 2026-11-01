import { createContext, useContext } from 'react'

// Context + hook dipisah dari Provider (file PortfolioContext.jsx) agar fast refresh tidak error.
export const PortfolioContext = createContext(null)

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
