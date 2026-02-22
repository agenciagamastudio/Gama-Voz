-- Migration 008: Log de Atividades do Usuário

CREATE TABLE public.user_activity (
  id            UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID                 NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type   activity_action_type NOT NULL,
  resource_type TEXT,
  resource_id   UUID,
  points_spent  INTEGER              DEFAULT 0,
  details       JSONB,
  created_at    TIMESTAMPTZ          DEFAULT NOW()
);
