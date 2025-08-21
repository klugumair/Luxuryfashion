import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'
import { toast } from 'sonner'

// Create the Supabase URL and client
const supabaseUrl = `https://${projectId}.supabase.co`
const supabaseAnonKey = publicAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
    storage: {
      getItem: (key) => {
        if (typeof window !== 'undefined') {
          return window.localStorage.getItem(key);
        }
        return null;
      },
      setItem: (key, value) => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value);
        }
      },
      removeItem: (key) => {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key);
        }
      }
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'outlander-web-app'
    }
  }
})

// Edge Function URL
export const EDGE_FUNCTION_URL = `${supabaseUrl}/functions/v1/make-server`

// Helper function to call edge functions
export const callEdgeFunction = async (path: string = '', options: RequestInit = {}) => {
  try {
    const response = await fetch(`${EDGE_FUNCTION_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Edge function error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Edge function call failed:', error)
    throw error
  }
}

// Authentication helpers
export const authHelpers = {
  async signUp(email: string, password: string, userData?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData?.full_name || userData?.name || email.split('@')[0],
          avatar_url: userData?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          ...userData
        }
      }
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signInWithOAuth(provider: 'google') {
    try {
      // Clear any existing session first to allow account switching
      await supabase.auth.signOut({ scope: 'local' });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account', // Force account selection
            include_granted_scopes: 'true'
          },
          skipBrowserRedirect: false
        }
      })

      if (error) {
        console.error('OAuth error:', error)
        throw error
      }

      return { data, error }
    } catch (error) {
      console.error('OAuth sign-in error:', error)
      return { data: null, error }
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  async resetPasswordForEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?reset=true`
    })
    return { data, error }
  },

  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    return { data, error }
  },

  async updateProfile(updates: { full_name?: string; avatar_url?: string }) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })
    return { data, error }
  },

  // Enhanced session management
  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession()
    return { data, error }
  },

  async exchangeCodeForSession(authCode: string) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode)
    return { data, error }
  },

  // Get user with enhanced error handling
  async getUserWithRetry(maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        return { user, error: null }
      } catch (error) {
        console.warn(`Get user attempt ${i + 1} failed:`, error)
        if (i === maxRetries - 1) {
          return { user: null, error }
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
    return { user: null, error: new Error('Max retries exceeded') }
  },

  // Listen for auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Profile management
  async createUserProfile(userId: string, profileData: any) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        avatar_url: profileData.avatar_url,
        preferences: profileData.preferences || {}
      })
      .select()
      .single();
    
    return { data, error };
  },

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { data, error };
  },

  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    return { data, error };
  }
}

// Health check function
export const checkEdgeFunctionHealth = async () => {
  try {
    const result = await callEdgeFunction('/health')
    return result
  } catch (error) {
    console.error('Health check failed:', error)
    return { status: 'error', error: error.message }
  }
}
