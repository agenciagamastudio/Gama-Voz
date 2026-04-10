import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
}

type SortConfig = {
  key: string
  direction: 'asc' | 'desc'
} | null

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)

  // Sort data
  let sortedData = [...data]
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T]
      const bValue = b[sortConfig.key as keyof T]

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize)

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        }
      }
      return { key, direction: 'asc' }
    })
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gama-surface-accent">
              {columns.map((column) => (
                <th key={String(column.key)} className="px-6 py-3 text-left">
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(String(column.key))}
                      className="flex items-center gap-2 font-bold text-gama-text hover:text-gama-primary motion-transition-default"
                    >
                      {column.label}
                      {sortConfig?.key === String(column.key) &&
                        (sortConfig.direction === 'asc' ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </button>
                  ) : (
                    <span className="font-bold text-gama-text">{column.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={row.id || idx} className="border-b border-gama-surface-accent hover:bg-gama-surface/50 motion-transition-default">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 text-gama-text">
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-gama-text-secondary text-sm">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gama-surface border border-gama-surface-accent rounded-lg text-gama-text hover:border-gama-primary disabled:opacity-50 disabled:cursor-not-allowed motion-transition-default"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg motion-transition-default ${
                    currentPage === page
                      ? 'bg-gama-primary text-gama-dark font-bold'
                      : 'bg-gama-surface border border-gama-surface-accent text-gama-text hover:border-gama-primary'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gama-surface border border-gama-surface-accent rounded-lg text-gama-text hover:border-gama-primary disabled:opacity-50 disabled:cursor-not-allowed motion-transition-default"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
