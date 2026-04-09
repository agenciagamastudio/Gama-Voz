'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/atoms/Button'
import CloneProfileCard from '@/components/CloneProfileCard'
import NordRecommendationPanel from '@/components/NordRecommendationPanel'
import PersonalizedLessonsList from '@/components/PersonalizedLessonsList'
import { useGamaIntegration } from '@/hooks/useGamaIntegration'

export default function IntegratedDashboard() {
  const router = useRouter()
  const {
    cloneProfile,
    nordRecommendation,
    personalizedEducation,
    loading,
    error,
    initializeIntegration,
  } = useGamaIntegration()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (!token || !userId) {
      router.push('/auth/login')
      return
    }

    // Initialize integration on mount
    initializeIntegration()
  }, [router, initializeIntegration])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    router.push('/auth/login')
  }

  if (loading && !cloneProfile) {
    return (
      <div className="min-h-screen bg-gama-dark flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-gama-primary text-4xl font-black mb-4">GAMA EDUCAÇÃO</div>
          <p className="text-gama-text-secondary">Carregando seu perfil...</p>
        </div>
      </div>
    )
  }

  if (!cloneProfile) return null

  return (
    <div className="min-h-screen bg-gama-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-gama-primary">GAMA Educação</h1>
          <Button variant="ghost" size="md" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Clone Profile Card */}
        <CloneProfileCard
          name={cloneProfile.name}
          email={cloneProfile.email}
          avatar={cloneProfile.avatar}
          level={cloneProfile.level}
          xp={cloneProfile.xp}
          behavioralProfile={cloneProfile.behavioralProfile}
        />

        {/* Nord Recommendation Panel */}
        <NordRecommendationPanel
          recommendation={nordRecommendation}
          loading={loading && !nordRecommendation}
        />

        {/* Personalized Lessons */}
        {personalizedEducation && (
          <PersonalizedLessonsList
            lessons={personalizedEducation.recommendedTopics}
            focusArea={personalizedEducation.focusArea}
            totalEstimatedTime={personalizedEducation.totalEstimatedTime}
            loading={loading && !personalizedEducation}
          />
        )}

        {/* Info Banner */}
        <div className="mt-12 p-6 bg-gama-primary/10 border border-gama-primary rounded-lg">
          <h3 className="text-lg font-black text-gama-primary mb-3">🚀 Próximas Integrações</h3>
          <ul className="text-gama-text-secondary text-sm space-y-2">
            <li>✓ Integração com GAMA Jarvis (conversa matinal)</li>
            <li>✓ Análise NORD automática (descoberta vocacional)</li>
            <li>⏳ Dashboard de progresso em tempo real</li>
            <li>⏳ Sincronização com achievements e badges</li>
            <li>⏳ Recomendações personalizadas por dia</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
