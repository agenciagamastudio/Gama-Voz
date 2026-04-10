'use client'

import { useEffect, useRef, useState } from 'react'

interface Waveform3DProps {
  width?: number
  height?: number
  isActive?: boolean
  onStatusChange?: (status: string) => void
}

export function Waveform3D({
  width = 500,
  height = 500,
  isActive: controlledActive,
  onStatusChange,
}: Waveform3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isListening, setIsListening] = useState(false)
  const [status, setStatus] = useState('Pronto para começar')
  const [error, setError] = useState<string | null>(null)

  const audioContextRef = useRef<any>(null)
  const analyserRef = useRef<any>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const oscillatorDataRef = useRef<number[]>([])
  const animationIdRef = useRef<number | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const updateStatus = (newStatus: string, isError = false) => {
    setStatus(newStatus)
    setError(isError ? newStatus : null)
    onStatusChange?.(newStatus)
  }

  const startListening = async () => {
    try {
      updateStatus('⏳ Solicitando permissão...')

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContextClass()

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      const source = audioContextRef.current.createMediaStreamSource(stream)
      const analyser = audioContextRef.current.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.85

      source.connect(analyser)

      analyserRef.current = analyser
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
      oscillatorDataRef.current = new Array(analyser.frequencyBinCount).fill(0)

      setIsListening(true)
      updateStatus('🎤 Ouvindo...')
      animate()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao acessar microfone'
      updateStatus(`❌ ${message}`, true)
    }
  }

  const stopListening = () => {
    setIsListening(false)
    updateStatus('Parado')

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    if (analyserRef.current && audioContextRef.current?.state === 'running') {
      audioContextRef.current.close()
    }

    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
    }

    const canvas = canvasRef.current
    if (canvas && ctxRef.current) {
      ctxRef.current.fillStyle = '#0a0a0a'
      ctxRef.current.fillRect(0, 0, width, height)
    }
  }

  const animate = () => {
    if (!isListening) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctxRef.current = ctx

    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2

    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current)

      // Debug: log primeiro valor pra verificar se tá capturando
      const firstValue = dataArrayRef.current[0]
      const hasAudio = dataArrayRef.current.some(v => v > 20)

      if (!window.__waveformLogged) {
        console.log('🎤 Waveform3D Funcionando:', {
          analyser: !!analyserRef.current,
          dataArray: !!dataArrayRef.current,
          firstValue,
          hasAudio,
          frequencyBinCount: analyserRef.current.frequencyBinCount
        })
        window.__waveformLogged = true
      }

      // Suavizar dados
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        oscillatorDataRef.current[i] = oscillatorDataRef.current[i] * 0.6 + (dataArrayRef.current[i] / 255) * 0.4
      }

      // Desenhar múltiplas camadas 3D
      const layers = 5
      const numBars = 128
      const baseRadius = 60
      const maxRadius = 150

      for (let layer = 0; layer < layers; layer++) {
        const layerAlpha = 0.3 - layer * 0.05
        const layerRadiusOffset = (layer / layers) * 40

        for (let i = 0; i < numBars; i++) {
          const dataIndex = Math.floor((i / numBars) * oscillatorDataRef.current.length)
          const value = oscillatorDataRef.current[dataIndex] || 0

          const angle = (i / numBars) * Math.PI * 2
          const radius = baseRadius + layerRadiusOffset + value * maxRadius

          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          if (i === 0) {
            ctx.beginPath()
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          if (i === numBars - 1) {
            const dataIndex0 = 0
            const value0 = oscillatorDataRef.current[dataIndex0] || 0
            const angle0 = 0
            const radius0 = baseRadius + layerRadiusOffset + value0 * maxRadius
            const x0 = centerX + Math.cos(angle0) * radius0
            const y0 = centerY + Math.sin(angle0) * radius0
            ctx.lineTo(x0, y0)
          }
        }

        ctx.strokeStyle = `rgba(136, 206, 17, ${layerAlpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Desenhar bolinhas nos pontos mais altos
      for (let i = 0; i < Math.min(numBars, 64); i += 4) {
        const dataIndex = Math.floor((i / numBars) * oscillatorDataRef.current.length)
        const value = oscillatorDataRef.current[dataIndex] || 0

        const angle = (i / numBars) * Math.PI * 2
        const radius = baseRadius + value * maxRadius

        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        const blobSize = 2 + value * 6
        ctx.fillStyle = `rgba(136, 206, 17, ${0.4 + value * 0.6})`
        ctx.beginPath()
        ctx.arc(x, y, blobSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(136, 206, 17, ${(0.4 + value * 0.6) * 0.5})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, blobSize + 2, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Círculos concêntricos
      const avgValue = oscillatorDataRef.current.reduce((a, b) => a + b, 0) / oscillatorDataRef.current.length
      for (let i = 1; i <= 4; i++) {
        ctx.strokeStyle = `rgba(136, 206, 17, ${(0.2 - i * 0.04) * avgValue})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(centerX, centerY, baseRadius + i * 15, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Centro
      ctx.fillStyle = `rgba(136, 206, 17, ${0.3 + avgValue * 0.4})`
      ctx.beginPath()
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = `rgba(136, 206, 17, ${0.6 + avgValue * 0.4})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
      ctx.stroke()
    }

    animationIdRef.current = requestAnimationFrame(animate)
  }

  const handleCanvasClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  useEffect(() => {
    if (controlledActive !== undefined) {
      if (controlledActive && !isListening) {
        startListening()
      } else if (!controlledActive && isListening) {
        stopListening()
      }
    }
  }, [controlledActive])

  useEffect(() => {
    return () => {
      if (isListening) {
        stopListening()
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-gama-primary mb-2">
          🎤 GAMA Waveform 3D
        </h2>
        <p className="text-sm text-gama-text-secondary">
          Clique para ativar o microfone
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        className="rounded-2xl border-2 border-gama-primary/20 bg-gama-darker shadow-2xl cursor-pointer transition-all hover:border-gama-primary/50 hover:shadow-[0_0_30px_rgba(136,206,17,0.2)]"
      />

      <div
        className={`text-base font-bold h-6 transition-all ${
          error
            ? 'text-red-500'
            : isListening
              ? 'text-gama-primary animate-pulse'
              : 'text-gama-text-secondary'
        }`}
      >
        {status}
      </div>
    </div>
  )
}

export default Waveform3D
