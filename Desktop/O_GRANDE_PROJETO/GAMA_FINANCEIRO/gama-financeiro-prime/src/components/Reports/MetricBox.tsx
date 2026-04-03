'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MetricBoxProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'stable' | null
  trendValue?: string | number
  trendLabel?: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  onClick?: () => void
  interactive?: boolean
  tooltip?: string
}

const variantStyles = {
  default: 'bg-[var(--surface)] border-white/10 text-[var(--foreground)]',
  success: 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]',
  warning: 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B]',
  error: 'bg-[#E11D48]/10 border-[#E11D48]/30 text-[#E11D48]',
  info: 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]',
}

const sizeStyles = {
  sm: {
    container: 'p-4 rounded-xl',
    label: 'text-xs',
    value: 'text-2xl',
    icon: 'w-6 h-6',
  },
  md: {
    container: 'p-6 rounded-2xl',
    label: 'text-sm',
    value: 'text-4xl',
    icon: 'w-8 h-8',
  },
  lg: {
    container: 'p-8 rounded-2xl',
    label: 'text-base',
    value: 'text-5xl',
    icon: 'w-10 h-10',
  },
}

export function MetricBox({
  label,
  value,
  icon,
  trend,
  trendValue,
  trendLabel,
  variant = 'default',
  size = 'md',
  loading = false,
  prefix,
  suffix,
  decimals,
  className,
  onClick,
  interactive = false,
  tooltip,
}: MetricBoxProps) {
  const styles = sizeStyles[size]

  // Format value if it's a number
  const formattedValue = React.useMemo(() => {
    if (typeof value === 'number' && decimals !== undefined) {
      return value.toFixed(decimals)
    }
    return value
  }, [value, decimals])

  const displayValue = `${prefix || ''}${formattedValue}${suffix || ''}`

  const trendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null

  return (
    <div
      className={cn(
        'border transition-all duration-200',
        styles.container,
        variantStyles[variant],
        interactive && 'hover:shadow-lg hover:border-[var(--primary)]/50',
        onClick && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : 'region'}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClick()
              }
            }
          : undefined
      }
      title={tooltip}
      aria-label={`${label}: ${displayValue}`}
    >
      <div className="space-y-3">
        {/* Header with icon and label */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={cn(
              'font-semibold text-[var(--text-secondary)] uppercase tracking-wide',
              styles.label
            )}>
              {label}
            </p>
          </div>

          {icon && (
            <div className={cn(
              'flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity',
              styles.icon
            )}>
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        {loading ? (
          <div className={cn(
            'h-12 bg-white/5 rounded animate-pulse',
            size === 'sm' && 'h-8',
            size === 'lg' && 'h-16'
          )} />
        ) : (
          <div className={cn(
            'font-bold tracking-tight',
            styles.value
          )}>
            {displayValue}
          </div>
        )}

        {/* Trend indicator */}
        {(trend || trendValue) && (
          <div className="flex items-center gap-1 text-xs font-bold">
            {trendIcon && (
              <>
                {React.createElement(trendIcon as React.ComponentType<any>, {
                  className: cn(
                    'w-4 h-4 flex-shrink-0',
                    trend === 'up' && 'text-[#10B981]',
                    trend === 'down' && 'text-[#E11D48]',
                    trend === 'stable' && 'text-[var(--text-secondary)]'
                  )
                })}
              </>
            )}

            {trendValue && (
              <span className={cn(
                'font-bold',
                trend === 'up' && 'text-[#10B981]',
                trend === 'down' && 'text-[#E11D48]',
                trend === 'stable' && 'text-[var(--text-secondary)]'
              )}>
                {trendValue}
              </span>
            )}

            {trendLabel && (
              <span className="text-[var(--text-secondary)]">{trendLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
