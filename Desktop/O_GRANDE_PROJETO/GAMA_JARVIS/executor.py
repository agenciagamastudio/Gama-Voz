"""
Command Executor Module
Executa comandos especiais no PC (abrir apps, terminal, navegador)
"""

import logging
import subprocess
import webbrowser
import sys
import os
from pathlib import Path

logger = logging.getLogger("jarvis.executor")

class CommandExecutor:
    """Executa comandos do sistema"""

    def __init__(self):
        self.is_windows = sys.platform == "win32"
        self.is_linux = sys.platform == "linux"
        self.is_mac = sys.platform == "darwin"
        logger.info(f"Sistema detectado: {sys.platform}")

    def open_app(self, app_name):
        """
        Abre uma aplicação instalada
        Args:
            app_name: str - nome da app (ex: 'notepad', 'calculator')
        Returns:
            bool - sucesso ou não
        """
        try:
            if self.is_windows:
                os.startfile(app_name)
            elif self.is_mac:
                subprocess.run(['open', '-a', app_name], check=True)
            elif self.is_linux:
                subprocess.Popen([app_name])
            else:
                logger.error(f"Sistema não suportado: {sys.platform}")
                return False

            logger.info(f"✅ Aplicação '{app_name}' aberta")
            return True

        except Exception as e:
            logger.error(f"Erro ao abrir app '{app_name}': {e}")
            return False

    def open_url(self, url):
        """
        Abre URL no navegador padrão
        Args:
            url: str - URL (ex: 'http://localhost:3015')
        Returns:
            bool - sucesso ou não
        """
        try:
            if not url.startswith(('http://', 'https://')):
                url = f"http://{url}"

            webbrowser.open(url)
            logger.info(f"✅ URL aberta: {url}")
            return True

        except Exception as e:
            logger.error(f"Erro ao abrir URL '{url}': {e}")
            return False

    def open_terminal(self):
        """
        Abre terminal/CMD do sistema
        Returns:
            bool - sucesso ou não
        """
        try:
            if self.is_windows:
                subprocess.Popen('cmd.exe')
            elif self.is_mac:
                subprocess.Popen(['/Applications/Utilities/Terminal.app/Contents/MacOS/Terminal'])
            elif self.is_linux:
                subprocess.Popen(['x-terminal-emulator'])
            else:
                return False

            logger.info("✅ Terminal aberto")
            return True

        except Exception as e:
            logger.error(f"Erro ao abrir terminal: {e}")
            return False

    def execute_command(self, command):
        """
        Executa um comando no terminal
        Args:
            command: str - comando a executar
        Returns:
            tuple (sucesso, output)
        """
        try:
            result = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                timeout=10
            )

            if result.returncode == 0:
                logger.info(f"✅ Comando executado: {command}")
                return True, result.stdout.strip()
            else:
                logger.warning(f"Comando falhou: {command}")
                return False, result.stderr.strip()

        except subprocess.TimeoutExpired:
            logger.error(f"Timeout ao executar: {command}")
            return False, "Comando demorou muito (timeout)"
        except Exception as e:
            logger.error(f"Erro ao executar comando: {e}")
            return False, str(e)

    def get_system_info(self):
        """
        Retorna informações do sistema
        Returns:
            dict com informações
        """
        info = {
            "platform": sys.platform,
            "python_version": sys.version,
            "home_dir": str(Path.home()),
            "cwd": os.getcwd()
        }
        return info

    def _send_project_command(self, action, project_name, port=3015):
        """
        Envia comando para o Monitor (start/stop de projetos)
        action: "start" ou "stop"
        """
        try:
            import requests
            url = f"http://localhost:{port}/api/project/{action}"
            response = requests.post(url, json={"name": project_name}, timeout=2)
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Erro ao enviar comando de projeto: {e}")
            return False

    def process_command(self, user_input):
        """
        Interpreta input do usuário e executa comando correspondente
        Retorna (bool, str) - (foi_comando, resposta)
        """
        user_lower = user_input.lower()

        # ===== PROJETOS =====

        # Comando: Abre o monitor
        if "abre" in user_lower and ("monitor" in user_lower or "gama monitor" in user_lower):
            success = self.open_url("http://localhost:3015")
            return True, "Monitor aberto" if success else "Erro ao abrir Monitor"

        # Comando: Abre o design system
        if "abre" in user_lower and "design system" in user_lower:
            success = self.open_url("http://localhost:3000")
            return True, "Design System aberto" if success else "Erro ao abrir Design System"

        # Comando: Abre o jarvis
        if "abre" in user_lower and "jarvis" in user_lower:
            success = self.open_url("http://localhost:3014")
            return True, "Dashboard do Jarvis aberto" if success else "Erro ao abrir Jarvis"

        # Comando: Inicia projeto
        if "inicia" in user_lower and not "terminal" in user_lower:
            # Extrai nome do projeto (ex: "inicia o monitor" → "monitor")
            words = user_input.split()
            if len(words) > 1:
                project_name = words[-1].lower()
                success = self._send_project_command("start", project_name)
                return True, f"Iniciando {project_name}" if success else f"Erro ao iniciar {project_name}"

        # Comando: Para projeto
        if "para" in user_lower and "projeto" in user_lower:
            # Extrai nome do projeto (ex: "para o monitor" → "monitor")
            words = user_input.replace("para", "").split()
            if words:
                project_name = words[-1].lower()
                success = self._send_project_command("stop", project_name)
                return True, f"Parando {project_name}" if success else f"Erro ao parar {project_name}"

        # ===== APLICATIVOS =====

        # Comando: Abrir Claude Code
        if "abre" in user_lower and ("claude code" in user_lower or "claude" in user_lower):
            success, output = self.execute_command("claude code")
            return True, "Claude Code iniciado" if success else "Erro ao iniciar Claude Code"

        # Comando: Abrir Terminal
        if ("abre" in user_lower or "inicia") and "terminal" in user_lower:
            success = self.open_terminal()
            return True, "Terminal aberto" if success else "Erro ao abrir terminal"

        # Comando: Abrir VS Code
        if "abre" in user_lower and "vs code" in user_lower:
            success = self.open_app("code" if not self.is_windows else "code.cmd")
            return True, "VS Code aberto" if success else "Erro ao abrir VS Code"

        # Comando: Abrir navegador
        if "abre" in user_lower and "navegador" in user_lower:
            success = self.open_app("firefox" if not self.is_windows else "msedge")
            return True, "Navegador aberto" if success else "Erro ao abrir navegador"

        # ===== SISTEMA =====

        # Comando: Info do sistema
        if "info" in user_lower or "informações" in user_lower:
            info = self.get_system_info()
            msg = f"Sistema: {info['platform']}. Home: {info['home_dir']}"
            return True, msg

        # Não foi comando reconhecido
        return False, None


# Instância global
_executor_instance = None

def get_executor():
    """Lazy loading da instância do executor"""
    global _executor_instance
    if _executor_instance is None:
        _executor_instance = CommandExecutor()
    return _executor_instance


if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.DEBUG)

    executor = CommandExecutor()
    # executor.open_url("http://localhost:3015")
    # executor.open_terminal()
    success, output = executor.process_command("abre o monitor")
    print(f"Resultado: {success}, {output}")
