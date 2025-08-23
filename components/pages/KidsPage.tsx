import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Star, Smile, Zap, Gift } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";
import { kidsProducts } from "../constants";
import { useAppContext } from "../../App";
import { AdminFloatingButton } from "../AdminFloatingButton";
import { QuickAddProduct } from "../QuickAddProduct";

// Kids Collection Page
export function KidsPage() {
  const { setCurrentPage, isAdmin } = useAppContext();
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/40 via-pink-100/40 to-blue-100/40" />
          
          {/* Background elements */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-yellow-300/8 blur-3xl"
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
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-300/8 blur-3xl"
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
                className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-100 to-pink-100 px-4 py-2 text-sm border border-yellow-200 gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="h-4 w-4 text-pink-600" />
                </motion.div>
                Kids Adventure Collection
                <AnimatedEmoji 
                  emoji="🎒"
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
                  Playful & Fun
                  <AnimatedEmoji 
                    emoji="🎪"
                    animation="bounce"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Kids Fashion
                  <AnimatedEmoji 
                    emoji="🌈"
                    animation="swing"
                    size="medium"
                    delay={0.6}
                  />
                </span>
                <AnimatedEmoji 
                  emoji="🎨"
                  className="absolute -right-4 top-0"
                  animation="spin"
                  size="large"
                  delay={0.8}
                />
                <AnimatedEmoji 
                  emoji="🚀"
                  className="absolute -left-4 bottom-0"
                  animation="bounce"
                  size="medium"
                  delay={1.2}
                />
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto flex items-center justify-center gap-2"
              >
                <AnimatedEmoji 
                  emoji="🌟"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
                Adorable and durable clothing designed for little adventurers who love to play, explore, and express themselves.
                <AnimatedEmoji 
                  emoji="🎯"
                  animation="bounce"
                  size="small"
                  delay={0.5}
                />
              </motion.p>
              
              {/* Fun Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-8 mb-8"
              >
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-200">
                  <Smile className="h-4 w-4 text-yellow-600" />
                  <span className="font-bold text-sm">85+ Fun Items</span>
                  <AnimatedEmoji 
                    emoji="🎉"
                    animation="wiggle"
                    size="small"
                    delay={0}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-200">
                  <Zap className="h-4 w-4 text-pink-600" />
                  <span className="font-bold text-sm">Super Comfy</span>
                  <AnimatedEmoji 
                    emoji="😍"
                    animation="pulse"
                    size="small"
                    delay={0.2}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200">
                  <Star className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-sm">Kids Love It!</span>
                  <AnimatedEmoji 
                    emoji="❤️"
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
                  <Button size="lg" className="rounded-full group bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 hover:from-yellow-600 hover:via-pink-600 hover:to-blue-600 font-bold shadow-lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Shop Kids Collection
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
                    className="rounded-full border-pink-300 text-pink-600 hover:bg-pink-50 font-bold"
                    onClick={() => setCurrentPage("size-guide")}
                  >
                    <AnimatedEmoji 
                      emoji="👶"
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

              {/* Fun Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12"
              >
                {[
                  { name: "T-Shirts", emoji: "👕", count: "25+", color: "yellow" },
                  { name: "Shorts", emoji: "🩳", count: "20+", color: "pink" },
                  { name: "Dresses", emoji: "👗", count: "18+", color: "blue" },
                  { name: "Shoes", emoji: "👟", count: "22+", color: "green" }
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-${category.color}-200 hover:border-${category.color}-300 transition-all`}
                  >
                    <AnimatedEmoji 
                      emoji={category.emoji}
                      animation="bounce"
                      size="medium"
                      delay={index * 0.1}
                      className="mb-2"
                    />
                    <h3 className="font-bold text-sm text-zinc-800">{category.name}</h3>
                    <p className="text-xs text-zinc-600">{category.count}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Fun Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 rounded-3xl p-6 max-w-3xl mx-auto border border-yellow-200"
              >
                <div className="flex items-center justify-center gap-2 text-lg font-bold text-zinc-800">
                  <AnimatedEmoji 
                    emoji="🎪"
                    animation="bounce"
                    size="medium"
                    delay={0}
                  />
                  Made for Adventure, Built to Last!
                  <AnimatedEmoji 
                    emoji="💪"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </div>
                <p className="text-sm text-zinc-600 mt-2 flex items-center justify-center gap-2">
                  <AnimatedEmoji 
                    emoji="🌟"
                    animation="spin"
                    size="small"
                    delay={0.5}
                  />
                  Safe fabrics, fun designs, parent approved!
                  <AnimatedEmoji 
                    emoji="👍"
                    animation="wiggle"
                    size="small"
                    delay={0.8}
                  />
                </p>
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
            title="Kids Summer Collection" 
            subtitle="Playful & Practical 2024"
            products={kidsProducts}
          />
        </motion.div>
      </main>


      <QuickAddProduct
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        category="kids"
      />
    </div>
  );
}
