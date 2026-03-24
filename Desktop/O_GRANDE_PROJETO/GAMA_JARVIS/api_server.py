"""
API Server para JARVIS UI
Flask rodando em thread separada (porta 3018)
Expõe estado compartilhado com main.py sem bloquear loop de áudio
"""

import logging
import json
from threading import Thread, Lock
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
import requests

logger = logging.getLogger("jarvis.api_server")

# ============================================================================
# SHARED STATE (Thread-safe)
# ============================================================================

class SharedState:
    """Estado compartilhado entre main.py e api_server.py"""

    def __init__(self):
        self.lock = Lock()
        self._state = {
            "state": "idle",  # idle, listening, activated, processing, responding
            "transcript": "",  # O que o Whisper transcreveu
            "response": "",    # Resposta do Jarvis
            "history": [],     # Últimas conversas
            "monitor_status": {
                "active_projects": 0,
                "timestamp": ""
            },
            "groq_connected": False
        }

    def get(self):
        """Retorna cópia do estado (thread-safe)"""
        with self.lock:
            return dict(self._state)

    def set(self, key, value):
        """Atualiza uma chave do estado (thread-safe)"""
        with self.lock:
            self._state[key] = value
            logger.debug(f"Estado atualizado: {key} = {value}")

    def update(self, data):
        """Atualiza múltiplas chaves (thread-safe)"""
        with self.lock:
            self._state.update(data)
            logger.debug(f"Estado atualizado: {data}")

    def add_to_history(self, role, content):
        """Adiciona mensagem ao histórico (últimas 5)"""
        with self.lock:
            self._state["history"].append({
                "role": role,
                "content": content
            })
            # Mantém apenas últimas 5
            if len(self._state["history"]) > 10:  # 5 pares user/assistant
                self._state["history"] = self._state["history"][-10:]

    def clear_history(self):
        """Limpa histórico"""
        with self.lock:
            self._state["history"] = []


# Instância global
shared_state = SharedState()


# ============================================================================
# FLASK APP
# ============================================================================

app = Flask(__name__)
CORS(app)  # Permite requisições do front-end


@app.route("/api/jarvis/state", methods=["GET"])
def get_state():
    """Retorna estado atual do Jarvis"""
    from config import MONITOR_PORTS, MONITOR_PORT_TIMEOUT

    state = shared_state.get()

    # Adiciona hora atual
    state["timestamp"] = datetime.now().isoformat()

    # Tenta atualizar status do Monitor (tenta múltiplas portas em ordem)
    monitor_found = False

    for port in MONITOR_PORTS:
        try:
            response = requests.get(f"http://localhost:{port}/api/status", timeout=MONITOR_PORT_TIMEOUT)
            if response.status_code == 200:
                monitor = response.json()
                state["monitor_status"] = {
                    "active_projects": monitor.get("active_projects", 0),
                    "timestamp": monitor.get("timestamp", "")
                }
                logger.debug(f"Monitor encontrado na porta {port}")
                monitor_found = True
                break
        except Exception as e:
            logger.debug(f"Porta {port} indisponível: {e}")
            continue

    if not monitor_found:
        logger.debug("Monitor API indisponível em nenhuma porta")
        state["monitor_status"]["active_projects"] = 0

    return jsonify(state), 200


@app.route("/api/jarvis/health", methods=["GET"])
def health():
    """Health check do servidor"""
    return jsonify({
        "status": "ok",
        "timestamp": datetime.now().isoformat()
    }), 200


# ============================================================================
# FUNÇÕES EXPORTADAS PARA main.py
# ============================================================================

def set_state(state_name):
    """
    Atualiza estado do Jarvis
    Estados: idle, listening, activated, processing, responding
    """
    if state_name not in ["idle", "listening", "activated", "processing", "responding"]:
        logger.warning(f"Estado inválido: {state_name}")
        return

    shared_state.set("state", state_name)


def set_transcript(text):
    """Atualiza texto transcrito pelo Whisper"""
    shared_state.set("transcript", text)


def set_response(text):
    """Atualiza resposta do Jarvis"""
    shared_state.set("response", text)


def add_history(role, content):
    """Adiciona entrada ao histórico (role: 'user' ou 'assistant')"""
    shared_state.add_to_history(role, content)


def set_groq_connected(connected):
    """Atualiza status da conexão com Groq"""
    shared_state.set("groq_connected", connected)


def clear_history():
    """Limpa histórico de conversa"""
    shared_state.clear_history()


def get_history():
    """Retorna histórico atual"""
    state = shared_state.get()
    return state.get("history", [])


# ============================================================================
# SERVIDOR EM THREAD SEPARADA
# ============================================================================

def start_server(host="127.0.0.1", port=3018, debug=False):
    """
    Inicia servidor Flask em thread daemon
    Não bloqueia o loop principal de main.py
    """
    def run():
        logger.info(f"🚀 JARVIS API Server rodando em http://{host}:{port}")
        app.run(host=host, port=port, debug=debug, use_reloader=False)

    thread = Thread(target=run, daemon=True)
    thread.start()
    logger.info("✅ API Server iniciado em thread separada")
    return thread


# ============================================================================
# MAIN (para testes)
# ============================================================================

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    print("🚀 Iniciando JARVIS API Server...")
    print("   Porta: 3018")
    print("   Teste: curl http://localhost:3018/api/jarvis/state")
    print("")

    # Simula alguns estados para teste
    set_state("listening")
    set_transcript("Ouvindo...")
    set_groq_connected(True)
    add_history("user", "Olá Jarvis!")
    add_history("assistant", "Oi! Como posso ajudar?")

    # Inicia servidor
    start_server(debug=False)

    # Mantém rodando
    try:
        import time
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n👋 Servidor parado")
