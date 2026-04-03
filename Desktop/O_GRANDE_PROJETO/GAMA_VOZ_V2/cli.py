#!/usr/bin/env python3
"""
Gama Voz CLI — Grave, transcreva, pronto. No terminal.
"""

import os
import sys
import json
import pyaudio
import wave
import keyboard
import click
from pathlib import Path
from datetime import datetime
from groq import Groq
from dotenv import load_dotenv

# Config
load_dotenv()
API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    print("❌ GROQ_API_KEY não configurada. Defina a variável de ambiente.")
    sys.exit(1)

client = Groq(api_key=API_KEY)
AUDIO_FILE = "temp_recording.wav"
HISTORY_FILE = Path("gama-voz-history.json")

def load_history():
    """Carrega histórico de transcrições."""
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_history(history):
    """Salva histórico em JSON."""
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)

def record_audio(duration=10):
    """Grava áudio do microfone por N segundos (ou até apertar ESC)."""
    print(f"\n🎤 Gravando... (Pressione ESC para parar)")

    CHUNK = 1024
    FORMAT = pyaudio.paFloat32
    CHANNELS = 1
    RATE = 16000

    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

    frames = []
    recording = True

    try:
        while recording:
            try:
                data = stream.read(CHUNK, exception_on_overflow=False)
                frames.append(data)
                if keyboard.is_pressed('esc'):
                    recording = False
                    print("⏹️  Parado.")
            except KeyboardInterrupt:
                recording = False
                print("⏹️  Parado.")
    finally:
        stream.stop_stream()
        stream.close()
        p.terminate()

    # Salva arquivo
    with wave.open(AUDIO_FILE, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(p.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))

    print(f"✅ Gravação salva: {AUDIO_FILE}")

def transcribe_audio():
    """Transcreve áudio com Groq Whisper."""
    if not Path(AUDIO_FILE).exists():
        print("❌ Nenhuma gravação encontrada.")
        return None

    print("⏳ Transcrevendo...")

    with open(AUDIO_FILE, "rb") as audio:
        transcript = client.audio.transcriptions.create(
            model="whisper-large-v3-turbo",
            file=("audio.wav", audio, "audio/wav"),
            language="pt"
        )

    text = transcript.text

    # Salva no histórico
    history = load_history()
    history.append({
        "timestamp": datetime.now().isoformat(),
        "text": text,
    })
    save_history(history)

    # Remove arquivo temporário
    Path(AUDIO_FILE).unlink()

    return text

@click.group()
def cli():
    """Gama Voz CLI — Grave. Transcreva. Pronto."""
    pass

@cli.command()
def record():
    """Grava áudio do microfone."""
    print("🎤 Gama Voz — Record Mode")
    record_audio()

@cli.command()
def transcribe():
    """Transcreve o áudio gravado."""
    text = transcribe_audio()
    if text:
        print(f"\n✅ Transcrito:\n{text}\n")

@cli.command()
def go():
    """Grava + Transcreve (atalho rápido)."""
    print("🎤 Gama Voz — Go Mode (Record + Transcribe)")
    record_audio()
    text = transcribe_audio()
    if text:
        print(f"\n✅ Resultado:\n{text}\n")

@cli.command()
def history():
    """Mostra histórico de transcrições."""
    h = load_history()
    if not h:
        print("📭 Histórico vazio.")
        return

    print(f"\n📜 Histórico ({len(h)} itens):\n")
    for i, item in enumerate(reversed(h), 1):
        ts = item["timestamp"][:16]
        text = item["text"][:100] + ("..." if len(item["text"]) > 100 else "")
        print(f"{i}. [{ts}] {text}")
    print()

@cli.command()
def clear():
    """Limpa o histórico."""
    if HISTORY_FILE.exists():
        HISTORY_FILE.unlink()
        print("🗑️  Histórico limpo.")

if __name__ == "__main__":
    cli()
