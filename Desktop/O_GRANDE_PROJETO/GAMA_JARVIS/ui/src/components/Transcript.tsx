import React from 'react'

interface TranscriptProps {
  transcript: string
  response: string
}

export default function Transcript({ transcript, response }: TranscriptProps) {
  if (!transcript && !response) {
    return null
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-3">
      {/* Transcript (what user said) */}
      {transcript && (
        <div className="bg-surface/50 rounded-lg p-4 border border-white/10">
          <div className="text-text-secondary text-xs font-medium uppercase tracking-widest mb-2">
            Você
          </div>
          <div className="text-text-primary text-sm leading-relaxed">
            {transcript}
          </div>
        </div>
      )}

      {/* Response (what Jarvis is saying) */}
      {response && (
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="text-primary text-xs font-medium uppercase tracking-widest mb-2">
            Jarvis
          </div>
          <div className="text-text-primary text-sm leading-relaxed">
            {response}
          </div>
        </div>
      )}
    </div>
  )
}
