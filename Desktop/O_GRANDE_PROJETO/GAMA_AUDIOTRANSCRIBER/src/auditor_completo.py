#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GAMA Audio Auditor — Auditoria Completa de Pastas
Processa TUDO: transcreve áudios, cria INDEX consolidado
Perfeito para múltiplas conversas/clientes
"""

import sys
import os
import json
import logging
from pathlib import Path
from datetime import datetime
from collections import defaultdict

from groq_client import GroqTranscriber
from utils import setup_logging, find_audio_files, get_output_path, markdown_template

logger = logging.getLogger(__name__)

class CompleteAuditor:
    """Auditoria completa: transcreve + consolida + gera INDEX."""

    def __init__(self, root_folder):
        self.root_folder = Path(root_folder)
        self.transcriber = None
        self.results = defaultdict(dict)
        self.stats = {
            "total_audios": 0,
            "transcribed": 0,
            "failed": 0,
            "skipped": 0,
            "folders_processed": 0
        }

    def init_transcriber(self):
        """Inicializar Groq (com erro handling)."""
        try:
            self.transcriber = GroqTranscriber()
        except ValueError as e:
            logger.error(f"❌ {e}")
            return False
        return True

    def audit_and_transcribe(self, language="pt"):
        """
        1. Varre pasta recursivamente
        2. Transcreve todos os áudios
        3. Coleta metadados
        """
        logger.info("=" * 70)
        logger.info("🔍 AUDITORIA COMPLETA INICIADA")
        logger.info(f"📁 Raiz: {self.root_folder}")
        logger.info("=" * 70)

        if not self.init_transcriber():
            return False

        # Encontrar todos os áudios
        audio_files = find_audio_files(self.root_folder)
        self.stats["total_audios"] = len(audio_files)

        if not audio_files:
            logger.warning("⚠️  Nenhum áudio encontrado")
            return False

        logger.info(f"✅ Encontrados {len(audio_files)} áudio(s)")
        logger.info("")

        # Processar cada áudio
        for idx, audio_file in enumerate(audio_files, 1):
            output_path = get_output_path(audio_file)
            relative_path = audio_file.relative_to(self.root_folder)
            folder_name = relative_path.parent.name or "root"

            # Skip se já existe .md
            if output_path.exists():
                logger.warning(f"⏭️  [{idx}/{len(audio_files)}] Pulando: {relative_path.name}")
                self.stats["skipped"] += 1
                continue

            # Transcrever
            try:
                logger.info(f"🎙️  [{idx}/{len(audio_files)}] Transcrevendo: {relative_path.name}")
                transcript = self.transcriber.transcribe(audio_file, language=language)

                # Salvar .md
                md_content = markdown_template(
                    audio_filename=audio_file.name,
                    transcription=transcript
                )
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(md_content)

                # Registrar no resultado
                self.results[folder_name][str(audio_file.name)] = {
                    "path": str(relative_path),
                    "status": "transcribed",
                    "transcript_preview": transcript[:100] + "..." if len(transcript) > 100 else transcript
                }

                logger.info(f"✅ Salvo: {output_path.name}")
                self.stats["transcribed"] += 1

            except Exception as e:
                logger.error(f"❌ Erro: {audio_file.name} - {e}")
                self.results[folder_name][str(audio_file.name)] = {
                    "path": str(relative_path),
                    "status": "failed",
                    "error": str(e)
                }
                self.stats["failed"] += 1

        self.stats["folders_processed"] = len(self.results)
        return True

    def generate_index(self):
        """Gera INDEX consolidado em Markdown."""
        logger.info("\n" + "=" * 70)
        logger.info("📊 GERANDO INDEX CONSOLIDADO")
        logger.info("=" * 70)

        index_content = f"""# Auditoria Completa de Áudios

**Data:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Pasta raiz:** {self.root_folder}

---

## 📈 Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Total de áudios encontrados** | {self.stats['total_audios']} |
| **Transcritos com sucesso** | {self.stats['transcribed']} ✅ |
| **Falhados** | {self.stats['failed']} ❌ |
| **Pulados (já tinham .md)** | {self.stats['skipped']} ⏭️ |
| **Pastas processadas** | {self.stats['folders_processed']} |

---

## 📁 Detalhes por Pasta

"""

        # Iterar por pasta
        for folder_name in sorted(self.results.keys()):
            audios = self.results[folder_name]
            successful = sum(1 for a in audios.values() if a["status"] == "transcribed")

            index_content += f"""
### {folder_name}
**Status:** {successful}/{len(audios)} transcritos

| Áudio | Status | Preview |
|-------|--------|---------|
"""

            for audio_name, data in audios.items():
                status_icon = "✅" if data["status"] == "transcribed" else "❌"
                preview = data.get("transcript_preview", data.get("error", "N/A"))[:50]
                index_content += f"| {audio_name} | {status_icon} {data['status']} | {preview}... |\n"

        # Salvar INDEX
        index_path = self.root_folder / "INDEX-AUDITORIA-AUDIOS.md"
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(index_content)

        logger.info(f"✅ INDEX salvo: {index_path}")
        logger.info(f"📍 Abra em: {index_path}")

        return str(index_path)

    def print_summary(self):
        """Resumo final."""
        logger.info("\n" + "=" * 70)
        logger.info("🎉 AUDITORIA COMPLETA")
        logger.info("=" * 70)
        logger.info(f"✅ Transcritos: {self.stats['transcribed']}")
        logger.info(f"❌ Falhados: {self.stats['failed']}")
        logger.info(f"⏭️  Pulados: {self.stats['skipped']}")
        logger.info(f"📁 Pastas: {self.stats['folders_processed']}")
        logger.info("=" * 70)


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="Auditoria completa de áudios em pasta com múltiplas conversas"
    )
    parser.add_argument(
        "folder",
        type=str,
        help="Pasta raiz com conversas/clientes"
    )
    parser.add_argument(
        "--language",
        type=str,
        default="pt",
        help="Idioma (pt, en, etc)"
    )

    args = parser.parse_args()

    # Setup
    logger = setup_logging()

    # Auditar
    auditor = CompleteAuditor(args.folder)
    if not auditor.audit_and_transcribe(language=args.language):
        sys.exit(1)

    # Gerar INDEX
    auditor.generate_index()

    # Resumo
    auditor.print_summary()

    return 0


if __name__ == "__main__":
    sys.exit(main())
