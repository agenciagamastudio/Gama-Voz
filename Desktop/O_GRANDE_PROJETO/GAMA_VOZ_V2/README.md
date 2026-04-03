# 🎤 Gama Voz v2.0

**Grave. Transcreva. Pronto.**

Interface Streamlit minimalista para transcrever áudio com Groq Whisper (GRÁTIS!).

---

## 🚀 Como usar (30 segundos)

### 1️⃣ Instalar dependências
```bash
pip install -r requirements.txt
```

### 2️⃣ Adicionar API key
Edite `.streamlit/secrets.toml` e adicione:
```toml
GROQ_API_KEY = "gsk-seu-token-aqui"
```

### 3️⃣ Rodar
```bash
streamlit run app.py
```

Abre automaticamente em: `http://localhost:8501`

---

## 🎯 O que faz

✅ **Gravar áudio** — Clique e fale direto no navegador  
✅ **Transcrever** — Groq Whisper (real, GRÁTIS, RÁPIDO!)  
✅ **Histórico** — Salva em JSON automático  
✅ **Exportar** — TXT, JSON, SRT  
✅ **Deletar** — Remove do histórico  

---

## 📁 Estrutura

```
gama-voz-v2/
├── app.py                    (aplicação inteira)
├── requirements.txt          (dependências)
├── .streamlit/
│   └── secrets.toml         (API key)
└── gama-voz-history.json    (histórico automático)
```

---

## ⚙️ Configuração

### Onde pegar API key Groq?
1. Vá para https://console.groq.com
2. Faça login/signup (grátis)
3. Crie uma nova API key
4. Cole em `.streamlit/secrets.toml`

### Ou use variável de ambiente:
```bash
export GROQ_API_KEY="gsk-seu-token"
streamlit run app.py
```

---

## 💰 Custo

- **GRÁTIS!** Groq oferece uso gratuito
- Sem limite de crédito (enquanto não ficarem sobrecarregados)
- Bem mais rápido que OpenAI
- Perfeito para uso pessoal/pequeno

---

## 🐛 Troubleshooting

**"GROQ_API_KEY não configurada"**
→ Verifique `.streamlit/secrets.toml`

**"Erro ao transcrever"**
→ Confira sua API key em https://console.groq.com/keys
→ Certifique-se que a chave está ativa

**Áudio não está gravando**
→ Certifique-se que o navegador tem permissão de microfone
→ Funciona em Chrome, Firefox, Edge (não Safari em HTTP)

---

## 📝 Próximas ideias (opcionais)

- [ ] Interface com tema Gama (verde #88CE11)
- [ ] Suporte a múltiplos idiomas
- [ ] Banco de dados em vez de JSON
- [ ] Deploy em Streamlit Cloud (gratuito)

---

**Pronto? Só rodar!** 🚀
