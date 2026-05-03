import logging
from pathlib import Path
from datetime import datetime

def setup_logging(project_root=None):
    """Configure logging para transcrições."""
    if project_root is None:
        project_root = Path(__file__).parent.parent

    log_dir = project_root / "logs"
    log_dir.mkdir(exist_ok=True)

    log_file = log_dir / f"transcriber_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(log_file, encoding="utf-8"),
            logging.StreamHandler()
        ]
    )

    return logging.getLogger(__name__)

def find_audio_files(folder_path, supported_formats=None):
    """
    Encontra todos os áudios numa pasta (recursiva).

    Args:
        folder_path: str ou Path
        supported_formats: tuple de extensões (ex: ('.ogg', '.m4a', '.mp3'))

    Returns:
        list de Path objects
    """
    if supported_formats is None:
        supported_formats = ('.ogg', '.m4a', '.mp3', '.wav', '.flac', '.wma', '.opus')

    folder = Path(folder_path)

    if not folder.exists():
        raise FileNotFoundError(f"Pasta não encontrada: {folder}")

    audio_files = []
    for ext in supported_formats:
        audio_files.extend(folder.rglob(f"*{ext}"))

    return sorted(audio_files)

def get_output_path(audio_file_path):
    """Gera caminho do arquivo .md (mesmo diretório do áudio)."""
    audio_path = Path(audio_file_path)
    return audio_path.parent / f"{audio_path.stem}.md"

def markdown_template(audio_filename, transcription, duration=None):
    """Gera template markdown com transcrição."""
    template = f"""# Transcrição: {audio_filename}

**Data de processamento:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Arquivo original:** {audio_filename}
"""

    if duration:
        template += f"**Duração:** ~{duration}s  \n"

    template += f"""**Idioma:** PT-BR

---

## Transcrição

{transcription}

---

*Gerado automaticamente por GAMA Audio Transcriber via Groq Whisper*
"""

    return template

def file_size_mb(file_path):
    """Retorna tamanho do arquivo em MB."""
    return Path(file_path).stat().st_size / (1024 * 1024)
