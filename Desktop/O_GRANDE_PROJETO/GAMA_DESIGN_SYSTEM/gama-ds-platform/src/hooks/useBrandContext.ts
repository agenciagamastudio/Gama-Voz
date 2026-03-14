'use client'

import { useContext } from 'react'
import { BrandContext } from '@/context/BrandContext'

export function useBrandContext() {
  const context = useContext(BrandContext)

  if (!context) {
    throw new Error('useBrandContext must be used within BrandProvider')
  }

  return context
}
