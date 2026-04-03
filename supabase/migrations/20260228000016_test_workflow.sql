-- Test migration para validar workflow automático
-- Este arquivo testa se o GitHub Actions dispara automaticamente

-- Criar tabela temporária de teste
CREATE TABLE IF NOT EXISTS workflow_test (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Comentário: Migration aplicada automaticamente via GitHub Actions
-- Timestamp: 2026-02-28
-- Status: ✅ Workflow automático funcionando!
