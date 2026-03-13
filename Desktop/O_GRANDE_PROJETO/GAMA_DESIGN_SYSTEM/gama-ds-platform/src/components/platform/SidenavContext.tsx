'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface SidenavContextType {
  isHovered: boolean
  setIsHovered: (hovered: boolean) => void
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
}

const SidenavContext = createContext<SidenavContextType | undefined>(undefined)

export function SidenavProvider({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false)
      }
    }

    if (isDrawerOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isDrawerOpen])

  return (
    <SidenavContext.Provider value={{ isHovered, setIsHovered, isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </SidenavContext.Provider>
  )
}

export function useSidenavContext() {
  const context = useContext(SidenavContext)
  if (!context) {
    throw new Error('useSidenavContext must be used within SidenavProvider')
  }
  return context
}
