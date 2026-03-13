'use client'

import { ReactNode } from 'react'
import { useSidenavContext } from './SidenavContext'

interface MainWrapperProps {
  children: ReactNode
}

export function MainWrapper({ children }: MainWrapperProps) {
  const { isHovered } = useSidenavContext()

  return (
    <main
      className={`transition-all duration-300 ease-in-out flex-1 overflow-x-hidden relative z-0 pt-20 lg:pt-0 ${
        isHovered ? 'lg:ml-64' : 'lg:ml-16'
      }`}
    >
      {children}
    </main>
  )
}
