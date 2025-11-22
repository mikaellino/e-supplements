import { createClient } from '@supabase/supabase-js'

// Essas chaves ficam nas configurações do seu projeto no site do Supabase
const supabaseUrl = 'https://vomqkmafiomdqkuhdgmb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvbXFrbWFmaW9tZHFrdWhkZ21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NzU3MjUsImV4cCI6MjA3OTM1MTcyNX0.k6JPiJOsDB-BOIfm1AoOElx6-l52kgl2L8SYpKZ9cK0'

export const supabase = createClient(supabaseUrl, supabaseKey)