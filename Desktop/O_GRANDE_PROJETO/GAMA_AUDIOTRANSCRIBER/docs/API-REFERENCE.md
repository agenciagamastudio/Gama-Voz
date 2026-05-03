# API Reference — GAMA Audio Transcriber

Complete reference for Web API and CLI commands.

---

## Web API (FastAPI)

The Web UI runs on `http://localhost:8000` by default.

### Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "version": "0.1.0"
}
```

**Example:**
```bash
curl http://localhost:8000/health
```

---

### Upload Audio Files

**Endpoint:** `POST /upload`

**Request:**
- Form data with file upload
- Supports: `.mp3`, `.wav`, `.m4a`, `.ogg`, `.flac`

**Response:**
```json
{
  "id": "task-uuid",
  "filename": "meeting.mp3",
  "size_mb": 12.5,
  "status": "queued",
  "message": "File queued for transcription"
}
```

**Example:**
```bash
curl -X POST -F "file=@meeting.mp3" \
  http://localhost:8000/upload
```

---

### Get Transcription Status

**Endpoint:** `GET /status/{task_id}`

**Response:**
```json
{
  "id": "task-uuid",
  "filename": "meeting.mp3",
  "status": "transcribing",
  "progress": 45,
  "elapsed_seconds": 30,
  "message": "Processing audio..."
}
```

**Status Values:**
- `queued` — Waiting to be processed
- `transcribing` — Currently being transcribed
- `completed` — Done, ready to download
- `failed` — Error during transcription
- `archived` — Downloaded and moved to archive

**Example:**
```bash
curl http://localhost:8000/status/task-uuid
```

---

### Download Transcription

**Endpoint:** `GET /download/{task_id}`

**Response:** Markdown file (`.md`)

**Query Parameters:**
- `format` (optional): `md` (default), `txt`, `json`

**Example:**
```bash
# Download as Markdown
curl http://localhost:8000/download/task-uuid -o transcription.md

# Download as plain text
curl http://localhost:8000/download/task-uuid?format=txt -o transcription.txt

# Download as JSON
curl http://localhost:8000/download/task-uuid?format=json -o transcription.json
```

---

### List All Tasks

**Endpoint:** `GET /tasks`

**Response:**
```json
[
  {
    "id": "task-uuid-1",
    "filename": "meeting.mp3",
    "status": "completed",
    "created_at": "2024-05-03T10:30:00Z"
  },
  {
    "id": "task-uuid-2",
    "filename": "podcast.mp3",
    "status": "transcribing",
    "created_at": "2024-05-03T10:25:00Z"
  }
]
```

**Example:**
```bash
curl http://localhost:8000/tasks
```

---

### Delete Task

**Endpoint:** `DELETE /tasks/{task_id}`

**Response:**
```json
{
  "message": "Task deleted successfully",
  "id": "task-uuid"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:8000/tasks/task-uuid
```

---

## CLI Commands

Use `gama-transcriber` from the command line.

### Help

```bash
gama-transcriber --help
```

**Output:**
```
usage: gama-transcriber [-h] [--output OUTPUT] [--language LANGUAGE] [--model MODEL] FOLDER

Transcribe audio files in a folder via Groq Whisper API.

positional arguments:
  FOLDER              Path to folder containing audio files (recursive)

optional arguments:
  -h, --help          show this help message and exit
  --output OUTPUT     Output folder for transcriptions (default: ./outputs)
  --language LANGUAGE Language code (default: auto-detect, e.g., pt, en, es)
  --model MODEL       Groq model to use (default: whisper-large-v3-turbo)
```

---

### Transcribe Folder

**Command:**
```bash
gama-transcriber /path/to/audios
```

**Output:** Creates `outputs/` folder with `.md` files

**Example:**
```bash
# Transcribe all files in current folder
gama-transcriber ./my_podcasts

# Output:
# outputs/
#   ├── podcast-1.md
#   ├── podcast-2.md
#   └── podcast-3.md
```

---

### Custom Output Folder

```bash
gama-transcriber /path/to/audios --output /path/to/output
```

**Example:**
```bash
gama-transcriber ./audios --output ./transcriptions
```

---

### Specify Language

```bash
gama-transcriber /path/to/audios --language pt
```

**Supported Languages:**
- `pt` — Portuguese (Brazil/Portugal)
- `en` — English
- `es` — Spanish
- `fr` — French
- `de` — German
- Leave blank for auto-detect

**Example:**
```bash
# Force Portuguese
gama-transcriber ./audios --language pt

# Auto-detect (default)
gama-transcriber ./audios
```

---

### Specify Model

```bash
gama-transcriber /path/to/audios --model whisper-large-v3-turbo
```

**Available Models** (on Groq):
- `whisper-large-v3-turbo` — Recommended (fast, accurate)
- `whisper-large-v3` — More accurate, slower

**Example:**
```bash
gama-transcriber ./audios --model whisper-large-v3-turbo
```

---

## Output Format

### Markdown Output (Default)

Each transcription saved as `.md`:

```markdown
# Transcription: meeting.mp3

**File:** meeting.mp3  
**Duration:** 45 minutes  
**Model:** whisper-large-v3-turbo  
**Language:** Portuguese  
**Transcribed:** 2024-05-03 10:35 UTC

---

## Content

[Full transcription text...]

---

**Metadata:**
- Original file size: 12.5 MB
- Processing time: 2 min 30 sec
- Accuracy: Groq Whisper v3
```

---

## Rate Limiting

Groq API limits:
- **100 requests per minute** (soft limit)
- **No file size limit** (handled internally)

The CLI automatically:
- Respects rate limits
- Retries on timeout (up to 3 attempts)
- Shows progress

---

## Error Handling

### Common Errors

**`GROQ_API_KEY not set`**
```
Solution: export GROQ_API_KEY=gsk_xxxxxxxx
```

**`File not found`**
```
Solution: Check path exists
gama-transcriber /correct/path
```

**`API timeout`**
```
Solution: Automatic retry (up to 3x)
If persists, check internet connection
```

**`Empty audio`**
```
Solution: File is silent or corrupted
Groq will skip with message in log
```

---

## Examples

### Transcribe a Single Folder

```bash
gama-transcriber ~/Downloads/Podcasts
```

### Transcribe Multiple Folders (Sequential)

```bash
gama-transcriber ~/Downloads/Podcasts
gama-transcriber ~/Downloads/Meetings
gama-transcriber ~/Downloads/Voicememos
```

### Transcribe with Custom Output

```bash
gama-transcriber ./audios --output ./my_transcriptions --language pt
```

### Via Web UI

1. Open http://localhost:8000
2. Drag & drop audio files
3. Wait for completion
4. Download `.md` file

---

## Programmatic Usage (Python)

```python
from src.transcriber import transcribe_folder
from src.groq_client import GroqClient

# Initialize client
client = GroqClient()

# Transcribe folder
result = transcribe_folder(
    folder_path="./audios",
    output_folder="./outputs",
    language="pt"
)

print(result)
# {
#   "success": True,
#   "files_processed": 5,
#   "output_folder": "./outputs"
# }
```

---

## Next Steps

- **Usage examples:** See `USAGE.md`
- **Installation:** See `INSTALLATION.md`
- **Troubleshooting:** See `INSTALLATION.md#troubleshooting`
