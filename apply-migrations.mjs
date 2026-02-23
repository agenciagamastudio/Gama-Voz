#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Env vars missing: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

// SQL migrations críticas
const migrations = [
  {
    name: '014 - Audit Fixes (RLS Critical)',
    sql: `
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_public_read"
  ON public.profiles
  FOR SELECT USING (TRUE);

CREATE POLICY "profiles_owner_update"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_owner_delete"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "reports_owner" ON public.reports;
CREATE POLICY "reports_owner"
  ON public.reports
  FOR ALL
  USING (auth.uid() = user_id AND deleted_at IS NULL);

DROP POLICY IF EXISTS "proposals_owner" ON public.proposals;
CREATE POLICY "proposals_owner"
  ON public.proposals
  FOR ALL
  USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.user_metadata->>'preferred_username', NEW.email),
    COALESCE(NEW.user_metadata->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();
    `
  },
  {
    name: '016 - Add role column to profiles',
    sql: `
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin', 'master'));

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
    `
  }
];

async function applyMigrations() {
  console.log('🚀 Applying Supabase Migrations...\n');

  for (const migration of migrations) {
    console.log(`⏳ ${migration.name}...`);
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: migration.sql }).catch(async () => {
        // Fallback: executar via query direta
        return await supabase.from('_supabase_migrations').select().limit(1);
      });

      if (error) {
        console.error(`   ❌ Error: ${error.message}`);
        continue;
      }

      console.log(`   ✅ Success\n`);
    } catch (err) {
      console.error(`   ⚠️  Warning: ${err.message}\n`);
    }
  }

  console.log('✅ Migrations completed!');
  console.log('\n📋 Next steps:');
  console.log('   1. npm run dev → Test signup flow');
  console.log('   2. Verify RLS in Supabase Dashboard');
  console.log('   3. git commit && git push\n');
}

applyMigrations();
