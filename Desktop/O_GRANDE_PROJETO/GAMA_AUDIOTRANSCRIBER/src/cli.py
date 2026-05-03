#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GAMA Audio Transcriber — CLI Entry Point

Uso:
    gama-transcriber /path/to/folder
    gama-transcriber /path/to/folder --output /custom/output
    gama-transcriber /path/to/folder --language pt

Este é o ponto de entrada para instalação via `pip install -e .`
Reutiliza transcriber.py, groq_client.py, utils.py sem mudanças.
"""

import sys
import os
import argparse
import logging
from pathlib import Path

# Forçar UTF-8 no Windows (defensive, may already be set)
if sys.platform == "win32":
    try:
        import io
        if sys.stdout.encoding != "utf-8":
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
        if sys.stderr.encoding != "utf-8":
            sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")
    except (AttributeError, ValueError):
        # Already wrapped or unavailable, skip
        pass

# Carregar .env
env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

# Import main transcriber (relative import for package)
from .transcriber import main as transcriber_main


def main():
    """
    CLI entry point (setuptools console_scripts).

    This is called when user runs:
        gama-transcriber /path/to/audios [--options]
    """
    try:
        # Delegate to transcriber.main() which parses sys.argv
        transcriber_main()
    except SystemExit:
        # Allow transcriber.main() to exit cleanly
        pass
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
