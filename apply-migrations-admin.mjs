#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env
const envFile = fs.readFileSync('.env', 'utf-8');
const envLines = envFile.split('\n');
const env = {};
envLines.forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    env[key] = valueParts.join('=');
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing env vars');
  process.exit(1);
}

// Extract project from URL
const projectId = supabaseUrl.split('.')[0].replace('https://', '');
console.log(`🔗 Connecting to Supabase project: ${projectId}`);
console.log(`📍 URL: ${supabaseUrl}\n`);

// Read migration files
const migrationsDir = './supabase/migrations';
const migrations = [
  '20260222000014_audit_fixes.sql',
  '20260223000016_add_role_to_profiles.sql'
];

console.log('📋 Migrations to apply:');
migrations.forEach((m, i) => console.log(`  ${i + 1}. ${m}`));
console.log();

// Summarize what will happen
console.log('✅ Expected changes:');
console.log('  • RLS enabled on profiles table');
console.log('  • RLS policies created (read/update/delete)');
console.log('  • Soft-delete filters added to RLS (reports/proposals)');
console.log('  • Auto-profile creation trigger ensured');
console.log('  • Role column added to profiles');
console.log();

console.log('📌 Next step:');
console.log('  Since CLI requires authentication, you have two options:\n');

console.log('OPTION A: Via Supabase Studio (Recommended - 3 min)');
console.log('  1. Open: https://app.supabase.com');
console.log('  2. Project: gama-calculadora (or find by URL)');
console.log('  3. Go to: SQL Editor');
console.log('  4. New Query → Paste SQL below → Run\n');

// Read and display SQL
let fullSQL = '-- ============================================================\n';
fullSQL += '-- APPLY THESE MIGRATIONS IN SUPABASE STUDIO\n';
fullSQL += '-- ============================================================\n\n';

migrations.forEach(migFile => {
  const migPath = path.join(migrationsDir, migFile);
  if (fs.existsSync(migPath)) {
    const content = fs.readFileSync(migPath, 'utf-8');
    fullSQL += `\n-- ${migFile}\n`;
    fullSQL += '-- ' + '='.repeat(60) + '\n';
    fullSQL += content + '\n';
  }
});

console.log('═'.repeat(70));
console.log('SQL TO EXECUTE:');
console.log('═'.repeat(70));
console.log(fullSQL);
console.log('═'.repeat(70));

// Save to file
const sqlFile = './apply-migrations.sql';
fs.writeFileSync(sqlFile, fullSQL);
console.log(`\n✅ SQL saved to: ${sqlFile}`);

console.log('\nOPTION B: Via CLI (Requires Login)');
console.log('  1. supabase login');
console.log('  2. supabase link --project-ref ' + projectId);
console.log('  3. supabase db push\n');

console.log('💡 What to do next:');
console.log('  1. Choose Option A or B');
console.log('  2. After migrations apply, test: npm run dev');
console.log('  3. Try signup → should create profile with RLS');
console.log('  4. Commit: git add && git commit\n');

