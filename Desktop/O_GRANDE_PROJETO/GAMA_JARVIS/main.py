#!/usr/bin/env python3
"""
GAMA JARVIS - Main Entry Point
Assistente de voz em Python que escuta "Jarvis" e responde via Claude API
"""

import logging
import sys
import io
import time
import threading
from pathlib import Path
from datetime import datetime

# Fix Unicode/emoji encoding for Windows terminal (with error handling)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/jarvis.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("jarvis.main")

# Importa módulos
from config import validate_config, BRAIN_BACKEND
from wake_word import WakeWordDetector
from listener import AudioListener
from brain import get_brain
from voice import get_voice
from executor import get_executor
from api_server import start_server, set_state, add_history, set_groq_connected

# ============================================================================
# MAIN LOOP
# ============================================================================

class JarvisAssistant:
    """Orquestrador principal do Jarvis"""

    def __init__(self):
        logger.info("="*60)
        logger.info("Inicializando GAMA Jarvis...")
        logger.info("="*60)

        # Valida configuração
        validate_config()

        logger.info(f"✅ Usando {BRAIN_BACKEND} como backend")

        # Inicializa módulos
        try:
            # Inicia API Server em thread separada (porta 3018)
            logger.info("🚀 Iniciando API Server em thread separada...")
            start_server(host="127.0.0.1", port=3018, debug=False)
            logger.info("✅ API Server rodando na porta 3018")

            self.detector = WakeWordDetector()
            self.listener = AudioListener()
            self.brain = get_brain()
            self.voice = get_voice()
            self.executor = get_executor()

            # Inicializa briefing e notificações
            from briefing import get_briefing
            from notifications import get_notifications

            self.briefing = get_briefing()
            self.notifications = get_notifications(voice_output=self.voice)
            self.notifications.start()

            # Marca Groq como conectado se estiver usando Groq
            if BRAIN_BACKEND == "groq":
                set_groq_connected(True)

            logger.info("✅ Todos os módulos inicializados com sucesso")
            print("\n" + "="*60)
            print("🎙️  GAMA JARVIS PRONTO")
            print("="*60)
            print(f"Escutando por: 'JARVIS'")
            print(f"API Server: http://localhost:3018/api/jarvis/state")
            print(f"UI: http://localhost:3014")
            print(f"\nDiga algo como:")
            print(f"  - 'Jarvis, abre o Monitor'")
            print(f"  - 'Jarvis, como estou hoje?'")
            print(f"  - 'Jarvis, qual é a temperatura?'")
            print(f"\nPressione CTRL+C para sair")
            print("="*60 + "\n")

        except Exception as e:
            logger.error(f"Erro ao inicializar: {e}", exc_info=True)
            raise

    def run(self):
        """Loop principal do Jarvis"""
        try:
            self.run_loop()
        except KeyboardInterrupt:
            logger.info("Jarvis parado pelo usuário")
            self.voice.speak("Até logo, pessoal!")
            print("\n👋 Jarvis desligado")

    def run_loop(self):
        """Loop infinito de escuta → processamento → resposta"""
        from config import CONVERSATION_CLOSING_WORDS, CONVERSATION_TIMEOUT_SECONDS

        iteration = 0

        while True:
            iteration += 1
            logger.debug(f"--- Iteração {iteration} ---")

            try:
                # Passo 0: Estado = idle/listening
                set_state("listening")

                # Passo 1: Aguarda wake word
                logger.debug("Aguardando wake word...")
                if not self.detector.listen_for_wake_word():
                    continue

                # Wake word detectado! Entra em modo conversa contínua
                print("✅ Wake word detectado!")
                set_state("activated")
                self.voice.speak("Sim, tô aqui")

                # MODO CONVERSA CONTÍNUA
                self._continuous_conversation_mode(CONVERSATION_CLOSING_WORDS, CONVERSATION_TIMEOUT_SECONDS)

                # Volta para idle
                set_state("idle")

            except KeyboardInterrupt:
                raise
            except Exception as e:
                logger.error(f"Erro no loop: {e}", exc_info=True)
                set_state("idle")
                self.voice.speak("Tive um problema, tenta de novo?")

    def _continuous_conversation_mode(self, closing_words, timeout_seconds):
        """Loop de conversa contínua até detectar frase de encerramento"""
        from config import CONVERSATION_CLOSING_RESPONSE
        import time

        last_activity_time = time.time()

        while True:
            set_state("listening")

            try:
                # Escuta com timeout
                logger.debug(f"Escutando... (timeout em {timeout_seconds}s)")
                text = self.listener.listen_and_transcribe(timeout=timeout_seconds)

                if not text:
                    # Timeout sem fala
                    elapsed = time.time() - last_activity_time
                    if elapsed > timeout_seconds:
                        logger.info("Timeout na conversa contínua — encerrando")
                        self.voice.speak(CONVERSATION_CLOSING_RESPONSE)
                        break
                    continue

                last_activity_time = time.time()

                logger.info(f"🎤 Usuário: {text}")
                print(f"👤 Você: {text}")
                add_history("user", text)

                # Verifica se é palavra de encerramento
                text_lower = text.lower()
                if any(word in text_lower for word in closing_words):
                    logger.info("Frase de encerramento detectada")
                    self.voice.speak(CONVERSATION_CLOSING_RESPONSE)
                    break

                # Passo 3: Tenta interpretar como comando especial
                is_command, response = self.executor.process_command(text)
                if is_command:
                    logger.info(f"Comando executado: {response}")
                    add_history("assistant", response)
                    self.voice.speak(response)
                    continue

                # Passo 4: Envia pro cérebro (Groq/Ollama)
                set_state("processing")
                response = self.brain.think(text)

                # Passo 5: Fala a resposta
                set_state("responding")
                logger.info(f"🤖 Jarvis: {response}")
                print(f"🤖 Jarvis: {response}\n")
                add_history("assistant", response)
                self.voice.speak(response)

            except KeyboardInterrupt:
                raise
            except Exception as e:
                logger.error(f"Erro na conversa contínua: {e}", exc_info=True)
                self.voice.speak("Tive um problema, tenta de novo?")


# ============================================================================
# TEST COMMANDS
# ============================================================================

class TestMode:
    """Modo teste sem áudio contínuo"""

    def __init__(self):
        self.brain = get_brain()
        self.voice = get_voice()
        self.executor = get_executor()

    def test_brain(self):
        """Testa a integração com Claude"""
        print("\n=== TESTE: Brain (Claude) ===")
        questions = [
            "Qual é a capital do Brasil?",
            "Como eu faço um bolo de chocolate?",
            "Me explica o que é IA em 1 frase"
        ]

        for q in questions:
            print(f"\n❓ Pergunta: {q}")
            response = self.brain.think(q)
            print(f"✅ Resposta: {response}")
            # self.voice.speak(response)

    def test_voice(self):
        """Testa síntese de voz"""
        print("\n=== TESTE: Voice (TTS) ===")
        self.voice.test_voice()

    def test_executor(self):
        """Testa executor de comandos"""
        print("\n=== TESTE: Executor (Comandos) ===")
        commands = [
            "abre o monitor",
            "qual é a info do sistema",
            "abre terminal"
        ]

        for cmd in commands:
            print(f"\n📝 Comando: {cmd}")
            is_cmd, response = self.executor.process_command(cmd)
            if is_cmd:
                print(f"✅ {response}")
            else:
                print(f"❌ Não foi reconhecido como comando")

    def test_all(self):
        """Testa tudo"""
        self.test_voice()
        self.test_brain()
        self.test_executor()


# ============================================================================
# CLI & ARGUMENTOS
# ============================================================================

def main():
    """Entry point"""
    import argparse

    parser = argparse.ArgumentParser(
        description="GAMA Jarvis - Assistente de voz Python"
    )
    parser.add_argument(
        "--mode",
        choices=["listen", "test-voice", "test-brain", "test-executor", "test-all"],
        default="listen",
        help="Modo de operação"
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        help="Modo debug (verbose logging)"
    )

    args = parser.parse_args()

    # Modo debug
    if args.debug:
        logging.getLogger().setLevel(logging.DEBUG)
        logger.info("🐛 Modo DEBUG ativado")

    # Executa modo selecionado
    if args.mode == "listen":
        jarvis = JarvisAssistant()
        jarvis.run()

    elif args.mode.startswith("test-"):
        tester = TestMode()

        if args.mode == "test-voice":
            tester.test_voice()
        elif args.mode == "test-brain":
            tester.test_brain()
        elif args.mode == "test-executor":
            tester.test_executor()
        elif args.mode == "test-all":
            tester.test_all()


if __name__ == "__main__":
    main()
