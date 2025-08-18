import { motion } from "motion/react";
import { Sun, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";
import { summerProducts } from "../constants";

// Summer Collection Page
export function SummerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-yellow-100/40 to-blue-100/40" />
          
          {/* Simplified background elements */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-orange-300/8 blur-3xl"
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
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300/8 blur-3xl"
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
                className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-blue-100 px-4 py-2 text-sm border border-orange-200 gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="h-4 w-4 text-orange-600" />
                </motion.div>
                Limited Time Summer Collection
                <AnimatedEmoji 
                  emoji="⏰"
                  animation="shake"
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
                <span className="block">Summer Essentials</span>
                <span className="block bg-gradient-to-r from-orange-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent">
                  Beat The Heat
                </span>
                <AnimatedEmoji 
                  emoji="🌞"
                  className="absolute -right-4 top-0"
                  animation="pulse"
                  size="large"
                  delay={0.5}
                />
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto"
              >
                Discover our complete summer collection featuring lightweight fabrics, vibrant colors, and essential accessories for the perfect sunny season wardrobe.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col gap-3 sm:flex-row justify-center"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="rounded-full group bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 font-bold shadow-lg">
                    <Sun className="mr-2 h-5 w-5" />
                    Shop Summer Collection
                    <AnimatedEmoji 
                      emoji="🛒"
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
                  <Button variant="outline" size="lg" className="rounded-full border-orange-300 text-orange-600 hover:bg-orange-50 font-bold">
                    <AnimatedEmoji 
                      emoji="📖"
                      animation="wiggle"
                      size="small"
                      className="mr-2"
                      delay={0.3}
                    />
                    View Summer Lookbook
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <ProductGrid 
          title="Summer Essentials Collection" 
          subtitle="Sun, Surf & Style 2024"
          products={summerProducts}
        />
      </main>
    </div>
  );
}