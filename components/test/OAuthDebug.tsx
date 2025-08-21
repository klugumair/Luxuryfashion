import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { authHelpers, supabase } from '../../utils/supabase/client';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

export default function OAuthDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        setCurrentUser(session?.user || null);
        
        setDebugInfo({
          hasSession: !!session,
          userId: session?.user?.id || null,
          email: session?.user?.email || null,
          provider: session?.user?.app_metadata?.provider || null,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error checking auth state:', error);
      }
    };

    checkAuthState();

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, session?.user?.email);
        setCurrentUser(session?.user || null);
        setDebugInfo({
          hasSession: !!session,
          userId: session?.user?.id || null,
          email: session?.user?.email || null,
          provider: session?.user?.app_metadata?.provider || null,
          lastEvent: event,
          timestamp: new Date().toISOString()
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const testGoogleOAuth = async () => {
    setIsLoading(true);
    try {
      console.log('=== Starting Google OAuth Test ===');
      
      // Step 1: Clear auth state
      console.log('Step 1: Clearing auth state...');
      await authHelpers.clearAuthState();
      
      // Step 2: Initiate OAuth
      console.log('Step 2: Initiating OAuth...');
      const { data, error } = await authHelpers.signInWithOAuth('google');
      
      if (error) {
        console.error('OAuth error:', error);
        toast.error('OAuth failed', {
          description: error.message
        });
      } else {
        console.log('OAuth initiated:', data);
        toast.loading('Redirecting to Google...');
      }
    } catch (error: any) {
      console.error('OAuth test error:', error);
      toast.error('Test failed', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuthAndRetry = async () => {
    setIsLoading(true);
    try {
      await authHelpers.signOut();
      await authHelpers.clearAuthState();
      toast.success('Auth state cleared');
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error: any) {
      toast.error('Clear failed', {
        description: error.message
      });
      setIsLoading(false);
    }
  };

  const checkURLParams = () => {
    const params = new URLSearchParams(window.location.search);
    const urlInfo = {
      hasCode: !!params.get('code'),
      hasError: !!params.get('error'),
      error: params.get('error'),
      errorDescription: params.get('error_description'),
      state: params.get('state'),
      provider: params.get('provider')
    };
    
    console.log('URL Parameters:', urlInfo);
    toast.info('Check console for URL parameters');
    return urlInfo;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 OAuth Debug Panel
          </h1>
          <p className="text-gray-600">
            Debug Google OAuth authentication issues
          </p>
        </div>

        {/* Current User Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {currentUser ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-medium">
                  {currentUser ? 'Signed In' : 'Not Signed In'}
                </span>
              </div>
              
              {currentUser && (
                <div className="ml-7 space-y-1 text-sm text-gray-600">
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Provider:</strong> {currentUser.app_metadata?.provider || 'Unknown'}</p>
                  <p><strong>ID:</strong> {currentUser.id.slice(0, 8)}...</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Debug Info</h3>
              <div className="text-sm text-gray-600">
                <p><strong>Has Session:</strong> {debugInfo.hasSession ? 'Yes' : 'No'}</p>
                <p><strong>Last Event:</strong> {debugInfo.lastEvent || 'None'}</p>
                <p><strong>Timestamp:</strong> {debugInfo.timestamp ? new Date(debugInfo.timestamp).toLocaleTimeString() : 'N/A'}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Test Controls */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={testGoogleOAuth} 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Testing...
                </>
              ) : (
                'Test Google OAuth'
              )}
            </Button>
            
            <Button 
              onClick={clearAuthAndRetry} 
              disabled={isLoading}
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Auth State
            </Button>
            
            <Button 
              onClick={checkURLParams} 
              variant="outline"
            >
              Check URL Parameters
            </Button>
            
            {currentUser && (
              <Button 
                onClick={() => authHelpers.signOut()} 
                variant="destructive"
              >
                Sign Out
              </Button>
            )}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <h2 className="text-xl font-semibold mb-4 text-yellow-900">
            🧪 Debug Instructions
          </h2>
          <div className="space-y-3 text-yellow-800">
            <p><strong>Step 1:</strong> Open browser console (F12) to see detailed logs</p>
            <p><strong>Step 2:</strong> Click "Test Google OAuth" and watch the console</p>
            <p><strong>Step 3:</strong> If it fails, check URL parameters after redirect</p>
            <p><strong>Step 4:</strong> Try "Clear Auth State" and test again</p>
            <div className="mt-4 p-3 bg-yellow-100 rounded">
              <strong>Common Issues:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>PKCE code/verifier issues (browser cache)</li>
                <li>Redirect URI mismatch in Google Console</li>
                <li>Supabase OAuth provider configuration</li>
                <li>Browser blocking third-party cookies</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Environment Info */}
        <Card className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Current URL:</strong> {window.location.href}</p>
              <p><strong>Origin:</strong> {window.location.origin}</p>
              <p><strong>User Agent:</strong> {navigator.userAgent.slice(0, 50)}...</p>
            </div>
            <div>
              <p><strong>Local Storage Keys:</strong></p>
              <div className="mt-1">
                {Object.keys(localStorage).filter(key => key.startsWith('sb-')).map(key => (
                  <Badge key={key} variant="outline" className="mr-1 mb-1 text-xs">
                    {key}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
