# 🚀 GAMA Voice IA — O GRANDE PROJETO

> **Ecossistema de Aplicações Inteligentes em Português**  
> Speech-to-Text, Design System, Educação e Automação com IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-agenciagamastudio-blue.svg)](https://github.com/agenciagamastudio)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)](#-status-dos-projetos)
[![Python 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

---

## 🎤 GAMA VOZ — Sua Prioridade

> **Speech-to-Text em Português com visualização 3D interativa**

### ⚡ Começa Aqui (2 minutos)

```bash
# 1. Clonar (se não tiver feito ainda)
git clone https://github.com/agenciagamastudio/Gama-Voice-IA.git
cd Gama-Voice-IA/Desktop/O_GRANDE_PROJETO/GAMA_VOZ

# 2. Instalar (automático - recomendado)
INSTALAR_GAMA.bat              # Windows (double-click)
chmod +x INSTALAR_GAMA.sh      # macOS/Linux
./INSTALAR_GAMA.sh             # macOS/Linux

# 3. Iniciar
INICIAR_GAMA.bat               # Windows (abre 2 terminais automaticamente)

# Ou manual (2 terminais):
# Terminal 1:
cd backend && python -m uvicorn main:app --reload --port 5001

# Terminal 2:
cd ../frontend && npm run dev

# 4. Abrir no navegador
# http://localhost:5173
```

### ✨ Características

```
🎙️  Gravação Interativa     — Clique no círculo e fale
📊 Visualização 3D          — Waveform em tempo real (5 camadas)
🤖 Transcrição com IA       — Groq Whisper v3 (português)
💾 Histórico Inteligente     — Timestamps, duração, estatísticas
📱 Responsive               — Mobile + Desktop
🌐 100% Português           — Interface em PT-BR
```

### 📖 Documentação

| Documento | Tempo | Contém |
|-----------|-------|--------|
| **[QUICK_START.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/QUICK_START.md)** | 5 min | Comandos rápidos para começar agora |
| **[README.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/README.md)** | 20 min | Guia completo: uso, boas práticas, erros comuns |
| **[SETUP.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/SETUP.md)** | 30 min | Passo-a-passo detalhado de instalação |

---

## 📁 Projetos no Ecossistema

### **1. GAMA VOZ** 🎤 (ATIVO)
- **Status:** ✅ Totalmente funcional
- **Stack:** Python (FastAPI/Uvicorn) + React (Next.js)
- **Função:** Gravação de áudio com transcrição e waveform 3D
- **Começar:** [QUICK_START.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/QUICK_START.md)

### **2. GAMA Design System** 🎨 (ATIVO)
- **Status:** ✅ Totalmente funcional
- **Stack:** Next.js 14 + Tailwind CSS
- **Função:** Sistema de design com 13+ páginas de documentação
- **Começar:** `cd Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM && npm install && npm run dev`

### **3. GAMA Educação** 📚 (EM DESENVOLVIMENTO)
- **Status:** ⏳ Fase de implementação
- **Stack:** Node.js + Neo4j + React + D3.js
- **Função:** Plataforma de educação com gráfico de conhecimento
- **Começar:** `cd Desktop/O_GRANDE_PROJETO/GAMA_EDUCACAO && npm install && npm run dev`

### **4. GAMA Cronogramas** 🤖 (PLANEJAMENTO)
- **Status:** 🔜 Próximas semanas
- **Stack:** Python + AIOS Agents
- **Função:** Automação de cronogramas de conteúdo com IA
- **Docs:** [README](./Desktop/O_GRANDE_PROJETO/GAMA_CRONOGRAMAS/README.md)

---

## 🎯 Primeiros Passos

### **Pré-requisitos**

Instale antes de começar:

```bash
# Verificar se tem:
git --version              # 2.0+
node --version             # 18+
npm --version              # 9+
python --version           # 3.9+

# Se faltar algum:
# Git: https://git-scm.com/
# Node.js: https://nodejs.org/
# Python: https://www.python.org/
```

### **Instalação Passo-a-Passo**

```bash
# 1. Clone o repositório
git clone https://github.com/agenciagamastudio/Gama-Voice-IA.git

# 2. Entre no projeto
cd Gama-Voice-IA/Desktop/O_GRANDE_PROJETO/GAMA_VOZ

# 3. Instale automaticamente
bash INSTALAR_GAMA.sh          # macOS/Linux
INSTALAR_GAMA.bat              # Windows (double-click)

# 4. Aguarde terminar (~3-5 minutos)

# 5. Inicie a aplicação
bash INICIAR_GAMA.sh            # macOS/Linux
INICIAR_GAMA.bat                # Windows (double-click)

# 6. Abra no navegador
# http://localhost:5173
```

---

## 🎓 Como Usar GAMA VOZ

### **Primeira Gravação (1 minuto)**

1. **Clique no círculo verde** (parte da direita)
2. **Fale algo** no seu microfone
   - O círculo vai animar em tempo real
   - As cores vão mudar conforme o volume
3. **Clique novamente para parar**
4. **Veja o resultado:**
   - Texto transcrito aparece abaixo
   - Histórico é atualizado na esquerda
   - Duração é registrada

### **Funcionalidades**

```
┌──────────────────────────────────────────────┐
│  📊 HISTÓRICO (esquerda)                      │
│  • Lista todas as gravações anteriores        │
│  • Clique para reutilizar o texto             │
│  • Mostra estatísticas gerais                 │
├──────────────────────────────────────────────┤
│  🎙️  GRAVAÇÃO (centro/direita)                │
│  ⭕ Círculo interativo (clique para gravar)   │
│  ✅ Botões: Copiar, Baixar, Limpar           │
│  ⏱️  Mostra duração da gravação               │
└──────────────────────────────────────────────┘
```

---

## 🐛 Troubleshooting Rápido

### **"Microfone não funciona"**
1. Clique no 🔒 na barra de endereço
2. Clique "Permitir" para o microfone

### **"Port 5001 already in use"**
```bash
# Windows
netstat -aon | findstr :5001
taskkill /PID <numero> /F

# macOS/Linux
lsof -i :5001
kill -9 <PID>
```

### **"npm: command not found"**
- Instale Node.js: https://nodejs.org/

### **"python: command not found"**
- Instale Python: https://www.python.org/
- ⚠️ Marque "Add Python to PATH" durante instalação

### **"Transcrição não aparece"**
1. Verifique se backend está rodando (http://localhost:5001)
2. Reinicie backend: Ctrl+C, depois execute novamente
3. Recarregue o navegador: Ctrl+Shift+R

**Para mais erros:** Veja [README.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/README.md) seção Troubleshooting

---

## 📚 Documentação Completa

### **GAMA VOZ** (Prioridade)
- 📖 [README.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/README.md) — Completo (instalação, uso, boas práticas, erros)
- ⚡ [QUICK_START.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/QUICK_START.md) — 5 minutos para começar
- 🔧 [SETUP.md](./Desktop/O_GRANDE_PROJETO/GAMA_VOZ/SETUP.md) — Detalhado passo-a-passo

### **Outros Projetos**
- [GAMA Design System](./Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/)
- [GAMA Educação](./Desktop/O_GRANDE_PROJETO/GAMA_EDUCACAO/)
- [GAMA Cronogramas](./Desktop/O_GRANDE_PROJETO/GAMA_CRONOGRAMAS/)

### **Global**
- [CLAUDE.md](./.claude/CLAUDE.md) — Instruções para Claude Code

---

## 🛠️ Stack Técnico

### **Backend**
- FastAPI / Uvicorn
- Python 3.9+
- Groq Whisper v3 (STT)

### **Frontend**
- React 18+
- Next.js 14+
- Tailwind CSS
- Canvas 2D (Waveform)

### **Infraestrutura**
- Git + GitHub
- Railway / Vercel
- GitHub Actions

---

## 🤝 Contribuindo

1. **Fork** o repositório
2. **Crie uma branch:** `git checkout -b feature/sua-feature`
3. **Commit:** `git commit -m "feat: descrição clara"`
4. **Push:** `git push origin feature/sua-feature`
5. **Abra um Pull Request**

**Padrões de commit:**
```
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
refactor: Refatoração
test:     Testes
chore:    Build, dependências
```

---

## 🐛 Encontrou um Bug?

1. Verifique [Issues](https://github.com/agenciagamastudio/Gama-Voice-IA/issues)
2. Se não existir, [abra uma nova issue](https://github.com/agenciagamastudio/Gama-Voice-IA/issues/new)
3. Descreva: o que aconteceu, como reproduzir, o que deveria acontecer

---

## 💬 Dúvidas?

- 📖 Leia a documentação do projeto
- 💬 Abra uma [Discussion](https://github.com/agenciagamastudio/Gama-Voice-IA/discussions)
- 🐛 Reporte [Issues](https://github.com/agenciagamastudio/Gama-Voice-IA/issues)

---

## 📊 Status dos Projetos

| Projeto | Status | Stack | Docs | Tempo |
|---------|--------|-------|------|-------|
| **GAMA VOZ** | ✅ Ativo | Python + React | ✅ Completa | Agora |
| **Design System** | ✅ Ativo | Next.js | ✅ Sim | 5 min |
| **Educação** | ⏳ Dev | Node + Neo4j | ⚠️ Parcial | - |
| **Cronogramas** | 🔜 Planejamento | Python + AIOS | ⚠️ Parcial | - |

---

## 📄 Licença

MIT License © 2026 Gama Studio  
Veja [LICENSE](./LICENSE) para detalhes.

---

## 🌐 Links

- **Website:** https://gamastudio.com
- **GitHub:** https://github.com/agenciagamastudio
- **YouTube:** https://youtube.com/@gamastudio

---

<div align="center">

**🚀 Comece com [GAMA VOZ agora!](#-gama-voz--sua-prioridade)**

[⬆ Voltar ao Topo](#-gama-voice-ia--o-grande-projeto)

</div>
