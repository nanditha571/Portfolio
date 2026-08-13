import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function verifyTables() {
  const { error } = await supabase.from('users').select('id').limit(1);
  if (error && error.code === 'PGRST205') {
    console.error('Supabase schema error: tables not found. Run supabase-schema.sql in the Supabase SQL Editor, then refresh the schema cache.');
  }
}

verifyTables();
