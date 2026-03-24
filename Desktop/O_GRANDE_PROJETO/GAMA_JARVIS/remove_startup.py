"""
Remove Startup Script
Remove GAMA Jarvis do startup automático do Windows
"""

import os
import sys
import subprocess
from pathlib import Path

TASK_NAME = "GAMA Jarvis"
JARVIS_BAT = Path(__file__).parent / "start_jarvis.bat"


def remove_task():
    """Remove tarefa do Task Scheduler"""
    try:
        cmd = [
            "schtasks",
            "/delete",
            "/tn", TASK_NAME,
            "/f"  # Force delete
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            print(f"✅ Tarefa '{TASK_NAME}' removida do Task Scheduler")
            return True
        elif "não existe" in result.stderr.lower() or "cannot find" in result.stderr.lower():
            print(f"⚠️  Tarefa '{TASK_NAME}' não foi encontrada")
            return True
        else:
            print(f"❌ Erro ao remover tarefa: {result.stderr}")
            return False

    except Exception as e:
        print(f"❌ Erro: {e}")
        return False


def delete_batch_file():
    """Delete arquivo start_jarvis.bat"""
    try:
        if JARVIS_BAT.exists():
            os.remove(JARVIS_BAT)
            print(f"✅ Arquivo deletado: {JARVIS_BAT}")
            return True
        else:
            print(f"⚠️  Arquivo não encontrado: {JARVIS_BAT}")
            return True
    except Exception as e:
        print(f"❌ Erro ao deletar arquivo: {e}")
        return False


def main():
    """Executa remoção completa"""
    print("=" * 60)
    print("GAMA Jarvis - Remove from Windows Startup")
    print("=" * 60)

    # Verifica se é Windows
    if sys.platform != "win32":
        print("❌ Este script só funciona no Windows")
        sys.exit(1)

    print("\n📋 Passo 1: Removendo tarefa do Task Scheduler...")
    if not remove_task():
        sys.exit(1)

    print("\n📋 Passo 2: Deletando arquivo start_jarvis.bat...")
    if not delete_batch_file():
        sys.exit(1)

    print("\n" + "=" * 60)
    print("✅ Remoção completa com sucesso!")
    print("=" * 60)
    print("\n🎯 GAMA Jarvis não iniciará mais automaticamente ao fazer login")
    return True


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
