import { motion } from "framer-motion";
import { Zap, ArrowRight, Star, Scissors } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

// Men's Jeans Products Data
const menJeansProducts = [
  {
    id: "mj-001",
    name: "Classic Straight Jeans",
    price: 78,
    image: "https://i.pinimg.com/1200x/29/d9/c9/29d9c9110745a34fa7a38e6ef844f4ad.jpg",
    description: "Timeless straight-cut jeans in premium denim with classic five-pocket styling",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Medium Wash", "Dark Wash", "Light Wash", "Black"],
    brand: "Denim Heritage",
    rating: 4.7,
    reviews: 289,
    features: ["Premium Denim", "Straight Cut", "5-Pocket Style"],
    icon: <Scissors className="w-6 h-6" />,
    popular: true,
    itemCount: "Classic Choice",
  },
  {
    id: "mj-002",
    name: "Slim Fit Stretch Jeans",
    price: 85,
    image: "https://i.pinimg.com/736x/65/92/34/6592342a48615a988d2ad2cff1fb3b8e.jpg",
    description: "Modern slim fit jeans with stretch comfort and contemporary styling",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Dark Indigo", "Black", "Medium Blue", "Gray"],
    brand: "Modern Denim",
    rating: 4.8,
    reviews: 234,
    features: ["Slim Fit", "Stretch Comfort", "Contemporary Style"],
    icon: <Zap className="w-6 h-6" />,
    itemCount: "Modern Fit",
  },
  {
    id: "mj-003",
    name: "Vintage Distressed Jeans",
    price: 95,
    image: "https://i.pinimg.com/736x/db/4c/39/db4c3976e628debc73459111af5c0d09.jpg",
    description: "Authentically distressed jeans with vintage wash and worn-in comfort",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Vintage Blue", "Stone Wash", "Faded Black"],
    brand: "Vintage Revival",
    rating: 4.6,
    reviews: 178,
    features: ["Authentic Distressing", "Vintage Wash", "Worn-in Feel"],
    icon: <Scissors className="w-6 h-6" />,
    itemCount: "Vintage Style",
  },
  {
    id: "mj-004",
    name: "Raw Selvedge Denim",
    price: 145,
    image: "https://i.pinimg.com/1200x/de/49/c8/de49c87f8175114b373352f7472e41e2.jpg",
    description: "Premium raw selvedge denim with traditional construction and aging potential",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Raw Indigo", "Deep Indigo"],
    brand: "Selvedge Co",
    rating: 4.9,
    reviews: 156,
    features: ["Raw Denim", "Selvedge Edge", "Premium Quality"],
    icon: <Star className="w-6 h-6" />,
    itemCount: "Premium Choice",
  },
  {
    id: "mj-005",
    name: "Relaxed Fit Jeans",
    price: 68,
    image: "https://i.pinimg.com/736x/76/ad/51/76ad519d895bf95a7328056daf87c9db.jpg",
    description: "Comfortable relaxed fit jeans with generous room through thigh and leg",
    category: "Jeans",
    sizes: ["32", "34", "36", "38", "40", "42"],
    colors: ["Medium Wash", "Dark Wash", "Light Stone"],
    brand: "Comfort Fit",
    rating: 4.5,
    reviews: 198,
    features: ["Relaxed Fit", "Generous Room", "Comfort Focused"],
    icon: <Scissors className="w-6 h-6" />,
    itemCount: "Comfort Fit",
  },
  {
    id: "mj-006",
    name: "Tapered Athletic Jeans",
    price: 88,
    image: "https://i.pinimg.com/1200x/bd/00/06/bd00060f4582034a0b4498e30532a1f4.jpg",
    description: "Athletic cut jeans with tapered leg and stretch for active lifestyles",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Black", "Charcoal"],
    brand: "Active Denim",
    rating: 4.7,
    reviews: 167,
    features: ["Athletic Cut", "Tapered Leg", "Stretch Fabric"],
    icon: <Zap className="w-6 h-6" />,
    itemCount: "Athletic Fit",
  },
  {
    id: "mj-007",
    name: "Bootcut Jeans",
    price: 75,
    image: "https://i.pinimg.com/1200x/22/42/09/224209b8797b94cc58c9f3a73ede55d0.jpg",
    description: "Classic bootcut jeans with slight flare to accommodate boots",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Medium Wash", "Dark Wash", "Rinse"],
    brand: "Western Style",
    rating: 4.4,
    reviews: 134,
    features: ["Bootcut Style", "Slight Flare", "Boot Friendly"],
    icon: <Scissors className="w-6 h-6" />,
    itemCount: "Boot Ready",
  },
  {
    id: "mj-008",
    name: "Japanese Denim Jeans",
    price: 165,
    image: "https://i.pinimg.com/1200x/c4/f2/0d/c4f20d4eba9ad9a7d02f87afc312b71d.jpg",
    description: "Premium Japanese denim with superior craftsmanship and unique texture",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Deep Indigo", "Midnight Blue"],
    brand: "Japan Premium",
    rating: 4.9,
    reviews: 89,
    features: ["Japanese Denim", "Superior Craft", "Unique Texture"],
    icon: <Star className="w-6 h-6" />,
    itemCount: "Premium Import",
  },
  {
    id: "mj-009",
    name: "Eco-Friendly Jeans",
    price: 92,
    image: "https://i.pinimg.com/736x/c6/16/05/c61605ce1196adaf76db686382790b36.jpg",
    description: "Sustainable jeans made from organic cotton and recycled materials",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Eco Indigo", "Natural Blue", "Earth Tone"],
    brand: "Eco Denim",
    rating: 4.6,
    reviews: 123,
    features: ["Organic Cotton", "Recycled Materials", "Sustainable"],
    icon: <Zap className="w-6 h-6" />,
    itemCount: "Eco-Friendly",
  },
  {
    id: "mj-010",
    name: "Work Utility Jeans",
    price: 82,
    image: "https://i.pinimg.com/736x/62/4a/23/624a233c9180115138325c2566ced214.jpg",
    description: "Heavy-duty work jeans with reinforced knees and tool pockets",
    category: "Jeans",
    sizes: ["32", "34", "36", "38", "40", "42"],
    colors: ["Dark Indigo", "Black", "Stone Wash"],
    brand: "Work Gear",
    rating: 4.5,
    reviews: 201,
    features: ["Reinforced Knees", "Tool Pockets", "Heavy-Duty"],
    icon: <Scissors className="w-6 h-6" />,
    itemCount: "Work Ready",
  }
];

// Men's Jeans Page Component
export function MenJeansPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-slate-100/40 to-blue-100/40" />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-slate-100 px-4 py-2 text-sm border border-indigo-200 gap-2"
              >
                <Scissors className="h-4 w-4 text-indigo-600" />
                Men's Premium Jeans
                <AnimatedEmoji 
                  emoji="👖"
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
                  Denim Collection
                  <AnimatedEmoji 
                    emoji="🔥"
                    animation="bounce"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-indigo-600 via-slate-600 to-blue-600 bg-clip-text text-transparent">
                  Crafted for Life
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto"
              >
                From classic cuts to modern fits, discover premium denim crafted with passion and built to last a lifetime.
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
            title="Men's Jeans Collection" 
            subtitle="Premium Denim Craftsmanship"
            products={menJeansProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}