import os
import time
import logging
from pathlib import Path

try:
    from groq import Groq
except ImportError:
    raise ImportError("Instale com: pip install groq")

logger = logging.getLogger(__name__)

class GroqTranscriber:
    """Integração com Groq Whisper para transcrição."""

    def __init__(self, api_key=None):
        """
        Inicializa client Groq.

        Args:
            api_key: str (se None, lê de GROQ_API_KEY env var)
        """
        if api_key is None:
            api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError(
                "GROQ_API_KEY não encontrada. "
                "Configure: export GROQ_API_KEY='sua_key' ou crie .env"
            )

        self.client = Groq(api_key=api_key)
        logger.info("✅ Groq client inicializado")

    def transcribe(self, audio_file_path, language="pt", max_retries=3):
        """
        Transcreve áudio usando Groq Whisper.

        Args:
            audio_file_path: str ou Path do arquivo de áudio
            language: 'pt' para português, 'en' para inglês, etc
            max_retries: tentativas em caso de timeout

        Returns:
            str com a transcrição

        Raises:
            Exception: se falhar após max_retries
        """
        audio_path = Path(audio_file_path)

        if not audio_path.exists():
            raise FileNotFoundError(f"Áudio não encontrado: {audio_path}")

        logger.info(f"🎙️  Transcrevendo: {audio_path.name}")

        for attempt in range(max_retries):
            try:
                with open(audio_path, "rb") as audio_file:
                    transcript = self.client.audio.transcriptions.create(
                        model="whisper-large-v3-turbo",
                        file=(audio_path.name, audio_file, "audio/ogg"),
                        language=language,
                    )

                logger.info(f"✅ Transcrito: {audio_path.name}")
                return transcript.text

            except Exception as e:
                logger.warning(
                    f"⚠️  Tentativa {attempt + 1}/{max_retries} falhou: {str(e)}"
                )

                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt  # exponential backoff
                    logger.info(f"⏳ Aguardando {wait_time}s antes de retry...")
                    time.sleep(wait_time)
                else:
                    logger.error(f"❌ Falha ao transcrever: {audio_path.name}")
                    raise

        return None

    def transcribe_batch(self, audio_files, language="pt"):
        """
        Transcreve múltiplos áudios.

        Args:
            audio_files: list de Path ou str
            language: idioma padrão

        Returns:
            dict {audio_path: transcrição}
        """
        results = {}
        total = len(audio_files)

        for idx, audio_file in enumerate(audio_files, 1):
            logger.info(f"\n📊 Progresso: {idx}/{total}")

            try:
                transcript = self.transcribe(audio_file, language=language)
                results[str(audio_file)] = transcript
            except Exception as e:
                logger.error(f"Falha em {audio_file}: {e}")
                results[str(audio_file)] = None

        return results
