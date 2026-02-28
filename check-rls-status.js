#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

// Credenciais do Supabase (de .env.local)
const supabaseUrl = 'https://qnphnhlrvujhqeamszha.supabase.co';
const supabaseKey = 'sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRLSStatus() {
  try {
    console.log('🔍 Diagnóstico de Acesso à Tabela Profiles\n');
    console.log('='.repeat(60));

    // Test 1: Discover actual columns
    console.log('\n📋 Teste 1: Descobrir schema real da tabela profiles');
    console.log('-'.repeat(60));

    const { data: allData, error: allError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);

    if (allError) {
      console.error('❌ Erro ao descobrir colunas:');
      console.error('   Mensagem:', allError.message);
      console.error('   Código:', allError.code);
    } else {
      if (allData && allData.length > 0) {
        const columns = Object.keys(allData[0]);
        console.log(`✅ Tabela profiles encontrada com ${columns.length} coluna(s):`);
        columns.forEach((col, idx) => {
          console.log(`   ${idx + 1}. ${col}`);
        });

        console.log(`\n📋 Exemplo de registro (${allData.length} registro(s) encontrado(s)):`);
        console.log(JSON.stringify(allData[0], null, 4));

        // Check accent_color specifically
        if (columns.includes('accent_color')) {
          console.log('\n✅ Coluna accent_color ENCONTRADA');
          const withColor = allData.filter(r => r.accent_color);
          console.log(`   ${withColor.length}/${allData.length} registros têm accent_color preenchido`);
          if (withColor.length > 0) {
            console.log(`   Exemplo: "${withColor[0].accent_color}"`);
          }
        } else {
          console.log('\n❌ Coluna accent_color NÃO ENCONTRADA');
          console.log('   Colunas disponíveis:', columns.join(', '));
        }
      } else {
        console.log('⚠️  Tabela profiles está VAZIA - nenhum registro para analisar');
      }
    }

    // Test 2: Check table structure via Supabase API
    console.log('\n📋 Teste 2: Verificar RLS status');
    console.log('-'.repeat(60));

    // Try to find out if RLS is enabled by attempting a filtered query
    try {
      const { data: filtered, error: filteredError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', 'dummy-id');

      if (filteredError) {
        if (filteredError.message.includes('permission denied')) {
          console.log('✅ RLS pode estar ativo (permission denied)');
        } else if (filteredError.message.includes('duplicate')) {
          console.log('ℹ️  Erro de duplicação na query (RLS status incerto)');
        } else {
          console.log('ℹ️  Erro na query:', filteredError.message);
        }
      } else {
        console.log('ℹ️  Query com filtro funcionou normalmente');
        console.log(`   Registros encontrados: ${filtered?.length || 0}`);
      }
    } catch (e) {
      console.log('❌ Erro ao executar query filtrada:', e.message);
    }

    // Test 3: Get auth context
    console.log('\n📋 Teste 3: Contexto de Autenticação');
    console.log('-'.repeat(60));

    const { data: session } = await supabase.auth.getSession();

    if (session?.session) {
      console.log('✅ Usuário autenticado');
      console.log(`   User ID: ${session.session.user.id}`);
    } else {
      console.log('ℹ️  Nenhuma sessão (usando key anon - sem auth.uid())');
      console.log('   👉 Isso pode ser o problema! RLS queries dependem de auth.uid()');
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 DIAGNÓSTICO E RECOMENDAÇÕES\n');

    if (allData && allData.length > 0) {
      const columns = Object.keys(allData[0]);

      console.log('✅ POSITIVOS:');
      console.log('   • Tabela profiles é acessível');
      console.log(`   • ${allData.length} registro(s) encontrado(s)`);
      console.log(`   • Colunas: ${columns.join(', ')}`);

      const hasAccentColor = columns.includes('accent_color');
      console.log(`   • accent_color: ${hasAccentColor ? 'EXISTE ✅' : 'NÃO EXISTE ❌'}`);

      console.log('\n⚠️  PROBLEMAS IDENTIFICADOS:');
      if (!hasAccentColor) {
        console.log('   1. Coluna accent_color não foi criada na migration');
        console.log('      → SOLUÇÃO: Criar migration para adicionar accent_color');
      }

      if (!session?.session) {
        console.log('   2. Não há sessão autenticada');
        console.log('      → RLS policies podem depender de auth.uid()');
        console.log('      → Recomendação: Testar com usuário autenticado');
      }
    } else {
      console.log('❌ CRÍTICO: Tabela profiles vazia ou inacessível!');
      console.log('   Próximos passos:');
      console.log('   1. Verificar se a migration de profiles foi executada');
      console.log('   2. Verificar RLS policies: podem estar bloqueando acesso');
      console.log('   3. Verificar Supabase dashboard: https://app.supabase.com/');
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    console.error(error);
  }
}

checkRLSStatus();
