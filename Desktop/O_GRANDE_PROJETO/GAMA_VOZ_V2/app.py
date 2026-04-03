import streamlit as st
from groq import Groq
import json
from datetime import datetime
from pathlib import Path
import os

# Config
st.set_page_config(page_title="Gama Voz", layout="centered", initial_sidebar_state="collapsed")

# CSS customizado - Design System Gama v1.0.0
# Reference: GAMA_DESIGN_SYSTEM/gama-ds-platform v1.0.0
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');

    /* Design System Tokens (CSS Variables) */
    :root {
        /* PRIMARY */
        --gama-primary: #88CE11;
        --gama-primary-hover: #6BA80E;

        /* BACKGROUNDS */
        --gama-dark: #161616;
        --gama-surface: #272727;
        --gama-border: #52525B;

        /* TEXT */
        --gama-text: #FFFFFF;
        --gama-text-secondary: #A1A1AA;

        /* SEMANTIC */
        --gama-success: #10B981;
        --gama-warning: #F59E0B;
        --gama-error: #E11D48;
        --gama-info: #3B82F6;

        /* FONTS */
        --font-sans: 'Poppins', sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
    }

    /* Design System Colors & Typography */
    * {
        font-family: var(--font-sans);
        color: var(--gama-text);
    }

    body {
        background-color: var(--gama-dark) !important;
        color: var(--gama-text);
    }

    .main {
        max-width: 680px;
        margin: 0 auto;
        padding: 24px;
    }

    /* Buttons - Primary Action */
    .stButton > button {
        width: 100%;
        height: 60px;
        font-size: 16px;
        font-weight: 900;
        font-family: var(--font-sans);
        background: linear-gradient(135deg, var(--gama-primary) 0%, var(--gama-primary-hover) 100%) !important;
        color: var(--gama-dark) !important;
        border: none !important;
        border-radius: 12px !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 12px rgba(136, 206, 17, 0.3) !important;
    }

    .stButton > button:hover {
        filter: brightness(1.1) !important;
        box-shadow: 0 6px 16px rgba(136, 206, 17, 0.5) !important;
    }

    /* Headings - Using Design System */
    h1 {
        color: var(--gama-primary) !important;
        text-align: center;
        font-weight: 900 !important;
        font-family: var(--font-sans);
        letter-spacing: -0.5px;
    }

    h2 {
        color: var(--gama-primary) !important;
        font-family: var(--font-sans);
        font-weight: 700 !important;
    }

    h3 {
        color: var(--gama-text) !important;
        font-family: var(--font-sans);
        font-weight: 600 !important;
    }

    /* Tabs - Design System */
    .stTabs [data-baseweb="tab"] {
        background-color: transparent !important;
        border: none !important;
        color: var(--gama-text-secondary) !important;
        font-weight: 600 !important;
    }

    .stTabs [aria-selected="true"] {
        border-bottom: 3px solid var(--gama-primary) !important;
        color: var(--gama-primary) !important;
    }

    /* Text Areas & Inputs */
    .stTextArea textarea {
        background-color: var(--gama-surface) !important;
        color: var(--gama-text) !important;
        border: 1px solid var(--gama-border) !important;
        border-radius: 8px !important;
        font-family: var(--font-mono) !important;
        font-size: 14px !important;
    }

    .stTextInput input {
        background-color: var(--gama-surface) !important;
        color: var(--gama-text) !important;
        border: 1px solid var(--gama-border) !important;
        border-radius: 8px !important;
    }

    /* Containers & Cards */
    .stContainer {
        background-color: var(--gama-surface) !important;
        border: 1px solid var(--gama-border) !important;
        border-radius: 12px !important;
        padding: 20px !important;
        margin: 12px 0 !important;
    }

    /* Text Secondary */
    .stCaption {
        color: var(--gama-text-secondary) !important;
        font-size: 13px !important;
    }

    /* Divider */
    hr {
        background-color: var(--gama-border) !important;
        border: none !important;
        height: 1px !important;
    }

    /* Success/Error Messages */
    .stSuccess {
        background-color: rgba(16, 185, 129, 0.1) !important;
        border: 1px solid var(--gama-success) !important;
        border-radius: 8px !important;
        color: var(--gama-success) !important;
    }

    .stError {
        background-color: rgba(225, 29, 72, 0.1) !important;
        border: 1px solid var(--gama-error) !important;
        border-radius: 8px !important;
        color: var(--gama-error) !important;
    }

    .stWarning {
        background-color: rgba(245, 158, 11, 0.1) !important;
        border: 1px solid var(--gama-warning) !important;
        border-radius: 8px !important;
        color: var(--gama-warning) !important;
    }

    /* Footer - Design System compliant */
    footer {
        color: var(--gama-text-secondary);
    }
</style>
""", unsafe_allow_html=True)

# Título
st.markdown("# 🎤 Gama Voz")
st.markdown("**Grave. Transcreva. Pronto.**")
st.divider()

# Groq API key
api_key = st.secrets.get("GROQ_API_KEY") or os.getenv("GROQ_API_KEY")
if not api_key:
    st.error("❌ GROQ_API_KEY não configurada. Adicione em .streamlit/secrets.toml ou variável de ambiente.")
    st.stop()

client = Groq(api_key=api_key)

# Histórico em arquivo
HISTORY_FILE = Path("gama-voz-history.json")

def load_history():
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)

def transcribe_audio(audio_bytes):
    """Transcrever áudio com Groq (Whisper)"""
    try:
        # Enviar para Groq
        transcript = client.audio.transcriptions.create(
            model="whisper-large-v3-turbo",
            file=("audio.webm", audio_bytes, "audio/webm"),
            language="pt"
        )
        return transcript.text
    except Exception as e:
        return f"❌ Erro: {str(e)}"

# ===== GRAVAÇÃO =====
st.subheader("🎙️ Gravar Áudio")

audio_data = st.audio_input("Clique e fale:", label_visibility="collapsed")

if audio_data:
    # Transcrever
    with st.spinner("⏳ Transcrevendo..."):
        audio_bytes = audio_data.getvalue()
        text = transcribe_audio(audio_bytes)

    # Salvar no histórico
    history = load_history()
    history.append({
        "timestamp": datetime.now().isoformat(),
        "text": text,
        "duration": len(audio_bytes) / 16000,  # Aproximado
    })
    save_history(history)

    # Exibir resultado
    st.success("✅ Transcrito!")

    # Botão de copiar
    col_copy, col_rest = st.columns([0.2, 0.8])
    with col_copy:
        if st.button("📋 Copiar", key="copy_result", help="Copiar para clipboard"):
            import pyperclip
            try:
                pyperclip.copy(text)
                st.toast("✅ Copiado para clipboard!", icon="✅")
            except:
                st.info("Texto copiado (copie manualmente se precisar)")

    st.text_area("Resultado:", value=text, disabled=True, height=150)

    # Exportar
    col1, col2, col3 = st.columns(3)
    with col1:
        st.download_button("📄 TXT", text, "transcription.txt", "text/plain")
    with col2:
        st.download_button("📋 JSON", json.dumps({"text": text, "timestamp": datetime.now().isoformat()}, ensure_ascii=False), "transcription.json", "application/json")
    with col3:
        st.download_button("📹 SRT", f"1\n00:00:00,000 --> 00:00:59,000\n{text}", "transcription.srt", "text/plain")

# ===== HISTÓRICO =====
st.divider()
st.subheader("📜 Histórico")

history = load_history()
if history:
    for i, item in enumerate(reversed(history)):
        with st.container():
            col1, col2, col3, col4 = st.columns([1, 0.15, 0.15, 0.15])

            with col1:
                st.write(f"**{item['timestamp'][:16]}**")
                st.caption(item["text"][:80] + ("..." if len(item["text"]) > 80 else ""))

            # Botão de copiar
            with col2:
                if st.button("📋", key=f"copy_{i}", help="Copiar texto"):
                    import pyperclip
                    try:
                        pyperclip.copy(item["text"])
                        st.toast("✅ Copiado!", icon="✅")
                    except:
                        st.write(item["text"], unsafe_allow_html=False)

            # Botão de expandir
            with col3:
                if st.button("👁️", key=f"view_{i}", help="Ver completo"):
                    st.write(item["text"])

            # Botão de deletar
            with col4:
                if st.button("🗑️", key=f"del_{i}", help="Deletar"):
                    history.pop(len(history) - 1 - i)
                    save_history(history)
                    st.rerun()
else:
    st.info("Nenhuma transcrição ainda. Comece a gravar!")

# ===== FOOTER =====
st.divider()
st.markdown("---")
st.markdown("<p style='text-align: center; color: var(--gama-text-secondary);'>Gama Voz v2.0 — Simples. Rápido. Funciona. | Design System Gama v1.0.0</p>", unsafe_allow_html=True)
