import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'TU_SUPABASE_URL_AQUI';
const supabaseAnonKey = 'TU_SUPABASE_ANON_KEY_AQUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
