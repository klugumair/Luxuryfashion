import { supabase } from './supabase/client';

export const authDebug = {
  // Check current environment and configuration
  checkEnvironment() {
    const env = {
      origin: typeof window !== 'undefined' ? window.location.origin : 'unknown',
      href: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      cookiesEnabled: typeof window !== 'undefined' ? navigator.cookieEnabled : false,
      localStorage: typeof window !== 'undefined' ? 'available' : 'unavailable',
      sessionStorage: typeof window !== 'undefined' ? 'available' : 'unavailable'
    };

    console.log('🔍 Environment Check:', env);
    return env;
  },

  // Check Supabase auth configuration
  async checkSupabaseAuth() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      const authInfo = {
        hasSession: !!session,
        userId: session?.user?.id || null,
        email: session?.user?.email || null,
        provider: session?.user?.app_metadata?.provider || null,
        expiresAt: session?.expires_at || null,
        refreshToken: !!session?.refresh_token,
        error: error?.message || null
      };

      console.log('🔐 Supabase Auth Check:', authInfo);
      return authInfo;
    } catch (error: any) {
      console.error('❌ Supabase Auth Check Failed:', error);
      return { error: error.message };
    }
  },

  // Check URL parameters for OAuth returns
  checkURLParams() {
    if (typeof window === 'undefined') return {};

    const params = new URLSearchParams(window.location.search);
    const urlInfo = {
      code: params.get('code'),
      error: params.get('error'),
      errorDescription: params.get('error_description'),
      state: params.get('state'),
      provider: params.get('provider'),
      accessToken: params.get('access_token'),
      refreshToken: params.get('refresh_token')
    };

    console.log('🔗 URL Parameters:', urlInfo);
    return urlInfo;
  },

  // Check local storage for auth data
  checkLocalStorage() {
    if (typeof window === 'undefined') return {};

    const authKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('auth'))) {
        authKeys.push({
          key,
          hasValue: !!localStorage.getItem(key),
          length: localStorage.getItem(key)?.length || 0
        });
      }
    }

    console.log('💾 Auth LocalStorage:', authKeys);
    return authKeys;
  },

  // Clear all auth-related data
  async clearAllAuthData() {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('auth'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
      }

      console.log('🧹 All auth data cleared');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Clear auth data failed:', error);
      return { error: error.message };
    }
  },

  // Test OAuth flow
  async testOAuthFlow() {
    console.log('🧪 Starting OAuth Flow Test...');
    
    // Step 1: Check environment
    this.checkEnvironment();
    
    // Step 2: Check current auth state
    await this.checkSupabaseAuth();
    
    // Step 3: Check URL parameters
    this.checkURLParams();
    
    // Step 4: Check local storage
    this.checkLocalStorage();
    
    console.log('✅ OAuth Flow Test Complete - Check logs above');
  }
};

export default authDebug;
