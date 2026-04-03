-- Migration 004: Cargos e Salários Customizados

CREATE TABLE public.custom_roles (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name           TEXT         NOT NULL,
  monthly_cost   NUMERIC(10,2) NOT NULL CHECK (monthly_cost > 0),
  days_per_month INTEGER      NOT NULL DEFAULT 22 CHECK (days_per_month BETWEEN 1 AND 31),
  hours_per_day  INTEGER      NOT NULL DEFAULT 8  CHECK (hours_per_day BETWEEN 1 AND 24),
  hourly_cost    NUMERIC(10,2) GENERATED ALWAYS AS
                   (monthly_cost / (days_per_month * hours_per_day)) STORED,
  created_at     TIMESTAMPTZ  DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  DEFAULT NOW()
);
