const API_BASE = 'http://localhost:3018/api'

export interface JarvisState {
  state: 'idle' | 'listening' | 'activated' | 'processing' | 'responding'
  transcript: string
  response: string
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  monitor_status: {
    active_projects: number
    timestamp: string
  }
  groq_connected: boolean
  timestamp: string
}

export async function fetchJarvisState(): Promise<JarvisState | null> {
  try {
    const response = await fetch(`${API_BASE}/jarvis/state`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('API error:', response.status)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch Jarvis state:', error)
    return null
  }
}
