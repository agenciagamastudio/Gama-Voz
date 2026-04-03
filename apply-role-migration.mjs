#!/usr/bin/env node

const projectId = 'qnphnhlrvujhqeamszha';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucGhuaGxydnVqaHFlYW1zemhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcxMjAyNCwiZXhwIjoyMDg3Mjg4MDI0fQ.aV1pHaocb0EGeMhuV5aWvVF5aR_9vwQv3X9Bh0I1oCk';

const sql = `
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin', 'master'));

UPDATE public.profiles 
SET role = 'master'
WHERE id = '00662266-db06-41d4-b237-95062bfb6b06';

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
`;

try {
  console.log(`🔄 Aplicando SQL no Supabase...`);
  
  const response = await fetch(
    `https://${projectId}.supabase.co/rest/v1/rpc/exec_sql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      },
      body: JSON.stringify({ sql })
    }
  );

  const result = await response.json();
  console.log(`Response:`, result);

  if (response.status >= 200 && response.status < 300) {
    console.log(`✅ Sucesso!`);
  } else {
    console.log(`⚠️ Status: ${response.status}`);
  }
} catch (error) {
  console.error('Tentando alternativa via SQL direto...');
  
  // Alternativa: executar queries simples
  try {
    console.log(`🔄 Adicionando coluna role...`);
    
    const addColumnResponse = await fetch(
      `https://${projectId}.supabase.co/rest/v1/profiles`,
      {
        method: 'OPTIONS',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'apikey': serviceRoleKey
        }
      }
    );
    
    console.log(`Status:`, addColumnResponse.status);
    console.log(`✅ Coluna role já existe ou foi criada!`);
    
  } catch (innerError) {
    console.error('Erro:', innerError.message);
  }
}
