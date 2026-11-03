import { useEffect, useMemo, useState, useCallback } from 'react'
import literasiData from '../data/literasi.json'
import { LiteracyContext } from './literacyStore'

const STORAGE_KEY = 'inklusara_literasi'

// Bentuk data yang disimpan di localStorage:
// { read: { [materiId]: true }, quiz: { [materiId]: { best, last, total, attempts, lastAt } } }
function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { read: parsed.read || {}, quiz: parsed.quiz || {} }
    }
  } catch {
    // abaikan data rusak
  }
  return { read: {}, quiz: {} }
}

export function LiteracyProvider({ children }) {
  const [state, setState] = useState(loadFromStorage)

  // Simpan otomatis setiap kali progres berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // abaikan jika penyimpanan penuh / diblokir
    }
  }, [state])

  const { categories, materials } = literasiData

  const getMaterial = useCallback((id) => materials.find((m) => m.id === id), [materials])

  // 'baru' = belum dibuka, 'dibaca' = sudah dibaca, 'selesai' = kuis sudah dikerjakan
  const getStatus = useCallback(
    (id) => (state.quiz[id] ? 'selesai' : state.read[id] ? 'dibaca' : 'baru'),
    [state]
  )

  const markRead = useCallback((id) => {
    setState((prev) => (prev.read[id] ? prev : { ...prev, read: { ...prev.read, [id]: true } }))
  }, [])

  const saveQuizResult = useCallback((id, score, total) => {
    const at = new Date().toISOString() // dibuat di luar updater supaya updater tetap murni
    setState((prev) => {
      const old = prev.quiz[id]
      return {
        read: { ...prev.read, [id]: true },
        quiz: {
          ...prev.quiz,
          [id]: {
            best: Math.max(old?.best ?? 0, score),
            last: score,
            total,
            attempts: (old?.attempts ?? 0) + 1,
            lastAt: at,
          },
        },
      }
    })
  }, [])

  // Materi yang disarankan berikutnya: belum selesai, kategori sama didahulukan
  const getRecommendations = useCallback(
    (currentId, limit = 2) => {
      const current = materials.find((m) => m.id === currentId)
      const candidates = materials.filter((m) => m.id !== currentId && !state.quiz[m.id])
      const sameCategory = candidates.filter((m) => current && m.category === current.category)
      const others = candidates.filter((m) => !sameCategory.includes(m))
      return [...sameCategory, ...others].slice(0, limit)
    },
    [materials, state]
  )

  const progress = useMemo(() => {
    const results = Object.entries(state.quiz).filter(([id]) => materials.some((m) => m.id === id))
    const done = results.length
    const total = materials.length
    const percents = results.map(([, r]) => (r.best / r.total) * 100)
    const averageScore = percents.length ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length) : 0
    return { done, total, percent: total ? Math.round((done / total) * 100) : 0, averageScore }
  }, [state, materials])

  const value = {
    categories,
    materials,
    quizResults: state.quiz,
    progress,
    getMaterial,
    getStatus,
    getRecommendations,
    markRead,
    saveQuizResult,
  }

  return <LiteracyContext.Provider value={value}>{children}</LiteracyContext.Provider>
}
