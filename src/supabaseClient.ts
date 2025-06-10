import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://juxywvboroveqzapzbqj.supabase.co'; // Remplace par ton URL Supabase si différente
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eHl3dmJvcm92ZXF6YXB6YnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTcwNTksImV4cCI6MjA2NTEzMzA1OX0.euRzx0nTTpM-PcOygqq2nD5pUjP-4JA6iyQtpUdTuPA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
