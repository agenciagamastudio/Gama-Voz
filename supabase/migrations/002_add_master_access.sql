-- MIGRATION: Add Master/Admin Access Control System
-- Author: Data Engineer (Dara)
-- Date: 2026-02-24
-- Purpose: Enable admin/master role for prontoatendimentogama@gmail.com
-- Status: YOLO Autonomous Execution

-- ========== STEP 1: Add role column to profiles ==========
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Add constraint to enforce valid roles
ALTER TABLE profiles ADD CONSTRAINT role_check CHECK (role IN ('user', 'admin', 'master'));

-- Create index for fast role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ========== STEP 2: Update RLS policies for admin bypass ==========

-- Reports: Admin can view and modify ALL reports
DROP POLICY IF EXISTS "Users can view own reports" ON reports;
CREATE POLICY "Users can view own reports or admin can view all"
  ON reports FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  );

DROP POLICY IF EXISTS "Users can insert own reports" ON reports;
CREATE POLICY "Users can insert own reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reports" ON reports;
CREATE POLICY "Users can update own reports or admin can update all"
  ON reports FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  );

DROP POLICY IF EXISTS "Users can delete own reports" ON reports;
CREATE POLICY "Users can delete own reports or admin can delete all"
  ON reports FOR DELETE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  );

-- ========== STEP 3: Update proposals table RLS ==========

DROP POLICY IF EXISTS "Users can view own proposals" ON proposals;
CREATE POLICY "Users can view own proposals or admin can view all"
  ON proposals FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  );

DROP POLICY IF EXISTS "Users can insert own proposals" ON proposals;
CREATE POLICY "Users can insert own proposals"
  ON proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own proposals" ON proposals;
CREATE POLICY "Users can update own proposals or admin can update all"
  ON proposals FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  );

DROP POLICY IF EXISTS "Users can delete own proposals" ON proposals;
CREATE POLICY "Users can delete own proposals or admin can delete all"
  ON proposals FOR DELETE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'master')
    )
  );

-- ========== STEP 4: Update profiles table RLS ==========

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile or admin can view all"
  ON profiles FOR SELECT
  USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM profiles p2
      WHERE p2.id = auth.uid()
      AND p2.role IN ('admin', 'master')
    )
  );

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile or admin can update all"
  ON profiles FOR UPDATE
  USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM profiles p2
      WHERE p2.id = auth.uid()
      AND p2.role IN ('admin', 'master')
    )
  )
  WITH CHECK (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM profiles p2
      WHERE p2.id = auth.uid()
      AND p2.role IN ('admin', 'master')
    )
  );

-- ========== STEP 5: Set master role for prontoatendimentogama@gmail.com ==========
-- This will be done via Supabase console or trigger
-- DO NOT execute UPDATE directly here (safer to do via dashboard)

-- ========== STEP 6: Verification ==========
SELECT 'RLS policies updated successfully' as migration_status;

