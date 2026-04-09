'use client'

import React from 'react'
import Card from '@/components/atoms/Card'

interface NordRecommendation {
  id: string
  recommendedTopic: string
  focusArea: string
  confidenceScore: number
  timeBlocks: string[]
  createdAt: string
}

interface NordRecommendationPanelProps {
  recommendation: NordRecommendation | null
  loading?: boolean
}

export default function NordRecommendationPanel({
  recommendation,
  loading = false,
}: NordRecommendationPanelProps) {
  const confidencePercentage = Math.round((recommendation?.confidenceScore || 0) * 100)

  const getConfidenceColor = (score: number) => {
    if (score >= 0.85) return 'text-gama-success'
    if (score >= 0.7) return 'text-gama-primary'
    return 'text-gama-warning'
  }

  if (loading) {
    return (
      <Card className="mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gama-surface rounded w-3/4 mb-4" />
          <div className="h-4 bg-gama-surface rounded w-1/2" />
        </div>
      </Card>
    )
  }

  if (!recommendation) {
    return (
      <Card className="mb-8 border border-dashed border-gama-primary opacity-50">
        <p className="text-gama-text-secondary text-center py-8">
          Nenhuma recomendação NORD disponível ainda. Inicie uma conversa com Jarvis!
        </p>
      </Card>
    )
  }

  return (
    <Card className="mb-8 border-l-4 border-l-gama-primary">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Recommendation */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black text-gama-primary mb-6">Recomendação de Hoje</h2>

          <div className="bg-gama-surface rounded-lg p-6 mb-6">
            <p className="text-sm text-gama-text-secondary uppercase tracking-wider mb-2">
              Área de Foco
            </p>
            <h3 className="text-3xl font-black text-gama-primary mb-4">
              {recommendation.focusArea}
            </h3>

            <p className="text-sm text-gama-text-secondary uppercase tracking-wider mb-2">
              Tópico Recomendado
            </p>
            <p className="text-xl font-bold text-gama-text mb-6">{recommendation.recommendedTopic}</p>

            {/* Confidence Score */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gama-text">Confiança da Recomendação</span>
                <span className={`text-lg font-black ${getConfidenceColor(recommendation.confidenceScore)}`}>
                  {confidencePercentage}%
                </span>
              </div>
              <div className="w-full bg-gama-dark rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    recommendation.confidenceScore >= 0.85
                      ? 'bg-gama-success'
                      : recommendation.confidenceScore >= 0.7
                        ? 'bg-gama-primary'
                        : 'bg-gama-warning'
                  }`}
                  style={{ width: `${confidencePercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Rationale */}
          <div className="bg-gama-surface rounded-lg p-4">
            <p className="text-xs text-gama-text-secondary uppercase tracking-wider mb-2">
              Por que essa recomendação?
            </p>
            <p className="text-sm text-gama-text leading-relaxed">
              Com base na sua conversa matinal (energia, disponibilidade de tempo e áreas de interesse),
              o NORD identificou que <strong>{recommendation.focusArea}</strong> é sua melhor área de
              foco para hoje. Este é um ótimo momento para aprender{' '}
              <strong>{recommendation.recommendedTopic}</strong>.
            </p>
          </div>
        </div>

        {/* Time Blocks */}
        <div>
          <h3 className="text-lg font-black text-gama-primary mb-4">Blocos de Tempo</h3>

          <div className="space-y-3">
            {recommendation.timeBlocks.map((block, idx) => (
              <div
                key={idx}
                className="bg-gama-surface rounded-lg p-4 border-l-4 border-l-gama-primary hover:bg-gama-dark transition-all"
              >
                <p className="text-lg font-black text-gama-primary">{block}</p>
                <p className="text-xs text-gama-text-secondary mt-1">
                  {idx === 0 ? 'Melhor horário' : 'Horário alternativo'}
                </p>
              </div>
            ))}
          </div>

          {/* Updated At */}
          <p className="text-xs text-gama-text-secondary mt-6 text-center">
            Atualizado em{' '}
            {new Date(recommendation.createdAt).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </Card>
  )
}
