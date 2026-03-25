'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronLeft, ChevronRight, Layers, Box, Palette, Code, Menu } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { useSidenavContext } from './SidenavContext'
import { Logo } from './Logo'
import { BrandSwitcher } from './BrandSwitcher'

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

function NavGroup({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) {
  const [isOpen, setIsOpen] = useState(!isCollapsed)
  const pathname = usePathname()

  if (!item.children) {
    const isActive = pathname === item.href
    return (
      <li>
        <Link
          href={item.href}
          title={isCollapsed ? item.label : ''}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg motion-transition-default duration-200 ${
            isCollapsed ? 'w-11 h-11 mx-auto justify-center p-0' : ''
          } ${
            isActive
              ? 'bg-gama-primary text-gama-dark font-bold'
              : 'text-gama-text hover:bg-gama-surface/60'
          }`}
        >
          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{item.icon}</span>
          {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
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
        title={isCollapsed ? item.label : ''}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg motion-transition-default duration-200 w-full ${
          isCollapsed ? 'w-11 h-11 mx-auto justify-center p-0' : ''
        } ${
          anyChildActive || isOpen ? 'bg-gama-surface/70 text-gama-primary' : 'text-gama-text hover:bg-gama-surface/60'
        }`}
      >
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
            <ChevronDown
              size={16}
              className={`motion-transition-fast flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {isOpen && !isCollapsed && (
        <ul className="ml-6 mt-1.5 space-y-1 border-l border-gama-surface-accent pl-2">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={`block px-4 py-3 text-xs rounded motion-transition-default duration-200 ${
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

export function SideNav() {
  const { isHovered, setIsHovered, setIsDrawerOpen } = useSidenavContext()
  const [expanded, setExpanded] = useState(true)
  const isCollapsed = !isHovered && !expanded

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-4 left-4 lg:hidden z-40 w-11 h-11 flex items-center justify-center rounded-full bg-gama-surface/80 hover:bg-gama-surface motion-transition-default duration-200"
        aria-label="Open navigation"
      >
        <Menu size={24} className="text-gama-primary" />
      </button>

      {/* Desktop Sidebar */}
      <aside
        onMouseEnter={() => {
          if (!expanded) setIsHovered(true)
        }}
        onMouseLeave={() => {
          if (!expanded) setIsHovered(false)
        }}
        className={`hidden lg:block lg:fixed top-0 left-0 h-screen bg-gama-darker border-r border-gama-surface z-50 flex flex-col ${
          expanded ? 'w-64' : 'motion-transition-default duration-300 ease-in-out'
        } ${isCollapsed ? 'w-16' : 'w-64'}`}
      >
      {/* Header - Logo + Toggle */}
      <div className={`flex-shrink-0 px-3 py-5 border-b border-gama-surface flex items-center ${
        isCollapsed ? 'justify-center' : 'justify-between'
      }`}>
        {isCollapsed ? (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gama-surface/70 motion-transition-default duration-200">
            <Logo size="md" />
          </div>
        ) : (
          <Logo size="lg" withText />
        )}
        {!isCollapsed && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 p-2 hover:bg-gama-surface rounded transition-all"
            title={expanded ? 'Recolher' : 'Expandir'}
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {expanded ? (
              <ChevronLeft size={18} className="text-gama-primary" />
            ) : (
              <ChevronRight size={18} className="text-gama-primary" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavGroup key={item.label} item={item} isCollapsed={isCollapsed} />
          ))}
        </ul>
      </nav>

      {/* Reference Section */}
      {!isCollapsed && (
        <div className="flex-shrink-0 px-3 py-4 border-t border-gama-surface">
          <div className="p-3 bg-gama-surface/50 rounded-lg backdrop-blur-sm">
            <p className="text-xs text-gama-text-secondary mb-2.5 font-semibold">📖 Reference</p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="/tokens" className="text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200">
                  Design Tokens JSON
                </a>
              </li>
              <li>
                <a href="/components/atoms" className="text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200">
                  Component API
                </a>
              </li>
              <li>
                <a href="/tailwind-config" className="text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200">
                  Tailwind Config
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Brand Switcher */}
      <div className={`flex-shrink-0 px-3 py-3 border-t border-gama-surface ${isCollapsed ? 'flex justify-center' : ''}`}>
        <BrandSwitcher />
      </div>

      {/* Theme Toggle */}
      <div className={`flex-shrink-0 px-3 py-3 border-t border-gama-surface flex ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
        <ThemeToggle />
      </div>
    </aside>
    </>
  )
}
