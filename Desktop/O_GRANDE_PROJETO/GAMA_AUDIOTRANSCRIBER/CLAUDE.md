---
name: GAMA_AUDIOTRANSCRIBER
description: Transcrição automatizada de áudios → integração de contexto completo no Claude Code
type: DevTools
status: Production-Ready
version: 0.1.0
doc_tier: 1
owner: @devops
repository: https://github.com/gama-team/gama-audio-transcriber
---

# GAMA_AUDIOTRANSCRIBER — Claude Context

**Version:** 0.1.0 | **Status:** 🚀 Production-Ready | **License:** MIT

## Project

- **Name:** GAMA Audio Transcriber
- **Purpose:** Convert audio files (WhatsApp, podcasts, meetings) → transcriptions (`.md`) → integrate 100% context into Claude Code
- **Type:** DevTools (CLI + Web UI)
- **Stack:** Python 3.9+ + Groq Whisper API (free, 100 req/min)

## Tech Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Language | Python 3.9+ | Cross-platform, easy global install |
| STT Engine | Groq Whisper v3 Turbo | Free tier, 100 req/min, PT-BR native |
| Web Framework | FastAPI | Modern, async, zero-config |
| Package Manager | setuptools + pyproject.toml | Modern Python packaging |
| CLI Tool | Custom argparse | Zero external dependencies for CLI |

## Installation

```bash
# Recommended: Local development mode
pip install -e .
gama-transcriber --help

# Or: Direct from GitHub
pip install git+https://github.com/gama-team/gama-audio-transcriber.git
```

See **[INSTALLATION.md](./docs/INSTALLATION.md)** for 5 methods.

## Quick Start

```bash
# 1. Set API key
export GROQ_API_KEY=gsk_xxxxxxxx

# 2. CLI
gama-transcriber /path/to/audios
# Output: ./outputs/{filename}.md

# 3. Web UI
python -m src.web
# Visit: http://localhost:8000

# 4. Skill (in Claude Code)
/transcrever-audios /path/to/audios
```

## Project Structure

```
src/
├── __init__.py              # Version metadata
├── transcriber.py           # Core logic (find + transcribe)
├── groq_client.py           # Groq API wrapper
├── utils.py                 # Helpers, logging
├── cli.py                   # Entry point: gama-transcriber
└── web.py                   # Web UI: http://localhost:8000

docs/
├── PROJECT-BRIEF.md         # Product specs
├── INSTALLATION.md          # 5 install methods
└── API-REFERENCE.md         # Full API docs

static/
├── index.html               # Web UI frontend
├── style.css                # Minimal styling
└── app.js                   # Frontend logic

.gitignore, .env.example, setup.py, pyproject.toml, LICENSE, README.md
```

## Commands

### CLI
```bash
gama-transcriber /path                      # Transcribe folder
gama-transcriber /path --output /custom      # Custom output dir
gama-transcriber /path --language pt         # Force language
gama-transcriber /path --model model-name    # Specify model
```

### Web API
```bash
POST   /upload           # Upload audio
GET    /status/{id}      # Check status
GET    /download/{id}    # Download .md
GET    /tasks            # List all
DELETE /tasks/{id}       # Delete task
GET    /health           # Health check
```

### Skill (Claude Code)
```
/transcrever-audios /path/to/audios
```

**Full reference:** [API-REFERENCE.md](./docs/API-REFERENCE.md)

## Supported Formats

| Format | Supported |
|--------|-----------|
| .mp3 | ✅ |
| .wav | ✅ |
| .m4a (iOS) | ✅ |
| .ogg (WhatsApp) | ✅ |
| .flac (Lossless) | ✅ |
| .wma (Windows) | ✅ |

## Output Example

```
my_audios/
├── meeting.mp3           # Original audio
└── meeting.md            # Generated transcription
```

Content of `meeting.md`:
```markdown
# Transcription: meeting.mp3

**File:** meeting.mp3  
**Duration:** 45 minutes  
**Language:** Portuguese  
**Model:** Groq Whisper v3 Turbo  

---

[Full transcription text...]
```

## Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=whisper-large-v3-turbo
```

Get free API key: https://console.groq.com/keys

## Error Handling

| Error | Auto-Handling |
|-------|---------------|
| Groq timeout | Retry 3x with exponential backoff |
| Corrupted audio | Skip with log entry |
| Missing API key | Clear error + setup instructions |
| Port 8000 in use | Use `--port 8001` |

## Documentation

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Hero, features, quick start |
| [INSTALLATION.md](./docs/INSTALLATION.md) | 5 install methods + troubleshooting |
| [API-REFERENCE.md](./docs/API-REFERENCE.md) | Detailed Web API + CLI reference |
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute walkthrough |
| [USAGE.md](./USAGE.md) | Examples and use cases |
| [PROJECT-BRIEF.md](./docs/PROJECT-BRIEF.md) | Product specifications |

## Rate Limits

Groq API: **100 requests/minute** (soft)

CLI automatically handles rate limiting with backoff.

## Development

```bash
# Install with dev tools
pip install -e ".[dev]"

# Run tests
pytest

# Format code
black src/

# Lint
ruff check src/
```

## Known Issues

| Issue | Workaround |
|-------|-----------|
| Groq timeout > 30s | Auto-retry 3x, then skip |
| Noisy audio | Use high-quality recordings |
| Corrupted file | Remove or re-encode |
| Port 8000 in use | `python -m src.web --port 8001` |

## License

MIT — Free for personal and commercial use.

---

**Last Updated:** 2026-05-03  
**Status:** 🚀 Production-Ready  
**Author:** GAMA Team (@devops)
