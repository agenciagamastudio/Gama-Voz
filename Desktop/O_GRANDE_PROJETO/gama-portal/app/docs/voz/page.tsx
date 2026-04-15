'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import TechBadge from '@/app/components/docs/TechBadge';
import CodeBlock from '@/app/components/docs/CodeBlock';

export default function Page() {
  return (
    <DocLayout
      title="GAMA VOZ"
      description="Full-stack Speech-to-Text e Text-to-Speech em português com IA natural"
    >
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que é GAMA VOZ?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          GAMA VOZ é uma solução full-stack para processamento de fala em português. Oferece transcription (STT) com Groq Whisper, síntese de voz (TTS) com Edge-TTS, e interface web intuitiva para usuários finais.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Suporta múltiplos idiomas, vozes naturais, e pode ser integrada em qualquer aplicação via API.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Características Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard icon="🎤" title="STT Avançado" description="Transcription com Groq Whisper v3 Turbo" />
          <FeatureCard icon="🔊" title="TTS Natural" description="Edge-TTS com vozes naturais em português" />
          <FeatureCard icon="🌍" title="Multi-idioma" description="Suporte para 50+ idiomas simultâneos" />
          <FeatureCard icon="⚡" title="Rápido" description="Latência <500ms para transcription" />
          <FeatureCard icon="🔐" title="Privado" description="Processa localmente, não armazena áudio" />
          <FeatureCard icon="📱" title="Web e Mobile" description="Funciona em desktop e mobile browsers" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          <TechBadge name="Python" />
          <TechBadge name="FastAPI" />
          <TechBadge name="Next.js" />
          <TechBadge name="React" />
          <TechBadge name="Groq API" />
          <TechBadge name="Edge-TTS" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
        <div className="space-y-4">
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Backend (Python)</p>
            <CodeBlock code={`git clone https://github.com/agenciagamastudio/GAMA_VOZ.git
cd GAMA_VOZ && pip install -r requirements.txt
export GROQ_API_KEY="your-key"
python main.py`} language="bash" />
          </div>
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Frontend (Next.js)</p>
            <CodeBlock code={`cd frontend && npm install
npm run dev
# Acesse http://localhost:3000`} language="bash" />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Arquitetura</h2>
        <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
          <p className="text-gray-300">Backend Python com FastAPI processa áudio e gerencia streaming. Frontend Next.js captura áudio e exibe transcrições em tempo real.</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Recursos</h2>
        <a href="https://github.com/agenciagamastudio/GAMA_VOZ" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--gama-primary)] text-black font-semibold rounded-lg">
          GitHub Repository
        </a>
      </section>
    </DocLayout>
  );
}
