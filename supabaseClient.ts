import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://uylaznaqmsjqolqfbwvj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bGF6bmFxbXNqcW9scWZid3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3Nzg3NzYsImV4cCI6MjA3NTM1NDc3Nn0.18QEnh8eQdkSOi97jsOZBOijwG_SEqKRmRoLYJyBNiA"
);
