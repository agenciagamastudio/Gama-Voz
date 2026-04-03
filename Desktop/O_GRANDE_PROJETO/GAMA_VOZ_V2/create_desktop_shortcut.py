#!/usr/bin/env python3
"""
Create desktop shortcut for Gama Voz
"""

import os
import sys
from pathlib import Path

try:
    from win32com.client import Dispatch
except ImportError:
    print("Installing pywin32...")
    os.system("pip install pywin32")
    from win32com.client import Dispatch

# Paths
DESKTOP = Path.home() / "Desktop"
BAT_FILE = r"C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\GAMA_VOZ_V2\run_gama_voz.bat"
SHORTCUT_PATH = DESKTOP / "Gama Voz.lnk"
ICON_PATH = r"C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\GAMA_VOZ_V2\icon.ico"

# Create shortcut
shell = Dispatch("WScript.Shell")
shortcut = shell.CreateShortcut(str(SHORTCUT_PATH))
shortcut.TargetPath = BAT_FILE
shortcut.WorkingDirectory = r"C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\GAMA_VOZ_V2"
shortcut.Description = "Gama Voz — Grave. Transcreva. Pronto."
shortcut.WindowStyle = 3  # Normal window
shortcut.save()

print(f"✅ Atalho criado: {SHORTCUT_PATH}")
