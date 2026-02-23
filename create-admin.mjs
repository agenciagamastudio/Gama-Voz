#!/usr/bin/env node

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log(`❌ Uso: node create-admin.mjs <project-id> <service-role-key> <email> <password>`);
  process.exit(1);
}

const [projectId, serviceRoleKey, email, password] = args;

const data = {
  email,
  password,
  email_confirm: true,
  user_metadata: {},
  app_metadata: { roles: ['admin'] }
};

try {
  console.log(`🔄 Criando usuário ${email}...`);
  
  const response = await fetch(`https://${projectId}.supabase.co/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceRoleKey}`,
      'apikey': serviceRoleKey
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  
  console.log(`\n📊 Status: ${response.status}`);
  
  if (response.status === 201) {
    console.log(`✅ Usuário criado com sucesso!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔐 Senha: ${password}`);
    console.log(`👤 ID: ${result.user.id}`);
    console.log(`\n👉 Próximo: Testar login em http://localhost:5174/login`);
  } else {
    console.log(`❌ Erro: ${result.message || JSON.stringify(result)}`);
  }
} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}
