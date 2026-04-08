const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY não configurada. Configure a variável de ambiente NEXT_PUBLIC_GROQ_API_KEY');
    }

    // Converter WebM para WAV (formato suportado pelo Groq)
    const wavBlob = await convertToWav(audioBlob);

    const formData = new FormData();
    formData.append('file', wavBlob, 'audio.wav');
    formData.append('model', 'whisper-large-v3-turbo');
    formData.append('language', 'pt');
    formData.append('response_format', 'json');

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro Groq: ${error.error?.message || 'Erro desconhecido'}`);
    }

    const result = await response.json();
    return result.text || '';
  } catch (error) {
    console.error('Erro ao transcrever áudio:', error);
    throw error;
  }
}

export async function validateAudioFile(audioBlob: Blob): Promise<boolean> {
  try {
    if (audioBlob.size === 0) {
      throw new Error('Arquivo de áudio vazio');
    }

    // Validar tamanho máximo (25MB para Groq)
    const maxSize = 25 * 1024 * 1024;
    if (audioBlob.size > maxSize) {
      throw new Error(`Arquivo muito grande. Máximo: 25MB`);
    }

    return true;
  } catch (error) {
    console.error('Erro ao validar arquivo:', error);
    throw error;
  }
}

async function convertToWav(webmBlob: Blob): Promise<Blob> {
  // Se for WebM, tentar converter para WAV
  // Para simplificar, vamos retornar o blob original
  // Em produção, usar uma library como ffmpeg.js
  return webmBlob;
}

export async function analyzeTranscription(text: string): Promise<{
  keywords: string[];
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}> {
  try {
    const keywords = extractKeywords(text);
    const summary = generateSummary(text);
    const sentiment = analyzeSentiment(text);

    return { keywords, summary, sentiment };
  } catch (error) {
    console.error('Erro ao analisar transcrição:', error);
    throw error;
  }
}

function extractKeywords(text: string): string[] {
  // Remover stopwords comuns em português
  const stopwords = new Set([
    'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
    'e', 'ou', 'mas', 'porém', 'contudo', 'de', 'em', 'para', 'por',
    'com', 'sem', 'sobre', 'entre', 'durante', 'depois', 'antes',
    'é', 'são', 'foi', 'eram', 'ser', 'estar', 'ter', 'há',
  ]);

  const words = text.toLowerCase().split(/\s+/);
  const filtered = words.filter(
    (word) => word.length > 3 && !stopwords.has(word) && /^[a-záéíóúãõ]+$/.test(word),
  );

  // Contar frequência
  const frequency = new Map<string, number>();
  filtered.forEach((word) => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Retornar top 5 palavras-chave
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

function generateSummary(text: string): string {
  // Gerar resumo simples (primeiras 3 sentences)
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const summary = sentences
    .slice(0, 3)
    .join(' ')
    .trim();

  return summary.length > 0 ? summary : text.substring(0, 200) + '...';
}

function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const positiveWords = /bom|ótimo|excelente|boa|legal|adorei|perfeito|feliz|alegre|sucesso/gi;
  const negativeWords = /ruim|péssimo|horrível|má|errado|chato|triste|fracasso|problema|erro/gi;

  const positiveCount = (text.match(positiveWords) || []).length;
  const negativeCount = (text.match(negativeWords) || []).length;

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}
