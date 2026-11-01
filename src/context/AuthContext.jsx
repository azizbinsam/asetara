import { createContext, useContext, useState, useEffect } from 'react'

const DUMMY_USERS = [
  {
    id: 'u-1',
    name: 'Sinta Dewi',
    email: 'sinta@asetara.id',
    role: 'user',
    avatar: null,
    phone: '+62 812-3456-7890',
    kycStatus: 'Terverifikasi',
    joinedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'u-admin',
    name: 'Admin ASETARA',
    email: 'admin@asetara.id',
    role: 'admin',
    avatar: null,
    phone: '+62 811-0000-0000',
    kycStatus: 'Terverifikasi',
    joinedAt: '2026-01-01T00:00:00Z',
  },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('asetara_auth')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Validate basic shape
        if (parsed && parsed.email && parsed.role) {
          setUser(parsed)
        }
      } catch {
        localStorage.removeItem('asetara_auth')
      }
    }
    setIsLoading(false)
  }, [])

  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = DUMMY_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (!found) {
          // Default to user role for any unknown email (per PRD 15: "tetap diproses sebagai role User")
          const newUser = {
            id: `u-${Date.now()}`,
            name: email.split('@')[0],
            email: email.toLowerCase(),
            role: 'user',
            avatar: null,
            phone: '',
            kycStatus: 'Menunggu',
            joinedAt: new Date().toISOString(),
          }
          setUser(newUser)
          localStorage.setItem('asetara_auth', JSON.stringify(newUser))
          resolve({ user: newUser, isNew: true })
          return
        }
        // Any password is accepted for dummy auth
        setUser(found)
        localStorage.setItem('asetara_auth', JSON.stringify(found))
        resolve({ user: found, isNew: false })
      }, 800) // Simulate network delay ~800ms per PRD 6.1
    })
  }

  function register(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existing = DUMMY_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (existing) {
          reject(new Error('Email sudah terdaftar'))
          return
        }
        const newUser = {
          id: `u-${Date.now()}`,
          name,
          email: email.toLowerCase(),
          role: 'user',
          avatar: null,
          phone: '',
          kycStatus: 'Menunggu',
          joinedAt: new Date().toISOString(),
        }
        setUser(newUser)
        localStorage.setItem('asetara_auth', JSON.stringify(newUser))
        resolve({ user: newUser })
      }, 800)
    })
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('asetara_auth')
  }

  function updateProfile(updates) {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...updates }
      localStorage.setItem('asetara_auth', JSON.stringify(updated))
      return updated
    })
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}