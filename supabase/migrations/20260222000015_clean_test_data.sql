-- 🧹 LIMPAR TODOS OS DADOS DE TESTE
-- Mantém estrutura das tabelas, remove dados

-- Desabilitar constraints temporariamente
ALTER TABLE public.user_points DISABLE TRIGGER ALL;
ALTER TABLE public.saved_filters DISABLE TRIGGER ALL;
ALTER TABLE public.proposals DISABLE TRIGGER ALL;
ALTER TABLE public.reports DISABLE TRIGGER ALL;
ALTER TABLE public.companies DISABLE TRIGGER ALL;
ALTER TABLE public.profiles DISABLE TRIGGER ALL;

-- Limpar dados (na ordem correta para evitar FK constraints)
DELETE FROM public.user_points WHERE true;
DELETE FROM public.saved_filters WHERE true;
DELETE FROM public.proposals WHERE true;
DELETE FROM public.reports WHERE true;
DELETE FROM public.companies WHERE true;
DELETE FROM public.profiles WHERE true;

-- Re-habilitar triggers
ALTER TABLE public.user_points ENABLE TRIGGER ALL;
ALTER TABLE public.saved_filters ENABLE TRIGGER ALL;
ALTER TABLE public.proposals ENABLE TRIGGER ALL;
ALTER TABLE public.reports ENABLE TRIGGER ALL;
ALTER TABLE public.companies ENABLE TRIGGER ALL;
ALTER TABLE public.profiles ENABLE TRIGGER ALL;

-- Reset sequences (IDs voltam a 1)
ALTER SEQUENCE public.companies_id_seq RESTART WITH 1;
ALTER SEQUENCE public.reports_id_seq RESTART WITH 1;
ALTER SEQUENCE public.proposals_id_seq RESTART WITH 1;
ALTER SEQUENCE public.saved_filters_id_seq RESTART WITH 1;

COMMIT;

-- ✅ PRONTO: Tabelas vazias, estrutura preservada
