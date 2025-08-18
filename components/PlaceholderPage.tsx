import { motion } from "motion/react";
import { AnimatedEmoji } from "./animations";

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <main className="flex-1 flex items-center justify-center">
        <motion.div 
          className="text-center space-y-4 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <AnimatedEmoji
              emoji="🚧"
              animation="bounce"
              size="large"
              delay={0}
            />
          </motion.div>
          <motion.h1 
            className="text-3xl font-black text-zinc-900 flex items-center justify-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
            <AnimatedEmoji
              emoji="👶"
              animation="wiggle"
              size="medium"
              delay={0.3}
            />
          </motion.h1>
          <motion.p 
            className="text-zinc-600 flex items-center justify-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatedEmoji
              emoji="⭐"
              animation="pulse"
              size="small"
              delay={0.5}
            />
            Coming Soon! This kids category is being prepared with love.
            <AnimatedEmoji
              emoji="💝"
              animation="bounce"
              size="small"
              delay={0.7}
            />
          </motion.p>
          <motion.div 
            className="text-sm text-zinc-500 mt-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatedEmoji
              emoji="🎨"
              animation="spin"
              size="small"
              delay={0.9}
            />
            We're crafting amazing products for your little ones!
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}