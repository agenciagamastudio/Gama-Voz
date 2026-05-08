'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import YouTubeEmbed from '@/components/courses/YouTubeEmbed'
import MarkdownRenderer from '@/components/courses/MarkdownRenderer'
import Button from '@/components/atoms/Button'

interface Lesson {
  id: string
  title: string
  order: number
  duration_minutes: number
  content_markdown: string
  youtube_start_seconds: number
  youtube_end_seconds?: number
  module_title: string
  module_order: number
  course_youtube_url: string
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const lessonId = params.lessonId as string

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isMarking, setIsMarking] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLesson()
  }, [slug, lessonId])

  const fetchLesson = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/${slug}/lessons/${lessonId}`
      )
      if (!res.ok) throw new Error('Aula não encontrada')

      const data = await res.json()
      setLesson(data.lesson ?? data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar aula')
      console.error('Error fetching lesson:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsComplete = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    setIsMarking(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/${slug}/lessons/${lessonId}/complete`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (!res.ok) throw new Error('Erro ao marcar aula como completa')

      setIsCompleted(true)
    } catch (err) {
      console.error('Error marking lesson complete:', err)
    } finally {
      setIsMarking(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gama-text-secondary">Carregando aula...</div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gama-text mb-2">Aula não encontrada</h1>
          <p className="text-gama-text-secondary">{error}</p>
        </div>
      </div>
    )
  }

  const videoId = lesson.course_youtube_url?.split('/').pop() || ''

  return (
    <div className="min-h-screen bg-gama-dark">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <a
            href={`/cursinhos/${slug}`}
            className="text-gama-primary hover:brightness-110 transition-all"
          >
            ← Voltar ao curso
          </a>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video & Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            {videoId && (
              <div className="mb-8">
                <YouTubeEmbed
                  videoId={videoId}
                  startSeconds={lesson.youtube_start_seconds}
                  endSeconds={lesson.youtube_end_seconds}
                  title={lesson.title}
                />
              </div>
            )}

            {/* Lesson Title */}
            <h1 className="text-4xl font-black text-gama-text mb-4">
              {lesson.title}
            </h1>

            {/* Lesson Meta */}
            <div className="flex items-center gap-4 mb-8 text-sm text-gama-text-secondary">
              <span>⏱️ {lesson.duration_minutes}min</span>
              <span>📍 {lesson.module_title}</span>
            </div>

            {/* Lesson Content */}
            <div className="mb-12 prose-style">
              {lesson.content_markdown ? (
                <MarkdownRenderer content={lesson.content_markdown} />
              ) : (
                <p className="text-gama-text-secondary">Nenhum conteúdo disponível.</p>
              )}
            </div>

            {/* Action */}
            <div className="flex gap-4">
              <Button
                variant={isCompleted ? 'secondary' : 'primary'}
                size="lg"
                onClick={handleMarkAsComplete}
                disabled={isCompleted || isMarking}
              >
                {isCompleted ? '✅ Aula concluída' : isMarking ? 'Marcando...' : 'Marcar como completa'}
              </Button>
            </div>
          </div>

          {/* Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-gama-surface border border-gama-surface-accent rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gama-text mb-4">
                  📚 Navegação
                </h3>

                <div className="space-y-2 text-sm">
                  {isCompleted && (
                    <div className="bg-gama-primary/20 border border-gama-primary rounded p-3 text-gama-primary font-medium mb-4">
                      ✅ Aula concluída!
                    </div>
                  )}

                  <div>
                    <p className="text-gama-text-secondary font-medium">
                      {lesson.module_title}
                    </p>
                    <p className="text-gama-text-secondary text-xs mt-1">
                      Aula {lesson.order}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gama-surface-accent">
                    <p className="text-gama-text-secondary text-xs mb-3">
                      Dica: Use os links no conteúdo para navegação rápida
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
