import { motion } from "motion/react";
import { Shirt, ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";
import { useAppContext } from "../../App";

// Women's T-Shirts Products Data
const womenTShirtsProducts = [
  {
    id: "wt-001",
    name: "Essential Cotton Crew Tee",
    price: "$26",
    image: "https://images.unsplash.com/photo-1600328759671-85927887458d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvdHRvbiUyMHQtc2hpcnR8ZW58MXx8fHwxNzU1MTg4NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Classic crew neck tee in soft cotton perfect for everyday wear",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Pink", "Gray"],
    brand: "Outlander Essentials",
    rating: 4.9,
    reviews: 342,
    features: ["100% Cotton", "Pre-shrunk", "Machine Washable"],
    icon: <Shirt className="w-6 h-6" />,
    popular: true,
    itemCount: "Best Seller",
  },
  {
    id: "wt-002", 
    name: "Vintage Graphic Tee",
    price: "$32",
    image: "https://images.unsplash.com/photo-1611078844630-85c0a9a34623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGdyYXBoaWMlMjB0ZWV8ZW58MXx8fHwxNzU1MTg4NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Trendy graphic tee with artistic print and relaxed fit",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Sage", "Lavender"],
    brand: "Urban Vibes",
    rating: 4.7,
    reviews: 198,
    features: ["Vintage Wash", "Artistic Print", "Relaxed Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Trending",
  },
  {
    id: "wt-003",
    name: "Soft V-Neck Tee", 
    price: "$28",
    image: "https://images.unsplash.com/photo-1642565459908-a257c19b8083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHYtbmVjayUyMHNoaXJ0fGVufDF8fHx8MTc1NTE4ODYzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Flattering V-neck design in premium soft cotton blend",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rose", "Mint", "Cream", "Charcoal"],
    brand: "Feminine Touch",
    rating: 4.8,
    reviews: 267,
    features: ["V-Neck Design", "Cotton Blend", "Flattering Cut"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Popular Choice",
  },
  {
    id: "wt-004",
    name: "Oversized Boyfriend Tee",
    price: "$35",
    image: "https://images.unsplash.com/photo-1643699749961-d71e0866ee51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxvbmclMjBzbGVldmUlMjB0ZWV8ZW58MXx8fHwxNzU1MTg4NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Comfy oversized fit perfect for lounging or casual outings",
    category: "T-Shirts", 
    sizes: ["S", "M", "L", "XL"],
    colors: ["Heather Gray", "Dusty Pink", "Sage", "Off-White"],
    brand: "Cozy Co",
    rating: 4.6,
    reviews: 189,
    features: ["Oversized Fit", "Drop Shoulder", "Soft Fabric"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Comfort Fit",
  },
  {
    id: "wt-005",
    name: "Cropped Tank Top",
    price: "$24",
    image: "https://images.unsplash.com/photo-1689700672469-0017bfeec930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNyb3AlMjB0b3B8ZW58MXx8fHwxNzU1MTg4NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Trendy cropped tank perfect for layering or summer wear",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L"], 
    colors: ["White", "Black", "Coral", "Sky Blue"],
    brand: "Summer Vibes",
    rating: 4.5,
    reviews: 156,
    features: ["Cropped Length", "Tank Style", "Breathable"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Summer Essential",
  },
  {
    id: "wt-006",
    name: "Organic Long Sleeve Tee",
    price: "$42",
    image: "https://images.unsplash.com/photo-1643699749961-d71e0866ee51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Sustainable organic cotton long sleeve with thumb holes",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural", "Forest", "Terracotta", "Navy"],
    brand: "EcoFemme",
    rating: 4.8,
    reviews: 223,
    features: ["Organic Cotton", "Thumb Holes", "Eco-Friendly"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Eco Choice",
  },
  {
    id: "wt-007", 
    name: "Striped Boat Neck Tee",
    price: "$38",
    image: "https://images.unsplash.com/photo-1600328759671-85927887458d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Classic boat neck tee with timeless stripe pattern",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy/White", "Black/Gray", "Red/White"],
    brand: "Nautical Style",
    rating: 4.7,
    reviews: 134,
    features: ["Boat Neckline", "Stripe Pattern", "Classic Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Timeless Style",
  },
  {
    id: "wt-008",
    name: "Pima Cotton Tee",
    price: "$48",
    image: "https://images.unsplash.com/photo-1642565459908-a257c19b8083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Luxurious Pima cotton tee with exceptional softness",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Champagne", "Blush", "Slate", "Ivory"],
    brand: "Luxury Basics",
    rating: 4.9,
    reviews: 98,
    features: ["Pima Cotton", "Luxury Feel", "Wrinkle Resistant"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Premium Quality",
  },
  {
    id: "wt-009",
    name: "Tie-Front Crop Tee", 
    price: "$31",
    image: "https://images.unsplash.com/photo-1689700672469-0017bfeec930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Cute tie-front detail with adjustable crop length",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Lilac", "Peach", "Mint", "Coral"],
    brand: "Flirty Fashion",
    rating: 4.4,
    reviews: 167,
    features: ["Tie-Front Detail", "Adjustable Length", "Feminine Cut"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Cute & Trendy",
  },
  {
    id: "wt-010",
    name: "Performance Athletic Tee",
    price: "$39",
    image: "https://images.unsplash.com/photo-1611078844630-85c0a9a34623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Moisture-wicking performance tee for active lifestyles",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy", "Forest"],
    brand: "Active Woman",
    rating: 4.8,
    reviews: 284,
    features: ["Moisture-Wicking", "Quick-Dry", "Four-Way Stretch"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Performance",
  }
];

// Women's T-Shirts Page Component
export function WomenTShirtsPage() {
  const { setCurrentPage } = useAppContext();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-purple-100/40 to-amber-100/40" />
          
          {/* Background elements */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-rose-300/8 blur-3xl"
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
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-300/8 blur-3xl"
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
                className="inline-flex items-center rounded-full bg-gradient-to-r from-rose-100 to-purple-100 px-4 py-2 text-sm border border-rose-200 gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Shirt className="h-4 w-4 text-rose-600" />
                </motion.div>
                Women's T-Shirts Collection
                <AnimatedEmoji 
                  emoji="👕"
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
                  Effortless Style
                  <AnimatedEmoji 
                    emoji="✨"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Perfect Fit
                  <AnimatedEmoji 
                    emoji="💖"
                    animation="spin"
                    size="medium"
                    delay={0.6}
                  />
                </span>
                <AnimatedEmoji 
                  emoji="🌸"
                  className="absolute -right-4 top-0"
                  animation="bounce"
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
                  emoji="👚"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
                From classic crew necks to trendy crop tops, discover t-shirts that blend comfort with contemporary style.
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
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-rose-200">
                  <Shirt className="h-4 w-4 text-rose-600" />
                  <span className="font-bold text-sm">10 Styles</span>
                  <AnimatedEmoji 
                    emoji="📊"
                    animation="wiggle"
                    size="small"
                    delay={0}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span className="font-bold text-sm">Premium Quality</span>
                  <AnimatedEmoji 
                    emoji="🌟"
                    animation="pulse"
                    size="small"
                    delay={0.2}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-200">
                  <Star className="h-4 w-4 text-amber-600" />
                  <span className="font-bold text-sm">4.7/5 Rating</span>
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
                  <Button size="lg" className="rounded-full group bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 font-bold shadow-lg">
                    <Shirt className="mr-2 h-5 w-5" />
                    Shop T-Shirts
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
                    className="rounded-full border-rose-300 text-rose-600 hover:bg-rose-50 font-bold"
                    onClick={() => setCurrentPage("size-guide")}
                  >
                    <AnimatedEmoji 
                      emoji="📏"
                      animation="swing"
                      size="small"
                      className="mr-2"
                      delay={0.3}
                    />
                    Size Guide
                    <AnimatedEmoji 
                      emoji="📖"
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
            title="Women's T-Shirts Collection" 
            subtitle="Effortless Style & Perfect Fit"
            products={womenTShirtsProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}