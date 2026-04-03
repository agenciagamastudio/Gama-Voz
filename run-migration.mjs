import fs from 'fs';
import https from 'https';

const SUPABASE_URL = 'https://qnphnhlrvujhqeamszha.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucGhuaGxydnVqaHFlYW1zemhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcxMjAyNCwiZXhwIjoyMDg3Mjg4MDI0fQ.aV1pHaocb0EGeMhuV5aWvVF5aR_9vwQv3X9Bh0I1oCk';

function makeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'qnphnhlrvujhqeamszha.supabase.co',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runMigration() {
  console.log('🚀 Executando migração user_achievements...\n');

  try {
    const sql = fs.readFileSync('docs/migrations/create-user-achievements-table.sql', 'utf-8');
    
    console.log('📤 Enviando SQL para Supabase...');
    const response = await makeRequest('POST', '/rest/v1/rpc/exec_sql', { sql });

    if (response.status === 200 || response.status === 201) {
      console.log('✅ SQL enviado com sucesso!');
    } else {
      console.log(`⚠️  Status: ${response.status}`);
      console.log('Resposta:', response.data);
    }

    // Aguarda 2s e verifica
    await new Promise(r => setTimeout(r, 2000));

    console.log('\n✅ Verificando tabela...');
    const check = await makeRequest('GET', '/rest/v1/user_achievements?limit=0', null);

    if (check.status === 200) {
      console.log('✅✅✅ SUCESSO! Tabela criada!');
    } else {
      console.log('⚠️  Tabela pode estar em processo de criação');
      console.log('Status:', check.status);
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

runMigration();
