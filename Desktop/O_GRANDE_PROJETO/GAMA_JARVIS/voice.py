"""
Voice Output Module
Converte texto em fala usando pyttsx3 (100% offline, sem custo)
"""

import logging
import pyttsx3
from config import TTS_RATE, TTS_VOLUME

logger = logging.getLogger("jarvis.voice")

class VoiceOutput:
    """Gerencia síntese de voz com pyttsx3"""

    def __init__(self):
        try:
            self.engine = pyttsx3.init()

            # Configura rate (velocidade)
            self.engine.setProperty('rate', TTS_RATE)

            # Configura volume (0.0 - 1.0)
            self.engine.setProperty('volume', TTS_VOLUME)

            # Tenta usar voz em português
            voices = self.engine.getProperty('voices')
            for voice in voices:
                if 'portuguese' in voice.name.lower() or 'português' in voice.name.lower():
                    self.engine.setProperty('voice', voice.id)
                    logger.info(f"✅ Voz em português encontrada: {voice.name}")
                    break
            else:
                # Se não achar voz PT, usa a padrão
                if voices:
                    self.engine.setProperty('voice', voices[0].id)
                    logger.warning(f"Voz PT não encontrada, usando: {voices[0].name}")

            logger.info("✅ TTS (pyttsx3) inicializado")

        except Exception as e:
            logger.error(f"Erro ao inicializar pyttsx3: {e}")
            self.engine = None

    def speak(self, text):
        """
        Fala o texto em voz alta
        Recria o engine a cada fala para evitar bug do pyttsx3 no Windows
        Args:
            text: str - texto a falar
        """
        if not text:
            return

        try:
            # Limita tamanho máximo (TTS é lento para textos muito longos)
            if len(text) > 500:
                text = text[:500] + "..."
                logger.warning("Texto truncado (máximo 500 caracteres)")

            logger.debug(f"Falando: '{text}'")
            print(f"🔊 {text}")

            # Recria engine a cada fala (workaround para bug do pyttsx3 no Windows)
            engine = pyttsx3.init()
            engine.setProperty('rate', TTS_RATE)
            engine.setProperty('volume', TTS_VOLUME)

            # Configura voz em português
            voices = engine.getProperty('voices')
            for voice in voices:
                if 'portuguese' in voice.name.lower() or 'português' in voice.name.lower():
                    engine.setProperty('voice', voice.id)
                    break

            engine.say(text)
            engine.runAndWait()
            engine.stop()

            logger.info("✅ Fala concluída")

        except Exception as e:
            logger.error(f"Erro ao falar: {e}")

    def speak_non_blocking(self, text):
        """
        Fala sem bloquear (não aguarda conclusão)
        Recria o engine a cada fala para evitar bug do pyttsx3 no Windows
        Args:
            text: str - texto a falar
        """
        try:
            if len(text) > 500:
                text = text[:500] + "..."

            logger.debug(f"Falando (non-blocking): '{text}'")
            print(f"🔊 {text}")

            # Recria engine a cada fala (workaround para bug do pyttsx3 no Windows)
            engine = pyttsx3.init()
            engine.setProperty('rate', TTS_RATE)
            engine.setProperty('volume', TTS_VOLUME)

            # Configura voz em português
            voices = engine.getProperty('voices')
            for voice in voices:
                if 'portuguese' in voice.name.lower() or 'português' in voice.name.lower():
                    engine.setProperty('voice', voice.id)
                    break

            engine.say(text)
            engine.startLoop(False)  # Non-blocking

        except Exception as e:
            logger.error(f"Erro ao falar: {e}")

    def adjust_speed(self, speed):
        """
        Ajusta velocidade de fala
        Args:
            speed: int - palavras por minuto (padrão ~150)
        """
        if self.engine:
            self.engine.setProperty('rate', speed)
            logger.info(f"Velocidade ajustada para {speed} wpm")

    def adjust_volume(self, volume):
        """
        Ajusta volume
        Args:
            volume: float - 0.0 a 1.0
        """
        if self.engine:
            volume = max(0.0, min(1.0, volume))
            self.engine.setProperty('volume', volume)
            logger.info(f"Volume ajustado para {volume}")

    def stop(self):
        """Para a fala imediatamente"""
        if self.engine:
            self.engine.stop()
            logger.info("Fala parada")

    def test_voice(self):
        """Testa a voz com uma frase"""
        test_phrases = [
            "Olá, eu sou Jarvis",
            "Sistema pronto para uso",
            "Aguardando seus comandos"
        ]

        for phrase in test_phrases:
            self.speak(phrase)
            print()


# Instância global
_voice_instance = None

def get_voice():
    """Lazy loading da instância de voz"""
    global _voice_instance
    if _voice_instance is None:
        _voice_instance = VoiceOutput()
    return _voice_instance


if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.DEBUG)

    voice = VoiceOutput()
    voice.test_voice()
