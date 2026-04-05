'use client';

import { useState, useRef, useEffect } from 'react';
import PulsingCircle from '@/components/PulsingCircle';
import RecordingTimer from '@/components/RecordingTimer';
import RecordingModal from '@/components/RecordingModal';
import SettingsPanel from '@/components/SettingsPanel';
import { AudioRecorder } from '@/lib/audio';
import { transcribeAudio, validateAudioFile } from '@/lib/groq';
import { loadHistory, addToHistory, deleteEntry } from '@/lib/storage';
import { moveToTrash, getTrashEntries, restoreFromTrash, permanentlyDelete, getTrashCount } from '@/lib/trash';

type TranscriptItem = {
  time: number;
  speaker: string;
  text: string;
  keywords?: string[];
};

type Call = {
  id: string;
  title: string;
  date: string;
  duration: number;
  participants: string[];
  status: 'completed' | 'recording' | 'transcribing';
  insights: string[];
  transcript: TranscriptItem[];
  audioUrl?: string;
  fullText?: string;
};

type Tab = 'calls' | 'trash';

export default function GamaVozFathom() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCall, setSelectedCall] = useState(0);
  const [calls, setCalls] = useState<Call[]>([]);
  const [trashEntries, setTrashEntries] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarAutoMode, setSidebarAutoMode] = useState(false);
  const [mouseOverSidebar, setMouseOverSidebar] = useState(false);
  const [recordingModalOpen, setRecordingModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>('calls');
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [waveformIntensity, setWaveformIntensity] = useState(3.0);
  const [copiedCallId, setCopiedCallId] = useState<string | null>(null);
  const [focusOnRecord, setFocusOnRecord] = useState(true);
  const [transcriptionMode, setTranscriptionMode] = useState<'sentences' | 'words'>('sentences');

  const waveformRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mark client as ready FIRST
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load settings on mount (client-side only)
  useEffect(() => {
    if (!isClient) return;

    const loadSettings = async () => {
      try {
        // Tentar carregar do backend primeiro
        const apiUrl = process.env.NEXT_PUBLIC_JARVIS_API_URL || 'http://127.0.0.1:3018';
        const response = await fetch(`${apiUrl}/api/config`, { method: 'GET' });

        if (response.ok) {
          const config = await response.json();
          if (config.waveformIntensity) {
            setWaveformIntensity(config.waveformIntensity);
            return;
          }
        }
      } catch (error) {
        console.log('Backend indisponível, usando localStorage');
      }

      // Fallback para localStorage
      const savedIntensity = localStorage.getItem('gama-waveform-intensity');
      if (savedIntensity) {
        setWaveformIntensity(parseFloat(savedIntensity));
      }

      const savedFocus = localStorage.getItem('gama-focus-on-record');
      if (savedFocus !== null) {
        setFocusOnRecord(savedFocus === 'true');
      }
    };

    loadSettings();
  }, [isClient]);

  // Load calls from storage on mount (client-side only)
  useEffect(() => {
    if (!isClient) return;

    const history = loadHistory();
    const trash = getTrashEntries();

    setTrashEntries(trash);

    if (history.entries.length === 0) {
      setCalls([]);
    } else {
      const callsData = history.entries.map((entry, idx) => ({
        id: entry.id,
        title: `Call ${idx + 1}`,
        date: new Date(entry.timestamp).toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        duration: Math.ceil((entry.duration || 0) / 60),
        participants: entry.participants || ['Você'],
        status: 'completed' as const,
        insights: [
          `Duration: ${Math.ceil((entry.duration || 0) / 60)}m`,
          `Timestamp: ${new Date(entry.timestamp).toLocaleTimeString('pt-BR')}`,
        ],
        transcript: entry.text.split('. ').map((text, i) => ({
          time: i * 5,
          speaker: entry.participants?.[0] || 'Speaker',
          text: text.trim() + (i < entry.text.split('. ').length - 1 ? '.' : ''),
          keywords: [],
        })),
        audioUrl: entry.audioUrl,
        fullText: entry.text,
      }));
      setCalls(callsData);
      if (callsData.length > 0) {
        setSelectedCall(0);
      }
    }
  }, [isClient]);

  // Initialize recorder
  useEffect(() => {
    if (typeof window === 'undefined') return;

    recorderRef.current = new AudioRecorder({
      onStart: () => {
        setIsRecording(true);
        setRecordingModalOpen(true);
      },
      onStop: async (blob) => {
        setIsRecording(false);
        setRecordingModalOpen(false);
        setRecordingTime(0);
        await handleTranscribe(blob);
      },
      onError: (error) => {
        setError(error);
        setIsRecording(false);
      },
      onDuration: (duration) => setRecordingTime(duration),
    });

    return () => {
      recorderRef.current?.destroy();
    };
  }, []);

  const handleStartRecording = async () => {
    setError(null);
    try {
      await recorderRef.current?.start();
    } catch (err) {
      setError('Failed to start recording. Check microphone permissions.');
    }
  };

  const handleStopRecording = () => {
    recorderRef.current?.stop();
  };

  const handleTranscribe = async (blob: Blob) => {
    setIsTranscribing(true);
    setError(null);

    try {
      const validation = validateAudioFile(blob as File);
      if (!validation.valid) {
        setError(validation.error || 'Invalid audio file');
        setIsTranscribing(false);
        return;
      }

      const file = new File([blob], 'recording.webm', { type: blob.type });
      const result = await transcribeAudio(file);

      if ('error' in result) {
        setError(`${result.error}: ${result.details}`);
        setIsTranscribing(false);
        return;
      }

      const audioUrl = URL.createObjectURL(blob);
      const newEntry = addToHistory({
        text: result.text,
        timestamp: result.timestamp,
        duration: recordingTime,
        participants: ['Você'],
        audioUrl,
      });

      const newCall: Call = {
        id: newEntry.id,
        title: `Call - ${new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}`,
        date: new Date(newEntry.timestamp).toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        duration: Math.ceil(recordingTime / 60),
        participants: ['Você'],
        status: 'completed',
        insights: [
          `Duration: ${Math.ceil(recordingTime / 60)}m`,
          `Words: ${result.text.split(' ').length}`,
          `Groq Whisper v3`,
        ],
        transcript: result.text.split('. ').map((text, i) => ({
          time: i * 5,
          speaker: 'Você',
          text: text.trim() + (i < result.text.split('. ').length - 1 ? '.' : ''),
          keywords: [],
        })),
        audioUrl,
        fullText: result.text,
      };

      setCalls((prev) => [newCall, ...prev]);
      setSelectedCall(0);
    } catch (err) {
      setError('Transcription failed. Try again.');
      console.error(err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleCopyTranscription = async (callId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCallId(callId);
      // Volta ao botão original depois de 2 segundos
      setTimeout(() => setCopiedCallId(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleDeleteCall = (id: string, title: string, call: Call) => {
    moveToTrash(id, title, call);
    deleteEntry(id);
    const updatedCalls = calls.filter((c) => c.id !== id);
    setCalls(updatedCalls);
    setTrashEntries(getTrashEntries());
    if (calls[selectedCall]?.id === id) {
      setSelectedCall(0);
    }
  };

  const handleRestoreFromTrash = (trashId: string) => {
    const restored = restoreFromTrash(trashId);
    if (restored) {
      const newCall: Call = {
        id: restored.entryId,
        title: restored.title,
        date: new Date(restored.timestamp).toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        duration: Math.ceil((restored.duration || 0) / 60),
        participants: restored.participants || ['Você'],
        status: 'completed',
        insights: [
          `Duration: ${Math.ceil((restored.duration || 0) / 60)}m`,
          `Words: ${restored.text.split(' ').length}`,
          `Restored from trash`,
        ],
        transcript: restored.text.split('. ').map((text, i) => ({
          time: i * 5,
          speaker: restored.participants?.[0] || 'Você',
          text: text.trim() + (i < restored.text.split('. ').length - 1 ? '.' : ''),
          keywords: [],
        })),
        audioUrl: restored.audioUrl,
        fullText: restored.text,
      };

      // Re-add to storage
      addToHistory({
        text: restored.text,
        timestamp: restored.timestamp,
        duration: restored.duration,
        participants: restored.participants,
        audioUrl: restored.audioUrl,
      });

      setCalls((prev) => [newCall, ...prev]);
      setTrashEntries(getTrashEntries());
    }
  };

  const handlePermanentlyDelete = (trashId: string) => {
    permanentlyDelete(trashId);
    setTrashEntries(getTrashEntries());
  };

  // Waveform animation (sem AudioContext para evitar problemas)
  useEffect(() => {
    if (!isClient || !waveformRef.current) return;

    const canvas = waveformRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.fillStyle = '#161616';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barCount = 256; // Mais barras = mais precisão
      const barWidth = canvas.width / barCount;
      const centerY = canvas.height / 2;

      let audioData: number[] = [];

      // Se temos dados pré-analisados do áudio, usar sempre eles
      if (waveformData.length > 0) {
        // Interpolar dados da waveform para número correto de barras
        for (let i = 0; i < barCount; i++) {
          const index = Math.floor((i / barCount) * waveformData.length);
          // Converter amplitude (0-1) para escala (0-255) com multiplicador dinâmico
          const normalized = waveformData[index] * 255 * waveformIntensity;
          audioData[i] = Math.min(normalized, 255);
        }
      } else {
        // Sem dados: silêncio
        for (let i = 0; i < barCount; i++) {
          audioData[i] = 0;
        }
      }

      const duration = audioRef.current?.duration || (calls[selectedCall]?.duration || 1) * 60;
      const currentTime = audioRef.current?.currentTime || 0;
      const progress = duration > 0 ? currentTime / duration : 0;

      for (let i = 0; i < barCount; i++) {
        // audioData já está em escala 0-255 (amplitude pura)
        const value = audioData[i] || 0;
        // Normalizar para 0-1
        const normalizedHeight = Math.min(value / 255, 1);
        const height = Math.max(normalizedHeight * centerY * 0.9, 2); // Mínimo de 2px
        const x = i * barWidth;

        const isPlayed = (i / barCount) < progress;

        const gradient = ctx.createLinearGradient(0, centerY - height, 0, centerY + height);
        if (isPlayed) {
          gradient.addColorStop(0, 'rgba(136, 206, 17, 0.8)');
          gradient.addColorStop(1, 'rgba(136, 206, 17, 0.4)');
        } else {
          gradient.addColorStop(0, 'rgba(136, 206, 17, 0.3)');
          gradient.addColorStop(1, 'rgba(136, 206, 17, 0.1)');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, centerY - height, barWidth - 1, height * 2);
      }

      // Linha de progresso
      const progressX = canvas.width * progress;
      ctx.strokeStyle = '#88CE11';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(progressX, 0);
      ctx.lineTo(progressX, canvas.height);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [playTime, selectedCall, calls, isPlaying, recordingTime, isRecording]);

  // Playback timer e controle de áudio
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sincronizar tempo de reprodução e carregar waveform
  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      setPlayTime(audioRef.current!.currentTime * 1000);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setPlayTime(0);
    };

    const handleLoadedMetadata = async () => {
      // Quando áudio carrega, analisar a forma de onda completa
      if (audioRef.current && audioRef.current.src) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const response = await fetch(audioRef.current.src);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

          // Extrair dados de amplitude
          const rawData = audioBuffer.getChannelData(0); // Canal esquerdo
          const blockSize = Math.floor(rawData.length / 256);
          const filtered: number[] = [];

          for (let i = 0; i < 256; i++) {
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
              sum += Math.abs(rawData[i * blockSize + j]);
            }
            filtered[i] = sum / blockSize;
          }

          setWaveformData(filtered);
        } catch (err) {
          console.error('Error analyzing waveform:', err);
        }
      }
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current?.removeEventListener('ended', handleEnded);
      audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [calls[selectedCall]?.audioUrl]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const call = calls[selectedCall] || {
    id: 'new',
    title: 'New Recording',
    date: new Date().toLocaleDateString('pt-BR'),
    duration: 0,
    participants: ['Você'],
    status: 'recording' as const,
    insights: [],
    transcript: [],
  };

  const trashCount = isClient ? getTrashCount() : 0;

  // Only render on client to avoid hydration mismatches
  if (!isClient) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: '#161616' }}>
        <aside
          className="w-64 border-r"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: 'rgba(82, 82, 91, 0.3)',
          }}
        />
        <main className="flex-1" />
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#161616' }} suppressHydrationWarning>
      {/* SIDEBAR */}
      <aside
        className={`border-r flex flex-col transition-all duration-300 relative ${
          sidebarAutoMode
            ? (mouseOverSidebar ? 'w-64' : 'w-20')
            : sidebarOpen ? 'w-64' : 'w-20'
        }`}
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: 'rgba(82, 82, 91, 0.3)',
          overflow: 'visible',
        }}
        onMouseEnter={() => {
          setMouseOverSidebar(true);
        }}
        onMouseLeave={() => {
          setMouseOverSidebar(false);
        }}
      >
        {/* Logo + Toggle Button */}
        <div
          className={`border-b relative transition-all duration-300 ${
            (sidebarAutoMode ? mouseOverSidebar : sidebarOpen) ? 'p-6' : 'p-4'
          }`}
          style={{ borderColor: 'rgba(82, 82, 91, 0.3)' }}
        >
          {/* Full Logo - Visible when sidebar is open */}
          {(sidebarAutoMode ? mouseOverSidebar : sidebarOpen) && (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl"
                style={{ backgroundColor: '#88CE11', color: '#161616' }}
              >
                🎙️
              </div>
              <h1 className="text-lg font-black" style={{ color: '#88CE11' }}>
                GAMA Voz
              </h1>
            </div>
          )}

          {/* Icon Only - Visible when sidebar is minimized */}
          {!(sidebarAutoMode ? mouseOverSidebar : sidebarOpen) && (
            <div className="flex justify-center">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl"
                style={{ backgroundColor: '#88CE11', color: '#161616' }}
              >
                🎙️
              </div>
            </div>
          )}

          {/* Toggle Button - Top Right of Sidebar (when expanded) */}
          {(sidebarAutoMode ? mouseOverSidebar : sidebarOpen) && (
            <button
              onClick={() => {
                if (sidebarAutoMode) {
                  setSidebarAutoMode(false);
                  setSidebarOpen(true);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="absolute top-6 right-4 z-10 p-2 rounded-lg transition-all"
              style={{
                backgroundColor: 'rgba(136, 206, 17, 0.2)',
                color: '#88CE11',
                cursor: 'pointer',
              }}
              title={sidebarAutoMode ? 'Modo Fixo' : 'Modo Automático'}
            >
              {sidebarAutoMode ? '🔗' : '📌'}
            </button>
          )}
        </div>

        {/* Ícones das Calls - Visível quando minimizado */}
        {!(sidebarAutoMode ? mouseOverSidebar : sidebarOpen) && calls.length > 0 && (
          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
            {calls.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedCall(idx)}
                className="w-12 h-12 rounded-lg flex items-center justify-center font-black text-xs transition-all mx-auto"
                style={{
                  backgroundColor: selectedCall === idx ? '#88CE11' : 'rgba(136, 206, 17, 0.2)',
                  color: selectedCall === idx ? '#161616' : '#88CE11',
                }}
                title={item.title}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Conteúdo - Visível apenas quando expandido */}
        {(sidebarAutoMode ? mouseOverSidebar : sidebarOpen) && (
          <>
        {/* Add New Button */}
        <div className="p-4 border-b" style={{ borderColor: 'rgba(82, 82, 91, 0.3)' }}>
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isTranscribing}
            className="w-full px-4 py-2 rounded-lg font-black transition-all text-sm"
            style={{
              backgroundColor: isRecording ? '#E11D48' : '#88CE11',
              color: isRecording ? '#FFFFFF' : '#161616',
              opacity: isTranscribing ? 0.6 : 1,
            }}
          >
            {isTranscribing ? '🔄 Processing...' : isRecording ? '⏹️ Stop' : '🎤 Record'}
          </button>
          {isRecording && (
            <p className="text-xs mt-2" style={{ color: '#88CE11' }}>
              Recording: {AudioRecorder.formatDuration(recordingTime)}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 pt-4 border-b" style={{ borderColor: 'rgba(82, 82, 91, 0.3)' }} suppressHydrationWarning>
          <button
            onClick={() => setCurrentTab('calls')}
            className="flex-1 px-2 py-2 rounded text-xs font-black transition-all"
            style={{
              backgroundColor: currentTab === 'calls' ? '#88CE11' : 'transparent',
              color: currentTab === 'calls' ? '#161616' : '#A1A1AA',
            }}
            suppressHydrationWarning
          >
            Calls ({calls.length})
          </button>
          <button
            onClick={() => setCurrentTab('trash')}
            className="flex-1 px-2 py-2 rounded text-xs font-black transition-all relative"
            style={{
              backgroundColor: currentTab === 'trash' ? '#E11D48' : 'transparent',
              color: currentTab === 'trash' ? '#FFFFFF' : '#A1A1AA',
            }}
            suppressHydrationWarning
          >
            🗑️ ({trashCount})
          </button>
        </div>

        {/* Calls List */}
        {currentTab === 'calls' && (
          <div className="flex-1 overflow-y-auto">
            {calls.length === 0 ? (
              <div className="p-4 text-center" style={{ color: '#A1A1AA' }}>
                <p className="text-sm">No recordings yet</p>
                <p className="text-xs mt-2">Click Record to start</p>
              </div>
            ) : (
              calls.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedCall(idx)}
                  className="px-4 py-3 cursor-pointer border-l-2 transition-colors group"
                  style={{
                    borderColor: selectedCall === idx ? '#88CE11' : 'transparent',
                    backgroundColor: selectedCall === idx ? 'rgba(136, 206, 17, 0.1)' : 'transparent',
                  }}
                >
                  <h3
                    className="font-black text-sm"
                    style={{ color: selectedCall === idx ? '#88CE11' : '#FFFFFF' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#A1A1AA' }}>
                    {item.date}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCall(item.id, item.title, item);
                    }}
                    className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#E11D48' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Trash List */}
        {currentTab === 'trash' && (
          <div className="flex-1 overflow-y-auto">
            {trashEntries.length === 0 ? (
              <div className="p-4 text-center" style={{ color: '#A1A1AA' }}>
                <p className="text-sm">Trash is empty</p>
              </div>
            ) : (
              trashEntries.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 border-b group"
                  style={{ borderColor: 'rgba(82, 82, 91, 0.2)' }}
                >
                  <h3 className="font-black text-xs" style={{ color: '#FFFFFF' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#A1A1AA' }}>
                    {new Date(item.deletedAt).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleRestoreFromTrash(item.id)}
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}
                    >
                      ↩️ Restore
                    </button>
                    <button
                      onClick={() => handlePermanentlyDelete(item.id)}
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: 'rgba(225, 29, 72, 0.2)', color: '#E11D48' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
          </>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        {/* Settings Button */}
        <button
          onClick={() => {
            console.log('⚙️ Settings button clicked');
            setSettingsOpen(true);
          }}
          className="absolute top-6 right-6 z-40 p-2 rounded-lg transition-all hover:brightness-110"
          style={{
            backgroundColor: 'rgba(136, 206, 17, 0.2)',
            color: '#88CE11',
            cursor: 'pointer',
          }}
          title="Abrir configurações"
        >
          ⚙️
        </button>

        {/* HEADER */}
        <header
          className="border-b p-6"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: 'rgba(82, 82, 91, 0.3)',
          }}
        >
          {error && (
            <div
              className="mb-4 p-3 rounded-lg text-sm"
              style={{ backgroundColor: 'rgba(225, 29, 72, 0.1)', color: '#E11D48' }}
            >
              {error}
            </div>
          )}
          <h2 className="text-2xl font-black mb-2" style={{ color: '#88CE11' }}>
            {call.title}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span style={{ color: '#A1A1AA' }}>{call.date}</span>
            <span style={{ color: '#A1A1AA' }}>•</span>
            <span style={{ color: '#A1A1AA' }}>{call.duration} minutos</span>
            <span style={{ color: '#A1A1AA' }}>•</span>
            <div className="flex gap-2">
              {call.participants.map((p) => (
                <span key={p} style={{ color: '#88CE11', fontSize: '11px' }} className="font-semibold">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: Player + Waveform */}
          <div className="flex-1 flex flex-col border-r p-6 overflow-y-auto" style={{ borderColor: 'rgba(82, 82, 91, 0.3)' }}>
            {/* Waveform */}
            <div className="mb-6">
              <div
                className="rounded-lg overflow-hidden h-24 cursor-pointer mb-3"
                style={{
                  backgroundColor: '#272727',
                  border: '1px solid rgba(136, 206, 17, 0.2)',
                }}
              >
                <canvas
                  ref={waveformRef}
                  width={600}
                  height={96}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  onClick={(e) => {
                    if (calls[selectedCall]) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const progress = x / rect.width;
                      setPlayTime(progress * calls[selectedCall].duration * 60 * 1000);
                    }
                  }}
                />
              </div>

              {/* Audio Element */}
              {calls[selectedCall]?.audioUrl && (
                <audio ref={audioRef} src={calls[selectedCall].audioUrl} />
              )}

              {/* Player Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={!calls[selectedCall]?.audioUrl}
                  className="px-4 py-2 rounded-lg font-black transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: '#88CE11',
                    color: '#161616',
                  }}
                >
                  {isPlaying ? '⏸️ Pausar' : '▶️ Play'}
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={audioRef.current?.duration ? audioRef.current.duration * 1000 : 0}
                    value={playTime}
                    onChange={(e) => {
                      const newTime = parseInt(e.target.value) / 1000;
                      if (audioRef.current) {
                        audioRef.current.currentTime = newTime;
                        setPlayTime(newTime * 1000);
                      }
                    }}
                    className="w-full"
                    style={{
                      accentColor: '#88CE11',
                    }}
                  />
                </div>
                <span className="text-sm font-mono" style={{ color: '#A1A1AA' }}>
                  {formatTime(playTime)} / {formatTime(audioRef.current?.duration ? audioRef.current.duration * 1000 : 0)}
                </span>
              </div>
            </div>

            {/* Insights */}
            {call.insights.length > 0 && (
              <div className="mb-6">
                <h3 className="font-black mb-3" style={{ color: '#88CE11' }}>
                  📊 Insights
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {call.insights.map((insight) => (
                    <div
                      key={insight}
                      className="p-3 rounded-lg text-center text-sm font-semibold"
                      style={{
                        backgroundColor: 'rgba(136, 206, 17, 0.1)',
                        color: '#88CE11',
                        border: '1px solid rgba(136, 206, 17, 0.2)',
                      }}
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Transcript */}
          <div
            className="w-96 flex flex-col border-l"
            style={{
              backgroundColor: '#272727',
              borderColor: 'rgba(82, 82, 91, 0.3)',
            }}
          >
            {/* Transcript Header */}
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(82, 82, 91, 0.3)' }}>
              <h3 className="font-black" style={{ color: '#88CE11' }}>
                📝 Transcrição
              </h3>
              <div className="flex gap-2">
                {call.fullText && (
                  <button
                    onClick={() => setTranscriptionMode(transcriptionMode === 'sentences' ? 'words' : 'sentences')}
                    className="px-3 py-1 rounded text-sm font-black transition-all hover:brightness-110"
                    style={{
                      backgroundColor: transcriptionMode === 'words'
                        ? 'rgba(59, 130, 246, 0.3)'
                        : 'rgba(82, 82, 91, 0.2)',
                      color: transcriptionMode === 'words' ? '#3B82F6' : '#A1A1AA',
                      border: `1px solid ${transcriptionMode === 'words' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(82, 82, 91, 0.3)'}`,
                    }}
                    title="Alternar entre Frases e Palavras"
                  >
                    {transcriptionMode === 'sentences' ? '📄 Frases' : '📚 Palavras'}
                  </button>
                )}
                {call.fullText && (
                  <button
                    onClick={() => handleCopyTranscription(call.id, call.fullText || '')}
                    className="p-2 rounded transition-all hover:brightness-110 font-black"
                    style={{
                      backgroundColor: copiedCallId === call.id
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'rgba(136, 206, 17, 0.2)',
                      color: copiedCallId === call.id ? '#10B981' : '#88CE11',
                    }}
                    title="Copiar transcrição"
                  >
                    {copiedCallId === call.id ? '✅ Copiado!' : '📋 Copiar'}
                  </button>
                )}
              </div>
            </div>

            {/* Transcript List */}
            <div className="flex-1 overflow-y-auto">
              {call.fullText ? (
                <div>
                  {transcriptionMode === 'sentences' ? (
                    (() => {
                      const sentences = call.fullText!.split(/(?<=[.!?])\s+/).filter(s => s.trim());
                      const audioDuration = audioRef.current?.duration || call.duration * 60;
                      const currentTime = audioRef.current?.currentTime || 0;

                      // Distribuir tempo do áudio proporcionalmente ao número de PALAVRAS
                      // Isso é mais preciso que estimar velocidade de fala
                      const totalWords = sentences.reduce((sum, sent) => sum + sent.trim().split(/\s+/).length, 0);
                      let cumulativeWords = 0;

                      return sentences.map((sentence, idx) => {
                        const wordCount = sentence.trim().split(/\s+/).length;
                        const sentenceStartTime = (cumulativeWords / totalWords) * audioDuration;
                        const sentenceEndTime = ((cumulativeWords + wordCount) / totalWords) * audioDuration;
                        const isCurrentItem = currentTime >= sentenceStartTime && currentTime < sentenceEndTime;
                        cumulativeWords += wordCount;

                        return (
                          <div
                            key={`sentence-${idx}`}
                            className="px-4 py-3 border-b cursor-pointer transition-colors"
                            style={{
                              borderColor: 'rgba(82, 82, 91, 0.2)',
                              backgroundColor: isCurrentItem ? 'rgba(136, 206, 17, 0.2)' : 'transparent',
                            }}
                            onClick={() => {
                              if (audioRef.current) {
                                audioRef.current.currentTime = sentenceStartTime;
                                setPlayTime(sentenceStartTime * 1000);
                                setIsPlaying(true);
                              }
                            }}
                          >
                            <div className="flex gap-2">
                              <span className="text-xs font-mono font-black flex-shrink-0" style={{ color: '#88CE11', minWidth: '60px' }}>
                                {formatTime(sentenceStartTime * 1000)} - {formatTime(sentenceEndTime * 1000)}
                              </span>
                              <p style={{ color: isCurrentItem ? '#88CE11' : '#FFFFFF', fontSize: '13px', flex: 1 }}>
                                {sentence}
                              </p>
                            </div>
                          </div>
                        );
                      });
                    })()
                  ) : (
                    (() => {
                      const sentences = call.fullText!.split(/(?<=[.!?])\s+/).filter(s => s.trim());
                      const audioDuration = audioRef.current?.duration || call.duration * 60;
                      const currentTime = audioRef.current?.currentTime || 0;

                      // Distribuir tempo proporcionalmente ao número de PALAVRAS
                      const totalWords = sentences.reduce((sum, sent) => sum + sent.trim().split(/\s+/).length, 0);
                      let cumulativeWords = 0;

                      return sentences.map((sentence, sentenceIdx) => {
                        const words = sentence.trim().split(/\s+/);
                        const wordCount = words.length;
                        const sentenceStartTime = (cumulativeWords / totalWords) * audioDuration;
                        const sentenceEndTime = ((cumulativeWords + wordCount) / totalWords) * audioDuration;

                        const wordElements = words.map((word, wordIdx) => {
                          const wordStartTime = sentenceStartTime + (wordIdx / words.length) * (sentenceEndTime - sentenceStartTime);
                          const wordEndTime = sentenceStartTime + ((wordIdx + 1) / words.length) * (sentenceEndTime - sentenceStartTime);
                          const isCurrentWord = currentTime >= wordStartTime && currentTime < wordEndTime;

                          return (
                            <button
                              key={`word-${sentenceIdx}-${wordIdx}`}
                              onClick={() => {
                                if (audioRef.current) {
                                  audioRef.current.currentTime = wordStartTime;
                                  setPlayTime(wordStartTime * 1000);
                                  setIsPlaying(true);
                                }
                              }}
                              className="px-2 py-1 rounded text-sm font-semibold cursor-pointer transition-all"
                              style={{
                                backgroundColor: isCurrentWord ? 'rgba(136, 206, 17, 0.4)' : 'rgba(82, 82, 91, 0.2)',
                                color: isCurrentWord ? '#88CE11' : '#FFFFFF',
                              }}
                            >
                              {word}
                            </button>
                          );
                        });

                        cumulativeWords += wordCount;

                        return (
                          <div key={`words-${sentenceIdx}`} className="px-4 py-3 border-b" style={{ borderColor: 'rgba(82, 82, 91, 0.2)' }}>
                            <div className="flex gap-2 mb-2">
                              <span className="text-xs font-mono font-black flex-shrink-0" style={{ color: '#88CE11', minWidth: '60px' }}>
                                {formatTime(sentenceStartTime * 1000)} - {formatTime(sentenceEndTime * 1000)}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {wordElements}
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()
                  )}
                </div>
              ) : (
                <div className="p-4 text-center" style={{ color: '#A1A1AA' }}>
                  <p className="text-sm">No transcript yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Recording Modal */}
      <RecordingModal
        isOpen={recordingModalOpen}
        onClose={() => setRecordingModalOpen(false)}
        isRecording={isRecording}
        focusOnRecord={focusOnRecord}
      >
        <PulsingCircle
          isRecording={isRecording}
          audioLevel={recordingTime / 10}
          waveformIntensity={waveformIntensity}
          audioStream={recorderRef.current?.getStream() || null}
        />
        <RecordingTimer seconds={recordingTime} />
        <div className="flex gap-4">
          <button
            onClick={handleStopRecording}
            className="px-8 py-4 rounded-lg font-black text-lg transition-all"
            style={{
              backgroundColor: '#E11D48',
              color: '#FFFFFF',
            }}
          >
            ⏹️ Stop Recording
          </button>
        </div>
      </RecordingModal>

      {/* Recording Controls (fora do modal, sempre visível quando gravando) */}
      {isRecording && !recordingModalOpen && !focusOnRecord && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-4">
          <button
            onClick={() => setRecordingModalOpen(true)}
            className="px-8 py-4 rounded-lg font-black text-lg transition-all hover:brightness-110"
            style={{
              backgroundColor: 'rgba(136, 206, 17, 0.2)',
              color: '#88CE11',
            }}
          >
            🎙️ Voltar
          </button>
          <button
            onClick={handleStopRecording}
            className="px-8 py-4 rounded-lg font-black text-lg transition-all"
            style={{
              backgroundColor: '#E11D48',
              color: '#FFFFFF',
            }}
          >
            ⏹️ Stop Recording
          </button>
        </div>
      )}

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        waveformIntensity={waveformIntensity}
        onIntensityChange={(intensity) => {
          setWaveformIntensity(intensity);
          localStorage.setItem('gama-waveform-intensity', String(intensity));
        }}
        focusOnRecord={focusOnRecord}
        onFocusOnRecordChange={(focus) => {
          setFocusOnRecord(focus);
          localStorage.setItem('gama-focus-on-record', String(focus));
        }}
      />

      <style jsx>{`
        input[type='range'] {
          width: 100%;
          height: 4px;
          border-radius: 2px;
          outline: none;
          appearance: none;
          background: linear-gradient(to right, #88CE11 0%, #88CE11 0%, #52525B 0%, #52525B 100%);
        }

        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #88CE11;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(136, 206, 17, 0.5);
        }

        input[type='range']::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #88CE11;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(136, 206, 17, 0.5);
        }
      `}</style>
    </div>
  );
}
