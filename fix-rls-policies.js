#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnphnhlrvujhqeamszha.supabase.co';
// Use service role key for RLS management (usually only available in Node/backend)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'VOCÊ_PRECISA_CONFIGURAR_SERVICE_ROLE_KEY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixRLSPolicies() {
  console.log('🔧 Ferramenta de Configuração de RLS Policies\n');
  console.log('='.repeat(70));

  if (supabaseServiceKey === 'VOCÊ_PRECISA_CONFIGURAR_SERVICE_ROLE_KEY') {
    console.log('\n⚠️  ATENÇÃO: Service Role Key não configurada!');
    console.log('\nPara executar este script, você precisa:');
    console.log('1. Ir ao Supabase Dashboard → Project Settings → API');
    console.log('2. Copiar a "service_role" key (a principal secreta)');
    console.log('3. Exportar a variável de ambiente:');
    console.log('   export SUPABASE_SERVICE_ROLE_KEY="sua_chave_aqui"');
    console.log('4. Então rodar este script novamente\n');
    console.log('Alternativamente, você pode executar este SQL manualmente no Supabase SQL Editor:\n');
    console.log(getSQLFix());
    return;
  }

  try {
    // This would require service role - not available with anon key
    console.log('Este script requer a service_role key do Supabase.\n');
    console.log('Por favor execute o SQL abaixo manualmente no Supabase Dashboard:\n');
    console.log(getSQLFix());
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

function getSQLFix() {
  return `
-- ========== FIX: RLS POLICIES PARA TABELA PROFILES ==========

-- 1. Verificar status RLS atual
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- 2. Listar policies existentes
SELECT policyname, permissive, roles, cmd FROM pg_policies WHERE tablename = 'profiles';

-- 3. REMOVER policies existentes (se necessário)
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable profile creation on sign up" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for users" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.profiles;

-- 4. GARANTIR que RLS está HABILITADO
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. CRIAR policies corretas

-- Policy: Usuários podem LER seu próprio perfil
CREATE POLICY "Users can read their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Policy: Usuários podem ATUALIZAR seu próprio perfil
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Usuários podem INSERIR seu próprio perfil (durante signup)
CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- 6. VERIFICAR result
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY cmd, policyname;
`;
}

fixRLSPolicies();
