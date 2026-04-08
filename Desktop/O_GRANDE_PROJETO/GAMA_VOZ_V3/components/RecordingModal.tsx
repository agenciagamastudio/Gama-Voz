'use client';

import { ReactNode } from 'react';

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isRecording?: boolean;
  focusOnRecord?: boolean;
}

export default function RecordingModal({
  isOpen,
  onClose,
  children,
  isRecording = false,
  focusOnRecord = true,
}: RecordingModalProps) {
  if (!isOpen) return null;

  // Não fecha clicando fora enquanto está gravando E focusOnRecord está ativo
  const handleBackdropClick = () => {
    if (!isRecording || !focusOnRecord) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full"
        style={{ maxWidth: '700px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar - invisível (click fora funciona) */}
        <button
          onClick={onClose}
          disabled={isRecording && focusOnRecord}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-all"
          style={{
            display: 'none',
          }}
          title="Fechar"
        >
          ✕
        </button>

        {/* Conteúdo */}
        <div className="flex flex-col items-center gap-8 py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
