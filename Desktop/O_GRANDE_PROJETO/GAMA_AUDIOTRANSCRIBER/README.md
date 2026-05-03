# GAMA Audio Transcriber

**Version:** 0.1.0 | **License:** MIT | **Status:** Production-Ready

Transcreva áudios em massa (WhatsApp, podcasts, meetings) automaticamente via Groq Whisper → gere `.md` com transcrições → integre contexto 100% no Claude Code.

## The Problem

Claude Code consegue ler **imagens e textos**, mas não consegue ler **áudios diretos**. Conversas por WhatsApp, podcasts, reuniões — tudo em áudio que não fica estruturado em texto.

## The Solution

Automação que:
1. Encontra todos os áudios de uma pasta (recursiva, qualquer estrutura)
2. Transcreve via Groq Whisper v3 Turbo (PT-BR nativo, 100 req/min grátis)
3. Gera arquivo `.md` com transcrição completa
4. Você coloca tudo junto e envia pro Claude → **contexto 100%**

## Quick Start (5 minutes)

### 1. Install

```bash
# Method 1: Development (editable install)
git clone https://github.com/gama-team/gama-audio-transcriber.git
cd gama-audio-transcriber
pip install -e .

# Method 2: Direct from GitHub
pip install git+https://github.com/gama-team/gama-audio-transcriber.git
```

### 2. Configure API Key

```bash
# Get free API key at https://console.groq.com/keys
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

### 3. Run

**Option A: CLI (recommended)**
```bash
gama-transcriber /path/to/audios
```

**Option B: Web UI**
```bash
python -m src.web
# Visit http://localhost:8000
```

**Option C: Skill (in Claude Code)**
```
/transcrever-audios /path/to/audios
```

## Features

✅ **CLI Tool** — `gama-transcriber` command-line tool  
✅ **Web UI** — Drag & drop interface on localhost:8000  
✅ **Recursive Processing** — Finds all audio files automatically  
✅ **Real-time Progress** — Server-sent events for live updates  
✅ **Multiple Formats** — .mp3, .wav, .m4a, .ogg, .flac, .wma  
✅ **100% Local** — No cloud uploads, all processing on your machine  
✅ **Production-Ready** — Error handling, retries, logging  
✅ **MIT License** — Open source, free to use  

## Installation Methods

| Method | Speed | Use When |
|--------|-------|----------|
| [Local Dev](./docs/INSTALLATION.md#method-1-local-development) | ⚡ Fast | Developing or CLI |
| [From GitHub](./docs/INSTALLATION.md#method-2-direct-from-github) | 🚀 Quick | Latest version wanted |
| [Clone + Install](./docs/INSTALLATION.md#method-3-from-local-clone) | 📦 Standard | Full control needed |
| [PyPI](./docs/INSTALLATION.md#method-4-pypi-package-future) | 🔮 Coming | Once published |
| [Docker](./docs/INSTALLATION.md#method-5-docker-future) | 🐳 Future | Container deployment |

👉 **[Full Installation Guide](./docs/INSTALLATION.md)**

## Supported Formats

| Format | Supported |
|--------|-----------|
| `.ogg` (WhatsApp) | ✅ |
| `.m4a` (iOS, Telegram) | ✅ |
| `.mp3` (Standard) | ✅ |
| `.wav` (Uncompressed) | ✅ |
| `.flac` (Lossless) | ✅ |
| `.wma` (Windows) | ✅ |

## Output Example

For each audio file:

```
my_audios/
├── meeting.mp3
└── meeting.md   ← Generated

Content of meeting.md:
```

```markdown
# Transcription: meeting.mp3

**File:** meeting.mp3  
**Duration:** 45 minutes  
**Language:** Portuguese  
**Model:** Groq Whisper v3 Turbo  
**Transcribed:** 2024-05-03 10:35 UTC

---

[Full transcription text here...]
```

## Architecture

```
src/
├── __init__.py         # Package metadata
├── transcriber.py      # Core logic (file discovery + processing)
├── groq_client.py      # Groq API integration
├── utils.py            # Logging, helpers
├── cli.py              # CLI entry point (gama-transcriber command)
└── web.py              # Web UI (FastAPI)

docs/
├── PROJECT-BRIEF.md    # Product requirements
├── INSTALLATION.md     # Installation guide (5 methods)
└── API-REFERENCE.md    # Web API + CLI reference

skill/
└── transcrever-audios.py  # Claude Code skill

static/
├── index.html          # Web UI frontend
├── style.css           # Styling
└── app.js              # Frontend logic
```

## Documentation

- **[INSTALLATION.md](./docs/INSTALLATION.md)** — 5 installation methods
- **[API-REFERENCE.md](./docs/API-REFERENCE.md)** — Web API + CLI detailed reference
- **[QUICKSTART.md](./QUICKSTART.md)** — Quick walkthrough
- **[USAGE.md](./USAGE.md)** — Examples and use cases
- **[PROJECT-BRIEF.md](./docs/PROJECT-BRIEF.md)** — Product specifications

## Tech Stack

- **STT Engine:** Groq Whisper v3 Turbo (100 req/min free, PT-BR native)
- **CLI:** Python 3.9+
- **Web API:** FastAPI
- **Frontend:** Vanilla JavaScript (no dependencies)
- **Deployment:** Docker-ready

## Rate Limits

Groq provides:
- **100 requests/minute** (soft limit)
- **Unlimited file size** handling
- **0 cost** for testing

CLI automatically handles rate limiting with backoff.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `GROQ_API_KEY not found` | [See INSTALLATION.md](./docs/INSTALLATION.md#post-installation-setup) |
| `gama-transcriber: command not found` | Virtual environment not activated, reinstall with `pip install -e .` |
| `Port 8000 in use` | `python -m src.web --port 8001` |
| `ModuleNotFoundError: No module named 'groq'` | Run `pip install -e .` to install deps |

👉 **[Full Troubleshooting Guide](./docs/INSTALLATION.md#troubleshooting)**

## Next Steps

1. **Install:** Pick one of [5 methods](./docs/INSTALLATION.md)
2. **Run:** Use CLI `gama-transcriber ./audios`
3. **Integrate:** Send `.md` files to Claude Code
4. **Contribute:** [Open an issue](https://github.com/gama-team/gama-audio-transcriber/issues)

---

**Made with ❤️ by GAMA Team** | MIT License | [GitHub](https://github.com/gama-team/gama-audio-transcriber)
