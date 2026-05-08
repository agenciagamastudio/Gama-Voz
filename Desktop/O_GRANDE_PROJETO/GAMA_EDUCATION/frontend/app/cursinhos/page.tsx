'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CourseCard from '@/components/courses/CourseCard'

interface Course {
  id: string
  slug: string
  title: string
  description: string
  thumbnail_url: string
  total_duration_minutes: number
}

export default function CursinhosHub() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses`)
      if (!res.ok) throw new Error('Failed to fetch courses')

      const data = await res.json()
      setCourses(Array.isArray(data) ? data : (data.courses || []))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cursos')
      console.error('Error fetching courses:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gama-text-secondary">Carregando cursos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gama-dark">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gama-text mb-4">
              🎓 Cursinhos GAMA
            </h1>
            <p className="text-lg text-gama-text-secondary">
              Aprenda com conteúdo curado e pratique o que estudou
            </p>
          </div>
          <a
            href="/cursinhos/certificados"
            className="flex items-center gap-2 bg-gama-surface border border-gama-surface-accent px-5 py-3 rounded-xl text-gama-text hover:border-gama-primary transition-colors text-sm font-semibold"
          >
            🏆 Meus Certificados
          </a>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-gama-error/20 border border-gama-error rounded-lg p-4 mb-8 text-gama-error">
            {error}
          </div>
        )}

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                courseId={course.id}
                slug={course.slug}
                title={course.title}
                description={course.description}
                thumbnailUrl={course.thumbnail_url}
                totalDurationMinutes={course.total_duration_minutes}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gama-text-secondary text-lg">
              Nenhum curso disponível no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
