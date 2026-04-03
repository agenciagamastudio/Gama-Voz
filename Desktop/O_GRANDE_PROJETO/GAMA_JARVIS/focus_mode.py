"""
Focus Mode Module (Pomodoro)
Ativa modo foco por 25 minutos - Jarvis não responde a nada exceto "para o foco"
"""

import logging
import threading
import time
from datetime import datetime, timedelta

logger = logging.getLogger("jarvis.focus_mode")

# Duração em segundos (25 minutos = 1500 segundos)
FOCUS_DURATION = 25 * 60
BREAK_DURATION = 5 * 60


class FocusMode:
    """Gerencia modo foco (Pomodoro)"""

    def __init__(self):
        self.is_active = False
        self.start_time = None
        self.end_time = None
        self.lock = threading.Lock()

    def activate(self):
        """Ativa modo foco por 25 minutos"""
        with self.lock:
            if self.is_active:
                logger.warning("Modo foco já está ativo")
                return False

            self.is_active = True
            self.start_time = datetime.now()
            self.end_time = self.start_time + timedelta(seconds=FOCUS_DURATION)

            logger.info(f"✅ Modo foco ativado até {self.end_time.strftime('%H:%M:%S')}")

            # Inicia thread para desativar automaticamente
            threading.Thread(target=self._auto_deactivate, daemon=True).start()

            return True

    def deactivate(self):
        """Desativa modo foco"""
        with self.lock:
            self.is_active = False
            self.start_time = None
            self.end_time = None
            logger.info("❌ Modo foco desativado")
            return True

    def is_focus_active(self):
        """Retorna True se modo foco está ativo"""
        with self.lock:
            if not self.is_active:
                return False

            # Verifica se tempo expirou
            if self.end_time and datetime.now() >= self.end_time:
                self.is_active = False
                return False

            return self.is_active

    def get_remaining_time(self):
        """Retorna tempo restante em segundos (ou -1 se inativo)"""
        with self.lock:
            if not self.is_active or not self.end_time:
                return -1

            remaining = (self.end_time - datetime.now()).total_seconds()
            return max(0, remaining)

    def get_status_text(self):
        """Retorna texto descritivo do status"""
        if not self.is_focus_active():
            return "Modo foco inativo"

        remaining = self.get_remaining_time()
        minutes = int(remaining // 60)
        seconds = int(remaining % 60)

        return f"Modo foco: {minutes:02d}:{seconds:02d} restantes"

    def _auto_deactivate(self):
        """Thread que desativa modo foco automaticamente"""
        time.sleep(FOCUS_DURATION)

        with self.lock:
            if self.is_active:  # Verifica se ainda está ativo
                self.is_active = False
                logger.info("⏰ Tempo de foco encerrado!")


# Instância global
_focus_instance = None


def get_focus_mode():
    """Lazy loading da instância de focus mode"""
    global _focus_instance
    if _focus_instance is None:
        _focus_instance = FocusMode()
    return _focus_instance


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    focus = FocusMode()

    print("Ativando modo foco...")
    focus.activate()
    print(f"Status: {focus.get_status_text()}")
    print(f"Ativo: {focus.is_focus_active()}")

    # Simula aguardar 5 segundos
    time.sleep(5)
    print(f"Tempo restante: {focus.get_remaining_time():.0f}s")

    # Desativa
    focus.deactivate()
    print(f"Ativo: {focus.is_focus_active()}")
