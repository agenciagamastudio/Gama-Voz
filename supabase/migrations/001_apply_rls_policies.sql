-- MIGRATION: Apply RLS Policies to Secure User Data
-- Severity: CRITICAL - Prevent data exposure
-- Date: 2026-02-24

-- Enable RLS on reports table
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policy 1: Users can view their own reports
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy 2: Users can insert their own reports
CREATE POLICY "Users can insert own reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy 3: Users can update their own reports
CREATE POLICY "Users can update own reports"
  ON reports FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy 4: Users can delete their own reports
CREATE POLICY "Users can delete own reports"
  ON reports FOR DELETE
  USING (auth.uid() = user_id);

---

-- Enable RLS on proposals table
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- RLS Policy 5: Users can view their own proposals
CREATE POLICY "Users can view own proposals"
  ON proposals FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy 6: Users can insert their own proposals
CREATE POLICY "Users can insert own proposals"
  ON proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy 7: Users can update their own proposals
CREATE POLICY "Users can update own proposals"
  ON proposals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy 8: Users can delete their own proposals
CREATE POLICY "Users can delete own proposals"
  ON proposals FOR DELETE
  USING (auth.uid() = user_id);

---

-- Enable RLS on profiles table (likely already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy 9: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- RLS Policy 10: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('reports', 'proposals', 'profiles');
