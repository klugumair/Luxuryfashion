import { motion } from "framer-motion";
import { Zap, ArrowRight, Star, Activity } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

// Men's Activewear Products Data
const menActivewearProducts = [
  {
    id: "ma-001",
    name: "Performance Training Tank",
    price: 32,
    image: "https://i.pinimg.com/736x/17/8c/eb/178cebe2c66b97bffb153840050038f1.jpg",
    description: "Moisture-wicking training tank with seamless construction and anti-odor technology",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "White", "Heather Gray"],
    brand: "Performance Pro",
    rating: 4.8,
    reviews: 245,
    features: ["Moisture-Wicking", "Anti-Odor", "Seamless"],
    icon: <Activity className="w-6 h-6" />,
    popular: true,
    itemCount: "Top Performer",
  },
  {
    id: "ma-002", 
    name: "Compression Leggings",
    price: 48,
    image: "https://i.pinimg.com/736x/40/08/a8/4008a8edf41c01b4b6a338653a31371a.jpg",
    description: "Compression leggings with muscle support and 4-way stretch fabric",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal", "Blue"],
    brand: "Compression Core",
    rating: 4.7,
    reviews: 189,
    features: ["Compression Fit", "Muscle Support", "4-Way Stretch"],
    icon: <Zap className="w-6 h-6" />,
    itemCount: "Recovery Ready",
  },
  {
    id: "ma-003",
    name: "Athletic Shorts", 
    price: 38,
    image: "https://it.pinterest.com/pin/4604930699140989440/",
    description: "Lightweight athletic shorts with built-in compression liner and side pockets",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Red", "Gray"],
    brand: "Quick Step",
    rating: 4.6,
    reviews: 178,
    features: ["Compression Liner", "Side Pockets", "Lightweight"],
    icon: <Activity className="w-6 h-6" />,
    itemCount: "Training Ready",
  },
  {
    id: "ma-004",
    name: "Technical Hoodie",
    price: 68,
    image: "https://it.pinterest.com/pin/4609012143500273152/",
    description: "Technical hoodie with moisture management and thumbhole cuffs",
    category: "Activewear", 
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "Navy", "White"],
    brand: "Tech Layer",
    rating: 4.9,
    reviews: 156,
    features: ["Moisture Management", "Thumbhole Cuffs", "Tech Fabric"],
    icon: <Zap className="w-6 h-6" />,
    itemCount: "Tech Enhanced",
  },
  {
    id: "ma-005",
    name: "Running Tights",
    price: 55,
    image: "https://i.pinimg.com/736x/f0/46/c9/f046c93b2000d8306c6da5654ed01cb4.jpg",
    description: "Full-length running tights with reflective details and phone pocket",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL"], 
    colors: ["Black", "Navy", "Dark Gray"],
    brand: "Run Pro",
    rating: 4.8,
    reviews: 134,
    features: ["Reflective Details", "Phone Pocket", "Full Length"],
    icon: <Activity className="w-6 h-6" />,
    itemCount: "Run Ready",
  },
  {
    id: "ma-006",
    name: "Muscle Fit Tank",
    price: 35,
    image: "https://it.pinterest.com/pin/4603593723225980928/",
    description: "Muscle-fit tank top with dropped armholes and performance fabric",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Heather"],
    brand: "Muscle Co",
    rating: 4.5,
    reviews: 167,
    features: ["Muscle Fit", "Dropped Armholes", "Performance Fabric"],
    icon: <Activity className="w-6 h-6" />,
    itemCount: "Gym Ready",
  },
  {
    id: "ma-007", 
    name: "Track Jacket",
    price: 78,
    image: "https://i.pinimg.com/736x/fc/4a/c2/fc4ac2b2502c118bbb53fbc4a4ac3fb3.jpg",
    description: "Classic track jacket with full zip and contrast panels",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black/White", "Navy/Blue", "Gray/Red"],
    brand: "Track Style",
    rating: 4.4,
    reviews: 134,
    features: ["Full Zip", "Contrast Panels", "Classic Style"],
    icon: <Zap className="w-6 h-6" />,
    itemCount: "Classic Style",
  },
  {
    id: "ma-008",
    name: "Yoga Performance Tee",
    price: 42,
    image: "https://i.pinimg.com/1200x/f8/71/54/f87154d5721fb62721b03ed3d4def6f6.jpg",
    description: "Soft performance tee designed for yoga and mindful movement",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sage", "Charcoal", "Stone"],
    brand: "Mind Body",
    rating: 4.7,
    reviews: 89,
    features: ["Soft Touch", "Yoga Inspired", "Mindful Movement"],
    icon: <Activity className="w-6 h-6" />,
    itemCount: "Mindful Movement",
  },
  {
    id: "ma-009",
    name: "Basketball Shorts", 
    price: 45,
    image: "https://i.pinimg.com/736x/0c/d7/82/0cd782dfb28df2028bcad5c6a6b35b79.jpg",
    description: "Mesh basketball shorts with elastic waistband and side pockets",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Red", "Blue", "White"],
    brand: "Court King",
    rating: 4.6,
    reviews: 123,
    features: ["Mesh Fabric", "Elastic Waist", "Side Pockets"],
    icon: <Activity className="w-6 h-6" />,
    itemCount: "Court Ready",
  },
  {
    id: "ma-010",
    name: "Recovery Joggers",
    price: 62,
    image: "https://i.pinimg.com/1200x/cb/b3/7f/cbb37ffce00083f83d26819ee83a9665.jpg",
    description: "Comfortable recovery joggers with tapered fit and soft fleece lining",
    category: "Activewear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Black", "Navy", "Heather Gray"],
    brand: "Recovery Zone",
    rating: 4.5,
    reviews: 145,
    features: ["Fleece Lining", "Tapered Fit", "Recovery Comfort"],
    icon: <Zap className="w-6 h-6" />,
    itemCount: "Recovery Ready",
  }
];

// Men's Activewear Page Component
export function MenActivewearPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 via-blue-100/40 to-green-100/40" />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-red-100 to-blue-100 px-4 py-2 text-sm border border-red-200 gap-2"
              >
                <Activity className="h-4 w-4 text-red-600" />
                Men's Performance Activewear
                <AnimatedEmoji 
                  emoji="🏃‍♂️"
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
                  Performance Gear
                  <AnimatedEmoji 
                    emoji="💪"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-red-600 via-blue-600 to-green-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Push Your Limits
                  <AnimatedEmoji 
                    emoji="🚀"
                    animation="bounce"
                    size="medium"
                    delay={0.6}
                  />
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto"
              >
                Engineered for peak performance with advanced fabrics and cutting-edge technology to elevate your workout.
              </motion.p>
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductGrid 
            title="Men's Activewear Collection" 
            subtitle="Performance Meets Innovation"
            products={menActivewearProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}