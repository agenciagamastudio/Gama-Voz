'use client'

import React, { useState } from 'react'
import { LayoutDashboard, BarChart3, Settings, HelpCircle, Users, Wallet, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BarChart3, label: 'Relatórios & Análise', path: '/reports' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ]

  const secondaryItems = [
    { icon: HelpCircle, label: 'Suporte VIP', path: 'https://wa.me/5575981472503', isExternal: true },
  ]

  return (
    <aside 
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={cn(
        "bg-[var(--surface)] border-r border-[var(--border)] flex flex-col sticky top-0 h-screen z-40 glass shadow-2xl",
        "transition-[width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-[width]",
        expanded ? "w-[260px]" : "w-[80px]"
      )}
      style={{ transform: 'translateZ(0)' }} // Force GPU Layer
    >
      {/* Brand / Logo */}
      <div className="p-5 mb-4 flex items-center min-w-[260px]">
        <div className="logo-box flex-shrink-0">
          <span className="logo-text-furo">G</span>
        </div>
        <div className={cn("ml-4 transition-opacity duration-300", expanded ? "opacity-100" : "opacity-0")}>
          <h2 className="text-[var(--foreground)] font-black text-lg leading-tight tracking-tighter">GAMA</h2>
          <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Financeiro</p>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3 space-y-2 min-w-[260px]">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl font-extrabold text-sm transition-all duration-200 group/item",
                isActive 
                  ? "bg-white/10 text-[var(--primary)] border border-[var(--primary)]/20" 
                  : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--foreground)]"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110",
                isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
              )} />
              <span className={cn(
                "transition-opacity duration-300 whitespace-nowrap uppercase tracking-widest text-[10px]",
                expanded ? "opacity-100" : "opacity-0",
                isActive ? "text-[var(--primary)]" : ""
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 mt-auto border-t border-[var(--border)] min-w-[260px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-[var(--primary)] flex-shrink-0 border border-[var(--border)] shadow-inner">
            MQ
          </div>
          <div className={cn("transition-opacity duration-300 overflow-hidden", expanded ? "opacity-100" : "opacity-0")}>
            <p className="text-[10px] font-black text-[var(--foreground)] truncate uppercase">Matheus Q.</p>
            <p className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Master CEO</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
