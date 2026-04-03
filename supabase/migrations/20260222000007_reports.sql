-- Migration 007: Relatórios Gerados

CREATE TABLE public.reports (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_id  UUID        REFERENCES public.diagnostics(id) ON DELETE SET NULL,
  report_number  TEXT,
  client_name    TEXT,
  issue_date     DATE        DEFAULT CURRENT_DATE,
  total_loss     NUMERIC(12,2),
  points_cost    INTEGER     DEFAULT 15,
  snapshot       JSONB,
  view_count     INTEGER     DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
