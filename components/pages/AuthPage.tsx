import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { authHelpers } from '../../utils/supabase/client';
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
      console.log('Starting sign up process...');
      const { data, error } = await authHelpers.signUp(email, password, {
        full_name: fullName || email.split('@')[0]
      });

      console.log('Sign up result:', { data, error });

      if (error) {
        console.error('Sign up error details:', error);

        // Handle rate limiting error specifically
        if (error.message.includes('can only request this after')) {
          const timeMatch = error.message.match(/(\d+) seconds/);
          const waitTime = timeMatch ? timeMatch[1] : '60';
          toast.error('Too many signup attempts', {
            description: `Please wait ${waitTime} seconds before trying again.`
          });
        } else if (error.message.includes('User already registered')) {
          toast.error('Account already exists', {
            description: 'Please try signing in instead.'
          });
        } else {
          toast.error('Sign up failed', {
            description: error.message || 'Please try again'
          });
        }
      } else if (data?.user) {
        console.log('Sign up successful for user:', data.user.id);

        // Check if email confirmation is required
        if (data.user.email_confirmed_at) {
          toast.success('Account created!', {
            description: 'Welcome to Outlander! You can start shopping now.'
          });
        } else {
          toast.success('Account created!', {
            description: 'Please check your email to verify your account, then you can start shopping.'
          });
        }
        // Navigation will be handled by the auth state change listener
      }
    } catch (error: any) {
      console.error('Sign up exception:', error);
      toast.error('Sign up error', {
        description: error.message || 'Please try again'
      });
    } finally {
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
