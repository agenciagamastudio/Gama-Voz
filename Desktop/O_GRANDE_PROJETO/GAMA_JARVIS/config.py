"""
GAMA Jarvis Configuration Module
Centraliza chaves de API, paths e configurações do sistema
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Carregar variáveis de ambiente do .env
load_dotenv()

# ============================================================================
# API KEYS & CREDENTIALS
# ============================================================================

PORCUPINE_ACCESS_KEY = os.getenv("PORCUPINE_ACCESS_KEY", "")

# Groq API (Gratuito, super rápido)
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

# Ollama (Local, alternativa sem internet)
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")

# ============================================================================
# JARVIS CONFIGURATION
# ============================================================================

# Wake word configuration
WAKE_WORD = "jarvis"
WAKE_WORD_SENSITIVITY = 0.5  # 0.0 - 1.0 (higher = more sensitive)

# Audio configuration
SAMPLE_RATE = 16000
CHUNK_SIZE = 1024
AUDIO_FORMAT = "int16"

# Whisper configuration (for transcription)
WHISPER_MODEL = "tiny"  # tiny, base, small, medium, large
WHISPER_LANGUAGE = "pt"  # Portuguese

# Brain backend selection (groq or ollama)
BRAIN_BACKEND = os.getenv("BRAIN_BACKEND", "groq")  # Use "groq" (rápido) or "ollama" (local)

# Ollama configuration (Local & Gratuito, apenas se BRAIN_BACKEND="ollama")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "mistral")
OLLAMA_TIMEOUT = 120  # Timeout em segundos

# Groq configuration (API gratuita, super rápida)
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

# TTS configuration
TTS_ENGINE = "pyttsx3"
TTS_RATE = 150  # words per minute
TTS_VOLUME = 0.9

# ============================================================================
# SYSTEM CONTEXT & INTEGRATION
# ============================================================================

# Monitor API endpoint (GAMA_MONITOR)
MONITOR_API_URL = "http://localhost:3015/api"
MONITOR_ENABLED = True

# File paths
PROJECT_ROOT = Path(__file__).parent
LOGS_DIR = PROJECT_ROOT / "logs"
CACHE_DIR = PROJECT_ROOT / ".cache"

# Create directories if they don't exist
LOGS_DIR.mkdir(exist_ok=True)
CACHE_DIR.mkdir(exist_ok=True)

# ============================================================================
# SYSTEM PROMPT FOR CLAUDE (CONTEXT)
# ============================================================================

SYSTEM_PROMPT = """Você é JARVIS, assistente de voz do Matheus.

INSTRUÇÕES CRÍTICAS:
- Responda SEMPRE em português brasileiro
- Seja DIRETO e CURTO — máximo 2 frases
- Nunca invente dados ou informações
- Responda apenas o que foi perguntado
- Não faça perguntas de volta

CONTEXTO:
- Você roda em Windows 11
- Seu nome é Jarvis (JAR-vis)
- Você pode abrir apps (Monitor, Claude Code, Terminal, navegador)
- Você consulta status do GAMA_MONITOR se solicitado

EXEMPLOS:
- "Qual é a capital do Brasil?" → "Brasília"
- "Abre o Monitor" → executa comando
- "Como estou hoje?" → consulta sistema e resume

Nunca minta ou invente dados."""

# ============================================================================
# VALIDATION
# ============================================================================

def validate_config():
    """Valida configuração essencial"""
    print("✅ Configuração carregada com sucesso")
    print(f"   - Brain Backend: {BRAIN_BACKEND}")

    if BRAIN_BACKEND == "groq":
        has_key = bool(GROQ_API_KEY)
        print(f"   - Groq Model: {GROQ_MODEL}")
        print(f"   - Groq API Key: {'✅ Configurada' if has_key else '❌ NÃO CONFIGURADA'}")
        if not has_key:
            print("\n⚠️  AÇÃO NECESSÁRIA:")
            print("   1. Crie conta gratuita em: https://console.groq.com")
            print("   2. Gere uma API key")
            print("   3. Configure: export GROQ_API_KEY='sua-chave-aqui'")
            print("   4. Ou adicione a .env do projeto")
    else:
        print(f"   - Ollama Model: {OLLAMA_MODEL}")
        print(f"   - Ollama URL: {OLLAMA_URL}")
        print("\n📝 NOTA: Ollama é 100% local e gratuito!")
        print("   Se Ollama não estiver rodando, execute:")
        print(f"      1. ollama pull {OLLAMA_MODEL}")
        print("      2. ollama serve")

    print(f"   - Whisper: {WHISPER_MODEL}")
    print(f"   - Wake word: '{WAKE_WORD}'")
    print(f"   - Monitor API: {MONITOR_API_URL}")

if __name__ == "__main__":
    validate_config()
