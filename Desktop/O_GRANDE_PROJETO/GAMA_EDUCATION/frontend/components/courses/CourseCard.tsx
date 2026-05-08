import { ReactNode } from 'react'
import Link from 'next/link'
import { Card } from '../atoms/Card'
import { Button } from '../atoms/Button'
import { LessonProgressBar } from './LessonProgressBar'

interface CourseCardProps {
  courseId: string
  slug: string
  title: string
  description?: string
  thumbnailUrl?: string
  totalDurationMinutes?: number
  isCompleted?: boolean
  completedLessonCount?: number
  totalLessonCount?: number
  children?: ReactNode
}

export function CourseCard({
  slug,
  title,
  description,
  thumbnailUrl,
  totalDurationMinutes = 0,
  isCompleted = false,
  completedLessonCount = 0,
  totalLessonCount = 0,
}: CourseCardProps) {
  const progressPercentage = totalLessonCount > 0 ? (completedLessonCount / totalLessonCount) * 100 : 0
  const formattedDuration = totalDurationMinutes > 0 ? `${totalDurationMinutes}m` : 'Sem duração'
  const isInProgress = completedLessonCount > 0 && !isCompleted

  const buttonText = isCompleted ? 'Revisar' : isInProgress ? 'Continuar' : 'Começar'

  return (
    <Link href={`/cursinhos/${slug}`}>
      <Card variant="elevated" className="h-full hover:scale-105 cursor-pointer transition-transform">
        {thumbnailUrl && (
          <div className="mb-4 -mx-6 -mt-6 mb-4 h-48 overflow-hidden rounded-t-2xl bg-gama-surface">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <h3 className="text-2xl font-bold text-gama-text mb-2 line-clamp-2">{title}</h3>

        {description && (
          <p className="text-gama-text-secondary text-sm mb-4 line-clamp-2">{description}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gama-text-secondary mb-4">
          <span>⏱️ {formattedDuration}</span>
          {totalLessonCount > 0 && (
            <span>📚 {totalLessonCount} aulas</span>
          )}
        </div>

        {totalLessonCount > 0 && (
          <>
            <LessonProgressBar completed={completedLessonCount} total={totalLessonCount} className="mb-4" />
          </>
        )}

        <div className="mt-6 flex gap-2">
          <Button variant="primary" size="md" className="flex-1">
            {buttonText}
          </Button>
        </div>
      </Card>
    </Link>
  )
}

export default CourseCard
