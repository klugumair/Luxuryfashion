import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

// Create the Supabase URL and client
const supabaseUrl = `https://${projectId}.supabase.co`
const supabaseAnonKey = publicAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
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
        data: userData
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

  async signInWithOAuth(provider: 'google' | 'github' | 'discord') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })
    return { data, error }
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

  // Listen for auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
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