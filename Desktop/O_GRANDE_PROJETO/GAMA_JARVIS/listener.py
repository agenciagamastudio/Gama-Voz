"""
Audio Listener & Transcription Module
Captura áudio do microfone e transcreve com Whisper (OpenAI) ou Groq
"""

import logging
import speech_recognition as sr
import whisper
from pathlib import Path
from config import SAMPLE_RATE, WHISPER_MODEL, WHISPER_LANGUAGE, CACHE_DIR, USE_GROQ_WHISPER, GROQ_WHISPER_MODEL, GROQ_API_KEY

# Importar Groq se estiver configurado
if USE_GROQ_WHISPER and GROQ_API_KEY:
    from groq import Groq
    groq_available = True
else:
    groq_available = False

logger = logging.getLogger("jarvis.listener")

class AudioListener:
    """Captura áudio e transcreve com Whisper"""

    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone(sample_rate=SAMPLE_RATE)

        # Inicializar Groq se disponível
        self.groq_client = None
        if groq_available:
            try:
                self.groq_client = Groq(api_key=GROQ_API_KEY)
                logger.info(f"✅ Groq Whisper ({GROQ_WHISPER_MODEL}) pronto")
            except Exception as e:
                logger.warning(f"Groq não disponível: {e}. Usando Whisper local como fallback.")
                self.groq_client = None

        # Load Whisper model (primeiro uso baixa o modelo ~1GB)
        # Usado como fallback se Groq falhar ou estiver desativado
        logger.info(f"Carregando modelo Whisper '{WHISPER_MODEL}' como fallback...")
        self.whisper_model = whisper.load_model(WHISPER_MODEL)
        logger.info("✅ Whisper carregado")

    def listen(self, timeout=10):
        """
        Escuta o microfone por N segundos e retorna o áudio
        Args:
            timeout: segundos máximos de escuta
        Returns:
            sr.AudioData ou None
        """
        try:
            with self.microphone as source:
                self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
                print("🎤 Escutando...")

                audio = self.recognizer.listen(source, timeout=timeout, phrase_time_limit=30)
                logger.debug(f"Áudio capturado ({len(audio.get_raw_data())} bytes)")
                return audio

        except sr.RequestError as e:
            logger.error(f"Erro ao capturar áudio: {e}")
            return None
        except sr.UnknownValueError:
            logger.warning("Áudio não compreendido")
            return None

    def transcribe_with_groq(self, audio_data):
        """
        Transcreve áudio com Groq Whisper Large v3 (online, melhor qualidade)
        Args:
            audio_data: sr.AudioData
        Returns:
            str - texto transcrito ou None
        """
        if not self.groq_client:
            return None

        try:
            # Salva temporariamente em WAV para enviar ao Groq
            wav_path = CACHE_DIR / "temp_audio_groq.wav"
            with open(wav_path, "wb") as f:
                f.write(audio_data.get_wav_data())

            # Envia para Groq Whisper
            logger.debug("Transcrevendo com Groq Whisper...")
            with open(wav_path, "rb") as f:
                transcript = self.groq_client.audio.transcriptions.create(
                    file=(wav_path.name, f.read()),
                    model=GROQ_WHISPER_MODEL,
                    language="pt"  # Portuguese
                )

            text = transcript.text.strip() if hasattr(transcript, 'text') else str(transcript).strip()
            logger.info(f"✅ Groq: '{text}'")

            # Limpa arquivo temporário
            wav_path.unlink(missing_ok=True)

            return text if text else None

        except Exception as e:
            logger.warning(f"Groq transcription failed: {e}")
            # Limpa arquivo temporário se existir
            try:
                wav_path.unlink(missing_ok=True)
            except:
                pass
            return None

    def transcribe_with_whisper(self, audio_data):
        """
        Transcreve áudio com Whisper (offline)
        Args:
            audio_data: sr.AudioData
        Returns:
            str - texto transcrito ou None
        """
        try:
            # Converte AudioData para formato Whisper
            logger.debug("Transcrevendo com Whisper...")

            # Salva temporariamente em WAV
            wav_path = CACHE_DIR / "temp_audio.wav"
            with open(wav_path, "wb") as f:
                f.write(audio_data.get_wav_data())

            # Transcreve
            result = self.whisper_model.transcribe(
                str(wav_path),
                language=WHISPER_LANGUAGE,
                verbose=False
            )

            text = result.get("text", "").strip()
            logger.info(f"✅ Transcrito: '{text}'")

            # Limpa arquivo temporário
            wav_path.unlink()

            return text if text else None

        except Exception as e:
            logger.error(f"Erro ao transcrever: {e}")
            return None

    def transcribe_with_google(self, audio_data):
        """
        Fallback: Transcreve com Google Speech Recognition (online)
        Args:
            audio_data: sr.AudioData
        Returns:
            str - texto transcrito ou None
        """
        try:
            logger.debug("Transcrevendo com Google Speech Recognition...")
            text = self.recognizer.recognize_google(audio_data, language="pt-BR")
            logger.info(f"✅ Transcrito: '{text}'")
            return text

        except sr.UnknownValueError:
            logger.warning("Google não conseguiu entender o áudio")
            return None
        except sr.RequestError as e:
            logger.error(f"Erro Google Speech Recognition: {e}")
            return None

    def listen_and_transcribe(self, timeout=10):
        """
        Pipeline completo: escuta → transcreve
        Prioridade: Groq → Whisper local → Google
        Returns:
            str - texto transcrito ou None
        """
        audio = self.listen(timeout=timeout)
        if not audio:
            return None

        # 1️⃣ Tenta Groq primeiro (melhor qualidade, suporta português)
        if self.groq_client:
            text = self.transcribe_with_groq(audio)
            if text:
                return text

        # 2️⃣ Fallback: Whisper local (offline, mais rápido se Groq falhar)
        text = self.transcribe_with_whisper(audio)
        if text:
            return text

        # 3️⃣ Fallback: Google (requer internet)
        return self.transcribe_with_google(audio)


if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.DEBUG)

    listener = AudioListener()
    text = listener.listen_and_transcribe(timeout=5)
    if text:
        print(f"Resultado final: '{text}'")
    else:
        print("Nenhum texto capturado")
