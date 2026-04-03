/**
 * Groq client utilities for audio transcription
 * Uses Groq Whisper Large v3-turbo model
 */

export interface TranscriptionResult {
  success: boolean;
  text: string;
  timestamp: string;
  duration?: number;
}

export interface TranscriptionError {
  error: string;
  details?: string;
}

/**
 * Transcribe audio file using Groq API
 */
export async function transcribeAudio(
  audioFile: File
): Promise<TranscriptionResult | TranscriptionError> {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: 'Transcription failed',
        details: error.details || response.statusText,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      error: 'Transcription request failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Validate audio file before transcription
 */
export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg'];
  const maxSize = 25 * 1024 * 1024; // 25MB limit (Groq's limit)

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid audio format: ${file.type}. Supported: MP3, WAV, WebM, OGG`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max: 25MB`,
    };
  }

  return { valid: true };
}

/**
 * Format transcription result for display
 */
export function formatTranscription(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/([.!?])\s+/g, '$1 ');
}
