'use client'

import { useContext } from 'react'
import { BrandContext } from '@/context/BrandContext'

export function useBrand() {
  const context = useContext(BrandContext)

  if (!context) {
    throw new Error('useBrand must be used within BrandProvider')
  }

  return context.currentBrandTokens
}

export function useBrandId() {
  const context = useContext(BrandContext)

  if (!context) {
    throw new Error('useBrandId must be used within BrandProvider')
  }

  return context.activeBrandId
}

export function useBrandSwitcher() {
  const context = useContext(BrandContext)

  if (!context) {
    throw new Error('useBrandSwitcher must be used within BrandProvider')
  }

  return {
    activeBrandId: context.activeBrandId,
    setActiveBrand: context.setActiveBrand,
    brands: context.brands,
  }
}
