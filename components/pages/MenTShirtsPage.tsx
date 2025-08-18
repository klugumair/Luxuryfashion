import { motion } from "motion/react";
import { Shirt, ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";
import { useAppContext } from "../../App";

// Men's T-Shirts Products Data
const menTShirtsProducts = [
  {
    id: "mt-001",
    name: "Classic Cotton Crew Neck",
    price: 29,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwY290dG9uJTIwdC1zaGlydHxlbnwxfHx8fDE3NTUwODY2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Premium 100% cotton crew neck tee with perfect fit and lasting comfort",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Gray"],
    brand: "Outlander Basics",
    rating: 4.8,
    reviews: 234,
    features: ["100% Cotton", "Pre-shrunk", "Machine Washable"],
    icon: <Shirt className="w-6 h-6" />,
    popular: true,
    itemCount: "Best Seller",
  },
  {
    id: "mt-002", 
    name: "Vintage Graphic Tee",
    price: 35,
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Retro-inspired graphic tee with vintage wash and distressed details",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Olive", "Rust", "Stone"],
    brand: "Urban Legend",
    rating: 4.6,
    reviews: 189,
    features: ["Vintage Wash", "Screen Print", "Soft Feel"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Limited Edition",
  },
  {
    id: "mt-003",
    name: "Performance Athletic Tee", 
    price: 42,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Moisture-wicking performance tee perfect for workouts and active days",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Red", "White"],
    brand: "Active Pro",
    rating: 4.9,
    reviews: 312,
    features: ["Moisture-Wicking", "Quick-Dry", "Anti-Odor"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Top Rated",
  },
  {
    id: "mt-004",
    name: "Organic V-Neck Tee",
    price: 38,
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Sustainable organic cotton V-neck with modern slim fit",
    category: "T-Shirts", 
    sizes: ["S", "M", "L", "XL"],
    colors: ["Forest", "Slate", "Cream", "Midnight"],
    brand: "EcoWear",
    rating: 4.7,
    reviews: 156,
    features: ["Organic Cotton", "Fair Trade", "Eco-Friendly"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Sustainable Choice",
  },
  {
    id: "mt-005",
    name: "Striped Henley Tee",
    price: 45,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Classic striped henley with three-button placket and relaxed fit",
    category: "T-Shirts",
    sizes: ["M", "L", "XL", "XXL"], 
    colors: ["Navy/White", "Gray/White", "Black/Gray"],
    brand: "Maritime Co",
    rating: 4.5,
    reviews: 98,
    features: ["Button Placket", "Striped Design", "Relaxed Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Classic Style",
  },
  {
    id: "mt-006",
    name: "Premium Long Sleeve Tee",
    price: 48,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Luxe long sleeve tee in premium cotton blend with modern cut",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Wine", "Forest", "Camel"],
    brand: "Premium Basics",
    rating: 4.8,
    reviews: 221,
    features: ["Long Sleeve", "Premium Cotton", "Modern Cut"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Premium Quality",
  },
  {
    id: "mt-007", 
    name: "Pocket Crew Tee",
    price: 32,
    image: "https://images.unsplash.com/photo-1603252109612-ffd9d71ba2b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Classic crew neck with chest pocket in heavyweight cotton",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Heather Gray", "Navy"],
    brand: "Workwear Co",
    rating: 4.4,
    reviews: 167,
    features: ["Chest Pocket", "Heavyweight", "Durable"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Utility Style",
  },
  {
    id: "mt-008",
    name: "Bamboo Blend Tee",
    price: 52,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Ultra-soft bamboo cotton blend with natural antibacterial properties",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Natural", "Sage", "Slate", "Charcoal"],
    brand: "Bamboo Luxe",
    rating: 4.9,
    reviews: 89,
    features: ["Bamboo Blend", "Antibacterial", "Ultra Soft"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Luxury Material",
  },
  {
    id: "mt-009",
    name: "Mesh Detail Sport Tee", 
    price: 55,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Performance tee with mesh panels for enhanced breathability",
    category: "T-Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black/Gray", "Navy/Blue", "White/Silver"],
    brand: "Sport Tech",
    rating: 4.6,
    reviews: 134,
    features: ["Mesh Panels", "Breathable", "Performance Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Performance",
  },
  {
    id: "mt-010",
    name: "Tie-Dye Retro Tee",
    price: 40,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Hand-dyed tie-dye tee with vintage vibes and unique patterns",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue Swirl", "Purple Haze", "Sunset", "Forest Mix"],
    brand: "Retro Revival",
    rating: 4.3,
    reviews: 76,
    features: ["Hand-Dyed", "Unique Pattern", "Vintage Style"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Unique Design",
  }
];

// Men's T-Shirts Page Component
export function MenTShirtsPage() {
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
                Men's T-Shirts Collection
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
                  Essential T-Shirts
                  <AnimatedEmoji 
                    emoji="🎯"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-gray-600 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Comfort & Style
                  <AnimatedEmoji 
                    emoji="✨"
                    animation="spin"
                    size="medium"
                    delay={0.6}
                  />
                </span>
                <AnimatedEmoji 
                  emoji="🔥"
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
                  emoji="👔"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
                From classic crew necks to performance athletic tees, discover the perfect t-shirt for every occasion and style.
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
                  <Shirt className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-sm">10 Styles</span>
                  <AnimatedEmoji 
                    emoji="📊"
                    animation="wiggle"
                    size="small"
                    delay={0}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-200">
                  <Star className="h-4 w-4 text-amber-600" />
                  <span className="font-bold text-sm">Premium Quality</span>
                  <AnimatedEmoji 
                    emoji="🌟"
                    animation="pulse"
                    size="small"
                    delay={0.2}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
                  <Star className="h-4 w-4 text-gray-600" />
                  <span className="font-bold text-sm">4.6/5 Rating</span>
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
                    className="rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 font-bold"
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
            title="Men's T-Shirts Collection" 
            subtitle="Essential Comfort & Style"
            products={menTShirtsProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}