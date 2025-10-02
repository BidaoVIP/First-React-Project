import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://comylmlvttsgspurapxb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbXlsbWx2dHRzZ3NwdXJhcHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDE1MzQsImV4cCI6MjA3NDk3NzUzNH0.yHFKpDV-OH8Fkr9hQESYSTj5xKXIpbg7oTzEtpABmRc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)