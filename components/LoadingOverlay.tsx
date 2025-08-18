import { motion, AnimatePresence } from "framer-motion";
import { AnimatedEmoji } from "./animations";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/90 backdrop-blur-md z-50 flex items-center justify-center"
        >
          <motion.div 
            className="flex flex-col items-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <AnimatedEmoji
                emoji="⏳"
                animation="spin"
                size="medium"
                delay={0}
              />
            </div>
            <motion.p 
              className="text-sm font-medium text-zinc-600 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedEmoji
                emoji="🔄"
                animation="pulse"
                size="small"
                delay={0.3}
              />
              Loading amazing content...
              <AnimatedEmoji
                emoji="✨"
                animation="bounce"
                size="small"
                delay={0.6}
              />
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
