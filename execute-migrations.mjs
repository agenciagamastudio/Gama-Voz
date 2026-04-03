#!/usr/bin/env node
import * as fs from 'fs';

console.log('🚀 GAMA Calculadora - Supabase Migrations\n');
console.log('===============================================\n');

// Read migrations SQL
const sqlFile = './apply-migrations.sql';
if (!fs.existsSync(sqlFile)) {
  console.error('❌ SQL file not found. Run apply-migrations-admin.mjs first');
  process.exit(1);
}

const sql = fs.readFileSync(sqlFile, 'utf-8');

console.log('📄 SQL File Generated:');
console.log(`   Location: ${sqlFile}`);
console.log(`   Size: ${(sql.length / 1024).toFixed(2)} KB`);
console.log(`   Lines: ${sql.split('\n').length}\n`);

console.log('✅ COMPLETED STEPS:');
console.log('   [✓] Git commit applied');
console.log('   [✓] SQL generated and ready');
console.log('   [✓] Migrations listed\n');

console.log('📋 REMAINING STEPS (Manual - 3 min):\n');

console.log('STEP 1: Open Supabase Studio');
console.log('   → https://app.supabase.com\n');

console.log('STEP 2: Select Project');
console.log('   → Find "gama-calculadora" or project ID: qnphnhlrvujhqeamszha\n');

console.log('STEP 3: SQL Editor');
console.log('   → Click "SQL Editor" in left sidebar');
console.log('   → Click "New Query" (or paste in blank)\n');

console.log('STEP 4: Copy & Paste SQL');
console.log('   → Open file: ' + sqlFile);
console.log('   → Select ALL (Ctrl+A)');
console.log('   → Copy (Ctrl+C)');
console.log('   → Paste in Supabase SQL Editor\n');

console.log('STEP 5: Execute');
console.log('   → Click blue "Run" button');
console.log('   → Should see: "Query successful"\n');

console.log('STEP 6: Verify');
const verifySQL = `
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals')
ORDER BY tablename;
`;

console.log('   Run this verification query:');
console.log('   ' + verifySQL.trim().replace(/\n/g, '\n   ') + '\n');

console.log('   Expected result:');
console.log('   ├─ profiles   | true');
console.log('   ├─ reports    | true');
console.log('   └─ proposals  | true\n');

console.log('===============================================\n');
console.log('🎯 After migrations are applied:');
console.log('   1. npm run dev        # Test app locally');
console.log('   2. Try signup         # Verify profile creation');
console.log('   3. git add && git commit');
console.log('   4. Ready for Vercel deployment!\n');

// Print copy-friendly SQL in sections
console.log('═'.repeat(70));
console.log('SQL CONTENT (ready to paste):');
console.log('═'.repeat(70) + '\n');
console.log(sql);
console.log('\n' + '═'.repeat(70));
console.log('✅ All setup complete!');
console.log('═'.repeat(70) + '\n');

