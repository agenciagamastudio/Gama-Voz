-- Script para verificar e corrigir RLS policies na tabela profiles

-- 1. Verificar se RLS está habilitado
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'profiles';

-- 2. Listar todas as policies na tabela profiles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check,
  cmd
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY cmd, policyname;

-- 3. Policy ideal para ler o próprio perfil (SELECT)
-- Se não existir, criar:
-- CREATE POLICY "Users can read their own profile"
-- ON public.profiles
-- FOR SELECT
-- USING (auth.uid() = id);

-- 4. Policy ideal para atualizar o próprio perfil (UPDATE)
-- Se não existir, criar:
-- CREATE POLICY "Users can update their own profile"
-- ON public.profiles
-- FOR UPDATE
-- USING (auth.uid() = id)
-- WITH CHECK (auth.uid() = id);
