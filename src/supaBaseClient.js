import { createClient } from "@supabase/supabase-js";

const supaBaseURL = "https://vtrsdcabhbvvuquhxiwt.supabase.co";
const supaBaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cnNkY2FiaGJ2dnVxdWh4aXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1Nzk2NTUsImV4cCI6MjAyMzE1NTY1NX0.JUxE3VuUqDuWJOVQX4zo0BosMdaH1dh5YgN3biR9xKg";


export const supaBase = createClient(supaBaseURL, supaBaseAnonKey);
