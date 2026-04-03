'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'
import { applyBrandTokensToCSSVars } from '@/utils/tokenToCSSVar'

export interface BrandTokens {
  colors: {
    primary: string
    primary_light: string
    primary_dark: string
    dark: string
    darker: string
    surface: string
    surface_accent: string
    text: string
    text_secondary: string
    success: string
    warning: string
    error: string
    info: string
    [key: string]: string
  }
  typography: {
    font_primary: string
    font_code: string
    font_weights: Record<string, number>
    sizes: Record<string, string>
    [key: string]: any
  }
  spacing: Record<string, string>
  radius: Record<string, string>
  shadows: Record<string, string>
  animation: Record<string, string>
  [key: string]: any
}

export interface Brand {
  id: string
  name: string
  description: string
  logo: string
  website: string
  active: boolean
  order: number
  metadata: Record<string, any>
}

interface BrandContextType {
  activeBrandId: string
  currentBrandTokens: BrandTokens
  currentBrand: Brand | null
  brands: Brand[]
  setActiveBrand: (brandId: string) => void
  isLoading: boolean
}

export const BrandContext = createContext<BrandContextType | undefined>(undefined)

interface BrandProviderProps {
  children: ReactNode
  defaultBrandId?: string
}

export function BrandProvider({ children, defaultBrandId = 'gama-studio' }: BrandProviderProps) {
  const [activeBrandId, setActiveBrandId] = useState<string>(defaultBrandId)
  const [currentBrandTokens, setCurrentBrandTokens] = useState<BrandTokens | null>(null)
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar lista de brands na montagem
  useEffect(() => {
    async function loadBrands() {
      try {
        const response = await fetch('/api/brands')
        const data = await response.json()
        setBrands(data.brands)

        // Restaurar preferência salva ou usar default
        const savedBrandId = localStorage.getItem('gama-active-brand') || defaultBrandId
        setActiveBrandId(savedBrandId)
      } catch (error) {
        console.error('Erro carregando brands:', error)
      }
    }

    loadBrands()
  }, [defaultBrandId])

  // Carregar tokens quando brand ativa mudar
  useEffect(() => {
    async function loadBrandTokens() {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/brands/${activeBrandId}/tokens`)
        const tokens = await response.json()

        const brandResponse = await fetch(`/api/brands/${activeBrandId}`)
        const brand = await brandResponse.json()

        setCurrentBrandTokens(tokens)
        setCurrentBrand(brand)

        // Salvar preferência
        localStorage.setItem('gama-active-brand', activeBrandId)

        // Aplicar tokens ao document como CSS vars
        applyTokensToCSSVars(tokens)
      } catch (error) {
        console.error(`Erro carregando tokens para ${activeBrandId}:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBrandTokens()
  }, [activeBrandId])

  function applyTokensToCSSVars(tokens: BrandTokens) {
    applyBrandTokensToCSSVars(tokens)
  }

  const value: BrandContextType = {
    activeBrandId,
    currentBrandTokens: currentBrandTokens || ({} as BrandTokens),
    currentBrand,
    brands,
    setActiveBrand: setActiveBrandId,
    isLoading,
  }

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
}
