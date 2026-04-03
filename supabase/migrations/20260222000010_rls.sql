-- Migration 010: Row Level Security — todas as tabelas

-- Habilitar RLS
ALTER TABLE public.user_points          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_redemptions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_roles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostics          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposal_features    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity        ENABLE ROW LEVEL SECURITY;

-- user_points: apenas o dono acessa
CREATE POLICY "user_points_owner" ON public.user_points
  FOR ALL USING (auth.uid() = user_id);

-- promo_codes: qualquer autenticado lê, só criador gerencia
CREATE POLICY "promo_codes_read" ON public.promo_codes
  FOR SELECT USING (auth.role() = 'authenticated' AND is_active = TRUE);

CREATE POLICY "promo_codes_admin" ON public.promo_codes
  FOR ALL USING (auth.uid() = created_by);

-- promo_redemptions: apenas o dono vê seus próprios resgates
CREATE POLICY "redemptions_select_owner" ON public.promo_redemptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "redemptions_insert_owner" ON public.promo_redemptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- custom_roles: apenas o dono acessa e gerencia
CREATE POLICY "roles_owner" ON public.custom_roles
  FOR ALL USING (auth.uid() = user_id);

-- diagnostics: apenas o dono acessa e gerencia
CREATE POLICY "diagnostics_owner" ON public.diagnostics
  FOR ALL USING (auth.uid() = user_id);

-- diagnostic_scenarios: acesso somente via diagnóstico do próprio usuário
CREATE POLICY "scenarios_owner" ON public.diagnostic_scenarios
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.diagnostics d
      WHERE d.id = diagnostic_id
        AND d.user_id = auth.uid()
    )
  );

-- proposals: apenas o dono acessa e gerencia
CREATE POLICY "proposals_owner" ON public.proposals
  FOR ALL USING (auth.uid() = user_id);

-- proposal_features: acesso somente via proposta do próprio usuário
CREATE POLICY "features_owner" ON public.proposal_features
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.proposals p
      WHERE p.id = proposal_id
        AND p.user_id = auth.uid()
    )
  );

-- reports: apenas o dono acessa
CREATE POLICY "reports_owner" ON public.reports
  FOR ALL USING (auth.uid() = user_id);

-- user_activity: usuário só lê suas próprias atividades (insert via service role)
CREATE POLICY "activity_read_owner" ON public.user_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "activity_insert_owner" ON public.user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);
