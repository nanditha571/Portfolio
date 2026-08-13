import { supabase } from './lib/supabase.js';

export const sessions = new Map();

export function loadUsers() {
  return [];
}

export function saveUsers(users) {
  return;
}

export function loadPortfolios() {
  return {};
}

export function savePortfolios(portfolios) {
  return;
}

export async function findUserByUsername(username) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error('Supabase findUserByUsername error:', error);
    return null;
  }

  return data;
}

export async function findUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Supabase findUserById error:', error);
    return null;
  }

  return data;
}

export async function createUser(user) {
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: user.id,
      username: user.username,
      email: user.email,
      password_hash: user.password,
      created_at: user.createdAt,
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase createUser error:', error);
    throw new Error(error.message || 'Failed to create user');
  }

  return data;
}

export async function findPortfolioByUsername(username) {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('username', username.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error('Supabase findPortfolioByUsername error:', error);
    return null;
  }

  return data;
}

export async function upsertPortfolio(portfolio) {
  const slug = portfolio.username.toLowerCase();
  const payload = {
    username: slug,
    user_id: portfolio.userId || portfolio.user_id,
    data: portfolio.data || portfolio,
    theme: portfolio.theme || portfolio.data?.theme || null,
    published: portfolio.published ?? true,
    updated_at: new Date().toISOString(),
  };

  if (payload.user_id) {
    payload.user_id = payload.user_id;
  }

  const { data, error } = await supabase
    .from('portfolios')
    .upsert(
      {
        username: slug,
        user_id: payload.user_id,
        data: payload.data,
        theme: payload.theme,
        published: payload.published,
        updated_at: payload.updated_at,
      },
      { onConflict: 'username' }
    )
    .select()
    .single();

  if (error) {
    console.error('Supabase upsertPortfolio error:', error);
    throw new Error(error.message || 'Failed to save portfolio');
  }

  return data;
}

export async function setPortfolioPublished(username, published) {
  const slug = username.toLowerCase();
  const { data, error } = await supabase
    .from('portfolios')
    .update({
      published,
      updated_at: new Date().toISOString(),
    })
    .eq('username', slug)
    .select()
    .single();

  if (error) {
    console.error('Supabase setPortfolioPublished error:', error);
    throw new Error(error.message || 'Failed to update portfolio');
  }

  return data;
}
