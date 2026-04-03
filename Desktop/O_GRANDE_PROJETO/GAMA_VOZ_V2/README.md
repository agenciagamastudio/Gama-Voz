# 🎤 GAMA Voz v2.0

**Grave. Transcreva. Pronto.**

Aplicação Next.js moderna para transcrever áudio em tempo real com Groq Whisper API. Construída com React 18, Tailwind CSS v4 e Design System Gama v1.0.0.

---

## 🚀 Como Usar (2 minutos)

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar API key
Crie um arquivo `.env.local` na raiz do projeto:
```env
GROQ_API_KEY=gsk-seu-token-aqui
```

### 3️⃣ Rodar em desenvolvimento
```bash
npm run dev
```

Abre automaticamente em: `http://localhost:3000`

### 4️⃣ Build para produção
```bash
npm run build
npm run start
```

---

## 🎯 O Que Faz

✅ **Gravar áudio** — Captura de áudio em tempo real (pause/resume)  
✅ **Transcrever** — Groq Whisper Large v3-turbo (português otimizado)  
✅ **Histórico** — Persiste em localStorage com recuperação automática  
✅ **Exportar** — TXT, JSON, SRT (para legendas)  
✅ **Deletar** — Remove do histórico com confirmação  
✅ **Design System** — 100% Gama v1.0.0 (cores, tipografia, componentes)

---

## 📁 Estrutura do Projeto

```
gama-voz/
├── app/
│   ├── layout.tsx              (layout root com fonts)
│   ├── page.tsx                (home page)
│   ├── globals.css             (estilos globais Tailwind + DS)
│   └── api/
│       └── transcribe/route.ts (endpoint Groq)
├── components/
│   ├── GamaVozApp.tsx          (componente principal)
│   ├── atoms/
│   │   ├── Button.tsx          (component DS)
│   │   └── Input.tsx           (component DS)
│   └── molecules/
│       ├── Card.tsx            (component DS)
│       └── Alert.tsx           (component DS)
├── lib/
│   ├── groq.ts                 (utilitários Groq API)
│   ├── audio.ts                (Web Audio API wrapper)
│   └── storage.ts              (localStorage + exports)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── .env.example               (template de variáveis)
```

---

## ⚙️ Configuração

### Onde pegar API key Groq?
1. Vá para https://console.groq.com
2. Faça login/signup (gratuito)
3. Crie uma nova API key
4. Cole em `.env.local` como `GROQ_API_KEY`

### Requisitos
- Node.js 18+
- npm ou yarn
- Navegador moderno com suporte a Web Audio API

---

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14, React 18, TypeScript 5.9
- **Styling:** Tailwind CSS v4, Design System Gama v1.0.0
- **Audio:** Web Audio API (MediaRecorder)
- **Transcription:** Groq Whisper Large v3-turbo
- **Storage:** localStorage + exports (JSON/TXT/SRT)

---

## 💰 Custo

- **GRATUITO!** Groq oferece uso gratuito
- Sem limite de crédito inicial
- Muito mais rápido que OpenAI
- Perfeito para uso pessoal/pequeno

---

## 🐛 Troubleshooting

**"GROQ_API_KEY não configurada"**
→ Verifique `.env.local` na raiz do projeto

**"Erro ao transcrever"**
→ Confira sua API key em https://console.groq.com/keys
→ Certifique-se que a chave está ativa

**Áudio não está gravando**
→ Certifique-se que o navegador tem permissão de microfone
→ Funciona em Chrome, Firefox, Edge (melhor suporte)

**Build falha**
→ Execute `npm install` novamente
→ Verifique `npm run lint` e `npm run typecheck`

---

## 📊 Validação

- ✅ **Build:** `npm run build` (sem erros)
- ✅ **Lint:** `npm run lint` (ESLint clean)
- ✅ **Types:** `npm run typecheck` (TypeScript safe)
- ✅ **Design:** 100% Gama Design System v1.0.0
- ✅ **Performance:** 91.9 kB First Load JS

---

## 📝 Desenvolvido com

Refatorado de Streamlit para Next.js + Tailwind + Gama Design System.
- **Story:** GAMA_VOZ_V2 Refactor (1.2)
- **Commits:** d01b3c6, a04fbe9, cc32f8a, d56bd4f
- **Status:** ✅ Ready for QA Gate

---

**Pronto? Só rodar!** 🚀
