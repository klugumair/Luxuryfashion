import { motion } from "framer-motion";
import { Shirt, ArrowRight, Star, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

const kidsBoys6M5YTShirtsPolosProducts = [
  {
    id: "kb6m5y-tp-001",
    name: "Superhero T-Shirt",
    price: "$16",
    image: "https://i.pinimg.com/736x/8f/61/57/8f6157da9a5728ab78e610c4bc295504.jpg",
    description: "Fun superhero graphic tee that sparks imagination",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Blue", "Red", "Green", "Black"],
    brand: "Hero Kids",
    rating: 4.9,
    reviews: 234,
    features: ["Superhero Graphics", "Soft Cotton", "Machine Washable"],
    icon: <Shirt className="w-6 h-6" />,
    popular: true,
    itemCount: "Best Seller",
  },
  {
    id: "kb6m5y-tp-002",
    name: "Mini Polo Shirt",
    price: "$19",
    image: "https://i.pinimg.com/736x/5a/d4/65/5ad46531ddaaa804e10c13fa67573649.jpg",
    description: "Classic polo shirt sized perfectly for little ones",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Navy", "White", "Red", "Green"],
    brand: "Little Polo",
    rating: 4.7,
    reviews: 189,
    features: ["Polo Collar", "Button Placket", "Pique Cotton"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Classic",
  },
  {
    id: "kb6m5y-tp-003",
    name: "Animal Print Tee",
    price: "$14",
    image: "https://i.pinimg.com/736x/8f/56/ba/8f56ba18d21f422066c16d69bf20dcc4.jpg",
    description: "Adorable animal-themed t-shirt with vibrant colors",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Safari", "Ocean", "Farm", "Jungle"],
    brand: "Animal Kingdom",
    rating: 4.6,
    reviews: 156,
    features: ["Animal Graphics", "Bright Colors", "Educational"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Educational",
  },
  {
    id: "kb6m5y-tp-004",
    name: "Striped Long Sleeve",
    price: "$18",
    image: "https://i.pinimg.com/736x/1d/9d/25/1d9d25c86a80c4477a720ef8c89905cc.jpg",
    description: "Classic striped long sleeve tee for layering",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Navy/White", "Red/White", "Blue/Gray"],
    brand: "Stripe Style",
    rating: 4.5,
    reviews: 123,
    features: ["Long Sleeve", "Striped Pattern", "Layering"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Classic",
  },
  {
    id: "kb6m5y-tp-005",
    name: "Dinosaur Adventure Tee",
    price: "$15",
    image: "https://i.pinimg.com/736x/b0/6d/fb/b06dfb8d043471156f6f5821a123661a.jpg",
    description: "Roaring dinosaur graphics for little paleontologists",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Green", "Blue", "Orange", "Gray"],
    brand: "Dino Discovery",
    rating: 4.8,
    reviews: 198,
    features: ["Dinosaur Theme", "Educational", "Glow Details"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Adventure",
  },
  {
    id: "kb6m5y-tp-006",
    name: "Pocket Polo",
    price: "$20",
    image: "https://i.pinimg.com/1200x/06/4a/a6/064aa624d0c9bd941475cf7745020db9.jpg",
    description: "Mini polo with functional chest pocket",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["White", "Navy", "Gray", "Light Blue"],
    brand: "Pocket Pals",
    rating: 4.4,
    reviews: 87,
    features: ["Chest Pocket", "Polo Style", "Functional"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Functional",
  },
  {
    id: "kb6m5y-tp-007",
    name: "Space Explorer Tee",
    price: "$17",
    image: "https://i.pinimg.com/1200x/a6/af/9d/a6af9d09192587417c9f62149575ced0.jpg",
    description: "Out-of-this-world space themed t-shirt",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Navy", "Black", "Deep Blue", "Galaxy"],
    brand: "Space Kids",
    rating: 4.7,
    reviews: 145,
    features: ["Space Theme", "Glow-in-Dark", "Educational"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Space",
  },
  {
    id: "kb6m5y-tp-008",
    name: "Car Racing Tee",
    price: "$16",
    image: "https://i.pinimg.com/736x/72/5f/84/725f842e8c0db70358eb77bee224400d.jpg",
    description: "Fast cars and racing themes for speed lovers",
    category: "T-Shirts & Polos",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Red", "Blue", "Yellow", "Black"],
    brand: "Speed Racers",
    rating: 4.6,
    reviews: 167,
    features: ["Car Graphics", "Racing Theme", "Action"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Racing",
  },

];

export function KidsBoys6M5YTShirtsPolosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 via-blue-100/40 to-purple-100/40" />
          
          {/* Background elements */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-300/8 blur-3xl"
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
                className="inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 text-sm border border-green-200 gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Shirt className="h-4 w-4 text-green-600" />
                </motion.div>
                Boys 6M-5Y T-Shirts & Polos
                <AnimatedEmoji 
                  emoji="👶"
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
                  Little Heroes
                  <AnimatedEmoji 
                    emoji="🦸‍♂️"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Fun & Comfort
                  <AnimatedEmoji 
                    emoji="🎨"
                    animation="spin"
                    size="medium"
                    delay={0.6}
                  />
                </span>
                <AnimatedEmoji 
                  emoji="⚡"
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
                  emoji="🌟"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
                Adorable t-shirts and polos designed for little boys who love adventure, fun, and comfort.
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
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-green-200">
                  <Shirt className="h-4 w-4 text-green-600" />
                  <span className="font-bold text-sm">10 Styles</span>
                  <AnimatedEmoji 
                    emoji="📊"
                    animation="wiggle"
                    size="small"
                    delay={0}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200">
                  <Heart className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-sm">Kid-Safe Materials</span>
                  <AnimatedEmoji 
                    emoji="🛡️"
                    animation="pulse"
                    size="small"
                    delay={0.2}
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Star className="h-4 w-4 text-purple-600" />
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
                  <Button size="lg" className="rounded-full group bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold shadow-lg">
                    <Shirt className="mr-2 h-5 w-5" />
                    Shop T-Shirts & Polos
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
                  <Button variant="outline" size="lg" className="rounded-full border-green-300 text-green-600 hover:bg-green-50 font-bold">
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
            title="Boys 6M-5Y T-Shirts & Polos Collection" 
            subtitle="Fun Graphics & Classic Styles for Little Boys"
            products={kidsBoys6M5YTShirtsPolosProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}