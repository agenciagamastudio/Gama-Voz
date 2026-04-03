#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnphnhlrvujhqeamszha.supabase.co';
const supabaseKey = 'sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUserProfile() {
  try {
    console.log('🔍 Verificando perfis na tabela profiles\n');
    console.log('='.repeat(70));

    // Get all profiles with their IDs
    const { data: allProfiles, error: allError } = await supabase
      .from('profiles')
      .select('id, full_name, accent_color, role, updated_at')
      .order('updated_at', { ascending: false });

    if (allError) {
      console.error('❌ Erro ao buscar profiles:', allError.message);
      return;
    }

    console.log(`\n📋 Total de registros: ${allProfiles.length}\n`);

    allProfiles.forEach((profile, idx) => {
      console.log(`${idx + 1}. ID: ${profile.id}`);
      console.log(`   Nome: ${profile.full_name || '(vazio)'}`);
      console.log(`   Cor: ${profile.accent_color || '(vazio)'}`);
      console.log(`   Role: ${profile.role}`);
      console.log(`   Atualizado: ${profile.updated_at || '(nunca)'}`);
      console.log();
    });

    // Check specific user
    const userId = '00662266-db06-41d4-b237-95062bfb6b06';
    console.log('='.repeat(70));
    console.log(`\n🔍 Procurando perfil do usuário: ${userId}\n`);

    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (userError) {
      console.error('❌ Erro na query:', userError.message);
    } else if (userProfile) {
      console.log('✅ PERFIL ENCONTRADO:');
      console.log(JSON.stringify(userProfile, null, 2));
    } else {
      console.log('❌ PERFIL NÃO ENCONTRADO!');
      console.log(`   Usuário ${userId} não tem registro na tabela profiles`);
      console.log('\n💡 POSSÍVEIS CAUSAS:');
      console.log('   1. A trigger que cria profiles não foi executada durante signup');
      console.log('   2. RLS policy está bloqueando a leitura');
      console.log('   3. Perfil foi deletado por acidente');
      console.log('\n🔧 SOLUÇÃO:');
      console.log('   Executar: INSERT INTO profiles (id) VALUES (\'' + userId + '\');');
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

checkUserProfile();
