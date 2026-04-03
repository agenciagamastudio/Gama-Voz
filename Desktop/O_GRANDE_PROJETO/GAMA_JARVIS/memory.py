"""
Persistent Memory Module
Salva e carrega histórico de conversas em data/memory.json
"""

import logging
import json
import os
from datetime import datetime
from pathlib import Path

logger = logging.getLogger("jarvis.memory")

MEMORY_FILE = Path(__file__).parent / "data" / "memory.json"
MAX_MESSAGES = 100  # Limita a 100 mensagens (remove as mais antigas)


class Memory:
    """Gerencia memória persistente de conversas"""

    def __init__(self):
        self.memory_file = MEMORY_FILE
        self.memory_file.parent.mkdir(parents=True, exist_ok=True)
        self.messages = self.load()
        logger.info(f"Memória carregada: {len(self.messages)} mensagens")

    def load(self):
        """Carrega histórico do arquivo"""
        try:
            if self.memory_file.exists():
                with open(self.memory_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    return data.get("messages", [])
        except Exception as e:
            logger.error(f"Erro ao carregar memória: {e}")
        return []

    def save(self):
        """Salva histórico no arquivo"""
        try:
            # Limita a 100 mensagens (remove as mais antigas)
            if len(self.messages) > MAX_MESSAGES:
                self.messages = self.messages[-MAX_MESSAGES:]

            data = {
                "messages": self.messages,
                "last_saved": datetime.now().isoformat(),
                "total_messages": len(self.messages)
            }

            with open(self.memory_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)

            logger.info(f"Memória salva: {len(self.messages)} mensagens")
        except Exception as e:
            logger.error(f"Erro ao salvar memória: {e}")

    def add_message(self, role, content):
        """Adiciona mensagem ao histórico"""
        message = {
            "role": role,  # "user" ou "assistant"
            "content": content,
            "timestamp": datetime.now().isoformat()
        }
        self.messages.append(message)
        logger.debug(f"Mensagem adicionada: {role} - {content[:50]}...")

    def get_last_n(self, n=10):
        """Retorna últimas N mensagens"""
        return self.messages[-n:] if self.messages else []

    def get_conversation_context(self, n=5):
        """
        Retorna últimas N mensagens formatadas para usar como contexto no prompt
        Formato: "User: ...\nAssistant: ...\nUser: ..."
        """
        last_messages = self.get_last_n(n * 2)  # Pega N pares user/assistant
        context = ""
        for msg in last_messages:
            if msg["role"] == "user":
                context += f"Você (Matheus): {msg['content']}\n"
            else:
                context += f"Jarvis: {msg['content']}\n"
        return context.strip()

    def clear(self):
        """Limpa memória"""
        self.messages = []
        self.save()
        logger.info("Memória limpa")


# Instância global
_memory_instance = None


def get_memory():
    """Lazy loading da instância de memória"""
    global _memory_instance
    if _memory_instance is None:
        _memory_instance = Memory()
    return _memory_instance


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    mem = Memory()
    mem.add_message("user", "Olá Jarvis!")
    mem.add_message("assistant", "Oi Matheus! Como posso ajudar?")
    mem.save()

    print(f"Memória: {len(mem.messages)} mensagens")
    print(f"Contexto:\n{mem.get_conversation_context()}")
