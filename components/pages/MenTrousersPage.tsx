import { motion } from "framer-motion";
import { Award, ArrowRight, Star, Briefcase } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedEmoji } from "../animations";
import { ProductGrid } from "../ProductGrid";

// Men's Trousers Products Data
const menTrousersProducts = [
  {
    const items = [
      {
        id: "mtr-001",
        name: "Classic Dress Trousers",
        price: 89,
        image: "https://i.pinimg.com/1200x/04/c7/a3/04c7a32793abcf6de45dabff8768c929.jpg",
        description: "Tailored dress trousers in premium wool blend with flat front design",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38", "40"],
        colors: ["Charcoal", "Navy", "Black", "Gray"],
        brand: "Executive Wear",
        rating: 4.8,
        reviews: 312,
        features: ["Wool Blend", "Flat Front", "Tailored Fit"],
        icon: <Briefcase className="w-6 h-6" />,
        popular: true,
        itemCount: "Business Ready",
      },
      {
        id: "mtr-002",
        name: "Casual Chino Pants",
        price: 65,
        image: "https://i.pinimg.com/736x/89/19/26/891926270eaf18caa39cbea6a420fd97.jpg",
        description: "Versatile chino pants in stretch cotton twill for all-day comfort",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Khaki", "Navy", "Olive", "Stone", "White"],
        brand: "Casual Comfort",
        rating: 4.6,
        reviews: 248,
        features: ["Stretch Cotton", "Versatile Style", "Comfortable Fit"],
        icon: <Award className="w-6 h-6" />,
        itemCount: "Versatile Choice",
      },
      {
        id: "mtr-003",
        name: "Performance Dress Pants",
        price: 115,
        image: "https://i.pinimg.com/1200x/a3/bb/e1/a3bbe1d3cc42d713e1220e8cab4f369b.jpg",
        description: "Technical dress pants with 4-way stretch and wrinkle resistance",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38", "40"],
        colors: ["Charcoal", "Navy", "Black"],
        brand: "Tech Professional",
        rating: 4.9,
        reviews: 189,
        features: ["4-Way Stretch", "Wrinkle Resistant", "Performance Fabric"],
        icon: <Briefcase className="w-6 h-6" />,
        itemCount: "Tech Enhanced",
      },
      {
        id: "mtr-004",
        name: "Corduroy Pants",
        price: 72,
        image: "https://i.pinimg.com/736x/73/d0/ac/73d0acbd054bae03279544d1ee56a8a4.jpg",
        description: "Classic corduroy pants with soft texture and vintage appeal",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Tan", "Forest Green", "Burgundy", "Navy"],
        brand: "Heritage Style",
        rating: 4.5,
        reviews: 156,
        features: ["Corduroy Texture", "Vintage Style", "Soft Feel"],
        icon: <Award className="w-6 h-6" />,
        itemCount: "Classic Texture",
      },
      {
        id: "mtr-005",
        name: "Linen Dress Pants",
        price: 95,
        image: "https://i.pinimg.com/736x/62/99/07/6299071196a6182e22c5999f12239eab.jpg",
        description: "Breathable linen pants perfect for warm weather formal occasions",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Natural", "White", "Light Gray", "Sage"],
        brand: "Summer Formal",
        rating: 4.7,
        reviews: 134,
        features: ["100% Linen", "Breathable", "Summer Formal"],
        icon: <Award className="w-6 h-6" />,
        itemCount: "Summer Formal",
      },
      {
        id: "mtr-006",
        name: "Pleated Dress Trousers",
        price: 98,
        image: "https://i.pinimg.com/736x/ff/f2/6e/fff26e9f14bf7b0143dde40faa647153.jpg",
        description: "Traditional pleated trousers with classic styling and comfort fit",
        category: "Trousers",
        sizes: ["32", "34", "36", "38", "40", "42"],
        colors: ["Charcoal", "Navy", "Brown", "Black"],
        brand: "Traditional Fit",
        rating: 4.4,
        reviews: 98,
        features: ["Pleated Front", "Traditional Style", "Comfort Fit"],
        icon: <Briefcase className="w-6 h-6" />,
        itemCount: "Traditional Style",
      },
      {
        id: "mtr-007",
        name: "Cargo Pants",
        price: 68,
        image: "https://i.pinimg.com/1200x/9a/3d/5f/9a3d5fd167d66133f39206ab24d6b941.jpg",
        description: "Utility cargo pants with multiple pockets and durable construction",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38", "40"],
        colors: ["Olive", "Khaki", "Black", "Tan"],
        brand: "Utility Wear",
        rating: 4.3,
        reviews: 167,
        features: ["Multiple Pockets", "Durable Fabric", "Utility Style"],
        icon: <Award className="w-6 h-6" />,
        itemCount: "Utility Style",
      },
      {
        id: "mtr-008",
        name: "Slim Fit Trousers",
        price: 78,
        image: "https://i.pinimg.com/736x/ea/3a/04/ea3a0479eac8fb76662343f7bce489f6.jpg",
        description: "Modern slim fit trousers with tapered leg and contemporary styling",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Charcoal", "Navy", "Black", "Dark Gray"],
        brand: "Modern Fit",
        rating: 4.7,
        reviews: 201,
        features: ["Slim Fit", "Tapered Leg", "Modern Style"],
        icon: <Briefcase className="w-6 h-6" />,
        itemCount: "Modern Cut",
      },
      {
        id: "mtr-009",
        name: "Tweed Wool Trousers",
        price: 125,
        image: "https://i.pinimg.com/1200x/c2/41/af/c241affd3f7a780b42f0d27f0eaba948.jpg",
        description: "Luxury tweed wool trousers with heritage pattern and premium finish",
        category: "Trousers",
        sizes: ["32", "34", "36", "38", "40"],
        colors: ["Brown Tweed", "Gray Tweed", "Green Tweed"],
        brand: "Heritage Premium",
        rating: 4.8,
        reviews: 89,
        features: ["Tweed Wool", "Heritage Pattern", "Luxury Finish"],
        icon: <Award className="w-6 h-6" />,
        itemCount: "Luxury Choice",
      },
      {
        id: "mtr-010",
        name: "Travel Tech Pants",
        price: 105,
        image: "https://i.pinimg.com/736x/27/c9/5a/27c95a53e4b935743951fa5a0317b1dd.jpg",
        description: "Travel-friendly tech pants with wrinkle resistance and stretch comfort",
        category: "Trousers",
        sizes: ["30", "32", "34", "36", "38", "40"],
        colors: ["Charcoal", "Navy", "Black", "Khaki"],
        brand: "Travel Pro",
        rating: 4.6,
        reviews: 145,
        features: ["Travel Friendly", "Wrinkle Resistant", "Stretch Comfort"],
        icon: <Briefcase className="w-6 h-6" />,
        itemCount: "Travel Ready",
      }
    ];
    
  }
];

// Men's Trousers Page Component
export function MenTrousersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-blue-100/40 to-amber-100/40" />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-100 to-blue-100 px-4 py-2 text-sm border border-slate-200 gap-2"
              >
                <Briefcase className="h-4 w-4 text-slate-600" />
                Men's Premium Trousers
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
                  Premium Trousers
                  <AnimatedEmoji 
                    emoji="🎩"
                    animation="bounce"
                    size="medium"
                    delay={0.3}
                  />
                </span>
                <span className="block bg-gradient-to-r from-slate-600 via-blue-600 to-amber-600 bg-clip-text text-transparent">
                  Professional & Casual
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[800px] text-zinc-600 md:text-xl font-medium mx-auto"
              >
                From tailored dress pants to casual chinos, discover premium trousers crafted for comfort and sophistication.
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
            title="Men's Trousers Collection" 
            subtitle="Professional & Casual Excellence"
            products={menTrousersProducts} 
          />
        </motion.div>
      </main>
    </div>
  );
}