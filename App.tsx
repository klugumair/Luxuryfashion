"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { PageRenderer } from "./components/PageRenderer";
import {
  AppProvider,
  useAppContext,
} from "./context/AppContext";
import { createNavigationHandler } from "./utils/navigation";
import { supabase, authHelpers } from "./utils/supabase/client";
import { toast } from "sonner";

// Re-export useAppContext for convenience
export { useAppContext };

export default function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Create navigation handler
  const handlePageChange = createNavigationHandler(
    setCurrentPage,
    setIsLoading,
    setIsMenuOpen,
    currentPage,
    setSearchQuery,
  );

  // Initialize authentication
  useEffect(() => {
    let authTimeout;

    const initializeAuthFlow = async () => {
      // Handle OAuth redirect first
      await handleAuthRedirect();

      // Then initialize regular auth
      await initializeAuth();

      // Add a timeout fallback in case auth hangs
      authTimeout = setTimeout(() => {
        console.warn('Auth initialization timeout - proceeding without auth');
        setAuthInitialized(true);
      }, 8000); // 8 second timeout
    };

    initializeAuthFlow();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        if (authTimeout) clearTimeout(authTimeout); // Clear timeout on successful auth

        if (event === 'SIGNED_IN' && session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name ||
                  session.user.user_metadata?.name ||
                  session.user.email?.split("@")[0] ||
                  "User",
            avatar: session.user.user_metadata?.avatar_url ||
                    session.user.user_metadata?.picture ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
            provider: session.user.app_metadata?.provider || 'email'
          };

          setUser(userData);

          // Show welcome toast for new sign-ins (not on page refresh)
          if (!user && event === 'SIGNED_IN') {
            toast.success("Welcome to Outlander!", {
              description: `Signed in as ${userData.name}`,
            });
          }

          // Navigate away from auth page if on it
          if (currentPage === 'auth') {
            handlePageChange('home');
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          if (currentPage !== 'auth') {
            toast.info("Signed out successfully", {
              description: "You've been logged out of your account"
            });
          }
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        }

        setAuthInitialized(true);
      }
    );

    return () => {
      if (authTimeout) clearTimeout(authTimeout);
      subscription.unsubscribe();
    };
  }, []);

  // Handle OAuth redirect
  const handleAuthRedirect = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      if (error) {
        console.error('OAuth error from URL:', error, errorDescription);
        toast.error("Authentication failed", {
          description: errorDescription || error
        });
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      if (code) {
        console.log('Processing OAuth redirect with code');
        setIsLoading(true);
        
        try {
          // Exchange code for session
          const { data, error: exchangeError } = await authHelpers.exchangeCodeForSession(code);
          
          if (exchangeError) {
            console.error('Code exchange error:', exchangeError);
            toast.error("Authentication failed", {
              description: exchangeError.message
            });
          } else if (data?.session?.user) {
            console.log('OAuth successful for:', data.session.user.email);
            // The auth state change listener will handle the user setup
          }
        } catch (exchangeError: any) {
          console.error('Code exchange failed:', exchangeError);
          toast.error("Authentication failed", {
            description: exchangeError.message || "Please try again"
          });
        }
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Error handling auth redirect:', error);
      setIsLoading(false);
    }
  };

  const initializeAuth = async () => {
    try {
      console.log('Starting auth initialization...');
      const { session, error } = await authHelpers.getSession();

      if (error) {
        console.error('Session initialization error:', error);
        setAuthInitialized(true);
        return;
      }

      if (session?.user) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || 
                session.user.user_metadata?.name || 
                session.user.email?.split("@")[0] || 
                "User",
          avatar: session.user.user_metadata?.avatar_url || 
                  session.user.user_metadata?.picture || 
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
          provider: session.user.app_metadata?.provider || 'email'
        };
        
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      console.log('Auth initialization completed');
      setAuthInitialized(true);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await authHelpers.signOut();
      
      if (error) {
        toast.error("Logout failed", {
          description: error.message
        });
      } else {
        setUser(null);
        // Navigate to home page after logout
        handlePageChange("home");
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error("Logout error", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while auth initializes
  if (!authInitialized) {
    return <LoadingOverlay isLoading={true} />;
  }

  // Enhanced page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <AppProvider 
      setCurrentPage={handlePageChange} 
      setUser={setUser}
    >
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-purple-50/50">
        {/* Loading Overlay */}
        <LoadingOverlay isLoading={isLoading} />

        {/* Header */}
        <Header
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
          isAuthenticated={!!user}
          onLogin={() => handlePageChange("auth")}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className="min-h-[calc(100vh-140px)]"
            >
              <PageRenderer
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer setCurrentPage={handlePageChange} />

        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background:
                "linear-gradient(135deg, #f59e0b 0%, #a855f7 100%)",
              border: "none",
              color: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            },
            duration: 4000,
          }}
        />

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}
