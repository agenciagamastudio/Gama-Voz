'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Layers, Box, Palette, Code, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useSidenavContext } from './SidenavContext'
import { Logo } from './Logo'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Foundations',
    href: '#',
    icon: <Layers size={20} />,
    children: [
      { label: 'Colors', href: '/foundations/colors' },
      { label: 'Typography', href: '/foundations/typography' },
      { label: 'Spacing', href: '/foundations/spacing' },
      { label: 'Icons', href: '/foundations/icons' },
    ],
  },
  {
    label: 'Components',
    href: '#',
    icon: <Box size={20} />,
    children: [
      { label: 'Atoms', href: '/components/atoms' },
      { label: 'Molecules', href: '/components/molecules' },
      { label: 'Organisms', href: '/components/organisms' },
    ],
  },
  {
    label: 'Brand',
    href: '#',
    icon: <Palette size={20} />,
    children: [
      { label: 'Identity', href: '/brand/identity' },
      { label: 'Voice & Tone', href: '/brand/voice' },
      { label: 'Applications', href: '/brand/applications' },
    ],
  },
  {
    label: 'Tokens',
    href: '/tokens',
    icon: <Code size={20} />,
  },
]

function NavGroup({ item, isDrawer }: { item: NavItem; isDrawer: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (!item.children) {
    const isActive = pathname === item.href
    return (
      <li>
        <Link
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-gama-primary text-gama-dark font-bold'
              : 'text-gama-text hover:bg-gama-surface/60'
          }`}
        >
          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      </li>
    )
  }

  const anyChildActive = item.children.some((child) => pathname === child.href)

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 w-full ${
          anyChildActive || isOpen ? 'bg-gama-surface/70 text-gama-primary' : 'text-gama-text hover:bg-gama-surface/60'
        }`}
      >
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{item.icon}</span>
        <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
        <ChevronDown size={16} className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul className="ml-6 mt-1.5 space-y-1 border-l border-gama-surface-accent pl-2">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={`block px-3 py-2 text-xs rounded transition-colors duration-200 ${
                  pathname === child.href
                    ? 'bg-gama-primary text-gama-dark font-bold'
                    : 'text-gama-text-secondary hover:text-gama-text hover:bg-gama-surface/60'
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function DrawerNav() {
  const { isDrawerOpen, setIsDrawerOpen } = useSidenavContext()
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Focus trap, escape key, and swipe support
  useEffect(() => {
    if (!isDrawerOpen) return

    // Focus first element
    setTimeout(() => firstFocusableRef.current?.focus(), 0)

    let startX = 0
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      if (startX - endX > 50) {
        setIsDrawerOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (e.key === 'Escape') {
        setIsDrawerOpen(false)
        return
      }

      if (e.key === 'Tab') {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
        const activeElement = document.activeElement

        if (e.shiftKey) {
          if (activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchend', handleTouchEnd, false)
    document.addEventListener('keydown', handleKeyDown, false)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, false)
      document.removeEventListener('touchend', handleTouchEnd, false)
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [isDrawerOpen, setIsDrawerOpen])

  return (
    <>
      {/* Backdrop with dimmer + blur */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer Modal - 75% mobile, max 320px */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-screen z-50 w-3/4 max-w-xs bg-gama-darker border-r border-gama-surface flex flex-col lg:hidden transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Header - Logo + Close Button */}
        <div className="flex-shrink-0 px-4 py-5 border-b border-gama-surface flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <Logo size="md" />
          </div>

          {/* Close Button - 44x44px touch target */}
          <button
            ref={firstFocusableRef}
            onClick={() => setIsDrawerOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gama-surface/70 transition-colors duration-200 flex-shrink-0 ml-2"
            aria-label="Close navigation"
          >
            <X size={24} className="text-gama-primary" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <NavGroup key={item.label} item={item} isDrawer={true} />
            ))}
          </ul>
        </nav>

        {/* Reference Section */}
        <div className="flex-shrink-0 px-3 py-4 border-t border-gama-surface">
          <div className="p-3 bg-gama-surface/50 rounded-lg backdrop-blur-sm">
            <p className="text-xs text-gama-text-secondary mb-2.5 font-semibold">📖 Reference</p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="text-gama-primary hover:text-gama-primary/80 transition-colors duration-200">
                  Design Tokens JSON
                </a>
              </li>
              <li>
                <a href="#" className="text-gama-primary hover:text-gama-primary/80 transition-colors duration-200">
                  Component API
                </a>
              </li>
              <li>
                <a href="#" className="text-gama-primary hover:text-gama-primary/80 transition-colors duration-200">
                  Tailwind Config
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
