const STORAGE_KEY = 'gama-voz-history';

export interface StoredCall {
  id: string;
  title: string;
  date: string;
  duration: number;
  transcript: string;
  audioUrl?: string;
  timestamp: number;
}

export function loadHistory(): StoredCall[] {
  try {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    return [];
  }
}

export function addToHistory(call: StoredCall): void {
  try {
    if (typeof window === 'undefined') return;

    const history = loadHistory();
    history.unshift(call);

    // Manter apenas os últimos 100 registros
    if (history.length > 100) {
      history.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao salvar na história:', error);
  }
}

export function deleteEntry(id: string): void {
  try {
    if (typeof window === 'undefined') return;

    const history = loadHistory().filter((call) => call.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao deletar entrada:', error);
  }
}

export function updateEntry(id: string, updates: Partial<StoredCall>): void {
  try {
    if (typeof window === 'undefined') return;

    const history = loadHistory();
    const index = history.findIndex((call) => call.id === id);

    if (index !== -1) {
      history[index] = { ...history[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Erro ao atualizar entrada:', error);
  }
}

export function clearHistory(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
  }
}

export function exportHistory(): string {
  try {
    const history = loadHistory();
    return JSON.stringify(history, null, 2);
  } catch (error) {
    console.error('Erro ao exportar histórico:', error);
    return '';
  }
}
