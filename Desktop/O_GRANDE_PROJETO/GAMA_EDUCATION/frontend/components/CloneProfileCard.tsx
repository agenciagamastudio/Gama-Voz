'use client'

import React from 'react'
import Card from '@/components/atoms/Card'

interface BehavioralProfile {
  userId: string
  prehd: {
    precisao: number
    responsabilidade: number
    engajamento: number
    humanidade: number
    dinamismo: number
  }
  sonhar: {
    sensoOportunidade: number
    ousadia: number
    navegacaoIncerteza: number
    humanidade: number
    aprendizado: number
    resultado: number
  }
  brainWarfare: {
    ataque: number
    defesa: number
    suporte: number
  }
  personalityTraits: {
    autonomy: number
    innovation: number
    leadership: number
    documentation: number
  }
  dailyStrengthArea: string
  specialties: string[]
}

interface CloneProfileProps {
  name: string
  email: string
  avatar: string
  level: number
  xp: number
  behavioralProfile: BehavioralProfile
}

export default function CloneProfileCard({
  name,
  email,
  avatar,
  level,
  xp,
  behavioralProfile,
}: CloneProfileProps) {
  const traitPercentage = (value: number) => Math.round(value * 100)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Profile Info */}
      <Card className="lg:col-span-1">
        <div className="text-center">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gama-primary"
          />
          <h3 className="text-lg font-black text-gama-text mb-1">{name}</h3>
          <p className="text-sm text-gama-text-secondary mb-4">{email}</p>

          <div className="bg-gama-surface rounded p-3 mb-4">
            <p className="text-xs text-gama-text-secondary">Nível</p>
            <p className="text-2xl font-black text-gama-primary">{level}</p>
          </div>

          <div className="text-xs text-gama-text-secondary">
            <p className="mb-1">XP Total: {xp}</p>
            <p>Força do Dia: {behavioralProfile.dailyStrengthArea}</p>
          </div>
        </div>
      </Card>

      {/* Personality Traits */}
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-black text-gama-primary mb-4">Traços de Personalidade</h3>

        <div className="space-y-4">
          {Object.entries(behavioralProfile.personalityTraits).map(([key, value]) => {
            const label =
              key === 'autonomy'
                ? 'Autonomia'
                : key === 'innovation'
                  ? 'Inovação'
                  : key === 'leadership'
                    ? 'Liderança'
                    : 'Documentação'

            return (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gama-text">{label}</span>
                  <span className="text-sm text-gama-primary font-bold">
                    {traitPercentage(value)}%
                  </span>
                </div>
                <div className="w-full bg-gama-surface rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gama-primary transition-all duration-300"
                    style={{ width: `${traitPercentage(value)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* PREHD Framework */}
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-black text-gama-primary mb-4">PREHD (Comportamento)</h3>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(behavioralProfile.prehd).map(([key, value]) => {
            const label =
              key === 'precisao'
                ? 'Precisão'
                : key === 'responsabilidade'
                  ? 'Responsabilidade'
                  : key === 'engajamento'
                    ? 'Engajamento'
                    : key === 'humanidade'
                      ? 'Humanidade'
                      : 'Dinamismo'

            return (
              <div key={key} className="bg-gama-surface rounded p-3">
                <p className="text-xs text-gama-text-secondary mb-1">{label}</p>
                <p className="text-2xl font-black text-gama-primary">{value}/10</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* SONHAR Framework */}
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-black text-gama-primary mb-4">SONHAR (Empreendedorismo)</h3>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(behavioralProfile.sonhar).map(([key, value]) => {
            const labels: { [key: string]: string } = {
              sensoOportunidade: 'Oportunidade',
              ousadia: 'Ousadia',
              navegacaoIncerteza: 'Incerteza',
              humanidade: 'Humanidade',
              aprendizado: 'Aprendizado',
              resultado: 'Resultado',
            }

            return (
              <div key={key} className="bg-gama-surface rounded p-3">
                <p className="text-xs text-gama-text-secondary mb-1">{labels[key]}</p>
                <p className="text-2xl font-black text-gama-primary">{value}/10</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Brain Warfare */}
      <Card className="lg:col-span-1">
        <h3 className="text-lg font-black text-gama-primary mb-4">Brain Warfare</h3>

        <div className="space-y-3">
          {Object.entries(behavioralProfile.brainWarfare).map(([key, value]) => {
            const label = key === 'ataque' ? 'Ataque' : key === 'defesa' ? 'Defesa' : 'Suporte'

            return (
              <div key={key}>
                <p className="text-xs text-gama-text-secondary mb-1">{label}</p>
                <p className="text-xl font-black text-gama-primary">{value}/10</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Specialties */}
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-black text-gama-primary mb-4">Especialidades</h3>

        <div className="flex flex-wrap gap-2">
          {behavioralProfile.specialties.map((specialty) => (
            <span
              key={specialty}
              className="text-xs bg-gama-primary text-gama-dark font-bold px-3 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </Card>
    </div>
  )
}
