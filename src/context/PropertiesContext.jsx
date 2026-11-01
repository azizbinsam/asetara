import { useState } from 'react'
import { PropertiesContext } from './propertiesStore'
import initialProperties from '../data/properties.json'

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState(initialProperties)

  function addProperty(property) {
    const newProperty = {
      ...property,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Aktif',
    }
    setProperties((prev) => [newProperty, ...prev])
    return newProperty
  }

  function updateProperty(id, updates) {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  function togglePropertyStatus(id) {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : p
      )
    )
  }

  function deleteProperty(id) {
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  // FIX: Include properties without status field (backward compatible)
  const activeProperties = properties.filter((p) => !p.status || p.status === 'Aktif')

  const value = {
    properties,
    activeProperties,
    addProperty,
    updateProperty,
    togglePropertyStatus,
    deleteProperty,
  }

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  )
}
