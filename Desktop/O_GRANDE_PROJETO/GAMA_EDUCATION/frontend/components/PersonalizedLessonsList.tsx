'use client'

import React from 'react'
import Card from '@/components/atoms/Card'

interface Lesson {
  id: string
  title: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  xpReward: number
}

interface PersonalizedLessonsListProps {
  lessons: Lesson[]
  focusArea: string
  totalEstimatedTime?: number
  loading?: boolean
}

export default function PersonalizedLessonsList({
  lessons,
  focusArea,
  totalEstimatedTime = 0,
  loading = false,
}: PersonalizedLessonsListProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-gama-success text-gama-dark'
      case 'intermediate':
        return 'bg-gama-primary text-gama-dark'
      case 'advanced':
        return 'bg-gama-warning text-gama-dark'
      default:
        return 'bg-gama-surface text-gama-text'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Iniciante'
      case 'intermediate':
        return 'Intermediário'
      case 'advanced':
        return 'Avançado'
      default:
        return difficulty
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gama-surface rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (lessons.length === 0) {
    return (
      <Card className="border border-dashed border-gama-primary opacity-50">
        <p className="text-gama-text-secondary text-center py-8">
          Nenhuma lição personalizada disponível para {focusArea}
        </p>
      </Card>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gama-primary mb-2">Aulas Recomendadas</h2>
        <p className="text-gama-text-secondary">
          {lessons.length} lição{lessons.length !== 1 ? 's' : ''} em{' '}
          <span className="text-gama-primary font-bold">{focusArea}</span>
        </p>
        {totalEstimatedTime > 0 && (
          <p className="text-gama-text-secondary text-sm mt-2">
            ⏱️ Tempo total estimado: <span className="font-bold">{totalEstimatedTime} minutos</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson, idx) => (
          <Card
            key={lesson.id}
            className="hover:shadow-lg hover:shadow-gama-primary/20 transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-black px-2 py-1 rounded ${getDifficultyColor(lesson.difficulty)}`}>
                    {getDifficultyLabel(lesson.difficulty)}
                  </span>
                  <span className="text-xs text-gama-text-secondary">{lesson.category}</span>
                </div>
                <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                  {lesson.title}
                </h3>
              </div>

              {/* Lesson Number Badge */}
              <div className="text-right">
                <div className="w-10 h-10 rounded-full bg-gama-primary text-gama-dark flex items-center justify-center font-black text-lg">
                  {idx + 1}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-4 border-t border-gama-surface">
              <div>
                <p className="text-xs text-gama-text-secondary mb-1">⏱️ Duração</p>
                <p className="text-lg font-black text-gama-primary">{lesson.estimatedMinutes}min</p>
              </div>

              <div>
                <p className="text-xs text-gama-text-secondary mb-1">⭐ XP</p>
                <p className="text-lg font-black text-gama-primary">+{lesson.xpReward}</p>
              </div>

              <div className="ml-auto">
                <p className="text-xs text-gama-text-secondary mb-1">Iniciar</p>
                <button className="text-2xl group-hover:scale-110 transition-transform">→</button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="mt-8 bg-gradient-to-r from-gama-primary/10 to-gama-primary/5 border-l-4 border-l-gama-primary">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-gama-text-secondary text-sm mb-2">Total de Aulas</p>
            <p className="text-3xl font-black text-gama-primary">{lessons.length}</p>
          </div>
          <div>
            <p className="text-gama-text-secondary text-sm mb-2">XP Total</p>
            <p className="text-3xl font-black text-gama-primary">
              +{lessons.reduce((sum, l) => sum + l.xpReward, 0)}
            </p>
          </div>
          <div>
            <p className="text-gama-text-secondary text-sm mb-2">Tempo Total</p>
            <p className="text-3xl font-black text-gama-primary">{totalEstimatedTime}min</p>
          </div>
        </div>

        <p className="text-gama-text-secondary text-center mt-6 text-sm">
          Comece agora e acompanhe seu progresso! Cada lição concluída desbloqueará novos conteúdos.
        </p>
      </Card>
    </div>
  )
}
