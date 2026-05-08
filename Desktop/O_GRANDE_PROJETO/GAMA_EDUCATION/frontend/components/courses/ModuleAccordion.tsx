'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '../atoms/Card'

interface Lesson {
  id: string
  title: string
  order: number
  duration_minutes?: number
}

interface ModuleAccordionProps {
  moduleId: string
  courseSlug: string
  moduleNumber: number
  title: string
  description?: string
  lessons: Lesson[]
  completedLessonIds?: string[]
}

export function ModuleAccordion({
  courseSlug,
  moduleNumber,
  title,
  description,
  lessons,
  completedLessonIds = [],
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length
  const totalCount = lessons.length

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
      >
        <Card
          variant="outlined"
          className="cursor-pointer hover:border-gama-primary transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gama-primary">
                  {isOpen ? '▼' : '▶'}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gama-text">
                    Módulo {moduleNumber} — {title}
                  </h3>
                  {description && (
                    <p className="text-sm text-gama-text-secondary mt-1">{description}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right text-sm text-gama-text-secondary ml-4">
              <div>
                {completedCount}/{totalCount} aulas
              </div>
              <div className="h-1.5 w-12 bg-gama-surface rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-gama-primary"
                  style={{
                    width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%',
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
      </button>

      {isOpen && (
        <div className="mt-2 ml-6 space-y-2 border-l-2 border-gama-primary/30 pl-4">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.includes(lesson.id)
            const lessonNumber = index + 1

            return (
              <Link
                key={lesson.id}
                href={`/cursinhos/${courseSlug}/${lesson.id}`}
              >
                <div
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-gama-surface border-gama-primary/50 hover:border-gama-primary'
                      : 'bg-gama-dark border-gama-surface-accent hover:border-gama-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {isCompleted ? '✅' : '○'}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gama-text">
                        {moduleNumber}.{lessonNumber} {lesson.title}
                      </h4>
                      {lesson.duration_minutes && (
                        <p className="text-xs text-gama-text-secondary mt-0.5">
                          ⏱️ {lesson.duration_minutes}min
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ModuleAccordion
