-- Create user_achievements table for gamification system
-- Story 1.8: Sistema de Gamificação - Ações de Engajamento com Pontos Extras

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  points_earned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX idx_user_achievements_action_type ON public.user_achievements(user_id, action_type);
CREATE INDEX idx_user_achievements_created_at ON public.user_achievements(user_id, created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own achievements
CREATE POLICY "Users can view their own achievements"
  ON public.user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can only insert their own achievements (via backend trigger)
CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users cannot update achievements (immutable)
CREATE POLICY "No direct updates allowed on achievements"
  ON public.user_achievements
  FOR UPDATE
  USING (FALSE);

-- RLS Policy: Users cannot delete achievements (immutable)
CREATE POLICY "No direct deletes allowed on achievements"
  ON public.user_achievements
  FOR DELETE
  USING (FALSE);

-- Grant permissions
GRANT ALL ON public.user_achievements TO authenticated;
GRANT SELECT ON public.user_achievements TO anon;
