#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GAMA Audio Transcriber — Web UI (FastAPI)

Uso:
    uvicorn src.web:app --reload

Endpoints:
    POST /upload          → Upload files/folder, start transcription job
    GET /status/{job_id}  → SSE stream of job progress
    GET /download/{job_id} → Download ZIP with results
"""

import os
import sys
import io
import json
import zipfile
import logging
import asyncio
from pathlib import Path
from datetime import datetime
from uuid import uuid4

# Forçar UTF-8 no Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

# Carregar .env
from pathlib import Path
env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from .groq_client import GroqTranscriber
from .utils import setup_logging, find_audio_files, get_output_path, markdown_template

# Setup logging
logger = setup_logging("web_ui")

# App
app = FastAPI(
    title="GAMA Audio Transcriber",
    description="Web UI para transcrição em massa de áudios",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
static_path = Path(__file__).parent.parent / "static"
if static_path.exists():
    app.mount("/static", StaticFiles(directory=str(static_path)), name="static")

# Job state (in-memory, dict)
# Format: {job_id: {"status": "...", "files": [...], "results": {...}, "error": "..."}}
jobs = {}

# Groq client
try:
    transcriber = GroqTranscriber()
except ValueError as e:
    logger.error(f"Groq não inicializado: {e}")
    transcriber = None


@app.get("/")
async def root():
    """Serve the main HTML page."""
    html_path = Path(__file__).parent.parent / "static" / "index.html"
    if html_path.exists():
        return FileResponse(html_path)
    return {"message": "GAMA Audio Transcriber — carregue para http://localhost:8000"}


@app.post("/upload")
async def upload_files(files: list[UploadFile], background_tasks: BackgroundTasks):
    """
    Upload múltiplos arquivos de áudio.

    Request:
        files: list[UploadFile]  (áudios selecionados)

    Response:
        {"job_id": "...", "files_count": N, "status": "queued"}
    """
    if not files:
        raise HTTPException(status_code=400, detail="Nenhum arquivo enviado")

    if not transcriber:
        raise HTTPException(status_code=500, detail="Groq não inicializado. Configure GROQ_API_KEY")

    job_id = str(uuid4())[:8]  # short UUID

    # Filter audio files (apenas extensões conhecidas)
    audio_extensions = {".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac", ".wma"}
    audio_files = [f for f in files if Path(f.filename).suffix.lower() in audio_extensions]

    if not audio_files:
        raise HTTPException(status_code=400, detail="Nenhum arquivo de áudio válido")

    # Initialize job state
    jobs[job_id] = {
        "status": "queued",
        "files": [f.filename for f in audio_files],
        "results": {},
        "error": None,
        "progress": 0,
        "total": len(audio_files),
    }

    logger.info(f"📤 Job {job_id} criado: {len(audio_files)} arquivos")

    # Background task: process files
    background_tasks.add_task(process_job, job_id, audio_files)

    return {
        "job_id": job_id,
        "files_count": len(audio_files),
        "status": "queued"
    }


async def process_job(job_id: str, files: list[UploadFile]):
    """
    Background task: transcrever arquivos.
    """
    try:
        jobs[job_id]["status"] = "processing"
        logger.info(f"⏳ Iniciando processamento job {job_id}")

        for idx, file in enumerate(files):
            try:
                # Save temp file
                temp_path = Path(f"/tmp/{job_id}_{file.filename}")
                temp_path.parent.mkdir(parents=True, exist_ok=True)

                contents = await file.read()
                temp_path.write_bytes(contents)

                # Transcribe
                logger.info(f"🎙️  Transcrevendo {idx+1}/{len(files)}: {file.filename}")
                text = transcriber.transcribe(str(temp_path))

                # Save result
                md_filename = f"{Path(file.filename).stem}.md"
                jobs[job_id]["results"][md_filename] = text

                # Update progress
                jobs[job_id]["progress"] = idx + 1
                logger.info(f"✅ Processado {idx+1}/{len(files)}")

                # Clean temp
                temp_path.unlink()

            except Exception as e:
                logger.error(f"❌ Erro em {file.filename}: {e}")
                jobs[job_id]["error"] = f"Erro em {file.filename}: {str(e)}"
                jobs[job_id]["progress"] = idx + 1

        jobs[job_id]["status"] = "completed"
        logger.info(f"✅ Job {job_id} completo: {len(jobs[job_id]['results'])} transcrições")

    except Exception as e:
        logger.error(f"❌ Job {job_id} falhou: {e}")
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["error"] = str(e)


@app.get("/status/{job_id}")
async def status_stream(job_id: str):
    """
    Server-Sent Events (SSE) stream de progresso do job.

    Exemplo cliente:
        const source = new EventSource('/status/abc123');
        source.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(`Progress: ${data.progress}/${data.total}`);
        };
    """
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail=f"Job {job_id} não encontrado")

    async def event_generator():
        """Yield SSE events enquanto job estiver em progresso."""
        while True:
            job = jobs[job_id]

            # Emit status
            yield f"data: {json.dumps(job)}\n\n"

            # Stop if completed or failed
            if job["status"] in ["completed", "failed"]:
                break

            # Wait 1s before next update
            await asyncio.sleep(1)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream"
    )


@app.get("/download/{job_id}")
async def download_results(job_id: str):
    """
    Download ZIP com todas as transcrições .md.
    """
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail=f"Job {job_id} não encontrado")

    job = jobs[job_id]
    if job["status"] != "completed":
        raise HTTPException(
            status_code=400,
            detail=f"Job ainda não completou (status: {job['status']})"
        )

    if not job["results"]:
        raise HTTPException(status_code=400, detail="Nenhuma transcrição disponível")

    # Create ZIP in memory
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for filename, text in job["results"].items():
            zf.writestr(filename, text)

    zip_buffer.seek(0)

    logger.info(f"📥 Downloading ZIP para job {job_id}")

    return StreamingResponse(
        iter([zip_buffer.getvalue()]),
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename={job_id}-transcriptions.zip"}
    )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "groq_ready": transcriber is not None,
        "jobs_in_flight": len([j for j in jobs.values() if j["status"] == "processing"])
    }


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )
