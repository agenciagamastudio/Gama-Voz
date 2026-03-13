'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Layers, Box, Palette, Code, Menu } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { useSidenavContext } from './SidenavContext'

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
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
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
        title={isCollapsed ? item.label : ''}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 w-full ${
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
              className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
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
                className={`block px-4 py-3 text-xs rounded transition-colors duration-200 ${
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
  const isCollapsed = !isHovered

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-4 left-4 lg:hidden z-40 w-10 h-10 flex items-center justify-center rounded-full bg-gama-surface/80 hover:bg-gama-surface transition-colors duration-200"
        aria-label="Open navigation"
      >
        <Menu size={24} className="text-gama-primary" />
      </button>

      {/* Desktop Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden lg:fixed top-0 left-0 h-screen bg-gama-darker border-r border-gama-surface z-50 transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
      {/* Header - Logo */}
      <div className="flex-shrink-0 px-3 py-5 border-b border-gama-surface">
        {isCollapsed ? (
          <Link
            href="/landing"
            title="GAMA - Ir para Home"
            className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center hover:bg-gama-surface/70 transition-colors duration-200 block"
          >
            <svg className="w-8 h-8 text-gama-primary" viewBox="0 0 545 529" fill="currentColor">
              <path d="M186.101364,155.048157 C186.052231,159.878113 185.960907,164.708054 185.960266,169.538010 C185.951004,239.196609 185.953934,308.855225 185.953934,378.513824 C185.953934,380.496277 185.953934,382.478729 185.953934,384.855164 C250.404602,384.855164 314.594299,384.855164 379.107330,384.855164 C379.107330,320.693756 379.107330,256.619812 379.107330,192.199432 C357.878235,192.199432 336.665436,192.199432 315.073639,192.199432 C315.073639,234.962036 315.073639,277.563446 315.073639,320.527222 C293.478058,320.527222 272.256531,320.527222 250.694885,320.527222 C250.694885,256.243073 250.694885,192.013428 250.694885,127.473991 C252.155670,127.360100 253.433334,127.173851 254.711060,127.173424 C296.039612,127.159546 337.368622,127.046242 378.696564,127.203560 C409.548981,127.320999 435.891846,148.246017 442.446442,177.706879 C443.521301,182.538040 443.931519,187.609940 443.938965,192.571640 C444.035217,256.564087 444.058685,320.556824 443.981140,384.549316 C443.936371,421.505493 415.789429,449.818634 378.850220,449.895050 C315.024506,450.027069 251.198318,449.986359 187.372467,449.913208 C149.472687,449.869751 121.477013,421.932739 121.332306,383.889160 C121.172569,341.894623 121.300941,299.899048 121.289497,257.903900 C121.280243,223.908646 121.249771,189.913406 121.577271,155.448273 C143.317673,155.001663 164.709518,155.024918 186.101364,155.048157 z" />
              <path d="M186.563293,155.028473 C164.709518,155.024918 143.317673,155.001663 121.456833,154.993698 C113.900452,155.008987 106.813065,155.008987 98.827560,155.008987 C117.203934,127.445038 135.062943,100.657104 153.308411,73.289505 C171.498291,100.624733 189.313019,127.396194 207.687454,155.008774 C200.174530,155.008774 193.599884,155.008774 186.563293,155.028473 z" />
            </svg>
          </Link>
        ) : (
          <Link href="/landing" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-gama-primary" viewBox="0 0 545 529" fill="currentColor">
                <path d="M186.101364,155.048157 C186.052231,159.878113 185.960907,164.708054 185.960266,169.538010 C185.951004,239.196609 185.953934,308.855225 185.953934,378.513824 C185.953934,380.496277 185.953934,382.478729 185.953934,384.855164 C250.404602,384.855164 314.594299,384.855164 379.107330,384.855164 C379.107330,320.693756 379.107330,256.619812 379.107330,192.199432 C357.878235,192.199432 336.665436,192.199432 315.073639,192.199432 C315.073639,234.962036 315.073639,277.563446 315.073639,320.527222 C293.478058,320.527222 272.256531,320.527222 250.694885,320.527222 C250.694885,256.243073 250.694885,192.013428 250.694885,127.473991 C252.155670,127.360100 253.433334,127.173851 254.711060,127.173424 C296.039612,127.159546 337.368622,127.046242 378.696564,127.203560 C409.548981,127.320999 435.891846,148.246017 442.446442,177.706879 C443.521301,182.538040 443.931519,187.609940 443.938965,192.571640 C444.035217,256.564087 444.058685,320.556824 443.981140,384.549316 C443.936371,421.505493 415.789429,449.818634 378.850220,449.895050 C315.024506,450.027069 251.198318,449.986359 187.372467,449.913208 C149.472687,449.869751 121.477013,421.932739 121.332306,383.889160 C121.172569,341.894623 121.300941,299.899048 121.289497,257.903900 C121.280243,223.908646 121.249771,189.913406 121.577271,155.448273 C143.317673,155.001663 164.709518,155.024918 186.101364,155.048157 z" />
                <path d="M186.563293,155.028473 C164.709518,155.024918 143.317673,155.001663 121.456833,154.993698 C113.900452,155.008987 106.813065,155.008987 98.827560,155.008987 C117.203934,127.445038 135.062943,100.657104 153.308411,73.289505 C171.498291,100.624733 189.313019,127.396194 207.687454,155.008774 C200.174530,155.008774 193.599884,155.008774 186.563293,155.028473 z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gama-text-secondary truncate">GAMA</p>
              <p className="text-xs text-gama-text-secondary truncate">Design System</p>
              <p className="text-xs text-gama-text-muted mt-0.5">v1.0.0</p>
            </div>
          </Link>
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
      )}

      {/* Theme Toggle */}
      <div className={`flex-shrink-0 px-3 py-3 border-t border-gama-surface flex ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
        <ThemeToggle />
      </div>
    </aside>
    </>
  )
}
