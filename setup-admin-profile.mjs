#!/usr/bin/env node

const projectId = 'qnphnhlrvujhqeamszha';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucGhuaGxydnVqaHFlYW1zemhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcxMjAyNCwiZXhwIjoyMDg3Mjg4MDI0fQ.aV1pHaocb0EGeMhuV5aWvVF5aR_9vwQv3X9Bh0I1oCk';
const adminId = '00662266-db06-41d4-b237-95062bfb6b06';

try {
  console.log(`🔄 Criando perfil do ADMIN...`);
  
  // Criar perfil
  const profileResponse = await fetch(
    `https://${projectId}.supabase.co/rest/v1/profiles`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        id: adminId,
        username: 'Admin',
        full_name: 'Administrador GAMA',
        avatar_url: null,
        website: null,
        accent_color: '#3b82f6',
        role: 'admin'
      })
    }
  );

  if (profileResponse.status === 201 || profileResponse.status === 200) {
    console.log(`✅ Perfil criado!`);
  } else {
    const error = await profileResponse.text();
    console.log(`⚠️ Perfil (status ${profileResponse.status}): ${error}`);
  }

  // Criar user_points
  console.log(`🔄 Adicionando créditos...`);
  
  const pointsResponse = await fetch(
    `https://${projectId}.supabase.co/rest/v1/user_points`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        user_id: adminId,
        balance: 100,
        last_recharged: new Date().toISOString()
      })
    }
  );

  if (pointsResponse.status === 201 || pointsResponse.status === 200) {
    console.log(`✅ Créditos adicionados (100 pontos)!`);
  } else {
    const error = await pointsResponse.text();
    console.log(`⚠️ Créditos (status ${pointsResponse.status}): ${error}`);
  }

  console.log(`\n🎉 ADMIN ACCOUNT PRONTO!`);
  console.log(`\n📧 Email: prontoatendimentogama@gmail.com`);
  console.log(`🔐 Senha: 81844695`);
  console.log(`👤 Acesso: ADMIN (full)`);
  console.log(`💰 Créditos: 100`);
  
  console.log(`\n👉 Próximo: Testar login em http://localhost:5174/login`);
  
} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}
