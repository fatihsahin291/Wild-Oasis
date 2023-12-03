import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
	"https://nwqjkultgmottyyzqfoh.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cWprdWx0Z21vdHR5eXpxZm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MjgxMjAsImV4cCI6MjAxNzEwNDEyMH0.bYp0uwvZBm493WjWxDkKln8CFnGlVLyXRc2kY7zPNPo";
const supabase = createClient(
	supabaseUrl,
	supabaseKey
);

export default supabase;
