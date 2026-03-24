'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { fetchJarvisState, JarvisState } from '@/lib/api'
import JarvisCircle from '@/components/JarvisCircle'
import Transcript from '@/components/Transcript'
import History from '@/components/History'
import StatusBar from '@/components/StatusBar'

const POLL_INTERVAL = 500 // 500ms polling

export default function Home() {
  const [state, setState] = useState<JarvisState | null>(null)
  const [loading, setLoading] = useState(true)

  const pollState = useCallback(async () => {
    const newState = await fetchJarvisState()
    if (newState) {
      setState(newState)
      setLoading(false)
    }
  }, [])

  // Poll API every 500ms
  useEffect(() => {
    pollState()
    const interval = setInterval(pollState, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [pollState])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎤</div>
          <p className="text-text-secondary">Conectando...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Status Bar */}
      <StatusBar
        groqConnected={state?.groq_connected || false}
        activeProjects={state?.monitor_status?.active_projects || 0}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-8">
        {/* Jarvis Circle */}
        <JarvisCircle state={state?.state || 'idle'} />

        {/* Transcript */}
        <Transcript
          transcript={state?.transcript || ''}
          response={state?.response || ''}
        />

        {/* History */}
        <History history={state?.history || []} />
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-text-secondary text-xs pb-8">
        <p>GAMA Jarvis • Voice Assistant</p>
        <p className="mt-1">Powered by Groq API</p>
      </footer>
    </main>
  )
}
