# Installation Guide — GAMA Audio Transcriber

Choose the installation method that best suits your workflow.

## Prerequisites

- **Python 3.9+** (3.11+ recommended)
- **GROQ_API_KEY** (get free at https://console.groq.com)

## Method 1: Local Development (Recommended)

Perfect for development, local testing, and CLI usage.

```bash
# Clone or navigate to project
cd GAMA_AUDIOTRANSCRIBER

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install in development mode
pip install -e .

# Verify installation
gama-transcriber --help
```

**Benefits:**
- Changes to code immediately visible
- CLI command `gama-transcriber` available globally (in venv)
- Both Web UI and CLI work seamlessly

## Method 2: Direct from GitHub (Online)

Install directly from GitHub without cloning.

```bash
pip install git+https://github.com/gama-team/gama-audio-transcriber.git

# Verify
gama-transcriber --help
```

**Use when:**
- You want the latest version
- You don't need to modify code
- Quick installation

## Method 3: From Local Clone

Clone the repository and install normally.

```bash
git clone https://github.com/gama-team/gama-audio-transcriber.git
cd gama-audio-transcriber

python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -e .
```

**Benefits:**
- Full control over code
- Can contribute improvements
- Access to all documentation

## Method 4: PyPI Package (Future)

Once published to PyPI:

```bash
pip install gama-audio-transcriber

gama-transcriber --help
```

_Coming soon — package under review for PyPI listing._

## Method 5: Docker (Future)

Pre-built container with all dependencies:

```bash
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_key_here \
  -v /path/to/audios:/app/inputs \
  gama-audio-transcriber:latest
```

_Docker image coming in v0.2.0._

---

## Post-Installation Setup

### 1. Create `.env` File

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=whisper-large-v3-turbo
```

### 2. Verify Installation

**CLI:**
```bash
gama-transcriber --help
```

**Web UI:**
```bash
python -m src.web

# Visit: http://localhost:8000
```

---

## Troubleshooting

### "gama-transcriber: command not found"

**Cause:** Virtual environment not activated or pip install failed.

**Fix:**
```bash
# Ensure venv is activated
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate  # Windows

# Reinstall
pip install -e .
```

### "ModuleNotFoundError: No module named 'groq'"

**Cause:** Dependencies not installed.

**Fix:**
```bash
pip install groq fastapi uvicorn python-dotenv
```

### "GROQ_API_KEY not found"

**Cause:** `.env` file missing or not loaded.

**Fix:**
```bash
# Check file exists
ls -la .env

# Set directly in shell (temporary)
export GROQ_API_KEY=gsk_xxxxxxxx

# Or re-read from file
source .env  # macOS/Linux
set -a && source .env && set +a  # Bash only
```

### Web UI won't start

**Cause:** Port 8000 already in use.

**Fix:**
```bash
# Use different port
python -m src.web --port 8001

# Or kill process using 8000
lsof -ti:8000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :8000  # Windows (then taskkill /PID xxx /F)
```

---

## Uninstalling

```bash
# Remove virtual environment
rm -rf venv  # macOS/Linux
rmdir /s venv  # Windows

# Or via pip
pip uninstall gama-audio-transcriber
```

---

## Next Steps

1. **Read QUICKSTART.md** — 5-minute overview
2. **Read USAGE.md** — CLI and Web UI examples
3. **Check docs/API-REFERENCE.md** — API details

For issues or questions, open an issue on GitHub.
