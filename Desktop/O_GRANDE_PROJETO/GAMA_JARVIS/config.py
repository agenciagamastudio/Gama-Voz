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
# CONTINUOUS CONVERSATION MODE
# ============================================================================

# Frases que encerram a conversa contínua (case-insensitive)
CONVERSATION_CLOSING_WORDS = [
    "tchau", "obrigado", "pode ir", "até mais", "valeu",
    "ok obrigado", "pode descansar", "encerra", "sai", "para",
    "adeus", "falou", "é isso", "encerrar"
]

# Timeout em segundos para sair da conversa contínua sem fala
CONVERSATION_TIMEOUT_SECONDS = 30

# Resposta ao encerrar a conversa
CONVERSATION_CLOSING_RESPONSE = "Tô por aqui se precisar."

# ============================================================================
# DAILY CHECK-IN
# ============================================================================

# Hora do dia para fazer check-in (formato 24h)
CHECKIN_HOUR = 15  # 15:00 (3 PM)

# Frase do check-in
CHECKIN_MESSAGE = "Como tá o dia, Matheus? Precisa de ajuda com alguma coisa?"

# ============================================================================
# PROACTIVE NOTIFICATIONS
# ============================================================================

# Intervalo de verificação de projetos (em segundos)
PROJECT_CHECK_INTERVAL_SECONDS = 60

# Tempo em minutos antes de avisar que projeto está offline
PROJECT_OFFLINE_THRESHOLD_MINUTES = 10

# Frase para notificar projeto offline
PROJECT_OFFLINE_MESSAGE = "{project} está offline há {minutes} minutos. Quer que eu tente reiniciar?"

# ============================================================================
# MONITOR API - DYNAMIC PORTS
# ============================================================================

# Portas a tentar (em ordem)
MONITOR_PORTS = [3015, 3016, 3017, 3018]

# Timeout em segundos para cada tentativa de porta
MONITOR_PORT_TIMEOUT = 1

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

SYSTEM_PROMPT = """Você é JARVIS, assistente de voz do Matheus na Gama Studio.

INSTRUÇÕES CRÍTICAS:
- Responda SEMPRE em português brasileiro
- Seja DIRETO, OBJETIVO e NATURAL — máximo 2 frases
- Nunca invente dados ou informações
- Responda apenas o que foi perguntado
- Se não entender, pergunte de forma curta: "Pode repetir?"
- Não diga "Desculpe, não entendi" — seja mais natural

CONTEXTO:
- Você roda em Windows 11
- Seu nome é Jarvis (JAR-vis)
- Você conhece o ecossistema Gama: Monitor, Design System, JARVIS, NORT
- Você pode abrir apps (Monitor, Claude Code, Terminal, navegador)
- Você consulta status do GAMA_MONITOR se solicitado
- Você entende o perfil NORT de Matheus (ENTP, rápido, estratégico, informal)

EXEMPLOS:
- "Qual é a capital do Brasil?" → "Brasília"
- "Abre o Monitor" → executa comando
- "Como estou hoje?" → consulta sistema e resume

Tom: Informal, direto, conversacional. Como um amigo na equipe.
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
