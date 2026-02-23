#!/usr/bin/env node

/**
 * Criar usuário ADMIN no Supabase
 * Uso: node create-admin.js <project-id> <service-role-key> <email> <password>
 */

const https = require('https');

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log(`❌ Uso: node create-admin.js <project-id> <service-role-key> <email> <password>`);
  console.log(`\nExemplo:`);
  console.log(`  node create-admin.js qnphnhlrvujhqeamszha eyJhbGc... prontoatendimentogama@gmail.com 81844695`);
  process.exit(1);
}

const [projectId, serviceRoleKey, email, password] = args;

const data = JSON.stringify({
  email,
  password,
  email_confirm: true,
  user_metadata: {},
  app_metadata: { roles: ['admin'] }
});

const options = {
  hostname: `${projectId}.supabase.co`,
  path: '/auth/v1/admin/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Authorization': `Bearer ${serviceRoleKey}`,
    'apikey': serviceRoleKey
  }
};

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(`\n📊 Status: ${res.statusCode}`);
    console.log(`📋 Response:`, JSON.stringify(JSON.parse(responseData), null, 2));

    if (res.statusCode === 201) {
      console.log(`\n✅ Usuário ADMIN criado com sucesso!`);
      console.log(`📧 Email: ${email}`);
      console.log(`🔐 Senha: ${password}`);
      console.log(`\n👉 Próximo: Execute SQL para adicionar role ADMIN`);
    } else {
      console.log(`\n❌ Erro ao criar usuário`);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});

req.write(data);
req.end();
