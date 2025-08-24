import { motion } from "framer-motion";
import { Shirt, ArrowRight, Star, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

// Men's Polos Products Data
const menPolosProducts = [
  {
    id: "mp-001",
    name: "Classic Pique Polo",
    price: 58,
    image: "https://cdn.plutosport.com/a/ProductMedia/Superdry/P.SUP.POL.3261/Superdry-Classic-Pique-Polo-Heren-2305191056_1.jpg?profile=product_page_image_medium&33",
    description: "Traditional cotton pique polo with three-button placket and ribbed collar",
    category: "Polos",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Red", "Forest Green"],
    brand: "Classic Club",
    rating: 4.7,
    reviews: 234,
    features: ["Cotton Pique", "3-Button Placket", "Ribbed Collar"],
    icon: <Shirt className="w-6 h-6" />,
    popular: true,
    itemCount: "Best Seller",
  },
  {
    id: "mp-002",
    name: "Performance Golf Polo",
    price: 75,
    image: "https://i5.walmartimages.com/asr/e06a7b19-463d-48d7-b89d-8fc556cd7cf7.7248034cdcf3b6adc388bb0a178d7ab5.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    description: "Moisture-wicking golf polo with UV protection and stretch comfort",
    category: "Polos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sky Blue", "Coral", "Charcoal"],
    brand: "Golf Pro",
    rating: 4.8,
    reviews: 189,
    features: ["Moisture-Wicking", "UV Protection", "4-Way Stretch"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Golf Ready",
  },
  {
    id: "mp-003",
    name: "Mercerized Cotton Polo",
    price: 68,
    image: "https://marai.co.uk/cdn/shop/files/Untitled-2-09.jpg?v=1716989973&width=1638",
    description: "Luxurious mercerized cotton polo with silk-like sheen and softness",
    category: "Polos",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Burgundy", "Olive"],
    brand: "Luxury Basics",
    rating: 4.9,
    reviews: 156,
    features: ["Mercerized Cotton", "Silk-Like Feel", "Premium Quality"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Premium Choice",
  },
  {
    id: "mp-004",
    name: "Striped Rugby Polo",
    price: 62,
    image: "https://litb-cgis.rightinthebox.com/desc_image/202411/bps/desc/inc/zivtux1730878031374.jpg",
    description: "Classic rugby-style striped polo with contrast collar and cuffs",
    category: "Polos",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Navy/White", "Red/White", "Green/White", "Black/Gray"],
    brand: "Rugby Heritage",
    rating: 4.5,
    reviews: 98,
    features: ["Stripe Pattern", "Contrast Details", "Rugby Style"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Classic Rugby",
  },
  {
    id: "mp-005",
    name: "Bamboo Polo Shirt",
    price: 85,
    image: "https://www.flyingpointsurf.com/cdn/shop/files/flex-polo-heather-graphite-men-top-1.webp?v=1715530955",
    description: "Eco-friendly bamboo polo with natural temperature regulation",
    category: "Polos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Natural", "Sage", "Charcoal", "Stone"],
    brand: "Eco Sport",
    rating: 4.8,
    reviews: 121,
    features: ["Bamboo Fiber", "Temperature Control", "Sustainable"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Eco-Friendly",
  },
  {
    id: "mp-006",
    name: "Slim Fit Polo",
    price: 55,
    image: "https://img.drz.lazcdn.com/static/bd/p/a227d71b5c091f891942d974efa7848b.jpg_720x720q80.jpg",
    description: "Modern slim fit polo with tapered silhouette and clean lines",
    category: "Polos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Heather Gray"],
    brand: "Modern Fit",
    rating: 4.6,
    reviews: 167,
    features: ["Slim Fit", "Tapered Cut", "Modern Style"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Slim Cut",
  },
  {
    id: "mp-007",
    name: "Long Sleeve Polo",
    price: 72,
    image: "https://cdn.media.amplience.net/s/hottopic/15759622_hi",
    description: "Versatile long sleeve polo perfect for transitional weather",
    category: "Polos",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Wine", "Forest", "Camel"],
    brand: "Season Bridge",
    rating: 4.4,
    reviews: 89,
    features: ["Long Sleeve", "Transitional", "Versatile"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "All Season",
  },
  {
    id: "mp-008",
    name: "Technical Polo Shirt",
    price: 88,
    image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/A79315s.jpg?im=Resize,width=750",
    description: "High-performance technical polo with cooling technology",
    category: "Polos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "White", "Electric Blue"],
    brand: "Tech Sport",
    rating: 4.7,
    reviews: 134,
    features: ["Cooling Tech", "Quick Dry", "Performance Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "High Tech",
  },
  {
    id: "mp-009",
    name: "Vintage Wash Polo",
    price: 65,
    image: "https://n.nordstrommedia.com/it/b9a5ec6d-957c-40a2-b079-de8dad4c206b.jpeg?trim=color&w=350&h=536",
    description: "Vintage-washed polo with faded colors and soft hand feel",
    category: "Polos",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Faded Navy", "Washed Red", "Stone Gray", "Vintage Black"],
    brand: "Vintage Club",
    rating: 4.3,
    reviews: 76,
    features: ["Vintage Wash", "Soft Feel", "Relaxed Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Vintage Style",
  },
  {
    id: "mp-010",
    name: "Pocket Polo Shirt",
    price: 60,
    image: "https://m.media-amazon.com/images/I/6160ysyOexL._AC_SL1500_.jpg",
    description: "Classic polo with chest pocket and comfortable regular fit",
    category: "Polos",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Navy", "Forest Green", "Burgundy"],
    brand: "Utility Style",
    rating: 4.5,
    reviews: 145,
    features: ["Chest Pocket", "Regular Fit", "Practical"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Practical Style",
  }
];


// Men's Polos Page Component
export function MenPolosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 via-blue-100/40 to-amber-100/40" />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-amber-100 px-4 py-2 text-sm border border-green-200 gap-2"
              >
                <Trophy className="h-4 w-4 text-green-600" />
                Men's Polo Collection
                <AnimatedEmoji 
                  emoji="🏌️"
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
                  Classic Polos
                  <AnimatedEmoji 
                    emoji="🎾"
                    animation="bounce"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-amber-600 bg-clip-text text-transparent">
                  Sport Meets Style
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto"
              >
                Discover our premium polo collection combining athletic heritage with contemporary style for every occasion.
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
            title="Men's Polo Collection" 
            subtitle="Athletic Heritage & Modern Style"
            products={menPolosProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}
