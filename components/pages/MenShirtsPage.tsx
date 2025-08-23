import { motion } from "framer-motion";
import { Shirt, ArrowRight, Star, Award } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

// Men's Shirts Products Data
const menShirtsProducts = [
  {
    id: "ms-001",
    name: "Oxford Button-Down Shirt",
    price: 79,
    image: "https://i.pinimg.com/1200x/55/76/d3/5576d310d299c30272a9226bcddd0142.jpg",
    description: "Classic Oxford button-down in premium cotton with timeless styling",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink", "Yellow"],
    brand: "Traditional Fit",
    rating: 4.8,
    reviews: 289,
    features: ["100% Cotton Oxford", "Button-Down Collar", "Classic Fit"],
    icon: <Shirt className="w-6 h-6" />,
    popular: true,
    itemCount: "Classic Choice",
  },
  {
    id: "ms-002",
    name: "Linen Casual Shirt",
    price: 95,
    image: "https://i.pinimg.com/1200x/78/b0/d5/78b0d550a7174705fd97202ba4fd55d4.jpg",
    description: "Lightweight linen shirt perfect for summer days and casual occasions",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Natural", "White", "Sage", "Sand"],
    brand: "Summer Breeze",
    rating: 4.6,
    reviews: 156,
    features: ["100% Linen", "Breathable", "Relaxed Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Summer Essential",
  },
  {
    id: "ms-003",
    name: "Flannel Check Shirt",
    price: 68,
    image: "https://i.pinimg.com/736x/b8/64/f4/b864f4d321b3035da6c70f403601e651.jpg",
    description: "Cozy flannel shirt with classic check pattern for casual comfort",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red Check", "Blue Check", "Green Check", "Gray Check"],
    brand: "Mountain Lodge",
    rating: 4.7,
    reviews: 203,
    features: ["Soft Flannel", "Check Pattern", "Comfortable Fit"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Cozy Style",
  },
  {
    id: "ms-004",
    name: "Formal Dress Shirt",
    price: 89,
    image: "https://i.pinimg.com/736x/6e/1e/f7/6e1ef7309b5775eb3d37fff8888e90a0.jpg",
    description: "Crisp formal dress shirt with French cuffs and spread collar",
    category: "Shirts",
    sizes: ["14.5", "15", "15.5", "16", "16.5", "17"],
    colors: ["White", "Light Blue", "Cream", "Gray"],
    brand: "Executive Wear",
    rating: 4.9,
    reviews: 342,
    features: ["French Cuffs", "Spread Collar", "Wrinkle Resistant"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Business Ready",
  },
  {
    id: "ms-005",
    name: "Chambray Work Shirt",
    price: 72,
    image: "https://i.pinimg.com/736x/d5/5a/97/d55a9740c915dab862a989ac550b38f7.jpg",
    description: "Durable chambray work shirt with chest pockets and sturdy construction",
    category: "Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Indigo", "Light Wash", "Dark Wash"],
    brand: "Work Heritage",
    rating: 4.5,
    reviews: 178,
    features: ["Chambray Fabric", "Chest Pockets", "Durable Build"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Work Ready",
  },
  {
    id: "ms-006",
    name: "Poplin Dress Shirt",
    price: 85,
    image: "https://i.pinimg.com/736x/e7/2c/91/e72c91f63d2551690871eee600553177.jpg",
    description: "Smooth poplin dress shirt with modern slim fit and barrel cuffs",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sky Blue", "Lavender", "Pink"],
    brand: "Modern Fit",
    rating: 4.8,
    reviews: 167,
    features: ["Poplin Weave", "Slim Fit", "Barrel Cuffs"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Slim Fit",
  },
  {
    id: "ms-007",
    name: "Striped Casual Shirt",
    price: 65,
    image: "https://i.pinimg.com/736x/99/11/ca/9911ca450055eddf6cf023e8286b51a6.jpg",
    description: "Classic striped shirt with relaxed fit perfect for weekend wear",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue Stripe", "Red Stripe", "Green Stripe", "Gray Stripe"],
    brand: "Weekend Style",
    rating: 4.4,
    reviews: 134,
    features: ["Stripe Pattern", "Relaxed Fit", "Weekend Ready"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Casual Style",
  },
  {
    id: "ms-008",
    name: "Performance Stretch Shirt",
    price: 98,
    image: "https://i.pinimg.com/736x/7a/38/a8/7a38a813f71368bb8e6dcfbbfe21465b.jpg",
    description: "High-tech performance shirt with 4-way stretch and moisture-wicking",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Charcoal"],
    brand: "Tech Wear",
    rating: 4.9,
    reviews: 78,
    features: ["4-Way Stretch", "Moisture-Wicking", "Wrinkle-Free"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Tech Enhanced",
  },
  {
    id: "ms-009",
    name: "Denim Western Shirt",
    price: 88,
    image: "https://i.pinimg.com/736x/a1/3f/42/a13f429b401b279379125f15b84da15b.jpg",
    description: "Classic Western denim shirt with pearl snap buttons and pointed yokes",
    category: "Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Light Denim", "Dark Denim", "Black Denim"],
    brand: "Western Heritage",
    rating: 4.6,
    reviews: 145,
    features: ["Pearl Snaps", "Western Style", "Pointed Yokes"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Western Style",
  },
  {
    id: "ms-010",
    name: "Bamboo Blend Shirt",
    price: 105,
    image: "https://i.pinimg.com/736x/e8/15/0c/e8150c97067870c5566956fad64d123f.jpg",
    description: "Eco-friendly bamboo blend shirt with natural antibacterial properties",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Natural", "Sage", "Stone", "Charcoal"],
    brand: "Eco Premium",
    rating: 4.7,
    reviews: 89,
    features: ["Bamboo Blend", "Antibacterial", "Sustainable"],
    icon: <Shirt className="w-6 h-6" />,
    itemCount: "Eco-Friendly",
  }
];

// Men's Shirts Page Component
export function MenShirtsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-gray-100/40 to-amber-100/40" />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-amber-100 px-4 py-2 text-sm border border-indigo-200 gap-2"
              >
                <Award className="h-4 w-4 text-indigo-600" />
                Men's Premium Shirts
                <AnimatedEmoji 
                  emoji="👔"
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
                  Refined Shirts
                  <AnimatedEmoji 
                    emoji="✨"
                    animation="pulse"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-indigo-600 via-gray-600 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  Professional & Casual
                  <AnimatedEmoji 
                    emoji="👨‍💼"
                    animation="swing"
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
                From crisp dress shirts to casual weekend styles, discover premium shirts crafted for the modern gentleman.
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
            title="Men's Shirts Collection" 
            subtitle="From Business to Casual"
            products={menShirtsProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}