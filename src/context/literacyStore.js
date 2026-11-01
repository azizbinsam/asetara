import { createContext, useContext } from 'react'

// Context dan hook dipisah dari komponen Provider supaya "fast refresh" (hot reload) Vite tetap bekerja.
export const LiteracyContext = createContext(null)

export function useLiteracy() {
  const ctx = useContext(LiteracyContext)
  if (!ctx) throw new Error('useLiteracy harus dipakai di dalam LiteracyProvider')
  return ctx
}
