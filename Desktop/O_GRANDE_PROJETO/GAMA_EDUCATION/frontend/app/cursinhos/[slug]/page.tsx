'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import YouTubeEmbed from '@/components/courses/YouTubeEmbed'
import ModuleAccordion from '@/components/courses/ModuleAccordion'
import LessonProgressBar from '@/components/courses/LessonProgressBar'
import Button from '@/components/atoms/Button'

interface Lesson {
  id: string
  title: string
  order: number
  duration_minutes: number
}

interface Module {
  id: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

interface Course {
  id: string
  slug: string
  title: string
  description: string
  youtube_url: string
  total_duration_minutes: number
}

interface CourseProgress {
  progress: {
    id: string
    started_at: string
    last_accessed_at: string
  } | null
  completedLessonIds: string[]
}

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [course, setCourse] = useState<Course | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [progress, setProgress] = useState<CourseProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourseData()
  }, [slug])

  const fetchCourseData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/${slug}`)
      if (!res.ok) throw new Error('Curso não encontrado')

      const data = await res.json()
      setCourse(data.course ?? data)
      setModules(data.modules || data.course?.modules || [])

      // Fetch progress if user is authenticated
      const token = localStorage.getItem('token')
      if (token) {
        const progressRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses/${slug}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (progressRes.ok) {
          const progressData = await progressRes.json()
          setProgress(progressData)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar curso')
      console.error('Error fetching course:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gama-text-secondary">Carregando curso...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gama-text mb-2">Curso não encontrado</h1>
          <p className="text-gama-text-secondary">{error}</p>
        </div>
      </div>
    )
  }

  const videoId = course.youtube_url?.split('/').pop() || ''
  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)
  const completedLessonCount = progress?.completedLessonIds?.length || 0

  return (
    <div className="min-h-screen bg-gama-dark">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <a href="/cursinhos" className="text-gama-primary hover:brightness-110 mb-8 inline-block">
          ← Voltar aos cursos
        </a>

        {/* Video */}
        {videoId && (
          <div className="mb-12">
            <YouTubeEmbed videoId={videoId} title={course.title} />
          </div>
        )}

        {/* Course Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gama-text mb-4">
            {course.title}
          </h1>
          {course.description && (
            <p className="text-lg text-gama-text-secondary mb-6">
              {course.description}
            </p>
          )}

          {/* Course Meta */}
          <div className="flex flex-wrap gap-6 mb-6 text-sm text-gama-text-secondary">
            <span>⏱️ {course.total_duration_minutes}min</span>
            <span>📚 {totalLessons} aulas</span>
            <span>📦 {modules.length} módulos</span>
          </div>

          {/* Progress */}
          {totalLessons > 0 && (
            <LessonProgressBar
              completed={completedLessonCount}
              total={totalLessons}
              className="max-w-md"
            />
          )}
        </div>

        {/* Modules */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gama-text mb-6">
            📖 Módulos
          </h2>

          {modules.length > 0 ? (
            <div className="space-y-4">
              {modules.map((module, index) => (
                <ModuleAccordion
                  key={module.id}
                  moduleId={module.id}
                  courseSlug={slug}
                  moduleNumber={index + 1}
                  title={module.title}
                  description={module.description}
                  lessons={module.lessons || []}
                  completedLessonIds={progress?.completedLessonIds || []}
                />
              ))}
            </div>
          ) : (
            <p className="text-gama-text-secondary">Nenhum módulo disponível.</p>
          )}
        </div>
      </div>
    </div>
  )
}
