-- Migration 016: Adicionar coluna role à tabela profiles

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin', 'master'));

-- Atualizar o usuário ADMIN para MASTER
UPDATE public.profiles 
SET role = 'master'
WHERE id = '00662266-db06-41d4-b237-95062bfb6b06';

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

COMMIT;
