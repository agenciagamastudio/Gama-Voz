import { ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {crumb.href ? (
                <a href={crumb.href} className="text-gama-primary hover:underline text-sm">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-gama-text-secondary text-sm">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="text-gama-text-secondary" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Header Content */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gama-text mb-2">{title}</h1>
          {description && <p className="text-gama-text-secondary">{description}</p>}
        </div>

        {/* Actions */}
        {actions && <div className="flex gap-3">{actions}</div>}
      </div>
    </div>
  )
}
