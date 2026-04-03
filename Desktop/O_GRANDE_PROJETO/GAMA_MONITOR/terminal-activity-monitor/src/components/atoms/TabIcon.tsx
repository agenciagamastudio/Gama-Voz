'use client'

import clsx from 'clsx'

interface TabIconProps {
  label: string
  icon: string
  isActive: boolean
  onClick: () => void
}

export default function TabIcon({ label, icon, isActive, onClick }: TabIconProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-2 px-6 py-4 transition-all duration-200',
        'border-b-2 cursor-pointer hover:brightness-110',
        isActive
          ? 'border-kinetic-limon text-kinetic-limon'
          : 'border-transparent text-text-secondary hover:text-text-primary'
      )}
      aria-selected={isActive}
      role="tab"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-geist font-medium">{label}</span>
    </button>
  )
}
