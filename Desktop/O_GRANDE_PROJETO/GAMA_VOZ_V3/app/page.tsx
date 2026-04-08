'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<any[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiForm, setShowApiForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gama-voz-api-key');
    if (saved) {
      setApiKey(saved);
      setTempApiKey(saved);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (tempApiKey.length < 10) {
      alert('Chave inválida');
      return;
    }
    localStorage.setItem('gama-voz-api-key', tempApiKey);
    setApiKey(tempApiKey);
    setShowApiForm(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#161616', color: '#fff' }}>
      {/* Sidebar */}
      <div style={{ width: '300px', background: '#1a1a1a', padding: '20px', borderRight: '1px solid rgba(136,206,17,0.1)', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#88CE11', margin: '0 0 20px 0' }}>🎙️ GAMA VOZ</h1>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          style={{
            background: settingsOpen ? 'rgba(136,206,17,0.2)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(136,206,17,0.3)',
            color: '#88CE11',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '15px',
          }}
        >
          ⚙️ Configurações
        </button>

        {settingsOpen && (
          <div style={{ background: 'rgba(136,206,17,0.1)', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '12px' }}>
            {apiKey ? (
              <p style={{ color: '#10B981', margin: '0 0 8px 0' }}>✅ Chave configurada</p>
            ) : (
              <p style={{ color: '#E11D48', margin: '0 0 8px 0' }}>❌ Sem configuração</p>
            )}

            {showApiForm ? (
              <div>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="Cole a chave Groq..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#272727',
                    border: '1px solid rgba(136,206,17,0.3)',
                    borderRadius: '4px',
                    color: '#fff',
                    marginBottom: '8px',
                    fontSize: '11px',
                  }}
                />
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={handleSaveApiKey}
                    style={{
                      flex: 1,
                      padding: '6px',
                      background: '#88CE11',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setShowApiForm(false)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowApiForm(true)}
                style={{
                  width: '100%',
                  padding: '6px',
                  background: 'rgba(136,206,17,0.2)',
                  color: '#88CE11',
                  border: '1px solid rgba(136,206,17,0.5)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                {apiKey ? '🔄 Alterar' : '➕ Adicionar'} Chave
              </button>
            )}

            <p style={{ fontSize: '10px', color: '#A1A1AA', margin: '8px 0 0 0' }}>
              Obter em:{' '}
              <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" style={{ color: '#88CE11' }}>
                console.groq.com
              </a>
            </p>
          </div>
        )}

        <button
          onClick={() => {
            if (!apiKey) {
              alert('Configure a chave API primeiro!');
              return;
            }
            setIsRecording(!isRecording);
            setCurrentText(isRecording ? '' : '🎤 Gravando...');
          }}
          style={{
            background: isRecording ? '#E11D48' : '#88CE11',
            color: isRecording ? '#fff' : '#000',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            marginBottom: '20px',
            width: '100%',
          }}
        >
          {isRecording ? '⏹️ Parar' : '🎙️ Gravar'}
        </button>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <p style={{ fontSize: '11px', color: '#88CE11', fontWeight: 600, margin: '0 0 10px 0' }}>
            HISTÓRICO ({transcriptions.length})
          </p>
          {transcriptions.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                background: selectedId === t.id ? 'rgba(136,206,17,0.15)' : 'rgba(255,255,255,0.03)',
                borderLeft: selectedId === t.id ? '3px solid #88CE11' : '3px solid transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              <p style={{ margin: '0 0 3px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.text.substring(0, 30)}...
              </p>
              <p style={{ margin: 0, fontSize: '9px', color: '#A1A1AA' }}>
                {new Date(t.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '40px', margin: '0 0 10px 0' }}>Transcrição de Áudio</h2>
        <p style={{ color: '#A1A1AA', margin: '0 0 40px 0' }}>Grave e transcreva com IA</p>

        {isRecording && (
          <div style={{ padding: '15px', background: 'rgba(136,206,17,0.1)', borderLeft: '3px solid #88CE11', marginBottom: '20px', borderRadius: '6px' }}>
            <p style={{ margin: 0, color: '#88CE11' }}>🔴 Gravando...</p>
          </div>
        )}

        <div style={{ padding: '24px', background: '#272727', borderRadius: '10px', border: '1px solid rgba(136,206,17,0.2)', minHeight: '200px', marginBottom: '30px' }}>
          <p style={{ fontSize: '11px', color: '#88CE11', margin: '0 0 15px 0', fontWeight: 600 }}>TRANSCRIÇÃO</p>
          <p style={{ fontSize: '15px', color: currentText ? '#fff' : '#A1A1AA', margin: 0 }}>
            {currentText || 'Clique em "Gravar" para começar...'}
          </p>
        </div>

        {selectedId && (
          <div style={{ padding: '24px', background: 'linear-gradient(135deg, #2a3a1a 0%, #2d3d1f 100%)', borderRadius: '10px', border: '2px solid #88CE11' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#88CE11', margin: '0 0 5px 0', fontWeight: 600 }}>SELECIONADO</p>
                <p style={{ fontSize: '12px', color: '#A1A1AA', margin: 0 }}>
                  {new Date(transcriptions.find((t) => t.id === selectedId)?.timestamp || 0).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => {
                  setTranscriptions(transcriptions.filter((t) => t.id !== selectedId));
                  setSelectedId(null);
                }}
                style={{ padding: '8px 12px', background: '#E11D48', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                🗑️ Deletar
              </button>
            </div>
            <p style={{ fontSize: '14px', color: '#fff', margin: 0 }}>
              {transcriptions.find((t) => t.id === selectedId)?.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
