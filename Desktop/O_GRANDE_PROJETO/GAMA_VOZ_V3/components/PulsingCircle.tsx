'use client';

import { useEffect, useRef } from 'react';

interface PulsingCircleProps {
  isRecording: boolean;
  audioLevel?: number;
  waveformIntensity?: number;
  audioStream?: MediaStream | null;
}

export default function PulsingCircle({ isRecording, audioLevel = 0, waveformIntensity = 3.0, audioStream }: PulsingCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    if (!isRecording) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // Inicializar AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // Se não temos analyser, criar
    if (!analyserRef.current) {
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    }

    // Conectar o stream ao analyser se disponível
    if (audioStream && !sourceRef.current) {
      sourceRef.current = audioContext.createMediaStreamSource(audioStream);
      sourceRef.current.connect(analyserRef.current);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 80;
    let time = 0;

    const animate = () => {
      // Limpar canvas com transparência
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar pulsos de fundo
      ctx.strokeStyle = 'rgba(136, 206, 17, 0.1)';
      ctx.lineWidth = 2;
      for (let i = 1; i <= 3; i++) {
        const pulse = Math.sin(time * 0.005 - i * 0.5) * 30 + 30;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius + pulse, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Calcular nível de áudio (usar audioLevel prop como fallback)
      let audioLevel_ = audioLevel;
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
        audioLevel_ = average / 255;
      }

      // Círculo principal pulsante (audio controla pulsação, intensidade só torna mais visível)
      const pulseAmount = audioLevel_ * 60;
      const radius = baseRadius + pulseAmount;

      const gradient = ctx.createRadialGradient(centerX, centerY, baseRadius * 0.5, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(136, 206, 17, 0.9)');
      gradient.addColorStop(1, 'rgba(136, 206, 17, 0.3)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Borda do círculo
      ctx.strokeStyle = '#88CE11';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Ondas internas (com intensidade para visibilidade)
      ctx.strokeStyle = 'rgba(136, 206, 17, 0.6)';
      ctx.lineWidth = 2;
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const waveRadius = baseRadius * (0.6 + (i / waveCount) * 0.3);
        // Intensidade afeta a profundidade visual da onda, não o tamanho
        const waveAmplitude = audioLevel_ * 20 * Math.min(waveformIntensity / 2, 2);

        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const wave = Math.sin(angle * 3 + time * 0.01) * waveAmplitude;
          const x = centerX + (waveRadius + wave) * Math.cos(angle);
          const y = centerY + (waveRadius + wave) * Math.sin(angle);
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Ícone do microfone no centro
      ctx.fillStyle = '#161616';
      ctx.font = 'bold 40px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎤', centerX, centerY);

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, audioLevel, waveformIntensity, audioStream]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  );
}
