import { createContext, useContext } from 'react'

// Context + hook dipisah dari Provider (file PropertiesContext.jsx) agar fast refresh tidak error.
export const PropertiesContext = createContext(null)

export function useProperties() {
  const ctx = useContext(PropertiesContext)
  if (!ctx) throw new Error('useProperties must be used within PropertiesProvider')
  return ctx
}
