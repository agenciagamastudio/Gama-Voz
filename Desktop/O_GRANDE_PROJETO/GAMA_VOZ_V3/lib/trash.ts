const TRASH_KEY = 'gama-voz-trash';

export interface TrashEntry {
  id: string;
  title: string;
  date: string;
  deletedAt: number;
  data: any;
}

export function moveToTrash(id: string, data: any): void {
  try {
    if (typeof window === 'undefined') return;

    const trash = getTrashEntries();
    trash.push({
      id,
      title: data.title || `Gravação ${new Date().toLocaleDateString('pt-BR')}`,
      date: data.date || new Date().toISOString(),
      deletedAt: Date.now(),
      data,
    });

    // Manter apenas os últimos 50 itens no lixo
    if (trash.length > 50) {
      trash.shift();
    }

    localStorage.setItem(TRASH_KEY, JSON.stringify(trash));
  } catch (error) {
    console.error('Erro ao mover para lixo:', error);
  }
}

export function getTrashEntries(): TrashEntry[] {
  try {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(TRASH_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar lixeira:', error);
    return [];
  }
}

export function restoreFromTrash(id: string): any {
  try {
    if (typeof window === 'undefined') return null;

    const trash = getTrashEntries();
    const index = trash.findIndex((item) => item.id === id);

    if (index !== -1) {
      const [restored] = trash.splice(index, 1);
      localStorage.setItem(TRASH_KEY, JSON.stringify(trash));
      return restored.data;
    }

    return null;
  } catch (error) {
    console.error('Erro ao restaurar do lixo:', error);
    return null;
  }
}

export function permanentlyDelete(id: string): void {
  try {
    if (typeof window === 'undefined') return;

    const trash = getTrashEntries();
    const filtered = trash.filter((item) => item.id !== id);
    localStorage.setItem(TRASH_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao deletar permanentemente:', error);
  }
}

export function getTrashCount(): number {
  try {
    return getTrashEntries().length;
  } catch (error) {
    console.error('Erro ao contar lixeira:', error);
    return 0;
  }
}

export function emptyTrash(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TRASH_KEY);
  } catch (error) {
    console.error('Erro ao esvaziar lixo:', error);
  }
}
