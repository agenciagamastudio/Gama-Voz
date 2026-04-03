import https from 'https';
import fs from 'fs';

const SUPABASE_URL = 'qnphnhlrvujhqeamszha.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucGhuaGxydnVqaHFlYW1zemhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcxMjAyNCwiZXhwIjoyMDg3Mjg4MDI0fQ.aV1pHaocb0EGeMhuV5aWvVF5aR_9vwQv3X9Bh0I1oCk';

function makeRequest(path, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const options = {
      hostname: SUPABASE_URL,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('🚀 Executando migração Supabase...\n');

  try {
    const sql = fs.readFileSync('docs/migrations/create-user-achievements-table.sql', 'utf-8');
    console.log('✅ SQL carregado, tentando executar via API...\n');

    const result = await makeRequest('/rest/v1/rpc/exec_sql', { sql });
    console.log(`Status: ${result.status}`);
    
    if (result.status === 200 || result.status === 201) {
      console.log('✅✅✅ MIGRAÇÃO EXECUTADA COM SUCESSO!');
    } else if (result.status === 404) {
      console.log('⚠️  RPC não existe (esperado). Usando alternativa...');
      // RPC não existe, vamos verificar manualmente se tabela existe
      const checkResult = await makeRequest('/rest/v1/user_achievements', {});
      if (checkResult.status === 404) {
        console.log('⚠️  Tabela não encontrada ainda');
      } else {
        console.log('✅ Tabela está acessível!');
      }
    }
    
    console.log('\nResposta:', result.body.substring(0, 300));
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

run();
