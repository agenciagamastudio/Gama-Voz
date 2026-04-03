/**
 * Storage utilities for transcription history
 */

export interface TranscriptionEntry {
  id: string;
  text: string;
  timestamp: string;
  duration?: number;
  language?: string;
}

export interface HistoryData {
  version: '1.0.0';
  entries: TranscriptionEntry[];
  lastUpdated: string;
}

const STORAGE_KEY = 'gama-voz-history';
const STORAGE_VERSION = '1.0.0';

/**
 * Initialize storage structure
 */
function getDefaultHistory(): HistoryData {
  return {
    version: STORAGE_VERSION,
    entries: [],
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Load history from localStorage
 */
export function loadHistory(): HistoryData {
  if (typeof window === 'undefined') return getDefaultHistory();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultHistory();

    const parsed = JSON.parse(stored) as HistoryData;

    // Validate structure
    if (
      !parsed.version ||
      !Array.isArray(parsed.entries) ||
      !parsed.lastUpdated
    ) {
      return getDefaultHistory();
    }

    return parsed;
  } catch {
    console.warn('Failed to load history, using default');
    return getDefaultHistory();
  }
}

/**
 * Save history to localStorage
 */
export function saveHistory(data: HistoryData): void {
  if (typeof window === 'undefined') return;

  try {
    const updated: HistoryData = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

/**
 * Add transcription to history
 */
export function addToHistory(entry: Omit<TranscriptionEntry, 'id'>): TranscriptionEntry {
  const history = loadHistory();
  const newEntry: TranscriptionEntry = {
    ...entry,
    id: `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: entry.timestamp || new Date().toISOString(),
  };

  history.entries.unshift(newEntry);

  // Keep only last 100 entries
  if (history.entries.length > 100) {
    history.entries = history.entries.slice(0, 100);
  }

  saveHistory(history);
  return newEntry;
}

/**
 * Get all entries
 */
export function getEntries(): TranscriptionEntry[] {
  return loadHistory().entries;
}

/**
 * Get entry by ID
 */
export function getEntryById(id: string): TranscriptionEntry | undefined {
  const history = loadHistory();
  return history.entries.find((entry) => entry.id === id);
}

/**
 * Delete entry by ID
 */
export function deleteEntry(id: string): void {
  const history = loadHistory();
  history.entries = history.entries.filter((entry) => entry.id !== id);
  saveHistory(history);
}

/**
 * Clear all history
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

/**
 * Export history as JSON
 */
export function exportAsJSON(filename: string = 'gama-voz-history.json'): void {
  const history = loadHistory();
  const json = JSON.stringify(history, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadFile(blob, filename);
}

/**
 * Export history as text (one per line)
 */
export function exportAsTXT(filename: string = 'gama-voz-history.txt'): void {
  const history = loadHistory();
  const text = history.entries
    .map((entry) => `[${entry.timestamp}] ${entry.text}`)
    .join('\n');
  const blob = new Blob([text], { type: 'text/plain' });
  downloadFile(blob, filename);
}

/**
 * Export history as SRT (SubRip subtitle format)
 */
export function exportAsSRT(filename: string = 'gama-voz-history.srt'): void {
  const history = loadHistory();
  let srtContent = '';
  let startTime = 0;

  history.entries.forEach((entry, index) => {
    const duration = entry.duration || 5; // Default 5 seconds per entry
    const endTime = startTime + duration;

    srtContent += `${index + 1}\n`;
    srtContent += `${formatTimeForSRT(startTime)} --> ${formatTimeForSRT(endTime)}\n`;
    srtContent += `${entry.text}\n\n`;

    startTime = endTime;
  });

  const blob = new Blob([srtContent], { type: 'text/plain' });
  downloadFile(blob, filename);
}

/**
 * Format time for SRT (HH:MM:SS,mmm)
 */
function formatTimeForSRT(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

/**
 * Download file
 */
function downloadFile(blob: Blob, filename: string): void {
  if (typeof window === 'undefined') return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Get storage stats
 */
export function getStorageStats(): { entries: number; lastUpdated: string } {
  const history = loadHistory();
  return {
    entries: history.entries.length,
    lastUpdated: history.lastUpdated,
  };
}
