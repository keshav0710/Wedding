import { createClient } from '@supabase/supabase-js';

// Connected to Supabase Project: ksumvwsuirozoiwsiwp
const supabaseUrl = 'https://ksumvwswiirozoiwsiwp.supabase.co';
const supabaseAnonKey = 'sb_publishable_WXP2QNMEQB1kpyV7aSoPuw_LQno-HPO'; // New format publishable key
const BUCKET_NAME = 'wedding-images'; // The name of the bucket we'll create

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getImageUrl = (path) => {
  if (!path) return '';
  // Supabase generates synchronous public URLs, so we don't need async/await here
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
};
