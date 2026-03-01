-- Add professional_role and company columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS professional_role TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_professional_role ON public.profiles(professional_role);
CREATE INDEX IF NOT EXISTS idx_profiles_company ON public.profiles(company);
