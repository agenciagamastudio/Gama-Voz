#!/usr/bin/env node

const projectId = 'qnphnhlrvujhqeamszha';
const anonKey = 'sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucGhuaGxydnVqaHFlYW1zemhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcxMjAyNCwiZXhwIjoyMDg3Mjg4MDI0fQ.aV1pHaocb0EGeMhuV5aWvVF5aR_9vwQv3X9Bh0I1oCk';
const adminId = '00662266-db06-41d4-b237-95062bfb6b06';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

try {
  console.log(`🔄 Verificando e configurando ADMIN...`);
  
  // Tentar atualizar o perfil via PATCH (se coluna role existir)
  console.log(`\n1️⃣ Tentando atualizar role via PATCH...`);
  const patchResponse = await fetch(
    `https://${projectId}.supabase.co/rest/v1/profiles?id=eq.${adminId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ role: 'master' })
    }
  );

  console.log(`   Status: ${patchResponse.status}`);

  if (patchResponse.status === 204) {
    console.log(`   ✅ Role atualizado para MASTER!`);
  } else if (patchResponse.status === 400) {
    console.log(`   ⚠️ Coluna 'role' não existe ainda`);
    console.log(`   \n   Você precisa executar este SQL manualmente:`);
    console.log(`   `);
    console.log(`   ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';`);
    console.log(`   UPDATE public.profiles SET role = 'master' WHERE id = '${adminId}';`);
    console.log(`   `);
    console.log(`   Link: https://app.supabase.com/project/qnphnhlrvujhqeamszha/sql`);
    process.exit(1);
  } else {
    const text = await patchResponse.text();
    console.log(`   Response: ${text}`);
  }

  // Verificar perfil
  console.log(`\n2️⃣ Verificando perfil do ADMIN...`);
  const getResponse = await fetch(
    `https://${projectId}.supabase.co/rest/v1/profiles?id=eq.${adminId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      }
    }
  );

  const profile = await getResponse.json();
  console.log(`   ✅ Perfil encontrado!`);
  console.log(`   📧 Email: prontoatendimentogama@gmail.com`);
  console.log(`   👤 Username: ${profile[0]?.username}`);
  console.log(`   🎯 Role: ${profile[0]?.role || 'não configurado'}`);

  console.log(`\n3️⃣ Testando acesso à página...`);
  console.log(`   🌐 Abra: http://localhost:5174/admin`);
  console.log(`   `);
  console.log(`   Se der erro "ACESSO NEGADO", execute o SQL acima.`);
  console.log(`   `);

} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}
