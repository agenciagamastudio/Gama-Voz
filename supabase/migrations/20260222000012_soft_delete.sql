-- Migration 012: Soft-delete para reports e proposals

ALTER TABLE public.reports   ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Índices parciais: acelera queries de "ativos" (caso mais frequente)
CREATE INDEX idx_reports_active   ON public.reports(user_id, created_at DESC)  WHERE deleted_at IS NULL;
CREATE INDEX idx_reports_trash    ON public.reports(user_id, deleted_at DESC)   WHERE deleted_at IS NOT NULL;
CREATE INDEX idx_proposals_active ON public.proposals(user_id, created_at DESC) WHERE deleted_at IS NULL;
