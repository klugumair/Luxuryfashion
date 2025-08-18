import { motion } from "motion/react";
import { AnimatedEmoji } from "./animations";

interface ErrorBoundaryProps {
  onReturnHome: () => void;
}

export function ErrorBoundary({ onReturnHome }: ErrorBoundaryProps) {
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center space-y-4 p-8">
        <motion.div 
          className="mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <AnimatedEmoji
            emoji="😅"
            animation="bounce"
            size="large"
            delay={0}
          />
        </motion.div>
        <motion.h1 
          className="text-2xl font-black text-zinc-900 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Oops! Something went wrong
          <AnimatedEmoji
            emoji="🔧"
            animation="wiggle"
            size="small"
            delay={0.3}
          />
        </motion.h1>
        <motion.p 
          className="text-zinc-600 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatedEmoji
            emoji="🚧"
            animation="pulse"
            size="small"
            delay={0.5}
          />
          We're having trouble loading this page.
        </motion.p>
        <motion.button
          onClick={onReturnHome}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-500 text-white rounded-full font-bold hover:from-amber-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedEmoji
            emoji="🏠"
            animation="bounce"
            size="small"
            delay={0}
          />
          Return Home
          <AnimatedEmoji
            emoji="➡️"
            animation="float"
            size="small"
            delay={0.2}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}