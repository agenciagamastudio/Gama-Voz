"""
Morning Briefing Module
Detecta primeira execução do dia e fala saudação automática
"""

import logging
import json
from datetime import datetime, time
from pathlib import Path
import locale

logger = logging.getLogger("jarvis.briefing")

BRIEFING_FILE = Path(__file__).parent / "data" / "last_briefing.json"


class MorningBriefing:
    """Gerencia briefing matinal"""

    def __init__(self):
        self.briefing_file = BRIEFING_FILE
        self.briefing_file.parent.mkdir(parents=True, exist_ok=True)

    def _get_last_briefing_date(self):
        """Retorna data do último briefing"""
        try:
            if self.briefing_file.exists():
                with open(self.briefing_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    return data.get("last_date", None)
        except Exception as e:
            logger.error(f"Erro ao ler último briefing: {e}")
        return None

    def _save_briefing_date(self):
        """Salva data do briefing atual"""
        try:
            data = {
                "last_date": datetime.now().strftime("%Y-%m-%d"),
                "last_time": datetime.now().isoformat(),
                "briefing_given": True
            }
            with open(self.briefing_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            logger.error(f"Erro ao salvar briefing: {e}")

    def should_give_briefing(self):
        """
        Verifica se deve dar briefing matinal
        Retorna True se é primeira execução do dia e entre 6h-12h
        """
        now = datetime.now()
        current_date = now.strftime("%Y-%m-%d")
        last_date = self._get_last_briefing_date()

        # Verifica se é primeira execução do dia
        is_first_today = last_date != current_date

        # Verifica se está no horário de briefing (6h-12h)
        current_time = now.time()
        is_briefing_time = time(6, 0) <= current_time <= time(12, 0)

        should_brief = is_first_today and is_briefing_time
        logger.info(f"Briefing necessário: {should_brief} (primeira: {is_first_today}, hora: {is_briefing_time})")

        return should_brief

    def generate_briefing_text(self, active_projects=0):
        """
        Gera texto do briefing matinal
        Retorna string com saudação personalizada
        """
        now = datetime.now()

        # Hora formatada
        hour = now.strftime("%H:%M")

        # Dia da semana e data
        try:
            locale.setlocale(locale.LC_TIME, 'pt_BR.UTF-8')
        except:
            pass  # Fallback se locale não disponível

        weekday = now.strftime("%A")  # Dia da semana
        weekday_pt = {
            "Monday": "segunda-feira",
            "Tuesday": "terça-feira",
            "Wednesday": "quarta-feira",
            "Thursday": "quinta-feira",
            "Friday": "sexta-feira",
            "Saturday": "sábado",
            "Sunday": "domingo"
        }.get(weekday, weekday)

        date_str = now.strftime("%d de %B").lower()
        date_str_pt = date_str.replace(
            "january", "janeiro").replace(
            "february", "fevereiro").replace(
            "march", "março").replace(
            "april", "abril").replace(
            "may", "maio").replace(
            "june", "junho").replace(
            "july", "julho").replace(
            "august", "agosto").replace(
            "september", "setembro").replace(
            "october", "outubro").replace(
            "november", "novembro").replace(
            "december", "dezembro")

        # Monta mensagem
        briefing = f"Bom dia Matheus. São {hour}. "
        briefing += f"Você tem {active_projects} projeto{'s' if active_projects != 1 else ''} rodando. "
        briefing += f"Hoje é {weekday_pt}, {date_str_pt}. Bora trabalhar?"

        return briefing

    def record_briefing_given(self):
        """Registra que o briefing foi dado"""
        self._save_briefing_date()


# Instância global
_briefing_instance = None


def get_briefing():
    """Lazy loading da instância de briefing"""
    global _briefing_instance
    if _briefing_instance is None:
        _briefing_instance = MorningBriefing()
    return _briefing_instance


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    briefing = MorningBriefing()

    # Simula check
    if briefing.should_give_briefing():
        text = briefing.generate_briefing_text(active_projects=3)
        print(f"Briefing: {text}")
        briefing.record_briefing_given()
    else:
        print("Briefing não necessário agora")
