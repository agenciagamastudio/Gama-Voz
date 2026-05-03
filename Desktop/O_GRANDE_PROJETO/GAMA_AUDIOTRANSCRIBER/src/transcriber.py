#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GAMA Audio Transcriber — Script Principal

Uso:
    python transcriber.py "D:/caminho/pasta"
    python transcriber.py "D:/caminho/pasta" --language pt
"""

import sys
import os
import argparse
import logging
from pathlib import Path
from datetime import datetime

# Forçar UTF-8 no Windows
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

# Carregar .env
from pathlib import Path
env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

from .groq_client import GroqTranscriber
from .utils import (
    setup_logging, find_audio_files, get_output_path,
    markdown_template, file_size_mb
)

def main():
    parser = argparse.ArgumentParser(
        description="Transcrever áudios em massa via Groq Whisper"
    )
    parser.add_argument(
        "folder",
        type=str,
        help="Caminho da pasta com áudios (recursivo)"
    )
    parser.add_argument(
        "--language",
        type=str,
        default="pt",
        help="Idioma ('pt' para português, 'en' para inglês, etc)"
    )
    parser.add_argument(
        "--output-only",
        action="store_true",
        help="Apenas listar áudios sem transcrever"
    )

    args = parser.parse_args()

    # Setup logging
    logger = setup_logging()
    logger.info("=" * 60)
    logger.info("🚀 GAMA Audio Transcriber iniciado")
    logger.info(f"📁 Pasta: {args.folder}")
    logger.info(f"🗣️  Idioma: {args.language}")
    logger.info("=" * 60)

    # Validar e encontrar áudios
    try:
        audio_files = find_audio_files(args.folder)
    except FileNotFoundError as e:
        logger.error(f"❌ {e}")
        sys.exit(1)

    if not audio_files:
        logger.warning("⚠️  Nenhum áudio encontrado nesta pasta")
        sys.exit(0)

    logger.info(f"✅ Encontrados {len(audio_files)} áudio(s)")
    for idx, f in enumerate(audio_files, 1):
        size = file_size_mb(f)
        logger.info(f"  {idx}. {f.name} ({size:.2f} MB)")

    # Se apenas listagem, sair
    if args.output_only:
        logger.info("✅ Listagem completa (--output-only ativado)")
        sys.exit(0)

    # Inicializar Groq
    try:
        transcriber = GroqTranscriber()
    except ValueError as e:
        logger.error(f"❌ {e}")
        sys.exit(1)

    # Transcrever
    logger.info("\n" + "=" * 60)
    logger.info("🎙️  INICIANDO TRANSCRIÇÕES")
    logger.info("=" * 60 + "\n")

    successful = 0
    failed = 0
    skipped = 0

    for idx, audio_file in enumerate(audio_files, 1):
        output_path = get_output_path(audio_file)

        # Skip se .md já existe
        if output_path.exists():
            logger.warning(f"⏭️  Pulando (arquivo .md já existe): {audio_file.name}")
            skipped += 1
            continue

        # Transcrever
        try:
            transcript = transcriber.transcribe(audio_file, language=args.language)

            # Gerar markdown
            md_content = markdown_template(
                audio_filename=audio_file.name,
                transcription=transcript
            )

            # Salvar
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(md_content)

            logger.info(f"💾 Salvo: {output_path.name}")
            successful += 1

        except Exception as e:
            logger.error(f"❌ Erro ao processar {audio_file.name}: {e}")
            failed += 1

    # Resumo
    logger.info("\n" + "=" * 60)
    logger.info("📊 RESUMO")
    logger.info("=" * 60)
    logger.info(f"✅ Sucesso: {successful}")
    logger.info(f"❌ Falhas: {failed}")
    logger.info(f"⏭️  Pulados: {skipped}")
    logger.info(f"📝 Total processado: {successful + failed}/{len(audio_files)}")
    logger.info("=" * 60)

    if failed == 0:
        logger.info("🎉 Todos os áudios foram transcritos com sucesso!")

    return 0

if __name__ == "__main__":
    sys.exit(main())
