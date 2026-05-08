interface LessonProgressBarProps {
  completed: number
  total: number
  className?: string
  showLabel?: boolean
}

export function LessonProgressBar({
  completed,
  total,
  className = '',
  showLabel = true,
}: LessonProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gama-text">Progresso</span>
          <span className="text-sm text-gama-text-secondary">
            {completed}/{total} aulas
          </span>
        </div>
      )}

      <div className="w-full bg-gama-surface rounded-full h-3 overflow-hidden border border-gama-surface-accent">
        <div
          className="h-full bg-gama-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-xs text-gama-text-secondary mt-1">
        {Math.round(percentage)}% concluído
      </div>
    </div>
  )
}

export default LessonProgressBar
