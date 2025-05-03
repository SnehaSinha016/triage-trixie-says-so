
import { createClient } from '@supabase/supabase-js';

// Normally we'd use environment variables for this
// When connected to Supabase via Lovable, these will be replaced with actual values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Console log for debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey.substring(0, 5) + '...');

// Create a mock client if we're using placeholder values
const isMockClient = supabaseUrl.includes('placeholder');

export const supabase = isMockClient 
  ? createMockClient()
  : createClient(supabaseUrl, supabaseAnonKey);

// Function to create a mock client when real credentials aren't available
function createMockClient() {
  console.warn('⚠️ Using mock Supabase client. Connect to Supabase for full functionality.');
  
  return {
    from: (table: string) => ({
      insert: () => Promise.resolve({ error: null }),
      select: () => Promise.resolve({ data: [], error: null }),
    }),
    auth: {
      signIn: () => Promise.resolve({ user: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
  } as any;
}

export async function logTriageSession(sessionData: {
  symptom: string;
  answers: Record<string, any>;
  outcome: string;
  timestamp: string;
  condition?: string;
  compassionateWord?: string;
}) {
  try {
    if (isMockClient) {
      console.log('Mock logging triage session:', sessionData);
      return true;
    }
    
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

export async function logMentalHealthSession(sessionData: {
  mood: string;
  anxiety: string;
  sleep_issues: string;
  duration: string;
  self_harm_thoughts: string;
  outcome: string;
  timestamp: string;
  compassionateWord?: string;
}) {
  try {
    if (isMockClient) {
      console.log('Mock logging mental health session:', sessionData);
      return true;
    }
    
    const { error } = await supabase
      .from('mental_health_sessions')
      .insert([sessionData]);

    if (error) {
      console.error("Error logging mental health session:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Failed to log mental health session:", err);
    return false;
  }
}
