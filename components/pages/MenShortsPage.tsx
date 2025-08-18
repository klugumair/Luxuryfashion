import { motion } from "framer-motion";
import { Sun, ArrowRight, Star, Waves } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

// Men's Shorts Products Data
const menShortsProducts = [
  {
    id: "msh-001",
    name: "Classic Chino Shorts",
    price: 45,
    image: "https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwc2hvcnRzfGVufDF8fHx8MTc1NTA4NjYzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Versatile chino shorts in stretch cotton twill with 9-inch inseam",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Khaki", "Navy", "Olive", "Stone"],
    brand: "Essential Basics",
    rating: 4.6,
    reviews: 245,
    features: ["Stretch Cotton", "9-inch Inseam", "Versatile Style"],
    icon: <Sun className="w-6 h-6" />,
    popular: true,
    itemCount: "Best Seller",
  },
  {
    id: "msh-002", 
    name: "Board Shorts",
    price: 65,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Quick-dry board shorts with mesh lining and adjustable waistband",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ocean Blue", "Coral", "Black", "Palm Print"],
    brand: "Wave Rider",
    rating: 4.8,
    reviews: 189,
    features: ["Quick Dry", "Mesh Lining", "Adjustable Waist"],
    icon: <Waves className="w-6 h-6" />,
    itemCount: "Beach Ready",
  },
  {
    id: "msh-003",
    name: "Athletic Performance Shorts", 
    price: 52,
    image: "https://images.unsplash.com/photo-1506629905607-c52b8735b7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Lightweight athletic shorts with moisture-wicking and 4-way stretch",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray", "Red"],
    brand: "Active Pro",
    rating: 4.7,
    reviews: 178,
    features: ["Moisture-Wicking", "4-Way Stretch", "Lightweight"],
    icon: <Sun className="w-6 h-6" />,
    itemCount: "Performance",
  },
  {
    id: "msh-004",
    name: "Cargo Utility Shorts",
    price: 58,
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Durable cargo shorts with multiple pockets and rugged construction",
    category: "Shorts", 
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Khaki", "Olive", "Black", "Tan"],
    brand: "Outdoor Gear",
    rating: 4.5,
    reviews: 134,
    features: ["Multiple Pockets", "Durable Fabric", "Utility Style"],
    icon: <Sun className="w-6 h-6" />,
    itemCount: "Utility Style",
  },
  {
    id: "msh-005",
    name: "Linen Blend Shorts",
    price: 68,
    image: "https://images.unsplash.com/photo-1506629905607-c52b8735b7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Breathable linen blend shorts perfect for summer comfort",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"], 
    colors: ["Natural", "White", "Light Blue", "Sage"],
    brand: "Summer Breeze",
    rating: 4.4,
    reviews: 98,
    features: ["Linen Blend", "Breathable", "Summer Comfort"],
    icon: <Sun className="w-6 h-6" />,
    itemCount: "Summer Essential",
  },
  {
    id: "msh-006",
    name: "Denim Shorts",
    price: 48,
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Classic denim shorts with 5-pocket styling and comfortable fit",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Light Wash", "Medium Wash", "Dark Wash", "Black"],
    brand: "Denim Co",
    rating: 4.3,
    reviews: 167,
    features: ["5-Pocket Style", "Comfortable Fit", "Classic Denim"],
    icon: <Sun className="w-6 h-6" />,
    itemCount: "Classic Style",
  },
  {
    id: "msh-007", 
    name: "Golf Performance Shorts",
    price: 75,
    image: "https://images.unsplash.com/photo-1506629905607-c52b8735b7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Technical golf shorts with stretch fabric and moisture management",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Navy", "Khaki", "Gray"],
    brand: "Golf Tech",
    rating: 4.8,
    reviews: 123,
    features: ["Golf Ready", "Stretch Fabric", "Moisture Management"],
    icon: <Sun className="w-6 h-6" />,
    itemCount: "Golf Ready",
  },
  {
    id: "msh-008",
    name: "Swim Trunks",
    price: 55,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Classic swim trunks with mesh lining and drawstring waistband",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Red", "Black", "Tropical Print"],
    brand: "Beach Club",
    rating: 4.6,
    reviews: 89,
    features: ["Mesh Lining", "Drawstring", "Quick Dry"],
    icon: <Waves className="w-6 h-6" />,
    itemCount: "Swim Ready",
  },
  {
    id: "msh-009",
    name: "Hybrid Shorts", 
    price: 62,
    image: "https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Versatile hybrid shorts that work for land and water activities",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Olive", "Navy", "Stone"],
    brand: "Adventure Co",
    rating: 4.7,
    reviews: 156,
    features: ["Land & Water", "Quick Dry", "Versatile"],
    icon: <Sun className="w-6 h-6" />,
    itemCount: "Versatile Style",
  },
  {
    id: "msh-010",
    name: "Flat Front Shorts",
    price: 42,
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Clean flat front shorts with tailored fit and classic styling",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Khaki", "Navy", "Charcoal", "Stone"],
    brand: "Tailored Fit",
    rating: 4.4,
    reviews: 112,
    features: ["Flat Front", "Tailored Fit", "Classic Style"],
    icon: <Sun className="w-6 h-6" />,
    itemCount: "Tailored Fit",
  }
];

// Men's Shorts Page Component
export function MenShortsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-blue-100/40 to-yellow-100/40" />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-blue-100 px-4 py-2 text-sm border border-orange-200 gap-2"
              >
                <Sun className="h-4 w-4 text-orange-600" />
                Men's Summer Shorts
                <AnimatedEmoji 
                  emoji="🩳"
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
                  Summer Shorts
                  <AnimatedEmoji 
                    emoji="☀️"
                    animation="spin"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-orange-600 via-blue-600 to-yellow-600 bg-clip-text text-transparent">
                  Beat The Heat
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto"
              >
                From casual chinos to performance athletic wear, find the perfect shorts for every summer adventure.
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
            title="Men's Shorts Collection" 
            subtitle="Summer Comfort & Style"
            products={menShortsProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}