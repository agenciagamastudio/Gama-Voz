-- Migration 005: Diagnósticos de Valor e Cenários de Perda

CREATE TABLE public.diagnostics (
  id                     UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID              NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status                 diagnostic_status NOT NULL DEFAULT 'draft',

  -- Dados do cliente
  client_name            TEXT              NOT NULL,
  business_description   TEXT,
  market_niche           TEXT,

  -- Dados financeiros inseridos pelo usuário
  monthly_revenue        NUMERIC(12,2)     NOT NULL CHECK (monthly_revenue > 0),
  working_days_per_month INTEGER           NOT NULL DEFAULT 22,
  working_hours_per_day  INTEGER           NOT NULL DEFAULT 8,

  -- Valor hora calculado automaticamente
  company_hourly_value   NUMERIC(10,2)     GENERATED ALWAYS AS
                           (monthly_revenue / (working_days_per_month * working_hours_per_day)) STORED,

  -- Solução proposta
  solution_description   TEXT,
  solution_cost          NUMERIC(12,2),

  -- Totais calculados (desnormalizados para performance de leitura)
  total_annual_loss      NUMERIC(12,2)     DEFAULT 0,
  monthly_savings        NUMERIC(12,2)     DEFAULT 0,
  roi_months             NUMERIC(8,2),
  recovery_percentage    NUMERIC(5,2),

  -- Controle de pontos
  points_cost            INTEGER           DEFAULT 15,
  points_deducted        BOOLEAN           DEFAULT FALSE,

  created_at             TIMESTAMPTZ       DEFAULT NOW(),
  updated_at             TIMESTAMPTZ       DEFAULT NOW()
);

CREATE TABLE public.diagnostic_scenarios (
  id                       UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id            UUID               NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,

  description              TEXT               NOT NULL,
  role_name                TEXT               NOT NULL,
  hourly_rate              NUMERIC(10,2)      NOT NULL CHECK (hourly_rate >= 0),
  time_lost_per_occurrence NUMERIC(8,2)       NOT NULL CHECK (time_lost_per_occurrence > 0),
  time_unit                scenario_time_unit NOT NULL DEFAULT 'horas',
  frequency                scenario_frequency NOT NULL DEFAULT 'semana',
  number_of_people         NUMERIC(8,2)       NOT NULL DEFAULT 1 CHECK (number_of_people > 0),
  is_covered               BOOLEAN            NOT NULL DEFAULT FALSE,

  -- Perdas calculadas (desnormalizadas)
  weekly_loss              NUMERIC(12,2)      DEFAULT 0,
  monthly_loss             NUMERIC(12,2)      DEFAULT 0,
  annual_loss              NUMERIC(12,2)      DEFAULT 0,

  created_at               TIMESTAMPTZ        DEFAULT NOW()
);
