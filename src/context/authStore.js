import { createContext, useContext } from 'react'

// Context + hook dipisah dari Provider (file AuthContext.jsx) agar fast refresh tidak error.
export const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
