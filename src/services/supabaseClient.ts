
import { createClient } from '@supabase/supabase-js';

// Normally we'd use environment variables for this
// When connected to Supabase via Lovable, these will be replaced with actual values
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function logTriageSession(sessionData: {
  symptom: string;
  answers: Record<string, any>;
  outcome: string;
  timestamp: string;
}) {
  try {
    const { error } = await supabase
      .from('triage_sessions')
      .insert([sessionData]);

    if (error) {
      console.error("Error logging triage session:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Failed to log triage session:", err);
    return false;
  }
}
