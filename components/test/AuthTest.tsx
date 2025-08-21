import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { supabase, authHelpers } from '../../utils/supabase/client';
import { toast } from 'sonner';

export function AuthTest() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (test: string, result: 'success' | 'error', message: string) => {
    setTestResults(prev => [...prev, { test, result, message, timestamp: new Date() }]);
  };

  const testEmailAuth = async () => {
    setLoading(true);
    try {
      // Test email signup
      const { data, error } = await authHelpers.signUp(
        'testuser@outlander.com', 
        'testpassword123',
        { full_name: 'Test User' }
      );
      
      if (error) {
        addTestResult('Email Signup', 'error', error.message);
      } else {
        addTestResult('Email Signup', 'success', 'User created successfully');
      }
    } catch (error: any) {
      addTestResult('Email Signup', 'error', error.message);
    }
    setLoading(false);
  };

  const testGoogleAuth = async () => {
    setLoading(true);
    try {
      const { data, error } = await authHelpers.signInWithOAuth('google');
      
      if (error) {
        addTestResult('Google OAuth', 'error', error.message);
      } else {
        addTestResult('Google OAuth', 'success', 'Google OAuth initiated successfully');
      }
    } catch (error: any) {
      addTestResult('Google OAuth', 'error', error.message);
    }
    setLoading(false);
  };

  const testSession = async () => {
    setLoading(true);
    try {
      const { session, error } = await authHelpers.getSession();
      
      if (error) {
        addTestResult('Session Check', 'error', error.message);
      } else if (session) {
        addTestResult('Session Check', 'success', `Session found for ${session.user?.email}`);
      } else {
        addTestResult('Session Check', 'success', 'No active session');
      }
    } catch (error: any) {
      addTestResult('Session Check', 'error', error.message);
    }
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await authHelpers.signOut();
      
      if (error) {
        addTestResult('Sign Out', 'error', error.message);
      } else {
        addTestResult('Sign Out', 'success', 'Signed out successfully');
        setUser(null);
      }
    } catch (error: any) {
      addTestResult('Sign Out', 'error', error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        addTestResult('Auth State Change', 'success', `${event}: ${session.user.email}`);
      } else {
        setUser(null);
        addTestResult('Auth State Change', 'success', `${event}: No user`);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Authentication Test Panel</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Button onClick={testSession} disabled={loading}>
            Test Session
          </Button>
          <Button onClick={testEmailAuth} disabled={loading}>
            Test Email Auth
          </Button>
          <Button onClick={testGoogleAuth} disabled={loading}>
            Test Google OAuth
          </Button>
          <Button onClick={testSignOut} disabled={loading} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Test Results</h3>
            <Button onClick={clearResults} variant="outline" size="sm">
              Clear Results
            </Button>
          </div>
          
          <div className="max-h-60 overflow-y-auto border rounded p-4 bg-gray-50">
            {testResults.length === 0 ? (
              <p className="text-gray-500 text-sm">No tests run yet</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className={`mb-2 p-2 rounded text-sm ${
                  result.result === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className="font-medium">{result.test}</div>
                  <div>{result.message}</div>
                  <div className="text-xs opacity-75">
                    {result.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {user && (
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-medium text-blue-800 mb-2">Current User:</h4>
            <div className="text-sm text-blue-700">
              <div>Email: {user.email}</div>
              <div>ID: {user.id}</div>
              <div>Provider: {user.app_metadata?.provider || 'email'}</div>
              <div>Name: {user.user_metadata?.full_name || 'N/A'}</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
