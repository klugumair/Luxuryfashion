import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useAppContext } from "../../App";
import { AnimatedEmoji } from "../animations";
import { toast } from "sonner@2.0.3";
import { supabase, authHelpers } from "../../utils/supabase/client";

export function AuthPage() {
  const { setCurrentPage, setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          handleAuthSuccess(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { session } = await authHelpers.getSession();
      if (session?.user) {
        handleAuthSuccess(session.user);
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  };

  const handleAuthSuccess = (supabaseUser: any) => {
    const user = {
      id: supabaseUser.id,
      email: supabaseUser.email,
      name: supabaseUser.user_metadata?.full_name || 
            supabaseUser.user_metadata?.name || 
            supabaseUser.email?.split("@")[0] || 
            "User",
      avatar: supabaseUser.user_metadata?.avatar_url || 
              supabaseUser.user_metadata?.picture || 
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
      provider: supabaseUser.app_metadata?.provider || 'email'
    };
    
    setUser(user);
    toast.success("Welcome to Outlander!", {
      description: `Signed in as ${user.name}`,
    });
    
    // Navigate to account page
    setCurrentPage('account');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (!isLogin && formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

      if (!isLogin && formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      let result;
      
      if (isLogin) {
        // Sign in existing user
        result = await authHelpers.signIn(formData.email, formData.password);
        
        if (result.error) {
          if (result.error.message.includes('Invalid login credentials')) {
            toast.error("Invalid email or password");
          } else {
            toast.error(result.error.message);
          }
          return;
        }

        toast.success("Welcome back!", {
          description: "Successfully signed in",
        });
      } else {
        // Sign up new user
        result = await authHelpers.signUp(formData.email, formData.password, {
          full_name: formData.name,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
        });

        if (result.error) {
          toast.error(result.error.message);
          return;
        }

        if (result.data?.user && !result.data.session) {
          toast.success("Check your email!", {
            description: "Please verify your email address to complete signup",
          });
        } else {
          toast.success("Account created successfully!", {
            description: "Welcome to Outlander!",
          });
        }
      }

      // The auth state change listener will handle navigation
      
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error("An error occurred", {
        description: error.message || "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github' | 'discord') => {
    setSocialLoading(provider);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        // Handle specific provider configuration errors
        if (error.message.includes('provider is not enabled') || error.message.includes('Unsupported provider')) {
          toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} not configured`, {
            description: `${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication is not set up in this project. Please use email/password authentication.`
          });
        } else {
          toast.error(`${provider} authentication failed`, {
            description: error.message
          });
        }
      } else {
        toast.info(`Redirecting to ${provider}...`, {
          description: "Please complete authentication in the popup window"
        });
      }
    } catch (error: any) {
      console.error(`${provider} auth error:`, error);
      
      // Handle network or other errors
      if (error.message?.includes('provider is not enabled') || error.message?.includes('Unsupported provider')) {
        toast.error("Social authentication not available", {
          description: "Social login providers are not configured. Please use email/password authentication."
        });
      } else {
        toast.error("Authentication error", {
          description: error.message || "Please try again later"
        });
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address first");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth?reset=true`
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Reset link sent!", {
          description: "Check your email for password reset instructions"
        });
      }
    } catch (error: any) {
      toast.error("Error sending reset email", {
        description: error.message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <AnimatedEmoji 
            emoji={isLogin ? "👋" : "🎉"} 
            animation="bounce" 
            size="large" 
            className="mb-4"
          />
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back!" : "Join Outlander"}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? "Sign in to your account to continue shopping" 
              : "Create your account and start your fashion journey"
            }
          </p>
        </motion.div>

        <Card className="p-8 shadow-2xl border-2 border-amber-100">
          {/* Social Login Buttons - Moved to top */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialAuth("google")}
              disabled={socialLoading !== null}
              className="w-full h-12 text-gray-700 border-2 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
            >
              {socialLoading === 'google' ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Chrome className="w-5 h-5 mr-2" />
              )}
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialAuth("github")}
              disabled={socialLoading !== null}
              className="w-full h-12 text-gray-700 border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              {socialLoading === 'github' ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Github className="w-5 h-5 mr-2" />
              )}
              Continue with GitHub
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialAuth("discord")}
              disabled={socialLoading !== null}
              className="w-full h-12 text-gray-700 border-2 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200"
            >
              {socialLoading === 'discord' ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <MessageCircle className="w-5 h-5 mr-2" />
              )}
              Continue with Discord
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500 font-medium">
              or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field for signup */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10 h-12 border-2 focus:border-amber-400"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-10 h-12 border-2 focus:border-amber-400"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="pl-10 pr-10 h-12 border-2 focus:border-amber-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password field for signup */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="pl-10 h-12 border-2 focus:border-amber-400"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            {/* Forgot Password for login */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold text-lg shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </motion.div>

            {/* Toggle between login/signup */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({...formData, confirmPassword: ""});
                  }}
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            {/* Terms and Privacy */}
            {!isLogin && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500 text-center"
              >
                By creating an account, you agree to our{" "}
                <a href="#" className="text-amber-600 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
              </motion.p>
            )}
          </form>
        </Card>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center">
              <AnimatedEmoji emoji="🚚" animation="bounce" size="small" className="mb-1" />
              <span className="text-gray-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedEmoji emoji="🔒" animation="pulse" size="small" className="mb-1" />
              <span className="text-gray-600">Secure Auth</span>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedEmoji emoji="💎" animation="bounce" size="small" className="mb-1" />
              <span className="text-gray-600">Premium Experience</span>
            </div>
          </div>
        </motion.div>

        {/* Configuration Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="text-center">
              <AnimatedEmoji emoji="ℹ️" animation="pulse" size="small" className="mb-3" />
              <h3 className="font-bold text-blue-800 mb-2">Social Authentication Setup</h3>
              <p className="text-sm text-blue-600 mb-3">
                To enable social login providers, configure them in your Supabase dashboard:
              </p>
              <div className="text-xs text-blue-500 space-y-1">
                <p>1. Go to Authentication → Providers in Supabase</p>
                <p>2. Enable Google, GitHub, or Discord providers</p>
                <p>3. Add your OAuth app credentials</p>
                <p>4. Set redirect URLs for each provider</p>
              </div>
              <div className="mt-3 text-xs text-blue-400">
                <AnimatedEmoji emoji="🔧" animation="wiggle" size="small" className="mr-1" />
                For now, use email/password authentication
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}