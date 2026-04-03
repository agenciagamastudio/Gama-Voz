"""
Proactive Notifications Module
Monitora status dos projetos e notifica se algum fica offline
"""

import logging
import json
import threading
from datetime import datetime
from pathlib import Path
import requests
from config import (
    MONITOR_PORTS,
    MONITOR_PORT_TIMEOUT,
    PROJECT_CHECK_INTERVAL_SECONDS,
    PROJECT_OFFLINE_THRESHOLD_MINUTES,
    PROJECT_OFFLINE_MESSAGE
)

logger = logging.getLogger("jarvis.notifications")

PROJECT_STATUS_FILE = Path(__file__).parent / "data" / "project_status.json"


class ProactiveNotifications:
    """Gerencia notificações proativas de status de projetos"""

    def __init__(self, voice_output=None):
        """
        Inicializa sistema de notificações

        Args:
            voice_output: instância de VoiceOutput para falar notificações
        """
        self.voice_output = voice_output
        self.running = False
        self.thread = None
        self._init_status_file()

    def _init_status_file(self):
        """Inicializa arquivo de status dos projetos"""
        PROJECT_STATUS_FILE.parent.mkdir(parents=True, exist_ok=True)
        if not PROJECT_STATUS_FILE.exists():
            with open(PROJECT_STATUS_FILE, "w", encoding="utf-8") as f:
                json.dump({}, f)

    def start(self):
        """Inicia thread de monitoramento"""
        if not self.running:
            self.running = True
            self.thread = threading.Thread(target=self._monitor_loop, daemon=True)
            self.thread.start()
            logger.info("✅ Notificações proativas iniciadas")

    def stop(self):
        """Para thread de monitoramento"""
        self.running = False
        if self.thread:
            self.thread.join(timeout=5)
        logger.info("Notificações proativas paradas")

    def _get_monitor_status(self):
        """Tenta conectar ao Monitor e obter status dos projetos"""
        for port in MONITOR_PORTS:
            try:
                response = requests.get(
                    f"http://localhost:{port}/api/status",
                    timeout=MONITOR_PORT_TIMEOUT
                )
                if response.status_code == 200:
                    return response.json()
            except:
                continue

        return None

    def _load_project_status(self):
        """Carrega último status conhecido dos projetos"""
        try:
            if PROJECT_STATUS_FILE.exists():
                with open(PROJECT_STATUS_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception as e:
            logger.error(f"Erro ao carregar status dos projetos: {e}")

        return {}

    def _save_project_status(self, status):
        """Salva status atual dos projetos"""
        try:
            with open(PROJECT_STATUS_FILE, "w", encoding="utf-8") as f:
                json.dump(status, f, indent=2, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Erro ao salvar status dos projetos: {e}")

    def _check_offline_projects(self, current_projects, last_status):
        """
        Verifica se algum projeto ficou offline
        Retorna lista de projetos offline com tempo de offline
        """
        offline_alerts = []
        now = datetime.now()

        for project_name, project_status in current_projects.items():
            if not project_status.get("online", False):
                # Projeto está offline
                last_offline_time = last_status.get(project_name, {}).get("offline_since")

                if not last_offline_time:
                    # Primeira vez que detecta offline
                    last_status[project_name] = {
                        "offline_since": now.isoformat(),
                        "online": False
                    }
                else:
                    # Calcula tempo offline
                    offline_since = datetime.fromisoformat(last_offline_time)
                    offline_minutes = (now - offline_since).total_seconds() / 60

                    # Se passou do threshold, notifica
                    if offline_minutes >= PROJECT_OFFLINE_THRESHOLD_MINUTES:
                        offline_alerts.append({
                            "project": project_name,
                            "minutes": int(offline_minutes)
                        })
            else:
                # Projeto está online — remove do status offline
                if project_name in last_status:
                    last_status[project_name]["online"] = True
                    last_status[project_name].pop("offline_since", None)

        return offline_alerts

    def _monitor_loop(self):
        """Loop de monitoramento (roda em thread)"""
        logger.info("Loop de monitoramento iniciado")

        while self.running:
            try:
                # Obtém status atual
                monitor_status = self._get_monitor_status()
                if not monitor_status:
                    logger.debug("Monitor indisponível")
                    threading.Event().wait(PROJECT_CHECK_INTERVAL_SECONDS)
                    continue

                current_projects = monitor_status.get("projects", {})
                # Se projects for uma lista, converter para dict (compatibilidade)
                if isinstance(current_projects, list):
                    current_projects = {}
                last_status = self._load_project_status()

                # Verifica offline
                offline_alerts = self._check_offline_projects(current_projects, last_status)

                # Salva novo status
                self._save_project_status(last_status)

                # Notifica se houver projetos offline
                for alert in offline_alerts:
                    self._notify_offline(alert["project"], alert["minutes"])

                # Aguarda próxima verificação
                threading.Event().wait(PROJECT_CHECK_INTERVAL_SECONDS)

            except Exception as e:
                logger.error(f"Erro no loop de monitoramento: {e}")
                threading.Event().wait(PROJECT_CHECK_INTERVAL_SECONDS)

    def _notify_offline(self, project_name, offline_minutes):
        """Notifica que um projeto ficou offline"""
        message = PROJECT_OFFLINE_MESSAGE.format(
            project=project_name,
            minutes=offline_minutes
        )

        logger.warning(f"⚠️ Notificação: {message}")

        if self.voice_output:
            try:
                self.voice_output.speak_non_blocking(message)
            except Exception as e:
                logger.error(f"Erro ao falar notificação: {e}")


# Instância global
_notifications_instance = None


def get_notifications(voice_output=None):
    """Lazy loading da instância de notificações"""
    global _notifications_instance
    if _notifications_instance is None:
        _notifications_instance = ProactiveNotifications(voice_output)
    return _notifications_instance


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    notifications = ProactiveNotifications()
    notifications.start()

    # Mantém rodando por 5 minutos para teste
    import time
    try:
        time.sleep(300)
    except KeyboardInterrupt:
        pass
    finally:
        notifications.stop()
