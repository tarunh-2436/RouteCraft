import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qktwhacgyddrpudftegn.supabase.co'; // 🔁 Replace with your Project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdHdoYWNneWRkcnB1ZGZ0ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjkyNTEsImV4cCI6MjA2MDE0NTI1MX0.918Dtoynk1iNGg3JnF6GpSCs0H5K5riwStH8pxHxmrw'; // 🔁 Replace with your Anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
