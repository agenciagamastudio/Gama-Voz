"""
Wake Word Detection Module
Detecta "Jarvis" no áudio contínuo
Usa pvporcupine (free tier) com fallback para SpeechRecognition
"""

import logging
import speech_recognition as sr
from config import WAKE_WORD, WAKE_WORD_SENSITIVITY, SAMPLE_RATE

logger = logging.getLogger("jarvis.wake_word")

class WakeWordDetector:
    """Detecta wake word 'Jarvis' com fallback"""

    # Variações aceitas do wake word em português
    WAKE_WORDS = ["jarvis", "jar vis", "jarvi", "chaves", "járvis", "jarvis,", "ok jarvis"]

    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone(sample_rate=SAMPLE_RATE)
        # Aumentar threshold de energia para reduzir falsos positivos
        self.recognizer.energy_threshold = 400
        self.recognizer.dynamic_energy_threshold = False

        # Tentar inicializar pvporcupine se disponível
        self.use_porcupine = False
        try:
            import pvporcupine
            # Free tier requer PORCUPINE_ACCESS_KEY
            # Para este projeto, vamos usar fallback SpeechRecognition
            logger.info("pvporcupine disponível, mas usando fallback SpeechRecognition")
        except ImportError:
            logger.info("pvporcupine não instalado, usando SpeechRecognition")

        logger.info(f"Wake Word Detector inicializado. Procurando por: '{WAKE_WORD}'")

    def listen_for_wake_word(self):
        """
        Escuta continuamente até detectar o wake word
        Retorna: bool - True se wake word detectado
        """
        try:
            with self.microphone as source:
                # Ajusta nível de ruído ambiente
                self.recognizer.adjust_for_ambient_noise(source, duration=1)

                logger.debug("Escutando por wake word...")
                print(f"🎤 Escutando por '{WAKE_WORD}'...")

                while True:
                    try:
                        # Timeout curto para resposta rápida
                        audio = self.recognizer.listen(source, timeout=5)

                        # Tenta reconhecer com Google Speech Recognition (free)
                        try:
                            text = self.recognizer.recognize_google(audio, language="pt-BR")
                            text_lower = text.lower()

                            logger.debug(f"Detectado: '{text}'")

                            # Verifica se contém o wake word
                            if any(wake_word in text_lower for wake_word in self.WAKE_WORDS):
                                logger.info(f"✅ Wake word detectado: '{text}'")
                                return True
                            else:
                                logger.debug(f"  (Detectado: '{text}', mas não é wake word válido)")

                        except sr.UnknownValueError:
                            # Áudio não compreendido, continua escutando
                            pass
                        except sr.RequestError as e:
                            logger.warning(f"Erro Google Speech Recognition: {e}")

                    except sr.RequestError as e:
                        logger.error(f"Erro ao acessar Google Speech Recognition: {e}")

        except KeyboardInterrupt:
            logger.info("Parado pelo usuário")
            return False
        except Exception as e:
            logger.error(f"Erro ao escutar por wake word: {e}")
            return False

    def quick_test(self):
        """Testa a detecção rápida (3 segundos)"""
        print("🎤 Teste rápido - fale algo com 'Jarvis'...")
        try:
            with self.microphone as source:
                self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
                audio = self.recognizer.listen(source, timeout=3)
                text = self.recognizer.recognize_google(audio, language="pt-BR")
                print(f"✅ Detectado: '{text}'")
                return WAKE_WORD in text.lower()
        except Exception as e:
            print(f"❌ Erro no teste: {e}")
            return False


if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.DEBUG)

    detector = WakeWordDetector()
    detector.quick_test()
