'use client'

import { Waveform3D } from '@/components/organisms/Waveform3D'
import { useState } from 'react'

export default function WaveformPage() {
  const [status, setStatus] = useState('Pronto')

  return (
    <div className="min-h-screen bg-gama-dark p-8 sm:p-12 md:p-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gama-primary mb-4">
            🎤 Waveform 3D Visualizer
          </h1>
          <p className="text-lg text-gama-text-secondary mb-6">
            Visualizador de áudio interativo com animação 3D em tempo real.
            Clique no canvas para ativar o microfone e veja as ondas sonoras dançando.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gama-surface rounded-lg border border-gama-surface-accent">
              <p className="text-sm text-gama-text-secondary mb-2">Status:</p>
              <p className="text-lg font-bold text-gama-primary">{status}</p>
            </div>
            <div className="p-4 bg-gama-surface rounded-lg border border-gama-surface-accent">
              <p className="text-sm text-gama-text-secondary mb-2">API:</p>
              <p className="text-lg font-bold text-gama-text">Web Audio API</p>
            </div>
            <div className="p-4 bg-gama-surface rounded-lg border border-gama-surface-accent">
              <p className="text-sm text-gama-text-secondary mb-2">FFT Size:</p>
              <p className="text-lg font-bold text-gama-text">512 bins</p>
            </div>
          </div>
        </div>

        {/* Visualizador */}
        <div className="bg-gama-surface border-2 border-gama-surface-accent rounded-2xl p-8 mb-12">
          <Waveform3D
            width={400}
            height={400}
            onStatusChange={setStatus}
          />
        </div>

        {/* Documentação */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gama-text mb-4">Características Técnicas</h2>
            <ul className="space-y-2 text-gama-text-secondary">
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>Captura de áudio do microfone via getUserMedia</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>Análise de frequência em 512 bins (FFT)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>Suavização de dados com fator 0.6/0.4</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>5 camadas 3D sobrepostas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>Bolinhas dinâmicas em 16 pontos de frequência</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>Círculos concêntricos baseados na média de frequência</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>Ponto central pulsante (8px)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">✓</span>
                <span>Renderização em tempo real via requestAnimationFrame</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gama-text mb-4">Como Funciona</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent font-mono text-sm">
                <p className="text-gama-primary mb-2">Fluxo de Execução:</p>
                <p className="text-gama-text-secondary">
                  1. Canvas click → startListening()<br/>
                  2. navigator.mediaDevices.getUserMedia() → stream<br/>
                  3. AudioContext + MediaStreamAudioSourceNode<br/>
                  4. AnalyserNode.fftSize = 512<br/>
                  5. animate() loop → getByteFrequencyData()<br/>
                  6. Canvas 2D drawing em requestAnimationFrame<br/>
                  7. Canvas click again → stopListening()
                </p>
              </div>

              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <h3 className="font-bold text-gama-primary mb-2">Smoothing Time Constant</h3>
                <p className="text-sm text-gama-text-secondary">
                  0.85 - Os dados de frequência são suavizados com esta constante para evitar jitter
                </p>
              </div>

              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <h3 className="font-bold text-gama-primary mb-2">Oscillator Data Smoothing</h3>
                <p className="text-sm text-gama-text-secondary">
                  oscillatorData[i] = oscillatorData[i] * 0.6 + (dataArray[i] / 255) * 0.4
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gama-text mb-4">Uso no Código</h2>
            <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent font-mono text-xs text-gama-text-secondary overflow-x-auto">
              <pre>{`import { Waveform3D } from '@/components/organisms/Waveform3D'
import { useState } from 'react'

export function App() {
  const [status, setStatus] = useState('Pronto')

  return (
    <div>
      <h1>Audio Visualizer</h1>
      <Waveform3D
        width={400}
        height={400}
        onStatusChange={(newStatus) => {
          setStatus(newStatus)
          console.log('Status:', newStatus)
        }}
      />
      <p>Atual: {status}</p>
    </div>
  )
}`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gama-text mb-4">Props (Interface)</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent font-mono text-xs">
                <pre className="text-gama-text-secondary">{`interface Waveform3DProps {
  width?: number              // Canvas width (default: 500)
  height?: number             // Canvas height (default: 500)
  isActive?: boolean          // Control listening externally
  onStatusChange?: (status: string) => void  // Status callback
}`}</pre>
              </div>

              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <p className="font-mono text-gama-primary mb-1 text-sm">width?: number</p>
                <p className="text-sm text-gama-text-secondary">Largura do canvas em pixels (padrão: 500)</p>
              </div>

              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <p className="font-mono text-gama-primary mb-1 text-sm">height?: number</p>
                <p className="text-sm text-gama-text-secondary">Altura do canvas em pixels (padrão: 500)</p>
              </div>

              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <p className="font-mono text-gama-primary mb-1 text-sm">isActive?: boolean</p>
                <p className="text-sm text-gama-text-secondary">Controlar microfone/listening externamente (para uso programático)</p>
              </div>

              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <p className="font-mono text-gama-primary mb-1 text-sm">onStatusChange?: (status: string) =&gt; void</p>
                <p className="text-sm text-gama-text-secondary">Callback chamado quando status muda (ex: "Ouvindo", "Parado", etc)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gama-text mb-4">Parâmetros Web Audio API</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <p className="font-mono text-gama-primary text-sm mb-1">fftSize = 512</p>
                <p className="text-sm text-gama-text-secondary">Transformada de Fourier Rápida com 512 bins de frequência (análise detalhada)</p>
              </div>
              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <p className="font-mono text-gama-primary text-sm mb-1">smoothingTimeConstant = 0.85</p>
                <p className="text-sm text-gama-text-secondary">Reduz jitter entre frames (85% mantém valor anterior)</p>
              </div>
              <div className="p-4 bg-gama-darker rounded-lg border border-gama-surface-accent">
                <p className="font-mono text-gama-primary text-sm mb-1">getByteFrequencyData()</p>
                <p className="text-sm text-gama-text-secondary">Retorna array de 256 valores (0-255) para cada bin de frequência</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gama-text mb-4">Evolução Técnica</h2>
            <ul className="space-y-2 text-gama-text-secondary">
              <li className="flex gap-3">
                <span className="text-gama-primary">v2</span>
                <span>Web Audio Worklet para análise off-main-thread</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">v2</span>
                <span>OffscreenCanvas para rendering paralelo</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">v2</span>
                <span>Customização de parâmetros (fftSize, smoothing)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">v2</span>
                <span>Suporte a audio streams externos (TTS, gravação)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">v2</span>
                <span>Canvas recording via MediaRecorder API</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary">v2</span>
                <span>Tema customizável (cores primárias/secundárias)</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
