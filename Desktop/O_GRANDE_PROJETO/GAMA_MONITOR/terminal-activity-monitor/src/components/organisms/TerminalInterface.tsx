'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '@/contexts/AuthContext';

interface TerminalLine {
  id: string;
  timestamp: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function TerminalInterface({ terminalId }: { terminalId: string }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const { token } = useAuth();

  useEffect(() => {
    // Conectar ao WebSocket com autenticação
    socketRef.current = io('ws://localhost:3101', {
      reconnection: true,
      auth: token ? { token } : {},
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      addLine({
        type: 'output',
        content: `Connected to ${terminalId}`,
      });
    });

    socketRef.current.on('terminal:exec:success', (data: any) => {
      if (data.id === terminalId) {
        addLine({
          type: 'output',
          content: data.output,
        });
      }
    });

    socketRef.current.on('terminal:exec:error', (data: any) => {
      if (data.id === terminalId) {
        addLine({
          type: 'error',
          content: `Error: ${data.error}`,
        });
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [terminalId, token]);

  // Auto-scroll para o final
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLine = (line: Omit<TerminalLine, 'id' | 'timestamp'>) => {
    const newLine: TerminalLine = {
      id: `line-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      ...line,
    };
    setLines(prev => [...prev, newLine]);
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!input.trim()) return;

      // Adicionar comando ao histórico
      setHistory(prev => [input, ...prev]);
      setHistoryIndex(-1);

      // Exibir comando
      addLine({
        type: 'input',
        content: `$ ${input}`,
      });

      // Determinar tipo de comando
      let type = 'bash';
      let command = input;

      if (input.startsWith('npm ')) {
        type = 'npm';
        command = input.substring(4);
      } else if (input.startsWith('git ')) {
        type = 'git';
        command = input.substring(4);
      }

      // Enviar via WebSocket
      socketRef.current?.emit('terminal:exec', {
        id: terminalId,
        command,
        type,
      });

      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-void-dark border border-white/10 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm text-text-secondary">{terminalId}</span>
        <span className="text-xs text-text-secondary ml-auto">{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-1 font-mono text-sm">
        {lines.map(line => (
          <div key={line.id} className="flex gap-2">
            <span className="text-text-secondary">{line.timestamp}</span>
            <span
              className={`flex-1 ${
                line.type === 'input'
                  ? 'text-kinetic-limon'
                  : line.type === 'error'
                  ? 'text-red-500'
                  : 'text-white'
              }`}
            >
              {line.content}
            </span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 bg-void-darker rounded px-3 py-2">
        <span className="text-kinetic-limon">$</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="bash, npm, git commands..."
          className="flex-1 bg-transparent text-white outline-none font-mono text-sm placeholder-text-secondary/50"
          autoFocus
        />
      </div>

      {/* Helper Text */}
      <div className="text-xs text-text-secondary mt-2 space-y-1">
        <p>• Bash: <code className="text-kinetic-limon">ls, cd, cat, etc</code></p>
        <p>• NPM: <code className="text-kinetic-limon">npm run dev, npm test, etc</code></p>
        <p>• Git: <code className="text-kinetic-limon">git log, git status, etc</code></p>
        <p>• Arrow Up/Down to navigate history</p>
      </div>
    </div>
  );
}
