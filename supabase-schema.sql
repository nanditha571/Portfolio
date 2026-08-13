-- FolioForge Supabase schema
-- Run this in the Supabase SQL Editor, then refresh the schema cache in Settings > API.

create table if not exists public.users (
  id uuid primary key,
  username text unique not null,
  email text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolios (
  id bigserial primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  username text unique not null,
  data jsonb not null default '{}'::jsonb,
  theme text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_portfolios_username on public.portfolios (username);
create index if not exists idx_users_username on public.users (username);
