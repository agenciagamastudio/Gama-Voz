/**
 * Audio capture utilities using Web Audio API
 */

export interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
}

export interface AudioRecorderCallbacks {
  onStart?: () => void;
  onStop?: (blob: Blob) => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (error: string) => void;
  onDuration?: (duration: number) => void;
}

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private state: AudioRecorderState = {
    isRecording: false,
    isPaused: false,
    duration: 0,
  };
  private startTime: number = 0;
  private pausedTime: number = 0;
  private durationInterval: NodeJS.Timeout | null = null;
  private callbacks: AudioRecorderCallbacks = {};

  constructor(callbacks: AudioRecorderCallbacks = {}) {
    this.callbacks = callbacks;
  }

  /**
   * Check if browser supports audio recording
   */
  static isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      navigator.mediaDevices?.getUserMedia !== undefined
    );
  }

  /**
   * Start audio recording
   */
  async start(): Promise<void> {
    try {
      if (this.state.isRecording) return;

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const mimeType = this.getSupportedMimeType();
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType,
        audioBitsPerSecond: 128000,
      });

      this.audioChunks = [];
      this.startTime = Date.now();
      this.pausedTime = 0;

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: this.mediaRecorder?.mimeType });
        this.stopDurationTimer();
        this.state.isRecording = false;
        this.callbacks.onStop?.(blob);
      };

      this.mediaRecorder.start();
      this.state.isRecording = true;
      this.state.isPaused = false;
      this.startDurationTimer();
      this.callbacks.onStart?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to start recording';
      this.callbacks.onError?.(message);
      throw error;
    }
  }

  /**
   * Pause audio recording
   */
  pause(): void {
    if (!this.mediaRecorder || !this.state.isRecording || this.state.isPaused) return;

    this.mediaRecorder.pause();
    this.state.isPaused = true;
    this.pausedTime = Date.now();
    this.stopDurationTimer();
    this.callbacks.onPause?.();
  }

  /**
   * Resume audio recording
   */
  resume(): void {
    if (!this.mediaRecorder || !this.state.isRecording || !this.state.isPaused) return;

    this.mediaRecorder.resume();
    this.state.isPaused = false;
    this.startTime += Date.now() - this.pausedTime;
    this.startDurationTimer();
    this.callbacks.onResume?.();
  }

  /**
   * Stop audio recording
   */
  stop(): void {
    if (!this.mediaRecorder || !this.state.isRecording) return;

    this.mediaRecorder.stop();
    this.stream?.getTracks().forEach((track) => track.stop());
  }

  /**
   * Get current state
   */
  getState(): AudioRecorderState {
    return { ...this.state };
  }

  /**
   * Get supported MIME type for current browser
   */
  private getSupportedMimeType(): string {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return ''; // Browser will use default
  }

  /**
   * Start duration timer
   */
  private startDurationTimer(): void {
    this.durationInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      this.state.duration = elapsed;
      this.callbacks.onDuration?.(elapsed);
    }, 100);
  }

  /**
   * Stop duration timer
   */
  private stopDurationTimer(): void {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
      this.durationInterval = null;
    }
  }

  /**
   * Format duration as MM:SS
   */
  static formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stop();
    this.stopDurationTimer();
    this.audioChunks = [];
  }
}

/**
 * Download audio blob
 */
export function downloadAudio(blob: Blob, filename: string = 'recording.webm'): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
