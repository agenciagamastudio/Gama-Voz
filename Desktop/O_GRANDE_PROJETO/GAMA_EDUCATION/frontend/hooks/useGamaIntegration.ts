import { useState, useCallback } from 'react'

export interface BehavioralProfile {
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

export interface CloneProfile {
  id: string
  name: string
  email: string
  avatar: string
  level: number
  xp: number
  badges: string[]
  behavioralProfile: BehavioralProfile
}

export interface NordRecommendation {
  id: string
  recommendedTopic: string
  focusArea: string
  confidenceScore: number
  timeBlocks: string[]
  createdAt: string
}

export interface PersonalizedLesson {
  id: string
  title: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  xpReward: number
}

export interface PersonalizedEducation {
  focusArea: string
  recommendedTopics: PersonalizedLesson[]
  totalEstimatedTime: number
}

export function useGamaIntegration() {
  const [cloneProfile, setCloneProfile] = useState<CloneProfile | null>(null)
  const [nordRecommendation, setNordRecommendation] = useState<NordRecommendation | null>(null)
  const [personalizedEducation, setPersonalizedEducation] = useState<PersonalizedEducation | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  /**
   * Submit Jarvis conversation inputs
   * This triggers Nord analysis automatically on the backend
   */
  const submitJarvisSession = useCallback(
    async (inputs: string[], energyLevel: number = 5, mentalState: string = 'neutral') => {
      setLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No authentication token')

        const response = await fetch(`${apiUrl}/api/v1/integration/jarvis-input`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ inputs, energyLevel, mentalState }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit Jarvis session')
        }

        const data = await response.json()

        // Automatically fetch Nord recommendation after Jarvis submission
        await fetchNordRecommendation()

        return data
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiUrl]
  )

  /**
   * Fetch Nord recommendation for the current user
   */
  const fetchNordRecommendation = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (!token || !userId) throw new Error('Missing authentication or user info')

      const response = await fetch(`${apiUrl}/api/v1/integration/nord-recommendation/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch Nord recommendation')
      }

      const data: NordRecommendation = await response.json()
      setNordRecommendation(data)

      // Automatically fetch personalized education based on focus area
      await fetchPersonalizedEducation(data.focusArea)

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  /**
   * Fetch clone profile with behavioral analysis
   */
  const fetchCloneProfile = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (!token || !userId) throw new Error('Missing authentication or user info')

      const response = await fetch(`${apiUrl}/api/v1/user/clone-profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch clone profile')
      }

      const data: CloneProfile = await response.json()
      setCloneProfile(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  /**
   * Fetch personalized education topics for a given focus area
   */
  const fetchPersonalizedEducation = useCallback(
    async (focusArea: string) => {
      setLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No authentication token')

        const response = await fetch(`${apiUrl}/api/v1/education/personalize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ focusArea }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch personalized education')
        }

        const data: PersonalizedEducation = await response.json()
        setPersonalizedEducation(data)
        return data
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiUrl]
  )

  /**
   * Initialize the integration — fetch all necessary data
   */
  const initializeIntegration = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch clone profile first
      const profile = await fetchCloneProfile()

      // Then try to fetch Nord recommendation (if available)
      const nordRec = await fetchNordRecommendation()

      return { profile, nordRec }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchCloneProfile, fetchNordRecommendation])

  return {
    // State
    cloneProfile,
    nordRecommendation,
    personalizedEducation,
    loading,
    error,

    // Actions
    submitJarvisSession,
    fetchNordRecommendation,
    fetchCloneProfile,
    fetchPersonalizedEducation,
    initializeIntegration,
  }
}
