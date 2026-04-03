-- Migration 006: Propostas Comerciais e Features

CREATE TABLE public.proposals (
  id                  UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID               NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnostic_id       UUID               REFERENCES public.diagnostics(id) ON DELETE SET NULL,
  status              proposal_status    NOT NULL DEFAULT 'draft',

  proposal_number     TEXT,
  my_company          TEXT               DEFAULT 'GAMA CALC',
  client_company      TEXT,
  client_contact      TEXT,
  project_name        TEXT,
  summary             TEXT,

  issue_date          DATE               DEFAULT CURRENT_DATE,
  valid_until_date    DATE,

  -- Valores financeiros
  subtotal            NUMERIC(12,2)      DEFAULT 0,
  taxes_percentage    NUMERIC(5,2)       DEFAULT 0,
  taxes_amount        NUMERIC(12,2)      DEFAULT 0,
  discount_percentage NUMERIC(5,2)       DEFAULT 0,
  discount_amount     NUMERIC(12,2)      DEFAULT 0,
  total_investment    NUMERIC(12,2)      DEFAULT 0,
  complexity          feature_complexity DEFAULT 'media',

  created_at          TIMESTAMPTZ        DEFAULT NOW(),
  updated_at          TIMESTAMPTZ        DEFAULT NOW()
);

CREATE TABLE public.proposal_features (
  id          UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID               NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  title       TEXT               NOT NULL DEFAULT 'Funcionalidade',
  description TEXT,
  hours       NUMERIC(8,2)       DEFAULT 0,
  cost        NUMERIC(12,2)      DEFAULT 0,
  complexity  feature_complexity DEFAULT 'media',
  position    INTEGER            DEFAULT 0,
  created_at  TIMESTAMPTZ        DEFAULT NOW()
);
