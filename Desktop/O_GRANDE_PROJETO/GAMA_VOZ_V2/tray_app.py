#!/usr/bin/env python3
"""
Gama Voz Tray App — System tray icon with global hotkeys
Ctrl+Shift+R: Toggle record/transcribe
"""

import os
import sys
import json
import pyaudio
import wave
import threading
import keyboard
import pyperclip
from pathlib import Path
from datetime import datetime
from groq import Groq
from pystray import Icon, Menu, MenuItem
from PIL import Image, ImageDraw
import time

# Config
API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    print("❌ GROQ_API_KEY não configurada.")
    sys.exit(1)

client = Groq(api_key=API_KEY)
AUDIO_FILE = "temp_recording.wav"
HISTORY_FILE = Path("gama-voz-history.json")

class GamaVozTray:
    def __init__(self):
        self.is_recording = False
        self.audio_frames = []
        self.audio_stream = None
        self.p = None
        self.icon = None
        self.setup_hotkey()

    def setup_hotkey(self):
        """Setup global hotkey Ctrl+Shift (direito)"""
        keyboard.add_hotkey('ctrl+right shift', self.toggle_record_transcribe)

    def create_icon(self, color='green'):
        """Create tray icon with status color"""
        # Create 32x32 icon with status color
        img = Image.new('RGB', (64, 64), color='#111111')
        draw = ImageDraw.Draw(img)

        # Draw circle (green=ready, red=recording)
        circle_color = '#88CE11' if color == 'green' else '#E53935'
        draw.ellipse([8, 8, 56, 56], fill=circle_color)

        # Add pulse effect for recording
        if color == 'red':
            draw.ellipse([12, 12, 52, 52], outline='#E53935', width=2)

        return img

    def load_history(self):
        """Load transcription history"""
        if HISTORY_FILE.exists():
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []

    def save_history(self, history):
        """Save transcription history"""
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history, f, ensure_ascii=False, indent=2)

    def record_audio_stream(self):
        """Record audio until stop signal"""
        CHUNK = 1024
        FORMAT = pyaudio.paFloat32
        CHANNELS = 1
        RATE = 16000

        self.p = pyaudio.PyAudio()
        self.audio_stream = self.p.open(
            format=FORMAT,
            channels=CHANNELS,
            rate=RATE,
            input=True,
            frames_per_buffer=CHUNK
        )

        self.audio_frames = []
        while self.is_recording:
            try:
                data = self.audio_stream.read(CHUNK, exception_on_overflow=False)
                self.audio_frames.append(data)
            except:
                pass

        # Stop recording
        self.audio_stream.stop_stream()
        self.audio_stream.close()
        self.p.terminate()

        # Save to file
        with wave.open(AUDIO_FILE, 'wb') as wf:
            wf.setnchannels(CHANNELS)
            wf.setsampwidth(self.p.get_sample_size(FORMAT))
            wf.setframerate(RATE)
            wf.writeframes(b''.join(self.audio_frames))

    def transcribe_audio(self):
        """Transcribe audio with Groq"""
        if not Path(AUDIO_FILE).exists():
            return None

        with open(AUDIO_FILE, 'rb') as audio:
            transcript = client.audio.transcriptions.create(
                model="whisper-large-v3-turbo",
                file=("audio.wav", audio, "audio/wav"),
                language="pt"
            )

        text = transcript.text

        # Save to history
        history = self.load_history()
        history.append({
            "timestamp": datetime.now().isoformat(),
            "text": text,
        })
        self.save_history(history)

        # Delete temp file
        Path(AUDIO_FILE).unlink()

        return text

    def toggle_record_transcribe(self):
        """Hotkey handler: Toggle recording or transcribe"""
        if not self.is_recording:
            # Start recording
            self.is_recording = True
            self.update_icon_red()

            # Record in background thread
            record_thread = threading.Thread(target=self.record_audio_stream, daemon=True)
            record_thread.start()
        else:
            # Stop recording and transcribe
            self.is_recording = False
            time.sleep(0.5)  # Wait for recording thread to finish

            # Transcribe
            text = self.transcribe_audio()

            # Paste to active window
            if text:
                pyperclip.copy(text)
                keyboard.write('')  # Focus the current window
                time.sleep(0.1)
                keyboard.hotkey('ctrl', 'v')  # Paste

            self.update_icon_green()

    def update_icon_red(self):
        """Update tray icon to red (recording)"""
        if self.icon:
            self.icon.icon = self.create_icon('red')

    def update_icon_green(self):
        """Update tray icon to green (ready)"""
        if self.icon:
            self.icon.icon = self.create_icon('green')

    def on_quit(self, icon, item):
        """Quit app"""
        icon.stop()
        sys.exit(0)

    def run(self):
        """Run tray app"""
        menu = Menu(
            MenuItem('Gama Voz', None),
            MenuItem('Status: Pronto', None, enabled=False),
            MenuItem('---', None),
            MenuItem('Ctrl+Shift+R: Grave/Transcreva', None, enabled=False),
            MenuItem('---', None),
            MenuItem('Sair', self.on_quit),
        )

        self.icon = Icon(
            "Gama Voz",
            icon=self.create_icon('green'),
            menu=menu,
            title="Gama Voz — Ctrl+Shift+R para gravar"
        )

        self.icon.run()

if __name__ == '__main__':
    app = GamaVozTray()
    app.run()
