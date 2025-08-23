import { 
  Sun, 
  Waves, 
  Crown, 
  Palmtree, 
  Umbrella, 
  Shirt, 
  Mountain, 
  Heart, 
  Sparkles, 
  ShoppingBag, 
  TrendingUp, 
  Shield, 
  Truck, 
  RefreshCw, 
  Calendar, 
  Star, 
  Activity, 
  Zap,
  Gem,
  Baby,
  Users
} from "lucide-react";

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const itemFadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Product interfaces
export interface ProductCategory {
  name: string;
  icon: React.ReactNode;
  image: string;
  description: string;
  itemCount: string;
  popular?: boolean;
  color: string;
  price: string;
  page?: string;
}

// Navigation items
export const navigationItems = [
  { name: "Men", page: "men", hasDropdown: true, dropdownType: "men" },
  { name: "Women", page: "women", hasDropdown: true, dropdownType: "women" },
  { name: "Kids", page: "kids", hasDropdown: true, dropdownType: "kids" },
  { name: "Accessories", page: "accessories", hasDropdown: true, dropdownType: "accessories" },
  { name: "Summer Collection", page: "summer" },
  { name: "Contact", page: "social-handle" }
];

// Men's subcategories
export const menSubcategories = [
  { name: "T-Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👕", page: "men-tshirts" },
  { name: "Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👔", page: "men-shirts" },
  { name: "Polos", icon: <Crown className="h-4 w-4" />, emoji: "🎽", page: "men-polos" },
  { name: "Shorts", icon: <Sun className="h-4 w-4" />, emoji: "🩳", page: "men-shorts" },
  { name: "Trousers", icon: <Zap className="h-4 w-4" />, emoji: "👖", page: "men-trousers" },
  { name: "Jeans", icon: <Mountain className="h-4 w-4" />, emoji: "👖", page: "men-jeans" },
  { name: "Activewear", icon: <Activity className="h-4 w-4" />, emoji: "🏃‍♂️", page: "men-activewear" },
];

// Women's subcategories
export const womenSubcategories = [
  { name: "T-Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👕", page: "women-tshirts" },
  { name: "Polos", icon: <Crown className="h-4 w-4" />, emoji: "🎽", page: "women-polos" },
  { name: "Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👚", page: "women-shirts" },
  { name: "Skirts | Shorts", icon: <Sun className="h-4 w-4" />, emoji: "🩳", page: "women-skirts-shorts" },
  { name: "Dresses | Jumpsuits", icon: <Crown className="h-4 w-4" />, emoji: "👗", page: "women-dresses-jumpsuits" },
  { name: "Activewear", icon: <Activity className="h-4 w-4" />, emoji: "🏃‍♀️", page: "women-activewear" },
  { name: "Trousers", icon: <Zap className="h-4 w-4" />, emoji: "👖", page: "women-trousers" },
  { name: "Jeans", icon: <Mountain className="h-4 w-4" />, emoji: "👖", page: "women-jeans" },
];

// Accessories subcategories
export const accessoriesSubcategories = [
  { name: "Men's Accessories", icon: <Gem className="h-4 w-4" />, emoji: "⌚", page: "men-accessories" },
  { name: "Women's Accessories", icon: <Crown className="h-4 w-4" />, emoji: "👜", page: "women-accessories" },
];

// Kids subcategories organized by gender and age groups
export const kidsSubcategories = [
  {
    category: "BOYS",
    emoji: "👦",
    ageGroups: [
      {
        name: "6M - 5 YEARS",
        icon: <Baby className="h-4 w-4" />,
        emoji: "🧸",
        subcategories: [
          { name: "Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👔", page: "kids-boys-6m5y-shirts" },
          { name: "T-Shirts | Polos", icon: <Shirt className="h-4 w-4" />, emoji: "👕", page: "kids-boys-6m5y-tshirts-polos" },
          { name: "Co-Ord Sets", icon: <Crown className="h-4 w-4" />, emoji: "👔", page: "kids-boys-6m5y-coord-sets" },
          { name: "Shorts", icon: <Sun className="h-4 w-4" />, emoji: "🩳", page: "kids-boys-6m5y-shorts" },
          { name: "Trousers", icon: <Zap className="h-4 w-4" />, emoji: "👖", page: "kids-boys-6m5y-trousers" },
          { name: "Jeans", icon: <Mountain className="h-4 w-4" />, emoji: "👖", page: "kids-boys-6m5y-jeans" }
        ]
      },
      {
        name: "6 - 14 YEARS",
        icon: <Users className="h-4 w-4" />,
        emoji: "⚽",
        subcategories: [
          { name: "Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👔", page: "kids-boys-6-14y-shirts" },
          { name: "T-Shirts | Polos", icon: <Shirt className="h-4 w-4" />, emoji: "👕", page: "kids-boys-6-14y-tshirts-polos" },
          { name: "Co-Ord Sets", icon: <Crown className="h-4 w-4" />, emoji: "👔", page: "kids-boys-6-14y-coord-sets" },
          { name: "Shorts", icon: <Sun className="h-4 w-4" />, emoji: "🩳", page: "kids-boys-6-14y-shorts" },
          { name: "Trousers", icon: <Zap className="h-4 w-4" />, emoji: "👖", page: "kids-boys-6-14y-trousers" },
          { name: "Jeans", icon: <Mountain className="h-4 w-4" />, emoji: "👖", page: "kids-boys-6-14y-jeans" }
        ]
      }
    ]
  },
  {
    category: "GIRLS",
    emoji: "👧",
    ageGroups: [
      {
        name: "6M - 5 YEARS",
        icon: <Baby className="h-4 w-4" />,
        emoji: "🍼",
        subcategories: [
          { name: "Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👚", page: "kids-girls-6m5y-shirts" },
          { name: "T-Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👕", page: "kids-girls-6m5y-tshirts" },
          { name: "Dresses | Jumpsuits", icon: <Crown className="h-4 w-4" />, emoji: "👗", page: "kids-girls-6m5y-dresses-jumpsuits" },
          { name: "Co-Ord Sets", icon: <Crown className="h-4 w-4" />, emoji: "👗", page: "kids-girls-6m5y-coord-sets" },
          { name: "Shorts | Skirts", icon: <Sun className="h-4 w-4" />, emoji: "🩳", page: "kids-girls-6m5y-shorts-skirts" },
          { name: "Trousers", icon: <Zap className="h-4 w-4" />, emoji: "👖", page: "kids-girls-6m5y-trousers" },
          { name: "Jeans", icon: <Mountain className="h-4 w-4" />, emoji: "👖", page: "kids-girls-6m5y-jeans" }
        ]
      },
      {
        name: "6 - 14 YEARS",
        icon: <Users className="h-4 w-4" />,
        emoji: "🎒",
        subcategories: [
          { name: "Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👚", page: "kids-girls-6-14y-shirts" },
          { name: "T-Shirts", icon: <Shirt className="h-4 w-4" />, emoji: "👕", page: "kids-girls-6-14y-tshirts" },
          { name: "Dresses | Jumpsuits", icon: <Crown className="h-4 w-4" />, emoji: "👗", page: "kids-girls-6-14y-dresses-jumpsuits" },
          { name: "Co-Ord Sets", icon: <Crown className="h-4 w-4" />, emoji: "👗", page: "kids-girls-6-14y-coord-sets" },
          { name: "Shorts | Skirts", icon: <Sun className="h-4 w-4" />, emoji: "🩳", page: "kids-girls-6-14y-shorts-skirts" },
          { name: "Trousers", icon: <Zap className="h-4 w-4" />, emoji: "👖", page: "kids-girls-6-14y-trousers" },
          { name: "Jeans", icon: <Mountain className="h-4 w-4" />, emoji: "👖", page: "kids-girls-6-14y-jeans" }
        ]
      }
    ]
  }
];

// Social platforms
export const socialPlatforms = [
  { icon: "Instagram", label: "Instagram" },
  { icon: "Twitter", label: "Twitter" },
  { icon: "Linkedin", label: "LinkedIn" },
  { icon: "Facebook", label: "Facebook" },
];

// Stats data
export const stats = [
  { icon: <ShoppingBag />, value: 10000, label: "Happy Customers", suffix: "+", emoji: "😊" },
  { icon: <Shirt />, value: 500, label: "Products Available", suffix: "+", emoji: "👕" },
  { icon: <Calendar />, value: 5, label: "Years in Business", suffix: "", emoji: "🎂" },
  { icon: <Star />, value: 98, label: "Customer Satisfaction", suffix: "%", emoji: "⭐" },
];

// Features data
export const features = [
  {
    icon: <Shield className="h-10 w-10 text-amber-600" />,
    title: "Premium Materials",
    description: "High-quality fabrics sourced from trusted suppliers worldwide, ensuring lasting comfort and durability.",
    emoji: "🛡️"
  },
  {
    icon: <Truck className="h-10 w-10 text-purple-600" />,
    title: "Fast Shipping",
    description: "Free shipping on orders over $75 with express delivery options available nationwide.",
    emoji: "🚚"
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-rose-600" />,
    title: "Easy Returns",
    description: "30-day hassle-free returns and exchanges. Your satisfaction is our priority.",
    emoji: "🔄"
  },
  {
    icon: <Sun className="h-10 w-10 text-amber-600" />,
    title: "Summer Ready",
    description: "Breathable, lightweight designs perfect for hot weather and outdoor adventures.",
    emoji: "🌞"
  },
  {
    icon: <Waves className="h-10 w-10 text-purple-600" />,
    title: "Moisture Wicking",
    description: "Advanced fabric technology that keeps you cool and dry during active pursuits.",
    emoji: "💧"
  },
  {
    icon: <Mountain className="h-10 w-10 text-rose-600" />,
    title: "Adventure Ready",
    description: "Durable designs built for outdoor exploration and everyday adventures.",
    emoji: "⛰️"
  },
];

// Reviews data
export const reviews = [
  {
    quote: "The summer collection is amazing! The fabric is so breathable and comfortable, perfect for hiking and outdoor activities.",
    author: "Sarah Johnson",
    company: "Outdoor Enthusiast",
    emoji: "🥾"
  },
  {
    quote: "I've ordered multiple items from Outlander and the quality is consistently excellent. Fast shipping too!",
    author: "Michael Chen",
    company: "Adventure Photographer",
    emoji: "📸"
  },
  {
    quote: "Love the kids' collection! My daughter is obsessed with her new summer outfits. Great quality and fun designs.",
    author: "Emma Rodriguez",
    company: "Mom of Two",
    emoji: "👨‍👩‍👧‍👦"
  },
  {
    quote: "Outstanding customer service and the clothes fit perfectly. The moisture-wicking technology really works!",
    author: "David Kim",
    company: "Fitness Trainer",
    emoji: "💪"
  },
];

// Summer products data
export const summerProducts: ProductCategory[] = [
  {
    name: "Beach T-Shirts",
    icon: <Sun className="w-5 h-5" />,
    image: "https://i.pinimg.com/736x/67/e5/b9/67e5b9a1b2370ee25972a3da55e3f5f3.jpg",
    description: "Ultra-light tees perfect for beach days",
    itemCount: "30+ designs",
    price: "$25",
    color: "amber",
    popular: true,
  },
  {
    name: "Swim Shorts",
    icon: <Waves className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=2070&auto=format&fit=crop",
    description: "Quick-dry board shorts for water activities",
    itemCount: "20+ patterns",
    price: "$42",
    color: "purple",
  },
  {
    name: "Sun Dresses",
    icon: <Crown className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2088&auto=format&fit=crop",
    description: "Flowing dresses for hot summer days",
    itemCount: "25+ styles",
    price: "$58",
    color: "rose",
  },
  {
    name: "Linen Pants",
    icon: <Palmtree className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Breathable linen pants for comfort",
    itemCount: "15+ colors",
    price: "$65",
    color: "amber",
  },
  {
    name: "Beach Cover-ups",
    icon: <Umbrella className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1566479179817-c970b1ad9d8c?q=80&w=2070&auto=format&fit=crop",
    description: "Lightweight cover-ups for beach lounging",
    itemCount: "18+ designs",
    price: "$35",
    color: "purple",
  },
  {
    name: "Hawaiian Shirts",
    icon: <Palmtree className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop",
    description: "Tropical prints for vacation vibes",
    itemCount: "22+ prints",
    price: "$48",
    color: "rose",
  },
  {
    name: "Summer Sandals",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    description: "Comfortable sandals for warm weather",
    itemCount: "12+ styles",
    price: "$38",
    color: "amber",
  },
  {
    name: "Sun Hats",
    icon: <Umbrella className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=2070&auto=format&fit=crop",
    description: "Stylish protection from the sun",
    itemCount: "16+ styles",
    price: "$28",
    color: "purple",
  },
  {
    name: "Tank Tops",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=2070&auto=format&fit=crop",
    description: "Breathable tanks for hot weather",
    itemCount: "28+ colors",
    price: "$22",
    color: "rose",
  },
  {
    name: "Beach Bags",
    icon: <ShoppingBag className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    description: "Waterproof bags for beach essentials",
    itemCount: "10+ designs",
    price: "$32",
    color: "amber",
  },
  {
    name: "Flip Flops",
    icon: <Waves className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1506629905607-45ce0a5b39b8?q=80&w=2070&auto=format&fit=crop",
    description: "Classic flip flops for beach days",
    itemCount: "20+ colors",
    price: "$18",
    color: "purple",
  },
  {
    name: "Sunglasses",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop",
    description: "UV protection with style",
    itemCount: "14+ frames",
    price: "$45",
    color: "rose",
  },
];

// Men's products data - Extended to 20 items
export const menProducts: ProductCategory[] = [
  {
    name: "Summer T-Shirts",
    icon: <Shirt className="w-5 h-5" />,
    image: "https://i.pinimg.com/736x/67/e5/b9/67e5b9a1b2370ee25972a3da55e3f5f3.jpg",
    description: "Breathable cotton tees for everyday comfort",
    itemCount: "25+ designs",
    price: "$29",
    color: "amber",
  },
  {
    name: "Cargo Shorts",
    icon: <Mountain className="w-5 h-5" />,
    image: "https://i.pinimg.com/736x/a2/4c/59/a24c59acf5215cb3642f7ec62304b179.jpg",
    description: "Durable shorts with multiple pockets",
    itemCount: "15+ styles",
    price: "$45",
    color: "purple",
    popular: true,
  },
  {
    name: "Polo Shirts",
    icon: <Crown className="w-5 h-5" />,
    image: "https://i.pinimg.com/1200x/c8/25/f6/c825f6349acce996cd8c016ee02fe327.jpg",
    description: "Classic polo shirts for casual elegance",
    itemCount: "20+ colors",
    price: "$39",
    color: "rose",
  },
  {
    name: "Board Shorts",
    icon: <Waves className="w-5 h-5" />,
    image: "https://i.pinimg.com/736x/23/aa/45/23aa453c225b0e752634477f7961f572.jpg",
    description: "Quick-dry shorts perfect for beach days",
    itemCount: "12+ patterns",
    price: "$35",
    color: "amber",
  },
  {
    name: "Tank Tops",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=2070&auto=format&fit=crop",
    description: "Lightweight tanks for hot summer days",
    itemCount: "18+ styles",
    price: "$22",
    color: "purple",
  },
  {
    name: "Linen Shirts",
    icon: <Palmtree className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop",
    description: "Breathable linen for tropical vibes",
    itemCount: "10+ colors",
    price: "$55",
    color: "rose",
  },
  {
    name: "Athletic Shorts",
    icon: <TrendingUp className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1506629905607-45ce0a5b39b8?q=80&w=2070&auto=format&fit=crop",
    description: "Performance shorts for active lifestyle",
    itemCount: "22+ options",
    price: "$32",
    color: "amber",
  },
  {
    name: "Casual Hoodies",
    icon: <Mountain className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2070&auto=format&fit=crop",
    description: "Lightweight hoodies for cooler evenings",
    itemCount: "14+ designs",
    price: "$48",
    color: "purple",
  },
  {
    name: "Denim Jeans",
    icon: <Zap className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2126&auto=format&fit=crop",
    description: "Classic fit jeans in multiple washes",
    itemCount: "12+ washes",
    price: "$65",
    color: "rose",
    popular: true,
  },
  {
    name: "Chino Pants",
    icon: <Shirt className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Smart casual chinos for versatile styling",
    itemCount: "16+ colors",
    price: "$52",
    color: "amber",
  },
  {
    name: "Graphic Tees",
    icon: <Star className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1503341338985-b4c2a0c3e15b?q=80&w=2070&auto=format&fit=crop",
    description: "Trendy graphic designs for casual wear",
    itemCount: "30+ graphics",
    price: "$26",
    color: "purple",
  },
  {
    name: "Henley Shirts",
    icon: <Heart className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2080&auto=format&fit=crop",
    description: "Casual button-up style with comfort",
    itemCount: "8+ colors",
    price: "$34",
    color: "rose",
  },
  {
    name: "Swim Trunks",
    icon: <Waves className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2070&auto=format&fit=crop",
    description: "Stylish swimwear for beach and pool",
    itemCount: "14+ patterns",
    price: "$38",
    color: "amber",
  },
  {
    name: "Flannel Shirts",
    icon: <Shield className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    description: "Cozy flannel for layering and warmth",
    itemCount: "10+ plaids",
    price: "$42",
    color: "purple",
  },
  {
    name: "Track Pants",
    icon: <Activity className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1506629905607-45ce0a5b39b8?q=80&w=2070&auto=format&fit=crop",
    description: "Comfortable pants for sports and leisure",
    itemCount: "12+ styles",
    price: "$36",
    color: "rose",
  },
  {
    name: "V-Neck Sweaters",
    icon: <Crown className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
    description: "Elegant sweaters for smart casual looks",
    itemCount: "8+ colors",
    price: "$58",
    color: "amber",
  },
  {
    name: "Cargo Pants",
    icon: <Mountain className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=2080&auto=format&fit=crop",
    description: "Utility pants with multiple pockets",
    itemCount: "6+ colors",
    price: "$48",
    color: "purple",
  },
  {
    name: "Compression Shirts",
    icon: <TrendingUp className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    description: "Performance wear for intense workouts",
    itemCount: "10+ colors",
    price: "$44",
    color: "rose",
  },
  {
    name: "Windbreaker Jackets",
    icon: <Shield className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    description: "Lightweight protection from wind and rain",
    itemCount: "8+ designs",
    price: "$62",
    color: "amber",
    popular: true,
  },
  {
    name: "Jogger Pants",
    icon: <Activity className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Trendy joggers for casual comfort",
    itemCount: "14+ styles",
    price: "$40",
    color: "purple",
  },
];

// Women's products data - Extended to 20 items
export const womenProducts: ProductCategory[] = [
  {
    name: "Flowy Dresses",
    icon: <Crown className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2088&auto=format&fit=crop",
    description: "Elegant summer dresses in vibrant colors",
    itemCount: "30+ styles",
    price: "$65",
    color: "purple",
    popular: true,
  },
  {
    name: "Crop Tops",
    icon: <Sun className="w-5 h-5" />,
    image: "https://m.media-amazon.com/images/I/61p1++lRy8L._AC_SL1500_.jpg",
    description: "Trendy crop tops for layering",
    itemCount: "25+ designs",
    price: "$28",
    color: "amber",
  },
  {
    name: "Midi Skirts",
    icon: <Sparkles className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Versatile skirts for any occasion",
    itemCount: "20+ patterns",
    price: "$42",
    color: "rose",
  },
  {
    name: "Blouses",
    icon: <Gem className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    description: "Sophisticated blouses for work and play",
    itemCount: "18+ colors",
    price: "$52",
    color: "purple",
  },
  {
    name: "Denim Shorts",
    icon: <Heart className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2070&auto=format&fit=crop",
    description: "Classic denim shorts in various washes",
    itemCount: "15+ styles",
    price: "$38",
    color: "amber",
  },
  {
    name: "Rompers",
    icon: <Waves className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    description: "Comfortable one-piece summer outfits",
    itemCount: "12+ prints",
    price: "$45",
    color: "rose",
  },
  {
    name: "Camisoles",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1566479179817-c970b1ad9d8c?q=80&w=2070&auto=format&fit=crop",
    description: "Silky camisoles for layering or solo wear",
    itemCount: "22+ shades",
    price: "$24",
    color: "purple",
  },
  {
    name: "Maxi Dresses",
    icon: <Palmtree className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2070&auto=format&fit=crop",
    description: "Floor-length dresses for elegant occasions",
    itemCount: "16+ designs",
    price: "$72",
    color: "amber",
  },
  {
    name: "High-Waisted Jeans",
    icon: <Mountain className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2126&auto=format&fit=crop",
    description: "Flattering high-waisted denim styles",
    itemCount: "14+ fits",
    price: "$68",
    color: "rose",
    popular: true,
  },
  {
    name: "Wrap Tops",
    icon: <Heart className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Flattering wrap-style tops for all body types",
    itemCount: "12+ colors",
    price: "$36",
    color: "purple",
  },
  {
    name: "Palazzo Pants",
    icon: <Sparkles className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Flowy wide-leg pants for comfort and style",
    itemCount: "10+ patterns",
    price: "$54",
    color: "amber",
  },
  {
    name: "Bodycon Dresses",
    icon: <Crown className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2088&auto=format&fit=crop",
    description: "Figure-hugging dresses for night out",
    itemCount: "18+ styles",
    price: "$58",
    color: "rose",
  },
  {
    name: "Kimono Cardigans",
    icon: <Palmtree className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1566479179817-c970b1ad9d8c?q=80&w=2070&auto=format&fit=crop",
    description: "Boho-style cardigans for layering",
    itemCount: "8+ prints",
    price: "$46",
    color: "purple",
  },
  {
    name: "Activewear Sets",
    icon: <Activity className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1506629905607-45ce0a5b39b8?q=80&w=2070&auto=format&fit=crop",
    description: "Matching workout sets for gym and yoga",
    itemCount: "15+ sets",
    price: "$62",
    color: "amber",
  },
  {
    name: "Pleated Skirts",
    icon: <Star className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Classic pleated skirts in various lengths",
    itemCount: "12+ colors",
    price: "$44",
    color: "rose",
  },
  {
    name: "Off-Shoulder Tops",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    description: "Romantic off-shoulder style tops",
    itemCount: "16+ designs",
    price: "$34",
    color: "purple",
  },
  {
    name: "Wide-Leg Trousers",
    icon: <Gem className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Professional wide-leg trousers",
    itemCount: "10+ colors",
    price: "$56",
    color: "amber",
  },
  {
    name: "Peplum Tops",
    icon: <Crown className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1566479179817-c970b1ad9d8c?q=80&w=2070&auto=format&fit=crop",
    description: "Flattering peplum silhouette tops",
    itemCount: "14+ styles",
    price: "$40",
    color: "rose",
  },
  {
    name: "Linen Blazers",
    icon: <Shield className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    description: "Lightweight blazers for professional looks",
    itemCount: "8+ colors",
    price: "$78",
    color: "purple",
    popular: true,
  },
  {
    name: "Tunic Dresses",
    icon: <Waves className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2088&auto=format&fit=crop",
    description: "Comfortable tunic-style dresses",
    itemCount: "20+ prints",
    price: "$50",
    color: "amber",
  },
];

// Kids products data - Extended to 20 items
export const kidsProducts: ProductCategory[] = [
  {
    name: "Fun T-Shirts",
    icon: <Heart className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=2070&auto=format&fit=crop",
    description: "Colorful tees with playful prints",
    itemCount: "35+ designs",
    price: "$18",
    color: "rose",
    popular: true,
  },
  {
    name: "Play Shorts",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1522202757859-7472b0973c69?q=80&w=2070&auto=format&fit=crop",
    description: "Comfortable shorts for active kids",
    itemCount: "20+ colors",
    price: "$22",
    color: "amber",
  },
  {
    name: "Summer Dresses",
    icon: <Sparkles className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=2070&auto=format&fit=crop",
    description: "Adorable dresses for little fashionistas",
    itemCount: "25+ styles",
    price: "$32",
    color: "purple",
  },
  {
    name: "Swim Suits",
    icon: <Waves className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=2070&auto=format&fit=crop",
    description: "Fun swimwear for pool and beach days",
    itemCount: "18+ patterns",
    price: "$25",
    color: "rose",
  },
  {
    name: "Tank Tops",
    icon: <Mountain className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1503944168849-b7d1e0c97048?q=80&w=2070&auto=format&fit=crop",
    description: "Breathable tanks for hot days",
    itemCount: "15+ graphics",
    price: "$16",
    color: "amber",
  },
  {
    name: "Cargo Shorts",
    icon: <Shield className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=2070&auto=format&fit=crop",
    description: "Durable shorts with fun pockets",
    itemCount: "12+ styles",
    price: "$28",
    color: "purple",
  },
  {
    name: "Polo Shirts",
    icon: <Crown className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1519339535894-df5e8d0dd83c?q=80&w=2070&auto=format&fit=crop",
    description: "Smart casual polos for special occasions",
    itemCount: "14+ colors",
    price: "$24",
    color: "rose",
  },
  {
    name: "Jumpsuits",
    icon: <Gem className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=2070&auto=format&fit=crop",
    description: "One-piece outfits for easy dressing",
    itemCount: "10+ prints",
    price: "$34",
    color: "amber",
  },
  {
    name: "Graphic Hoodies",
    icon: <Star className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2070&auto=format&fit=crop",
    description: "Cozy hoodies with fun character prints",
    itemCount: "20+ designs",
    price: "$38",
    color: "purple",
    popular: true,
  },
  {
    name: "Leggings",
    icon: <Activity className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Stretchy leggings for active play",
    itemCount: "16+ patterns",
    price: "$20",
    color: "rose",
  },
  {
    name: "Denim Jackets",
    icon: <Mountain className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    description: "Classic denim jackets in kid sizes",
    itemCount: "6+ washes",
    price: "$42",
    color: "amber",
  },
  {
    name: "Tutu Skirts",
    icon: <Crown className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=2070&auto=format&fit=crop",
    description: "Sparkly tutu skirts for dress-up fun",
    itemCount: "12+ colors",
    price: "$26",
    color: "purple",
  },
  {
    name: "Sweatpants",
    icon: <Heart className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Comfortable sweatpants for lounging",
    itemCount: "10+ colors",
    price: "$30",
    color: "rose",
  },
  {
    name: "Pajama Sets",
    icon: <Sparkles className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1503944168849-b7d1e0c97048?q=80&w=2070&auto=format&fit=crop",
    description: "Cozy matching pajama sets",
    itemCount: "18+ themes",
    price: "$35",
    color: "amber",
  },
  {
    name: "Rain Boots",
    icon: <Umbrella className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    description: "Colorful boots for puddle jumping",
    itemCount: "8+ designs",
    price: "$28",
    color: "purple",
  },
  {
    name: "Suspender Pants",
    icon: <Gem className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2070&auto=format&fit=crop",
    description: "Cute suspender pants for formal occasions",
    itemCount: "6+ colors",
    price: "$36",
    color: "rose",
  },
  {
    name: "Character Backpacks",
    icon: <ShoppingBag className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    description: "Fun backpacks with favorite characters",
    itemCount: "15+ characters",
    price: "$32",
    color: "amber",
  },
  {
    name: "Romper Suits",
    icon: <Sun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=2070&auto=format&fit=crop",
    description: "One-piece rompers for babies and toddlers",
    itemCount: "22+ prints",
    price: "$24",
    color: "purple",
  },
  {
    name: "Sports Jerseys",
    icon: <Activity className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1503944168849-b7d1e0c97048?q=80&w=2070&auto=format&fit=crop",
    description: "Team jerseys for little sports fans",
    itemCount: "10+ teams",
    price: "$40",
    color: "rose",
    popular: true,
  },
  {
    name: "Winter Coats",
    icon: <Shield className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop",
    description: "Warm coats for cold weather protection",
    itemCount: "8+ styles",
    price: "$55",
    color: "amber",
  },
];

// Brand color schemes for consistency
export const brandColors = {
  amber: {
    primary: "amber-500",
    secondary: "amber-100",
    text: "amber-600",
    gradient: "from-amber-400 to-amber-600"
  },
  purple: {
    primary: "purple-500", 
    secondary: "purple-100",
    text: "purple-600",
    gradient: "from-purple-400 to-purple-600"
  },
  rose: {
    primary: "rose-500",
    secondary: "rose-100", 
    text: "rose-600",
    gradient: "from-rose-400 to-rose-600"
  }
};

// Size options for clothing
export const sizeOptions = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  shoes: ["6", "7", "8", "9", "10", "11", "12", "13"],
  kids: ["2T", "3T", "4T", "5T", "6", "8", "10", "12", "14"]
};

// Color options for products
export const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Navy", value: "#1E3A8A" },
  { name: "Gray", value: "#6B7280" },
  { name: "Red", value: "#DC2626" },
  { name: "Blue", value: "#2563EB" },
  { name: "Green", value: "#16A34A" },
  { name: "Purple", value: "#7C3AED" },
  { name: "Pink", value: "#EC4899" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Orange", value: "#EA580C" },
  { name: "Brown", value: "#92400E" }
];

// Product categories for filtering
export const productCategories = [
  "All",
  "T-Shirts", 
  "Shirts",
  "Polos",
  "Shorts",
  "Pants",
  "Dresses",
  "Activewear",
  "Accessories"
];

// Price ranges for filtering
export const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: Infinity }
];

// Testimonials for social proof
export const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Adventure Photographer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    content: "Perfect gear for my outdoor adventures. Quality is exceptional!",
    rating: 5,
    emoji: "📸"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    content: "Love the summer collection! Comfortable and stylish for all my travels.",
    rating: 5,
    emoji: "✈️"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Fitness Trainer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    content: "Amazing activewear that keeps up with my intense workouts.",
    rating: 5,
    emoji: "💪"
  }
];

// FAQ data
export const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. Items must be in original condition with tags attached.",
    emoji: "🔄"
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide! Shipping times and costs vary by location.",
    emoji: "🌍"
  },
  {
    question: "How do I choose the right size?",
    answer: "Check our detailed size guide for each product. We recommend measuring yourself for the best fit.",
    emoji: "📏"
  },
  {
    question: "Are your products ethically made?",
    answer: "Yes, we work with certified suppliers who ensure fair labor practices and sustainable materials.",
    emoji: "🌱"
  }
];

// Footer links
export const footerLinks = {
  shop: [
    { name: "Men's Collection", page: "men" },
    { name: "Women's Collection", page: "women" },
    { name: "Kids Collection", page: "kids" },
    { name: "Summer Sale", page: "summer" }
  ],
  company: [
    { name: "About Us", page: "about" },
    { name: "Careers", page: "careers" },
    { name: "Press", page: "press" },
    { name: "Contact", page: "contact" }
  ],
  support: [
    { name: "Size Guide", page: "size-guide" },
    { name: "Shipping Info", page: "shipping" },
    { name: "Returns", page: "returns" },
    { name: "FAQ", page: "faq" }
  ],
  legal: [
    { name: "Privacy Policy", page: "privacy" },
    { name: "Terms of Service", page: "terms" },
    { name: "Cookie Policy", page: "cookies" }
  ]
};
