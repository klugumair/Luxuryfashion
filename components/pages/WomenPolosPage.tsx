import { motion } from "motion/react";
import { Crown, ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

// Women's Polos Products Data
const womenPolosProducts = [
  {
    id: "wp-001",
    name: "Classic Pique Polo",
    price: "$42",
    image: "https://images.unsplash.com/photo-1706007903381-1c31ec5dcd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBvbG8lMjBzaGlydHxlbnwxfHx8fDE3NTUxODg3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Timeless pique polo with classic collar and comfortable fit",
    category: "Polos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Navy", "Pink", "Mint", "Lavender"],
    brand: "Classic Elegance",
    rating: 4.8,
    reviews: 256,
    features: ["Pique Cotton", "Classic Collar", "Button Placket"],
    icon: <Crown className="w-6 h-6" />,
    popular: true,
    itemCount: "Best Seller",
  },
  {
    id: "wp-002", 
    name: "Performance Tennis Polo",
    price: "$58",
    image: "https://images.unsplash.com/photo-1714741980848-5b0b77d2cd68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHRlbm5pcyUyMHBvbG98ZW58MXx8fHwxNzU1MTg4NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Athletic polo with moisture-wicking technology for active wear",
    category: "Polos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Navy", "Coral", "Sky Blue"],
    brand: "Sport Luxe",
    rating: 4.9,
    reviews: 189,
    features: ["Moisture-Wicking", "UV Protection", "Athletic Fit"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Performance",
  },
  {
    id: "wp-003",
    name: "Feminine Fitted Polo", 
    price: "$38",
    image: "https://images.unsplash.com/photo-1675106645743-1e47fd7206a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGdvbGYlMjBwb2xvfGVufDF8fHx8MTc1NTE4ODczMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Tailored fit polo designed specifically for women's silhouette",
    category: "Polos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rose", "Sage", "Cream", "Charcoal"],
    brand: "Feminine Fit",
    rating: 4.7,
    reviews: 234,
    features: ["Tailored Fit", "Feminine Cut", "Soft Cotton"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Tailored Fit",
  },
  {
    id: "wp-004",
    name: "Long Sleeve Polo",
    price: "$46",
    image: "https://images.unsplash.com/photo-1706007903381-1c31ec5dcd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Elegant long sleeve polo perfect for cooler weather",
    category: "Polos", 
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Burgundy", "Forest", "Camel"],
    brand: "Autumn Style",
    rating: 4.6,
    reviews: 167,
    features: ["Long Sleeve", "Ribbed Cuffs", "Classic Collar"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Season Essential",
  },
  {
    id: "wp-005",
    name: "Striped Polo Shirt",
    price: "$44",
    image: "https://images.unsplash.com/photo-1714741980848-5b0b77d2cd68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Chic striped polo with preppy vibes and comfortable fit",
    category: "Polos",
    sizes: ["XS", "S", "M", "L"], 
    colors: ["Navy/White", "Pink/White", "Green/White"],
    brand: "Preppy Chic",
    rating: 4.5,
    reviews: 198,
    features: ["Stripe Pattern", "Preppy Style", "Comfortable Fit"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Preppy Style",
  },
  {
    id: "wp-006",
    name: "Organic Cotton Polo",
    price: "$52",
    image: "https://images.unsplash.com/photo-1675106645743-1e47fd7206a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Sustainable organic cotton polo with eco-friendly production",
    category: "Polos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural", "Sage", "Terracotta", "Slate"],
    brand: "Earth Conscious",
    rating: 4.8,
    reviews: 145,
    features: ["Organic Cotton", "Eco-Friendly", "Sustainable"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Eco Choice",
  },
  {
    id: "wp-007", 
    name: "Sleeveless Polo Top",
    price: "$36",
    image: "https://images.unsplash.com/photo-1706007903381-1c31ec5dcd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Modern sleeveless polo perfect for warm weather styling",
    category: "Polos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Coral", "Mint", "Lilac"],
    brand: "Summer Collection",
    rating: 4.4,
    reviews: 156,
    features: ["Sleeveless", "Collar Detail", "Summer Ready"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Summer Style",
  },
  {
    id: "wp-008",
    name: "Luxury Polo Dress",
    price: "$68",
    image: "https://images.unsplash.com/photo-1714741980848-5b0b77d2cd68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Sophisticated polo dress with elegant drape and comfort",
    category: "Polos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Emerald", "Burgundy"],
    brand: "Luxury Line",
    rating: 4.9,
    reviews: 89,
    features: ["Dress Length", "Luxury Fabric", "Elegant Cut"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Luxury",
  },
  {
    id: "wp-009",
    name: "Contrast Trim Polo", 
    price: "$48",
    image: "https://images.unsplash.com/photo-1675106645743-1e47fd7206a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Stylish polo with contrasting trim details for modern look",
    category: "Polos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White/Navy", "Navy/White", "Pink/Navy"],
    brand: "Modern Details",
    rating: 4.6,
    reviews: 178,
    features: ["Contrast Trim", "Modern Design", "Detail Focus"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Designer Detail",
  },
  {
    id: "wp-010",
    name: "Cropped Polo Shirt",
    price: "$40",
    image: "https://images.unsplash.com/photo-1706007903381-1c31ec5dcd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Trendy cropped polo perfect for high-waisted styling",
    category: "Polos",
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Sage", "Blush"],
    brand: "Trend Forward",
    rating: 4.3,
    reviews: 134,
    features: ["Cropped Length", "Trendy Fit", "Modern Style"],
    icon: <Crown className="w-6 h-6" />,
    itemCount: "Trendy",
  }
];

// Women's Polos Page Component
export function WomenPolosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-pink-100/40 to-amber-100/40" />
          
          {/* Background elements */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-300/8 blur-3xl"
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
                className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm border border-purple-200 gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="h-4 w-4 text-purple-600" />
                </motion.div>
                Women's Polo Collection
                <AnimatedEmoji 
                  emoji="👑"
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
                  Elegant Polos
                  <AnimatedEmoji 
                    emoji="✨"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Refined Style
                  <AnimatedEmoji 
                    emoji="💜"
                    animation="spin"
                    size="medium"
                    delay={0.6}
                  />
                </span>
                <AnimatedEmoji 
                  emoji="🌟"
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
                  emoji="👗"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
                Sophisticated polo shirts that effortlessly transition from casual to elevated, designed for the modern woman.
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
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Crown className="h-4 w-4 text-purple-600" />
                  <span className="font-bold text-sm">10 Styles</span>
                  <AnimatedEmoji 
                    emoji="📊"
                    animation="wiggle"
                    size="small"
                    delay={0}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-200">
                  <Star className="h-4 w-4 text-pink-600" />
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
                  <Button size="lg" className="rounded-full group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold shadow-lg">
                    <Crown className="mr-2 h-5 w-5" />
                    Shop Polos
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
                  <Button variant="outline" size="lg" className="rounded-full border-purple-300 text-purple-600 hover:bg-purple-50 font-bold">
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
            title="Women's Polo Collection" 
            subtitle="Elegant & Refined Style"
            products={womenPolosProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}