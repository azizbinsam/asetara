import { useState } from 'react'
import { AuthContext } from './authStore'

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

// Pulihkan sesi dari localStorage saat pertama render (tanpa efek, jadi tidak ada kedipan "loading")
function readStoredUser() {
  const stored = localStorage.getItem('asetara_auth')
  if (!stored) return null
  try {
    const parsed = JSON.parse(stored)
    // Validasi bentuk dasar
    if (parsed && parsed.email && parsed.role) return parsed
  } catch {
    localStorage.removeItem('asetara_auth')
  }
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  // Auth dummy: kata sandi sudah divalidasi di form dan tidak dicek lagi di sini
  function login(email) {
    return new Promise((resolve) => {
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
        setUser(found)
        localStorage.setItem('asetara_auth', JSON.stringify(found))
        resolve({ user: found, isNew: false })
      }, 800) // Simulate network delay ~800ms per PRD 6.1
    })
  }

  function register(name, email) {
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
    isLoading: false, // sesi dibaca sinkron di readStoredUser, tidak ada tahap loading
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
