#!/usr/bin/env python3
"""
Gama Voz Tray App v3 — System tray com hotkey global robusto (pynput.HotKey)
Ctrl+Shift (direito) para gravar/parar/transcrever/colar
"""

import os
import sys
import json
import pyaudio
import wave
import threading
import time
from pathlib import Path
from datetime import datetime
from groq import Groq
from pystray import Icon, Menu, MenuItem
from PIL import Image, ImageDraw
import pyperclip
from pynput import keyboard

# Config
API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    print("❌ GROQ_API_KEY não configurada.")
    sys.exit(1)

client = Groq(api_key=API_KEY)
AUDIO_FILE = "temp_recording.wav"
HISTORY_FILE = Path("gama-voz-history.json")

class GamaVozTrayV3:
    def __init__(self):
        self.is_recording = False
        self.audio_frames = []
        self.audio_stream = None
        self.p = None
        self.icon = None
        self.listener = None
        self.hotkey = None
        print("🎤 Gama Voz Tray v3 iniciando...")
        self.setup_hotkey()

    def setup_hotkey(self):
        """Setup global hotkey usando HotKey (mais robusto)"""
        try:
            # Ctrl + Shift direito
            self.hotkey = keyboard.HotKey(
                keyboard.HotKey.parse('<ctrl>+<shift_r>'),
                self.toggle_record_transcribe
            )

            self.listener = keyboard.Listener(
                on_press=self.for_canonical(self.hotkey.press),
                on_release=self.for_canonical(self.hotkey.release)
            )
            self.listener.start()
            print("✅ Hotkey ativado: Ctrl+Shift (direito)")
        except Exception as e:
            print(f"❌ Erro ao ativar hotkey: {e}")

    @staticmethod
    def for_canonical(f):
        """Converte função para aceitar eventos do listener"""
        def handler(k):
            f(keyboard.Listener.canonical(k))
        return handler

    def load_history(self):
        if HISTORY_FILE.exists():
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []

    def save_history(self, history):
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history, f, ensure_ascii=False, indent=2)

    def record_audio_stream(self):
        """Record audio until stop signal"""
        CHUNK = 1024
        FORMAT = pyaudio.paFloat32
        CHANNELS = 1
        RATE = 16000

        try:
            self.p = pyaudio.PyAudio()
            self.audio_stream = self.p.open(
                format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK
            )

            self.audio_frames = []
            print("🎤 GRAVANDO... (Ctrl+Shift direito para parar)")

            while self.is_recording:
                try:
                    data = self.audio_stream.read(CHUNK, exception_on_overflow=False)
                    self.audio_frames.append(data)
                except:
                    pass

            self.audio_stream.stop_stream()
            self.audio_stream.close()
            self.p.terminate()
            print("⏹️  PARADO")

            with wave.open(AUDIO_FILE, 'wb') as wf:
                wf.setnchannels(CHANNELS)
                wf.setsampwidth(self.p.get_sample_size(FORMAT))
                wf.setframerate(RATE)
                wf.writeframes(b''.join(self.audio_frames))
        except Exception as e:
            print(f"❌ Erro ao gravar: {e}")

    def transcribe_audio(self):
        """Transcribe audio with Groq"""
        if not Path(AUDIO_FILE).exists():
            print("❌ Nenhuma gravação")
            return None

        try:
            print("⏳ TRANSCREVENDO...")
            with open(AUDIO_FILE, 'rb') as audio:
                transcript = client.audio.transcriptions.create(
                    model="whisper-large-v3-turbo",
                    file=("audio.wav", audio, "audio/wav"),
                    language="pt"
                )

            text = transcript.text

            history = self.load_history()
            history.append({
                "timestamp": datetime.now().isoformat(),
                "text": text,
            })
            self.save_history(history)

            Path(AUDIO_FILE).unlink()

            return text
        except Exception as e:
            print(f"❌ Erro ao transcrever: {e}")
            return None

    def toggle_record_transcribe(self):
        """Toggle recording or transcribe"""
        if not self.is_recording:
            # START RECORDING
            self.is_recording = True
            self.update_icon_red()

            record_thread = threading.Thread(target=self.record_audio_stream, daemon=True)
            record_thread.start()
        else:
            # STOP RECORDING + TRANSCRIBE
            self.is_recording = False
            time.sleep(0.5)

            text = self.transcribe_audio()

            if text:
                print(f"\n✅ RESULTADO:\n{text}\n")
                pyperclip.copy(text)
                print("📝 Texto copiado. Cole com: Ctrl+V")
                time.sleep(0.3)
                # Auto-paste
                from pynput.keyboard import Controller
                controller = Controller()
                controller.hotkey('ctrl', 'v')
                print("✅ COLADO!")

            self.update_icon_green()

    def update_icon_red(self):
        if self.icon:
            self.icon.icon = self.create_icon('red')

    def update_icon_green(self):
        if self.icon:
            self.icon.icon = self.create_icon('green')

    def create_icon(self, color='green'):
        img = Image.new('RGB', (64, 64), color='#111111')
        draw = ImageDraw.Draw(img)
        circle_color = '#88CE11' if color == 'green' else '#E53935'
        draw.ellipse([8, 8, 56, 56], fill=circle_color)
        if color == 'red':
            draw.ellipse([12, 12, 52, 52], outline='#E53935', width=3)
        return img

    def on_quit(self, icon, item):
        if self.listener:
            self.listener.stop()
        icon.stop()
        print("👋 Gama Voz finalizado")
        sys.exit(0)

    def run(self):
        menu = Menu(
            MenuItem('🎤 Gama Voz v3', None),
            MenuItem('Ctrl+Shift (dir): Gravar/Parar', None, enabled=False),
            MenuItem('---', None),
            MenuItem('Sair', self.on_quit),
        )

        self.icon = Icon(
            "Gama Voz",
            icon=self.create_icon('green'),
            menu=menu,
            title="Gama Voz — Ctrl+Shift direito"
        )

        print("\n" + "="*50)
        print("🎤 GAMA VOZ TRAY APP V3")
        print("="*50)
        print("✅ Sistema ativo!")
        print("🔴 Hotkey: Ctrl+Shift (direito do teclado)")
        print("1️⃣  Pressione: Ctrl+Shift (dir) = GRAVAR")
        print("2️⃣  Fale algo")
        print("3️⃣  Pressione: Ctrl+Shift (dir) = PARAR + TRANSCREVER + COLAR")
        print("="*50 + "\n")

        self.icon.run()

if __name__ == '__main__':
    app = GamaVozTrayV3()
    app.run()
