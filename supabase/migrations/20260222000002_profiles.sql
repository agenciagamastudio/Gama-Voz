-- Migration 002: Expandir tabela profiles existente

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#c4ff0d',
  ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMPTZ DEFAULT NOW();
