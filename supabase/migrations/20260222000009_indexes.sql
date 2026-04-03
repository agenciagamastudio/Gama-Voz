-- Migration 009: Índices de Performance

-- Diagnósticos (queries mais frequentes)
CREATE INDEX idx_diagnostics_user_id  ON public.diagnostics(user_id);
CREATE INDEX idx_diagnostics_status   ON public.diagnostics(status);
CREATE INDEX idx_diagnostics_created  ON public.diagnostics(created_at DESC);

-- Cenários por diagnóstico
CREATE INDEX idx_scenarios_diagnostic ON public.diagnostic_scenarios(diagnostic_id);

-- Propostas
CREATE INDEX idx_proposals_user_id    ON public.proposals(user_id);
CREATE INDEX idx_proposals_diagnostic ON public.proposals(diagnostic_id);

-- Features por proposta (com ordenação)
CREATE INDEX idx_features_proposal    ON public.proposal_features(proposal_id, position);

-- Relatórios
CREATE INDEX idx_reports_user_id      ON public.reports(user_id);
CREATE INDEX idx_reports_diagnostic   ON public.reports(diagnostic_id);

-- Atividade do usuário (ordenada por data)
CREATE INDEX idx_activity_user_id     ON public.user_activity(user_id, created_at DESC);

-- Pontos
CREATE INDEX idx_points_user_id       ON public.user_points(user_id);

-- Cargos customizados
CREATE INDEX idx_roles_user_id        ON public.custom_roles(user_id);

-- Resgates de promos
CREATE INDEX idx_redemptions_user_id  ON public.promo_redemptions(user_id);
