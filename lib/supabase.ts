import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://gdgxbepzwllziitlzoou.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZ3hiZXB6d2xsemlpdGx6b291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTY2MTQsImV4cCI6MjA2NzYzMjYxNH0.8jHw0jXPRtz0OaQJsqJV6LMw3f9p-hAqjpuQyRJyex8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
