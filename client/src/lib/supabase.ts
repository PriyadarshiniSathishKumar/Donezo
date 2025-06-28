import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hgwnybxhlypaghwizkfz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnd255YnhobHlwYWdod2l6a2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwOTIxMzIsImV4cCI6MjA2NjY2ODEzMn0.Q6cZqrL_2vSXg4XGby1dhFX0xjH9SLyWnFRCuUfbc9M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
