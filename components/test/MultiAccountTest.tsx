import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { supabase, signInWithGoogleAccountSelection } from '../../utils/supabase/client';
import { toast } from 'sonner';

export function MultiAccountTest() {
  const [user, setUser] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToHistory = (action: string, userEmail?: string) => {
    setSessionHistory(prev => [...prev, {
      action,
      userEmail,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testGoogleAccountSwitch = async () => {
    setLoading(true);
    try {
      addToHistory('Initiating Google account switch');
      await signInWithGoogleAccountSelection();
    } catch (error: any) {
      addToHistory('Google switch failed', error.message);
      toast.error('Account switch failed', {
        description: error.message
      });
    }
    setLoading(false);
  };

  const forceSignOut = async () => {
    setLoading(true);
    try {
      addToHistory('Force sign out (global)');
      await supabase.auth.signOut({ scope: 'global' });
      setUser(null);
    } catch (error: any) {
      addToHistory('Sign out failed', error.message);
    }
    setLoading(false);
  };

  const clearHistory = () => {
    setSessionHistory([]);
  };

  const checkCurrentSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        addToHistory('Session check failed', error.message);
      } else if (session?.user) {
        addToHistory('Session found', session.user.email);
      } else {
        addToHistory('No active session');
      }
    } catch (error: any) {
      addToHistory('Session check error', error.message);
    }
  };

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        addToHistory(`Auth event: ${event}`, session.user.email);
      } else {
        setUser(null);
        addToHistory(`Auth event: ${event}`, 'No user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Multi-Account Google OAuth Test</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Button 
            onClick={testGoogleAccountSwitch} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Switch Google Account
          </Button>
          <Button 
            onClick={checkCurrentSession} 
            disabled={loading}
            variant="outline"
          >
            Check Session
          </Button>
          <Button 
            onClick={forceSignOut} 
            disabled={loading}
            variant="destructive"
          >
            Force Sign Out
          </Button>
          <Button 
            onClick={clearHistory} 
            variant="outline" 
            size="sm"
          >
            Clear History
          </Button>
        </div>

        {user && (
          <div className="bg-green-50 p-4 rounded mb-4">
            <h4 className="font-medium text-green-800 mb-2">Current User:</h4>
            <div className="text-sm text-green-700">
              <div>Email: {user.email}</div>
              <div>Name: {user.user_metadata?.full_name || user.user_metadata?.name || 'N/A'}</div>
              <div>Provider: {user.app_metadata?.provider || 'unknown'}</div>
              <div>Last Sign In: {new Date(user.last_sign_in_at).toLocaleString()}</div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Session History</h3>
            <span className="text-sm text-gray-500">
              {sessionHistory.length} events
            </span>
          </div>
          
          <div className="max-h-60 overflow-y-auto border rounded p-4 bg-gray-50">
            {sessionHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">No events yet</p>
            ) : (
              sessionHistory.slice().reverse().map((event, index) => (
                <div key={index} className="mb-2 p-2 rounded text-sm bg-white border">
                  <div className="font-medium">{event.action}</div>
                  {event.userEmail && (
                    <div className="text-blue-600">{event.userEmail}</div>
                  )}
                  <div className="text-xs text-gray-500">{event.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-medium text-blue-800 mb-2">Test Instructions:</h4>
          <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
            <li>Click "Switch Google Account" to test account switching</li>
            <li>Select a different Google account when prompted</li>
            <li>Verify the new account appears in "Current User" section</li>
            <li>Check session history for any errors or issues</li>
            <li>Test switching between multiple accounts</li>
          </ol>
        </div>
      </Card>
    </div>
  );
}
