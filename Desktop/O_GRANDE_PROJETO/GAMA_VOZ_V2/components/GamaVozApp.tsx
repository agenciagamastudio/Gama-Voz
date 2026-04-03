'use client';

import { useState, useRef, useEffect } from 'react';
import { AudioRecorder, AudioRecorderState } from '@/lib/audio';
import { transcribeAudio, validateAudioFile, formatTranscription } from '@/lib/groq';
import {
  addToHistory,
  getEntries,
  deleteEntry,
  exportAsJSON,
  exportAsTXT,
  exportAsSRT,
  clearHistory,
  TranscriptionEntry,
} from '@/lib/storage';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/molecules/Card';
import { Alert } from '@/components/molecules/Alert';

export default function GamaVozApp() {
  const [recordingState, setRecordingState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
  });
  const [transcribedText, setTranscribedText] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [history, setHistory] = useState<TranscriptionEntry[]>([]);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadHistory();

    return () => {
      recorderRef.current?.destroy();
    };
  }, []);

  const loadHistory = () => {
    const entries = getEntries();
    setHistory(entries);
  };

  const handleStartRecording = async () => {
    try {
      setError(null);

      if (!AudioRecorder.isSupported()) {
        setError('Audio recording is not supported in your browser');
        return;
      }

      recorderRef.current = new AudioRecorder({
        onStart: () => {
          setRecordingState((prev) => ({ ...prev, isRecording: true }));
        },
        onStop: handleAudioStopped,
        onDuration: (duration) => {
          setRecordingState((prev) => ({ ...prev, duration }));
        },
        onError: (errorMsg) => {
          setError(errorMsg);
          setRecordingState((prev) => ({ ...prev, isRecording: false }));
        },
      });

      await recorderRef.current.start();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
    }
  };

  const handleStopRecording = () => {
    recorderRef.current?.stop();
    setRecordingState((prev) => ({
      ...prev,
      isRecording: false,
      duration: 0,
    }));
  };

  const handlePauseRecording = () => {
    if (recordingState.isPaused) {
      recorderRef.current?.resume();
      setRecordingState((prev) => ({ ...prev, isPaused: false }));
    } else {
      recorderRef.current?.pause();
      setRecordingState((prev) => ({ ...prev, isPaused: true }));
    }
  };

  const handleAudioStopped = async (blob: Blob) => {
    try {
      setError(null);
      setIsTranscribing(true);

      // Validate audio
      const validation = validateAudioFile(blob as File);
      if (!validation.valid) {
        setError(validation.error || 'Invalid audio file');
        return;
      }

      // Transcribe
      const result = await transcribeAudio(blob as File);

      if ('error' in result) {
        setError(result.error);
        return;
      }

      const formatted = formatTranscription(result.text);
      setTranscribedText(formatted);

      // Add to history
      const entry = addToHistory({
        text: formatted,
        timestamp: result.timestamp,
        duration: recordingState.duration,
        language: 'pt',
      });

      loadHistory();
      setSuccess('✓ Transcription complete!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transcription failed');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcribedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    deleteEntry(id);
    loadHistory();
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      loadHistory();
      setSuccess('History cleared');
      setTimeout(() => setSuccess(null), 2000);
    }
  };

  const formatDuration = (seconds: number) => {
    return AudioRecorder.formatDuration(seconds);
  };

  return (
    <div className="min-h-screen bg-gama-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gama-primary mb-4">
            GAMA Voz
          </h1>
          <p className="text-gama-text-secondary text-lg">
            Real-time audio transcription powered by Groq Whisper
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert
            variant="error"
            description={error}
            onClose={() => setError(null)}
            className="mb-6"
          />
        )}
        {success && (
          <Alert
            variant="success"
            description={success}
            className="mb-6"
          />
        )}

        {/* Recording Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-black text-gama-text mb-6">
            Record Audio
          </h2>

          <div className="flex flex-col gap-6">
            {/* Duration Display */}
            <div className="text-center p-4 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-sm mb-2">Duration</p>
              <p className="text-3xl font-black text-gama-primary">
                {formatDuration(recordingState.duration)}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              {!recordingState.isRecording ? (
                <Button
                  size="lg"
                  onClick={handleStartRecording}
                  disabled={isTranscribing}
                >
                  🎤 Start Recording
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleStopRecording}
                  >
                    ⏹ Stop
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handlePauseRecording}
                  >
                    {recordingState.isPaused ? '▶ Resume' : '⏸ Pause'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Transcription Section */}
        {transcribedText && (
          <Card className="mb-8">
            <h2 className="text-2xl font-black text-gama-text mb-4">
              Transcription Result
            </h2>

            <div className="bg-gama-dark rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
              <p className="text-gama-text leading-relaxed whitespace-pre-wrap">
                {transcribedText}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={handleCopyToClipboard}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => exportAsTXT()}
              >
                📄 Export TXT
              </Button>
              <Button
                variant="secondary"
                onClick={() => exportAsJSON()}
              >
                📋 Export JSON
              </Button>
              <Button
                variant="secondary"
                onClick={() => exportAsSRT()}
              >
                🎬 Export SRT
              </Button>
            </div>
          </Card>
        )}

        {/* History Section */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gama-text">
              History ({history.length})
            </h2>
            {history.length > 0 && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleClearHistory}
              >
                Clear All
              </Button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-gama-text-secondary text-center py-8">
              No transcriptions yet. Start recording to begin.
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gama-dark rounded-lg p-4 flex items-start justify-between gap-4 group hover:bg-gama-surface/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gama-text-secondary mb-2">
                      {new Date(entry.timestamp).toLocaleString('pt-BR')}
                    </p>
                    <p className="text-gama-text line-clamp-2">
                      {entry.text}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteHistoryItem(entry.id)}
                    className="text-gama-text-secondary hover:text-gama-error transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                    aria-label="Delete entry"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-gama-text-secondary text-sm">
          <p>GAMA Voz v2.0.0 • Powered by Groq Whisper Large v3 • Design System Gama v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
