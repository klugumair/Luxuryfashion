import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { authHelpers, signInWithGoogleAccountSelection } from '../../utils/supabase/client';
import { toast } from 'sonner';
import { AnimatedEmoji } from '../animations';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authHelpers.signIn(email, password);
      
      if (error) {
        toast.error('Sign in failed', {
          description: error.message
        });
      } else if (data?.user) {
        toast.success('Welcome back!', {
          description: 'You have been signed in successfully'
        });
        // Navigation will be handled by the auth state change listener
      }
    } catch (error: any) {
      toast.error('Sign in error', {
        description: error.message || 'Please try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authHelpers.signUp(email, password, {
        full_name: fullName || email.split('@')[0]
      });
      
      if (error) {
        toast.error('Sign up failed', {
          description: error.message
        });
      } else if (data?.user) {
        toast.success('Account created!', {
          description: 'Welcome to Outlander! You can start shopping now.'
        });
        // Navigation will be handled by the auth state change listener
      }
    } catch (error: any) {
      toast.error('Sign up error', {
        description: error.message || 'Please try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoading) return; // Prevent double clicks

    setIsLoading(true);
    try {
      console.log('Initiating Google OAuth with account selection...');

      // Use the improved Google sign-in that forces account selection
      const { data, error } = await signInWithGoogleAccountSelection();

      if (error) {
        console.error('Google OAuth error:', error);
        toast.error('Google sign-in failed', {
          description: error.message || 'Please try again'
        });
        setIsLoading(false);
      } else {
        console.log('Google OAuth initiated successfully');
        toast.info('Redirecting to Google...', {
          description: 'Please select your Google account'
        });
        // Don't set loading to false here as we're redirecting
        // Loading will be cleared when the redirect completes
      }
    } catch (error: any) {
      console.error('Google OAuth error:', error);
      toast.error('Google sign-in error', {
        description: error.message || 'Please try again'
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <AnimatedEmoji emoji="🏔️" animation="bounce" size="large" delay={0} />
            <h2 className="text-4xl font-black bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Outlander
            </h2>
            <AnimatedEmoji emoji="✨" animation="pulse" size="large" delay={0.3} />
          </div>
          <p className="text-lg text-zinc-600 flex items-center justify-center gap-2">
            <AnimatedEmoji emoji="👋" animation="wiggle" size="small" delay={0.6} />
            Join our community of fashion enthusiasts
            <AnimatedEmoji emoji="💫" animation="float" size="small" delay={0.9} />
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-md border-2 border-amber-200 shadow-[4px_4px_0px_0px] shadow-amber-600/20">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-r from-amber-100 to-purple-100 p-1 rounded-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              {/* Google Sign In Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mb-6"
              >
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 font-bold rounded-full flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                  <AnimatedEmoji emoji="🚀" animation="bounce" size="small" delay={0} />
                </Button>
              </motion.div>

              <div className="relative mb-6">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500 font-medium">or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                  <Label htmlFor="signin-email" className="text-sm font-bold text-gray-700">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-amber-400 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signin-password" className="text-sm font-bold text-gray-700">Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                    id="signin-password"
                      type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-amber-400 rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Sign In
                        <AnimatedEmoji emoji="🔑" animation="bounce" size="small" delay={0} />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              {/* Google Sign Up Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mb-6"
              >
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 font-bold rounded-full flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                  <AnimatedEmoji emoji="🚀" animation="bounce" size="small" delay={0} />
                </Button>
              <div className="relative mb-6">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500 font-medium">or create account with email</span>
                </div>
              </div>
              </motion.div>
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <Label htmlFor="signup-name" className="text-sm font-bold text-gray-700">Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-amber-400 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-email" className="text-sm font-bold text-gray-700">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-amber-400 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-password" className="text-sm font-bold text-gray-700">Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                    id="signup-password"
                      type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                      placeholder="Create a password (min 6 characters)"
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-amber-400 rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-sm font-bold text-gray-700">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                    id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-amber-400 rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5" />
                        Create Account
                        <AnimatedEmoji emoji="🎉" animation="bounce" size="small" delay={0} />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </TabsContent>
          </Tabs>
          </Card>
        </motion.div>
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <AnimatedEmoji emoji="🔒" animation="pulse" size="small" delay={0} />
            Your information is secure and protected
            <AnimatedEmoji emoji="🛡️" animation="wiggle" size="small" delay={0.3} />
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
