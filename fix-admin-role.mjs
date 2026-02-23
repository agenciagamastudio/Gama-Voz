#!/usr/bin/env node

const projectId = 'qnphnhlrvujhqeamszha';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucGhuaGxydnVqaHFlYW1zemhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcxMjAyNCwiZXhwIjoyMDg3Mjg4MDI0fQ.aV1pHaocb0EGeMhuV5aWvVF5aR_9vwQv3X9Bh0I1oCk';

try {
  console.log(`🔄 Atualizando role do ADMIN para MASTER...`);
  
  const response = await fetch(
    `https://${projectId}.supabase.co/rest/v1/profiles?id=eq.00662266-db06-41d4-b237-95062bfb6b06`,
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

  if (response.status === 204 || response.status === 200) {
    console.log(`✅ Role atualizado para MASTER!`);
    console.log(`\n🎉 Agora você pode acessar:`)
    console.log(`   http://localhost:5174/admin`);
    console.log(`\n📊 Funcionalidades desbloqueadas:`);
    console.log(`   ✓ Criar Moderadores`);
    console.log(`   ✓ Gerenciar Permissões`);
    console.log(`   ✓ Injetar Pontos`);
    console.log(`   ✓ Backup de Dados`);
  } else {
    console.log(`⚠️ Status: ${response.status}`);
    const text = await response.text();
    console.log(`${text}`);
  }
} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}
