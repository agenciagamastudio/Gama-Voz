import React from 'react'
import { ReactNode } from 'react'

interface DocLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export default function DocLayout({ children, title, description }: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-[#161616] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-black md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-gray-300">{description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {children}
      </div>
    </div>
  )
}
