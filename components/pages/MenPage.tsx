import { useState } from "react";
import { motion } from "framer-motion";
import { Shirt, ArrowRight, Users, Crown, Star } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";
import { menProducts } from "../constants";
import { useAppContext } from "../../App";
import { AdminFloatingButton } from "../AdminFloatingButton";
import { QuickAddProduct } from "../QuickAddProduct";

// Men's Collection Page
export function MenPage() {
  const { setCurrentPage } = useAppContext();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-gray-100/40 to-amber-100/40" />
          
          {/* Background elements */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300/8 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: "transform" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-amber-300/8 blur-3xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.5, 0.4]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ willChange: "transform" }}
          />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-amber-100 px-4 py-2 text-sm border border-blue-200 gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Shirt className="h-4 w-4 text-blue-600" />
                </motion.div>
                Men's Premium Collection
                <AnimatedEmoji 
                  emoji="👔"
                  animation="bounce"
                  size="small"
                  delay={0}
                />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-black tracking-tighter sm:text-5xl xl:text-6xl relative"
              >
                <span className="block flex items-center justify-center gap-2">
                  Rugged & Refined
                  <AnimatedEmoji 
                    emoji="💪"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-gray-600 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Men's Style
                  <AnimatedEmoji 
                    emoji="🕴️"
                    animation="swing"
                    size="medium"
                    delay={0.6}
                  />
                </span>
                <AnimatedEmoji 
                  emoji="⚡"
                  className="absolute -right-4 top-0"
                  animation="spin"
                  size="large"
                  delay={0.8}
                />
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto flex items-center justify-center gap-2"
              >
                <AnimatedEmoji 
                  emoji="🎯"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
                Discover premium menswear that combines comfort, durability, and sophisticated style for the modern gentleman.
                <AnimatedEmoji 
                  emoji="🏆"
                  animation="bounce"
                  size="small"
                  delay={0.5}
                />
              </motion.p>
              
              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-8 mb-8"
              >
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-sm">120+ Items</span>
                  <AnimatedEmoji 
                    emoji="📊"
                    animation="wiggle"
                    size="small"
                    delay={0}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-200">
                  <Crown className="h-4 w-4 text-amber-600" />
                  <span className="font-bold text-sm">Premium Quality</span>
                  <AnimatedEmoji 
                    emoji="👑"
                    animation="pulse"
                    size="small"
                    delay={0.2}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
                  <Star className="h-4 w-4 text-gray-600" />
                  <span className="font-bold text-sm">4.8/5 Rating</span>
                  <AnimatedEmoji 
                    emoji="⭐"
                    animation="bounce"
                    size="small"
                    delay={0.4}
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col gap-3 sm:flex-row justify-center"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="rounded-full group bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600 font-bold shadow-lg">
                    <Shirt className="mr-2 h-5 w-5" />
                    Shop Men's Collection
                    <AnimatedEmoji 
                      emoji="🛍️"
                      animation="bounce"
                      size="small"
                      className="ml-2"
                      delay={0}
                    />
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 font-bold"
                    onClick={() => setCurrentPage("size-guide")}
                  >
                    <AnimatedEmoji 
                      emoji="👔"
                      animation="swing"
                      size="small"
                      className="mr-2"
                      delay={0.3}
                    />
                    Size Guide
                    <AnimatedEmoji 
                      emoji="📏"
                      animation="wiggle"
                      size="small"
                      className="ml-2"
                      delay={0.6}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductGrid 
            title="Men's Summer Collection" 
            subtitle="Rugged & Refined 2024"
            products={menProducts}
          />
        </motion.div>
      </main>
    </div>
  );
}
