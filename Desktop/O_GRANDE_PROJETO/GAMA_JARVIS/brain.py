"""
Brain Module - Groq Integration (Rápido, Gratuito, 100% Cloud)
Alternativa ao Ollama com API do Groq
"""

import logging
from config import (
    BRAIN_BACKEND,
    GROQ_API_KEY,
    GROQ_MODEL,
    SYSTEM_PROMPT,
    MONITOR_API_URL,
    MONITOR_ENABLED
)

logger = logging.getLogger("jarvis.brain")

# ============================================================================
# GROQ BRAIN (Padrão)
# ============================================================================

class JarvisGroqBrain:
    """Cérebro do Jarvis usando Groq API (Rápido & Gratuito)"""

    def __init__(self):
        try:
            from groq import Groq

            if not GROQ_API_KEY:
                raise ValueError(
                    "❌ GROQ_API_KEY não configurada!\n"
                    "   1. Cria conta em https://console.groq.com\n"
                    "   2. Gera uma API key\n"
                    "   3. Coloca em .env: GROQ_API_KEY=sua_key_aqui"
                )

            self.client = Groq(api_key=GROQ_API_KEY)
            self.model = GROQ_MODEL

            logger.info(f"✅ Groq conectado com sucesso")
            logger.info(f"✅ Modelo: {self.model}")

        except ImportError:
            raise ValueError(
                "❌ Groq não instalado!\n"
                "   Execute: pip install groq"
            )
        except Exception as e:
            raise ValueError(f"❌ Erro ao conectar com Groq: {e}")

        self.conversation_history = []

    def get_system_status(self):
        """Obtém status do GAMA_MONITOR para contexto"""
        if not MONITOR_ENABLED:
            return None

        try:
            import requests
            response = requests.get(f"{MONITOR_API_URL}/status", timeout=2)
            if response.status_code == 200:
                status = response.json()
                logger.debug(f"Status do Monitor: {status}")
                return status
        except Exception as e:
            logger.warning(f"Monitor API indisponível: {e}")

        return None

    def build_context_prompt(self, user_input):
        """Constrói contexto adicional baseado no status do sistema"""
        context = SYSTEM_PROMPT

        # Adiciona status do sistema se disponível
        status = self.get_system_status()
        if status:
            context += f"\n\nESTADO DO SISTEMA AGORA:\n"
            context += f"- Hora: {status.get('timestamp', 'desconhecido')}\n"
            context += f"- Projetos ativos: {status.get('active_projects', 0)}\n"

        return context

    def think(self, user_input, include_history=True):
        """
        Processa input do usuário e retorna resposta via Groq
        Args:
            user_input: str - o que o usuário disse
            include_history: bool - incluir histórico de conversa
        Returns:
            str - resposta do Groq
        """
        try:
            # Constrói contexto com status do sistema
            context = self.build_context_prompt(user_input)

            # Mantém histórico de conversa (máx 10 mensagens para economizar tokens)
            messages = []

            # Adiciona histórico se solicitado
            if include_history and self.conversation_history:
                messages.extend(self.conversation_history[-10:])

            # Adiciona mensagem do usuário
            messages.append({"role": "user", "content": user_input})

            logger.debug(f"Enviando para Groq ({self.model}): '{user_input}'")

            # Chama Groq com sistema prompt e histórico
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": context},
                    *messages
                ],
                max_tokens=150,
                temperature=0.7,
                timeout=10  # Groq é muito rápido
            )

            assistant_response = response.choices[0].message.content.strip()

            if not assistant_response:
                raise ValueError("Groq retornou resposta vazia")

            # Atualiza histórico
            if include_history:
                self.conversation_history.append({"role": "user", "content": user_input})
                self.conversation_history.append({"role": "assistant", "content": assistant_response})

                # Limita histórico a 50 mensagens
                if len(self.conversation_history) > 50:
                    self.conversation_history = self.conversation_history[-50:]

            logger.info(f"✅ Resposta: '{assistant_response[:100]}...'")
            return assistant_response

        except Exception as e:
            logger.error(f"Erro ao processar com Groq: {e}")
            return "Desculpa, tive um problema ao pensar. Tenta de novo?"

    def clear_history(self):
        """Limpa histórico de conversa"""
        self.conversation_history = []
        logger.info("Histórico de conversa limpo")

    def process_command(self, user_input):
        """
        Verifica se é um comando especial antes de enviar pro Groq
        Retorna (bool, str) - (é_comando, resposta)
        """
        user_lower = user_input.lower()

        # Comando: listar projetos ativos
        if "projetos ativos" in user_lower or "o que está rodando" in user_lower:
            status = self.get_system_status()
            if status:
                return True, f"Você tem {status.get('active_projects', 0)} projetos rodando agora"

        # Comando: limpar histórico
        if "limpa o histórico" in user_lower or "reseta a memória" in user_lower:
            self.clear_history()
            return True, "Histórico de conversa limpo"

        # Comando: status
        if "status" in user_lower and "como estou" in user_lower:
            status = self.get_system_status()
            if status:
                msg = f"Você está bem. Sistema rodando normalmente. {status.get('active_projects', 0)} projetos ativos."
                return True, msg

        # Não é comando especial
        return False, None


# ============================================================================
# OLLAMA BRAIN (Fallback)
# ============================================================================

class JarvisOllamaBrain:
    """Cérebro do Jarvis usando Ollama (Local, sem internet)"""

    def __init__(self):
        import requests
        from config import OLLAMA_URL, OLLAMA_MODEL, OLLAMA_TIMEOUT

        self.ollama_url = OLLAMA_URL
        self.model = OLLAMA_MODEL
        self.timeout = OLLAMA_TIMEOUT

        try:
            response = requests.get(f"{self.ollama_url}/api/tags", timeout=2)
            response.raise_for_status()
            logger.info(f"✅ Ollama conectado com sucesso em {self.ollama_url}")
            logger.info(f"✅ Modelo: {self.model}")
        except requests.exceptions.ConnectionError:
            raise ValueError(
                f"❌ Ollama não está rodando em {self.ollama_url}\n"
                f"   Execute: ollama serve\n"
                f"   Depois: ollama pull {self.model}"
            )
        except Exception as e:
            raise ValueError(f"❌ Erro ao conectar com Ollama: {e}")

        self.conversation_history = []

    def get_system_status(self):
        """Obtém status do GAMA_MONITOR para contexto"""
        if not MONITOR_ENABLED:
            return None

        try:
            import requests
            response = requests.get(f"{MONITOR_API_URL}/status", timeout=2)
            if response.status_code == 200:
                status = response.json()
                logger.debug(f"Status do Monitor: {status}")
                return status
        except Exception as e:
            logger.warning(f"Monitor API indisponível: {e}")

        return None

    def build_context_prompt(self, user_input):
        """Constrói contexto adicional baseado no status do sistema"""
        context = SYSTEM_PROMPT

        status = self.get_system_status()
        if status:
            context += f"\n\nESTADO DO SISTEMA AGORA:\n"
            context += f"- Hora: {status.get('timestamp', 'desconhecido')}\n"
            context += f"- Projetos ativos: {status.get('active_projects', 0)}\n"

        return context

    def think(self, user_input, include_history=True):
        """Processa input do usuário e retorna resposta via Ollama"""
        try:
            import requests

            context = self.build_context_prompt(user_input)

            if include_history:
                conversation = self.conversation_history[-10:] + [
                    {"role": "user", "content": user_input}
                ]
            else:
                conversation = [{"role": "user", "content": user_input}]

            logger.debug(f"Enviando para Ollama ({self.model}): '{user_input}'")

            full_prompt = self._format_prompt(context, conversation)

            response = requests.post(
                f"{self.ollama_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": full_prompt,
                    "stream": False,
                    "temperature": 0.7
                },
                timeout=self.timeout
            )

            response.raise_for_status()
            result = response.json()
            assistant_response = result.get("response", "").strip()

            if not assistant_response:
                raise ValueError("Ollama retornou resposta vazia")

            if include_history:
                self.conversation_history.append({"role": "user", "content": user_input})
                self.conversation_history.append({"role": "assistant", "content": assistant_response})

                if len(self.conversation_history) > 50:
                    self.conversation_history = self.conversation_history[-50:]

            logger.info(f"✅ Resposta: '{assistant_response[:100]}...'")
            return assistant_response

        except requests.exceptions.ConnectionError:
            logger.error("Ollama desconectado. Execute: ollama serve")
            return "Desculpa, Ollama não está respondendo. Tenta rodar: ollama serve"
        except requests.exceptions.Timeout:
            logger.error(f"Timeout na resposta do Ollama (>{self.timeout}s)")
            return "Desculpa, Ollama demorou muito. Tenta de novo?"
        except Exception as e:
            logger.error(f"Erro ao processar com Ollama: {e}")
            return "Desculpa, tive um problema ao pensar. Tenta de novo?"

    def _format_prompt(self, system_context, conversation):
        """Formata prompt para Ollama"""
        prompt = f"{system_context}\n\n"

        for msg in conversation:
            role = msg["role"].upper()
            content = msg["content"]
            prompt += f"{role}: {content}\n"

        prompt += "ASSISTANT: "
        return prompt

    def clear_history(self):
        """Limpa histórico de conversa"""
        self.conversation_history = []
        logger.info("Histórico de conversa limpo")

    def process_command(self, user_input):
        """Verifica se é um comando especial"""
        user_lower = user_input.lower()

        if "projetos ativos" in user_lower or "o que está rodando" in user_lower:
            status = self.get_system_status()
            if status:
                return True, f"Você tem {status.get('active_projects', 0)} projetos rodando agora"

        if "limpa o histórico" in user_lower or "reseta a memória" in user_lower:
            self.clear_history()
            return True, "Histórico de conversa limpo"

        if "status" in user_lower and "como estou" in user_lower:
            status = self.get_system_status()
            if status:
                msg = f"Você está bem. Sistema rodando normalmente. {status.get('active_projects', 0)} projetos ativos."
                return True, msg

        return False, None


# ============================================================================
# FACTORY & LAZY LOADING
# ============================================================================

_brain_instance = None

def get_brain():
    """Factory que escolhe o backend correto e retorna instância lazy"""
    global _brain_instance
    if _brain_instance is None:
        if BRAIN_BACKEND == "groq":
            logger.info("🚀 Usando Groq API (rápido, gratuito, cloud)")
            _brain_instance = JarvisGroqBrain()
        else:
            logger.info("💻 Usando Ollama (local, offline)")
            _brain_instance = JarvisOllamaBrain()
    return _brain_instance


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    brain = get_brain()

    # Teste simples
    response = brain.think("Qual é a capital do Brasil?")
    print(f"Resposta: {response}")

    # Teste com histórico
    response2 = brain.think("E qual é o maior estado?")
    print(f"Resposta 2: {response2}")
