import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { authHelpers, supabase } from '../../utils/supabase/client';
import { adminService } from '../../utils/supabase/admin';
import { toast } from 'sonner';
import { User, LogOut, Shield, Mail, Clock } from 'lucide-react';

export default function AuthTest() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authHistory, setAuthHistory] = useState<string[]>([]);

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `${timestamp}: ${event} - ${session?.user?.email || 'No user'}`;
        setAuthHistory(prev => [logEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
        
        if (session?.user) {
          setUser(session.user);
          // Check admin status
          const adminStatus = await adminService.checkAdminStatus(session.user.id);
          setIsAdmin(adminStatus);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
    );

    // Initial check
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const adminStatus = await adminService.checkAdminStatus(session.user.id);
        setIsAdmin(adminStatus);
      }
    };

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await authHelpers.signInWithOAuth('google');
      toast.success('Google sign-in initiated');
    } catch (error: any) {
      toast.error('Google sign-in failed', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authHelpers.signOut();
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Sign out failed', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuthHistory = () => {
    setAuthHistory([]);
    toast.info('Auth history cleared');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔐 Authentication Test Panel
          </h1>
          <p className="text-gray-600">
            Test Google OAuth with multiple accounts
          </p>
        </div>

        {/* Current User Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Current User Status
          </h2>
          
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={user.user_metadata?.avatar_url || user.user_metadata?.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt="Avatar" 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Admin
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    User ID: {user.id.slice(0, 8)}...
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleSignOut} disabled={isLoading} variant="outline">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No user signed in</p>
              <Button 
                onClick={handleGoogleSignIn} 
                disabled={isLoading}
                className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>
            </div>
          )}
        </Card>

        {/* Authentication History */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Authentication History
            </h2>
            {authHistory.length > 0 && (
              <Button onClick={clearAuthHistory} variant="outline" size="sm">
                Clear History
              </Button>
            )}
          </div>
          
          {authHistory.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {authHistory.map((entry, index) => (
                <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                  {entry}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No authentication events yet
            </p>
          )}
        </Card>

        {/* Test Instructions */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">
            🧪 Testing Instructions
          </h2>
          <div className="space-y-3 text-blue-800">
            <p><strong>Test 1:</strong> Sign in with your primary Google account</p>
            <p><strong>Test 2:</strong> Sign out completely</p>
            <p><strong>Test 3:</strong> Sign in with a different Google account</p>
            <p><strong>Expected Result:</strong> Both accounts should work without issues</p>
            <p className="text-sm mt-4 p-3 bg-blue-100 rounded">
              <strong>Note:</strong> The "select_account" prompt should now allow you to choose different Google accounts when signing in.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
