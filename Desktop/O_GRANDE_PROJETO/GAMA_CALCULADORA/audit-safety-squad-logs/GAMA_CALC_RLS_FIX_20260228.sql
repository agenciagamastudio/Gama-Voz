-- ============================================================================
-- Migration: GAMA_CALC_RLS_FIX_20260228
-- Objective: Enable RLS on reports and proposals tables
-- Created: 2026-02-28T12:15:00Z
-- Validated by: supabase-validator (audit-safety-squad)
-- Status: READY FOR EXECUTION
-- ============================================================================

-- SAFETY CHECK: Verify tables exist
SELECT tablename FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals');

-- ============================================================================
-- PART 1: Enable RLS on reports table
-- ============================================================================
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 2: Create RLS Policies for reports table
-- ============================================================================

-- Users can view only their own reports
CREATE POLICY "Users view own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert only their own reports
CREATE POLICY "Users insert own reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update only their own reports
CREATE POLICY "Users update own reports"
  ON public.reports FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete only their own reports
CREATE POLICY "Users delete own reports"
  ON public.reports FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- PART 3: Enable RLS on proposals table
-- ============================================================================
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 4: Create RLS Policies for proposals table
-- ============================================================================

-- Users can view only their own proposals
CREATE POLICY "Users view own proposals"
  ON public.proposals FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert only their own proposals
CREATE POLICY "Users insert own proposals"
  ON public.proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update only their own proposals
CREATE POLICY "Users update own proposals"
  ON public.proposals FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete only their own proposals
CREATE POLICY "Users delete own proposals"
  ON public.proposals FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- VALIDATION: Verify RLS is enabled
-- ============================================================================
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals')
ORDER BY tablename;

-- Expected output:
-- profiles    | t  ✅
-- reports     | t  ✅
-- proposals   | t  ✅

-- ============================================================================
-- VALIDATION: Count RLS policies per table
-- ============================================================================
SELECT
  schemaname,
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals')
GROUP BY schemaname, tablename
ORDER BY tablename;

-- Expected output:
-- profiles    | 4 policies
-- reports     | 4 policies
-- proposals   | 4 policies
