-- Migration 001: Enums e Extensões
-- GAMA Calculadora — Schema base

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE scenario_time_unit AS ENUM ('horas', 'minutos');
CREATE TYPE scenario_frequency  AS ENUM ('dia', 'semana', 'mes');
CREATE TYPE diagnostic_status   AS ENUM ('draft', 'completed', 'shared');
CREATE TYPE proposal_status     AS ENUM ('draft', 'sent', 'accepted', 'rejected');
CREATE TYPE feature_complexity  AS ENUM ('baixa', 'media', 'alta');
CREATE TYPE activity_action_type AS ENUM (
  'diagnostic_created',
  'diagnostic_completed',
  'proposal_generated',
  'report_exported',
  'points_spent',
  'points_earned',
  'promo_redeemed'
);
