# 🚀 O GRANDE PROJETO — Gama Studio

> **Ecossistema de Aplicações Inteligentes em Português**  
> Conversação, Voz, Design System e Educação com IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-agenciagamastudio-blue.svg)](https://github.com/agenciagamastudio)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)](#)

---

## 📁 Projetos

### 🎤 **GAMA VOZ** — Speech-to-Text Interativo

> Gravação de áudio inteligente com visualização 3D em tempo real

**Status:** ✅ Funcional | **Stack:** Python (FastAPI) + React (Next.js)

#### Características
- 🎙️ Gravação interativa com microfone
- 📊 Visualização 3D em tempo real (Waveform)
- 🤖 Transcrição com Groq Whisper v3 (português)
- 💾 Histórico inteligente com timestamps
- 🌐 Interface 100% em português

#### Início Rápido

```bash
cd GAMA_VOZ

# Opção 1: Instalação automática (recomendado)
INSTALAR_GAMA.bat          # Windows
./INSTALAR_GAMA.sh         # macOS/Linux

# Opção 2: Manual
cd backend && pip install -r requirements.txt
cd ../frontend && npm install

# Terminal 1 — Backend
cd backend
python -m uvicorn main:app --reload --port 5001

# Terminal 2 — Frontend
cd frontend
npm run dev

# Abra: http://localhost:5173
```

📖 **Documentação completa:** [GAMA_VOZ/README.md](./GAMA_VOZ/README.md)  
📖 **Guia detalhado:** [GAMA_VOZ/SETUP.md](./GAMA_VOZ/SETUP.md)  
⚡ **Quick start:** [GAMA_VOZ/QUICK_START.md](./GAMA_VOZ/QUICK_START.md)

---

### 🎨 **GAMA Design System** — Design System Nativo

> Sistema de design completo com componentes reutilizáveis

**Status:** ✅ Funcional | **Stack:** Next.js + TypeScript + Tailwind

#### Características
- 🎨 13+ páginas de documentação
- 🧩 Componentes reutilizáveis
- 🎯 Guia de cores, tipografia e espaçamento
- 📱 Mobile-first responsive
- 🌟 GAMA branding native

📖 **Documentação:** [GAMA_DESIGN_SYSTEM/README.md](./GAMA_DESIGN_SYSTEM/gama-ds-platform/)

---

### 📚 **GAMA Educação** — Plataforma de Aprendizado

> Plataforma de educação com gráfico de conhecimento interativo

**Status:** ⏳ Desenvolvimento | **Stack:** Node.js + Neo4j + React + D3.js

#### Características
- 📊 Gráfico de conhecimento em tempo real
- 🎓 Cursos estruturados
- 🔍 Busca semântica
- 📈 Rastreamento de progresso

📖 **Documentação:** [GAMA_EDUCACAO/README.md](./GAMA_EDUCACAO/)

---

### 🤖 **GAMA Cronogramas** — Automação de Conteúdo

> Orquestração automática de cronogramas de conteúdo com IA

**Status:** ⏳ Desenvolvimento | **Stack:** Python + AIOS Agents

#### Características
- 📅 Automação de cronogramas
- 🎯 8 agentes especializados
- 📝 Geração de copywriting
- 🔄 Workflow autônomo

📖 **Documentação:** [GAMA_CRONOGRAMAS/README.md](./GAMA_CRONOGRAMAS/)

---

## ✨ Stack Tecnológico

### **Backend**
- **Framework:** FastAPI, Flask, Express
- **Linguagens:** Python 3.9+, Node.js 18+
- **Banco de Dados:** PostgreSQL, Neo4j, SQLite
- **APIs:** Groq (STT), Edge-TTS

### **Frontend**
- **Framework:** React 18+, Next.js 14+
- **Styling:** Tailwind CSS, CSS-in-JS
- **Visualização:** D3.js, Canvas 2D, Three.js
- **Build:** Vite, Webpack

### **Infraestrutura**
- **Versionamento:** Git, GitHub
- **CI/CD:** GitHub Actions
- **DevOps:** Docker, Railway, Vercel
- **Monitoring:** Sentry, DataDog

---

## 🚀 Primeiros Passos

### **1. Pré-requisitos Globais**

```bash
# Verifique as versões instaladas
git --version              # 2.0+
node --version             # 18+
npm --version              # 9+
python --version           # 3.9+
```

Se algum estiver faltando:
- **Git:** https://git-scm.com/
- **Node.js:** https://nodejs.org/
- **Python:** https://www.python.org/

### **2. Clone o Repositório**

```bash
git clone https://github.com/agenciagamastudio/Gama-Voice-IA.git
cd Gama-Voice-IA/Desktop/O_GRANDE_PROJETO
```

### **3. Escolha um Projeto**

```bash
# GAMA VOZ (recomendado para começar)
cd GAMA_VOZ
./INSTALAR_GAMA.sh         # ou INSTALAR_GAMA.bat (Windows)

# GAMA Design System
cd GAMA_DESIGN_SYSTEM/gama-ds-platform
npm install && npm run dev

# GAMA Educação
cd GAMA_EDUCACAO
npm install && npm run dev
```

---

## 📖 Documentação

### **Global**
- [README.md](./README.md) ← Você está aqui
- [CLAUDE.md](./.claude/CLAUDE.md) — Instruções para Claude Code

### **GAMA VOZ** (Prioridade)
- [README.md](./GAMA_VOZ/README.md) — Documentação completa
- [SETUP.md](./GAMA_VOZ/SETUP.md) — Guia detalhado
- [QUICK_START.md](./GAMA_VOZ/QUICK_START.md) — Quick reference (5 min)

### **Outros Projetos**
- [GAMA Design System](./GAMA_DESIGN_SYSTEM/gama-ds-platform/README.md)
- [GAMA Educação](./GAMA_EDUCACAO/README.md)
- [GAMA Cronogramas](./GAMA_CRONOGRAMAS/README.md)

---

## 🛠️ Desenvolvimento

### **Estrutura**

```
O_GRANDE_PROJETO/
├── GAMA_VOZ/                    # 🎤 Speech-to-Text + Waveform 3D
│   ├── backend/                 # FastAPI + Groq STT
│   ├── frontend/                # React + Next.js
│   ├── SETUP.md                 # Guia detalhado
│   ├── QUICK_START.md           # Quick reference
│   ├── INSTALAR_GAMA.bat/sh     # Scripts de instalação
│   └── README.md                # Documentação completa
│
├── GAMA_DESIGN_SYSTEM/          # 🎨 Design System
│   └── gama-ds-platform/        # Next.js + Tailwind
│
├── GAMA_EDUCACAO/               # 📚 Plataforma de Educação
│   ├── backend/                 # Node.js + Neo4j
│   ├── frontend/                # React + D3.js
│   └── README.md
│
├── GAMA_CRONOGRAMAS/            # 🤖 Automação de Conteúdo
│   ├── agents/                  # 8 agentes AIOS
│   ├── tasks/                   # Tarefas automáticas
│   └── README.md
│
└── .aios-core/                  # 🧠 AIOS Framework
    ├── agents/                  # Definições de agentes
    ├── tasks/                   # Templates de tarefas
    └── workflows/               # Orquestrações
```

### **Padrões de Commit**

```bash
feat:     # Nova funcionalidade
fix:      # Correção de bug
docs:     # Documentação
style:    # Formatação
refactor: # Refatoração
test:     # Testes
chore:    # Build, deps
```

### **Branch Strategy**

```
main (produção)
  ↑
  ├─ feature/nova-funcionalidade
  ├─ fix/bug-importante
  └─ docs/atualizacao-readme
```

---

## 🤝 Contribuindo

1. **Fork** o repositório
2. **Crie uma branch:** `git checkout -b feature/sua-feature`
3. **Commit:** `git commit -m "feat: descrição clara"`
4. **Push:** `git push origin feature/sua-feature`
5. **Pull Request:** Abra um PR no GitHub

---

## 🐛 Encontrou um Bug?

1. Verifique [Issues](https://github.com/agenciagamastudio/Gama-Voice-IA/issues)
2. Se não existir, [crie uma nova issue](https://github.com/agenciagamastudio/Gama-Voice-IA/issues/new)
3. Descreva:
   - O que aconteceu
   - Como reproduzir
   - O que deveria acontecer
   - Seu sistema operacional e versões

---

## 💡 Perguntas?

- 📖 Leia a documentação do projeto específico
- 💬 Abra uma [Discussion](https://github.com/agenciagamastudio/Gama-Voice-IA/discussions)
- 🐛 Reporte [Issues](https://github.com/agenciagamastudio/Gama-Voice-IA/issues)

---

## 📊 Status dos Projetos

| Projeto | Status | Stack | Docs |
|---------|--------|-------|------|
| **GAMA VOZ** | ✅ Funcional | Python + React | ✅ Completa |
| **GAMA Design System** | ✅ Funcional | Next.js + Tailwind | ✅ Sim |
| **GAMA Educação** | ⏳ Desenvolvimento | Node.js + Neo4j | ⚠️ Parcial |
| **GAMA Cronogramas** | ⏳ Planejamento | Python + AIOS | ⚠️ Parcial |

---

## 🎯 Roadmap

### **Q2 2026**
- ✅ GAMA VOZ funcional com histórico
- ✅ GAMA Design System v1.0
- ⏳ GAMA Educação beta
- ⏳ GAMA Cronogramas MVP

### **Q3 2026**
- 🔜 API Gateway centralizada
- 🔜 Autenticação universal
- 🔜 Dashboard de analytics
- 🔜 Integração com LLMs

### **Q4 2026**
- 🔜 App Mobile (iOS/Android)
- 🔜 Voice Chat com IA
- 🔜 Realtime Collaboration
- 🔜 Enterprise Features

---

## 📄 Licença

MIT License © 2026 Gama Studio  
Veja [LICENSE](./LICENSE) para detalhes.

---

## 👥 Equipe

Desenvolvido com ❤️ por **Gama Studio**

- 🔧 **Dev Team** — Backend, Frontend, DevOps
- 🎨 **Design Team** — UI/UX, Design System
- 🧠 **AI Team** — LLMs, Agents, Automação
- 📊 **Product Team** — Estratégia, Roadmap

---

## 🌐 Links

- **Website:** https://gamastudio.com
- **GitHub:** https://github.com/agenciagamastudio
- **YouTube:** https://youtube.com/@gamastudio
- **LinkedIn:** https://linkedin.com/company/gamastudio

---

## 📫 Contato

- 📧 Email: contact@gamastudio.com
- 💬 Slack: [Workspace](https://gamastudio.slack.com)
- 🐦 Twitter: [@gamastudio](https://twitter.com/gamastudio)

---

<div align="center">

**🚀 Comece com [GAMA VOZ](./GAMA_VOZ/README.md) agora!**

[⬆ Voltar ao Topo](#-o-grande-projeto--gama-studio)

</div>
