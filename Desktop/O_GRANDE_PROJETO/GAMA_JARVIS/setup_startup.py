"""
Setup Startup Script
Registra GAMA Jarvis para iniciar automaticamente com o Windows
"""

import os
import sys
import subprocess
import logging
from pathlib import Path

logger = logging.getLogger("jarvis.setup_startup")

JARVIS_DIR = Path(__file__).parent
JARVIS_BAT = JARVIS_DIR / "start_jarvis.bat"
TASK_NAME = "GAMA Jarvis"
TASK_DESCRIPTION = "Inicia GAMA Jarvis Voice Assistant na inicialização"


def create_batch_file():
    """Cria arquivo start_jarvis.bat"""
    bat_content = f"""@echo off
REM GAMA Jarvis Startup Script
REM Alterado para a pasta do JARVIS e inicia o backend

cd /d "{JARVIS_DIR}"
python main.py --mode listen

pause
"""

    try:
        with open(JARVIS_BAT, "w", encoding="utf-8") as f:
            f.write(bat_content)
        print(f"✅ Arquivo criado: {JARVIS_BAT}")
        return True
    except Exception as e:
        print(f"❌ Erro ao criar batch file: {e}")
        return False


def register_task_scheduler():
    """Registra tarefa no Windows Task Scheduler"""
    try:
        # Comando schtasks
        cmd = [
            "schtasks",
            "/create",
            "/tn", TASK_NAME,
            "/tr", f'"{JARVIS_BAT}"',
            "/sc", "onlogon",
            "/f",
            "/rl", "highest"  # Executa com privilégios elevados
        ]

        # Executa comando
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            print(f"✅ Tarefa '{TASK_NAME}' registrada no Task Scheduler")
            print(f"   Descrição: {TASK_DESCRIPTION}")
            print(f"   Arquivo: {JARVIS_BAT}")
            print(f"   Acionador: No logon do usuário")
            return True
        else:
            print(f"❌ Erro ao registrar tarefa: {result.stderr}")
            return False

    except Exception as e:
        print(f"❌ Erro: {e}")
        return False


def verify_registration():
    """Verifica se tarefa foi registrada corretamente"""
    try:
        cmd = ["schtasks", "/query", "/tn", TASK_NAME]
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0 and "GAMA Jarvis" in result.stdout:
            print("✅ Tarefa verificada com sucesso")
            return True
        else:
            print("❌ Tarefa não encontrada no Task Scheduler")
            return False

    except Exception as e:
        print(f"❌ Erro ao verificar: {e}")
        return False


def main():
    """Executa setup completo"""
    print("=" * 60)
    print("GAMA Jarvis - Windows Startup Setup")
    print("=" * 60)

    # Verifica se é Windows
    if sys.platform != "win32":
        print("❌ Este script só funciona no Windows")
        sys.exit(1)

    # Verifica privilégios administrativos
    try:
        is_admin = os.getuid() == 0 if hasattr(os, 'getuid') else True
    except:
        is_admin = True

    print("\n📋 Passo 1: Criando arquivo start_jarvis.bat...")
    if not create_batch_file():
        sys.exit(1)

    print("\n📋 Passo 2: Registrando no Windows Task Scheduler...")
    print("   (Pode solicitar permissões de administrador)")
    if not register_task_scheduler():
        print("   💡 Se recebeu erro de acesso, execute este script como Administrador")
        sys.exit(1)

    print("\n📋 Passo 3: Verificando registro...")
    if verify_registration():
        print("\n" + "=" * 60)
        print("✅ Setup completo com sucesso!")
        print("=" * 60)
        print("\n🎯 O GAMA Jarvis agora iniciará automaticamente ao fazer login no Windows")
        print(f"\n📁 Para remover, execute: python remove_startup.py")
        return True
    else:
        print("\n⚠️  Setup incompleto - verifique se tem permissões de administrador")
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
