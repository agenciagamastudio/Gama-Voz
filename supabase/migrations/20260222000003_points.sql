-- Migration 003: Sistema de Pontos e Códigos Promocionais

CREATE TABLE public.user_points (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance        INTEGER     NOT NULL DEFAULT 20 CHECK (balance >= 0),
  last_recharged TIMESTAMPTZ DEFAULT NOW(),
  total_earned   INTEGER     NOT NULL DEFAULT 0,
  total_spent    INTEGER     NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id)
);

CREATE TABLE public.promo_codes (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT        NOT NULL UNIQUE,
  point_value     INTEGER     NOT NULL CHECK (point_value > 0),
  is_active       BOOLEAN     NOT NULL DEFAULT TRUE,
  max_redemptions INTEGER,
  times_redeemed  INTEGER     NOT NULL DEFAULT 0,
  expires_at      TIMESTAMPTZ,
  created_by      UUID        REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.promo_redemptions (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  promo_code   TEXT        NOT NULL REFERENCES public.promo_codes(code),
  points_given INTEGER     NOT NULL,
  redeemed_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, promo_code)
);

-- Dados iniciais: códigos promocionais padrão
INSERT INTO public.promo_codes (code, point_value, is_active) VALUES
  ('GAMA100',    100, TRUE),
  ('ORION',       50, TRUE),
  ('MASTER2026', 500, TRUE),
  ('FREEENERGY',  20, TRUE);
