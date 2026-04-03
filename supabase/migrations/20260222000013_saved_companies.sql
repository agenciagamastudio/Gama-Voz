-- Migration 013: Empresas salvas + colunas ausentes em proposals

-- Tabela de empresas salvas (atalhos de taxa horária)
CREATE TABLE IF NOT EXISTS public.saved_companies (
    id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name        TEXT          NOT NULL,
    hourly_rate NUMERIC(10,2) NOT NULL,
    created_at  TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE public.saved_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_companies_own"
    ON public.saved_companies
    FOR ALL
    USING  (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_saved_companies_user
    ON public.saved_companies(user_id, created_at ASC);

-- Colunas ausentes na tabela proposals
ALTER TABLE public.proposals
    ADD COLUMN IF NOT EXISTS client_name  TEXT,
    ADD COLUMN IF NOT EXISTS hourly_rate  NUMERIC(10,2);
