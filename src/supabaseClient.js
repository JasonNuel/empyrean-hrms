import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ptzxnqkqdetlherqzvco.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0enhucWtxZGV0bGhlcnF6dmNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDE3MDI1MSwiZXhwIjoyMDY5NzQ2MjUxfQ.nFhvfceABOOz5Oh8KUGnEV6-c0_rwdLwsFVaLwjzWuI'
export const supabase = createClient(supabaseUrl, supabaseKey)
