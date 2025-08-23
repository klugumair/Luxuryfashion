"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RefreshCcw,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
  Quote,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AnimatedEmoji } from "../animations";
import { useAppContext } from "../../App";
import { HeroCarousel, heroSlides } from "../HeroCarousel";

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export const HomePage = ({ setCurrentPage }: HomePageProps) => {
  const { addToCart, setSelectedProduct } = useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced hero slides with proper navigation
  const enhancedHeroSlides = heroSlides.map((slide) => ({
    ...slide,
    ctaAction: () => {
      switch (slide.id) {
        case "1":
          setCurrentPage("summer");
          break;
        case "2":
          setCurrentPage("men");
          break;
        case "3":
          setCurrentPage("women");
          break;
        case "4":
          setCurrentPage("kids");
          break;
        case "5":
          setCurrentPage("accessories");
          break;
        default:
          setCurrentPage("summer");
      }
    }
  }));

  const featuredProducts = [
    {
      id: "hero-1",
      name: "Premium Summer Shirt",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://i.pinimg.com/736x/9a/0c/4a/9a0c4a4721f86ebe03fd065c0fc9ef7e.jpg",
      rating: 4.8,
      reviews: 124,
      badge: "🔥 Trending",
      category: "Men's Fashion"
    },
    {
      id: "hero-2", 
      name: "Elegant Summer Dress",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 89,
      badge: "⭐ Best Seller",
      category: "Women's Fashion"
    },
    {
      id: "hero-3",
      name: "Kids Adventure Set",
      price: 69.99,
      originalPrice: 89.99,
      image: "https://i.pinimg.com/736x/11/27/b2/1127b2430d5fa17da37ce8391b33b8d3.jpg",
      rating: 4.7,
      reviews: 156,
      badge: "🎈 New Arrival",
      category: "Kids Fashion"
    },
    {
      id: "hero-4",
      name: "Premium Accessories Bundle",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 78,
      badge: "💎 Luxury",
      category: "Accessories"
    }
  ];

  const categories = [
    {
      name: "Summer Collection",
      emoji: "☀️",
      description: "Fresh styles for the season",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      page: "summer",
      color: "from-yellow-400 to-orange-500"
    },
    {
      name: "Men's Fashion",
      emoji: "👔",
      description: "Sophisticated & stylish",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      page: "men",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Women's Collection",
      emoji: "👗",
      description: "Elegant & empowering",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      page: "women", 
      color: "from-pink-400 to-purple-500"
    },
    {
      name: "Kids Zone",
      emoji: "🎈",
      description: "Fun & comfortable",
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      page: "kids",
      color: "from-green-400 to-blue-500"
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $75",
      emoji: "🚚"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% protected transactions",
      emoji: "🔒"
    },
    {
      icon: RefreshCcw,
      title: "Easy Returns",
      description: "30-day return policy",
      emoji: "↩️"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Always here to help",
      emoji: "💬"
    }
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers", emoji: "😊" },
    { value: "500+", label: "Premium Products", emoji: "👕" },
    { value: "4.9", label: "Average Rating", emoji: "⭐" },
    { value: "25+", label: "Countries Served", emoji: "🌍" }
  ];

  // Customer Reviews Data
  const customerReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "2 days ago",
      verified: true,
      product: "Premium Summer Dress",
      review: "Absolutely love this dress! The quality is exceptional and the fit is perfect. I've received so many compliments wearing it. Outlander has become my go-to brand for elegant clothing.",
      likes: 24,
      helpful: true
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "1 week ago",
      verified: true,
      product: "Classic Oxford Shirt",
      review: "The craftsmanship is outstanding! This shirt feels premium and looks great both at work and casual outings. Fast shipping and excellent customer service too.",
      likes: 18,
      helpful: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, FL",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "3 days ago",
      verified: true,
      product: "Kids Adventure Set",
      review: "My son absolutely adores his new outfit! The colors are vibrant and the material is so soft. Great for active kids who love to play outside.",
      likes: 15,
      helpful: true
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Chicago, IL",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "5 days ago",
      verified: true,
      product: "Performance Polo",
      review: "Perfect for golf and everyday wear. The moisture-wicking technology really works, and the fit is exactly what I was looking for. Highly recommend!",
      likes: 21,
      helpful: true
    },
    {
      id: 5,
      name: "Jessica Kim",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "1 week ago",
      verified: true,
      product: "Elegant Blazer",
      review: "This blazer is a game-changer for my work wardrobe. Professional yet comfortable, and the quality is evident in every detail. Worth every penny!",
      likes: 32,
      helpful: true
    },
    {
      id: 6,
      name: "Alex Carter",
      location: "Austin, TX",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "4 days ago",
      verified: true,
      product: "Summer Linen Shirt",
      review: "Great quality linen shirt that's perfect for hot weather. Breathable and stylish. The customer service team was also very helpful with sizing questions.",
      likes: 19,
      helpful: true
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "M",
      color: "Default",
      category: product.category
    });
  };

  const handleProductClick = (product: any) => {
    // Convert featured product to detailed product format
    const detailProduct = {
      id: `${product.name.toLowerCase().replace(/\s+/g, '-')}-001`,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      images: [
        product.image,
        product.image,
        product.image,
        product.image
      ],
      category: product.category,
      description: `${product.name} - Experience premium quality and exceptional style with this carefully crafted piece. Made with attention to detail and superior materials for lasting comfort and durability.`,
      features: [
        "Premium Quality Materials",
        "Comfortable Fit",
        "Durable Construction",
        "Easy Care Instructions",
        "Versatile Style"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Navy Blue", value: "#1e3a8a", available: true },
        { name: "Charcoal Gray", value: "#374151", available: true },
        { name: "Forest Green", value: "#166534", available: true },
        { name: "Burgundy", value: "#991b1b", available: false }
      ],
      rating: product.rating,
      reviews: product.reviews,
      inStock: true,
      fastShipping: true
    };

    setSelectedProduct(detailProduct);
    setCurrentPage("product-detail");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-purple-50/30">
      {/* Hero Carousel Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Subtle Background Glow */}
              <motion.div
                className="absolute inset-0 -m-4 rounded-xl opacity-20 blur-lg"
                animate={{
                  background: [
                    "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
                    "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                    "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.h1 
                className="relative text-4xl md:text-6xl font-black mb-4 flex items-center justify-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 120 }}
              >
                {/* Left Emoji */}
                <motion.div
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="cursor-pointer"
                >
                  <AnimatedEmoji emoji="✨" animation="spin" size="large" delay={0.6} />
                </motion.div>
                
                {/* Main Text */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Elegant Gradient Text */}
                  <motion.span
                    className="text-transparent bg-clip-text relative"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)",
                      backgroundSize: "200% 200%",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Typewriter Effect */}
                    {"Welcome to Outlander".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.1,
                          delay: 0.8 + index * 0.04,
                          ease: "easeOut"
                        }}
                        whileHover={{
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        className="inline-block cursor-pointer"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>

                  {/* Subtle Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 -skew-x-12"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                        width: "30%",
                        height: "100%"
                      }}
                      animate={{
                        x: ["-100%", "400%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Blinking Cursor */}
                  <motion.span
                    animate={{ 
                      opacity: [1, 0, 1]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity, 
                      delay: 2.2
                    }}
                    className="ml-1 text-amber-500"
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(245, 158, 11, 0.6))"
                    }}
                  >
                    |
                  </motion.span>
                </motion.div>
                
                {/* Right Emoji */}
                <motion.div
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: -10,
                    y: -3,
                    transition: { duration: 0.3, type: "spring", stiffness: 400 }
                  }}
                  className="cursor-pointer"
                >
                  <AnimatedEmoji emoji="🌟" animation="bounce" size="large" delay={1.2} />
                </motion.div>
              </motion.h1>
              
              {/* Minimal Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full opacity-40"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${15 + (i % 2) * 15}%`,
                    background: ["#f59e0b", "#ec4899", "#8b5cf6"][i % 3]
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3 + 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
            <motion.p 
              className="text-xl text-zinc-600 max-w-2xl mx-auto flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedEmoji emoji="👑" animation="pulse" size="small" delay={0.5} />
              Discover luxury fashion that defines your unique style
              <AnimatedEmoji emoji="💎" animation="wiggle" size="small" delay={0.7} />
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HeroCarousel slides={enhancedHeroSlides} />
          </motion.div>
        </div>
      </section>

      {/* Live Stats Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="py-8 bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-y border-amber-200/50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-amber-200 hover:border-amber-300 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AnimatedEmoji
                    emoji={stat.emoji}
                    animation="bounce"
                    size="medium"
                    delay={0.2 * index}
                  />
                  <motion.div 
                    className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 * index }}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                <motion.div 
                  className="text-sm text-zinc-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 * index }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Grid */}
      

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50/20 to-purple-50/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedEmoji emoji="🔥" animation="bounce" size="large" delay={0} />
              Featured Products
              <AnimatedEmoji emoji="⚡" animation="wiggle" size="large" delay={0.2} />
            </motion.h2>
            <motion.p 
              className="text-lg text-zinc-600 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedEmoji emoji="🌟" animation="pulse" size="small" delay={0.4} />
              Handpicked favorites just for you
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleProductClick(product)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-amber-600">
                    {product.badge}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to wishlist functionality can be added here
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <motion.h3 
                    className="text-lg font-black text-zinc-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-purple-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    {product.name}
                  </motion.h3>
                  
                  <p className="text-sm text-gray-600 mb-4">{product.category}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Moved before Customer Reviews for better flow */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedEmoji emoji="🎯" animation="pulse" size="large" delay={0} />
              Why Choose Outlander?
              <AnimatedEmoji emoji="💖" animation="bounce" size="large" delay={0.2} />
            </motion.h2>
            <motion.p 
              className="text-lg text-zinc-600 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedEmoji emoji="✨" animation="spin" size="small" delay={0.4} />
              Experience the benefits that make us different
              <AnimatedEmoji emoji="🌟" animation="wiggle" size="small" delay={0.6} />
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full flex items-center justify-center text-white"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-6 h-6" />
                  </motion.div>
                  <AnimatedEmoji
                    emoji={feature.emoji}
                    animation="bounce"
                    size="medium"
                    delay={0.1 * index}
                  />
                </div>
                <motion.h3 
                  className="text-lg font-black text-zinc-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-zinc-600 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 * index }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section - Now comes after Benefits for optimal conversion flow */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50/30 to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedEmoji emoji="💬" animation="bounce" size="large" delay={0} />
              What Our Customers Say
              <AnimatedEmoji emoji="❤️" animation="pulse" size="large" delay={0.2} />
            </motion.h2>
            <motion.p 
              className="text-lg text-zinc-600 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedEmoji emoji="⭐" animation="spin" size="small" delay={0.4} />
              Real reviews from real customers who love Outlander
              <AnimatedEmoji emoji="🌟" animation="wiggle" size="small" delay={0.6} />
            </motion.p>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                    />
                    {review.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          ✓
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900">{review.name}</h4>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 + i * 0.05 }}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {review.date}
                  </span>
                </div>

                {/* Product */}
                <div className="mb-3">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                    {review.product}
                  </span>
                </div>

                {/* Review Text */}
                <motion.p 
                  className="text-zinc-700 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  "{review.review}"
                </motion.p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-zinc-600 hover:text-amber-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.likes})</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-sm text-zinc-600 hover:text-purple-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reply</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reviews Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-100 hover:border-amber-300 max-w-2xl mx-auto transition-all duration-300">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600">
                  4.9
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-600">Based on 50,000+ reviews</p>
                </div>
              </div>
              <p className="text-zinc-700 mb-6">
                Join thousands of satisfied customers who have made Outlander their trusted fashion destination.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-200 flex items-center gap-2 mx-auto"
              >
                <AnimatedEmoji emoji="📝" animation="bounce" size="small" delay={0} />
                Write a Review
                <AnimatedEmoji emoji="⭐" animation="pulse" size="small" delay={0.2} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="py-16 px-4 bg-gradient-to-r from-amber-500 to-purple-500"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-6">
            <AnimatedEmoji emoji="🎉" animation="bounce" size="large" delay={0} />
          </div>
          <motion.h2 
            className="text-3xl md:text-4xl font-black mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Style?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedEmoji emoji="✨" animation="spin" size="small" delay={0.3} />
            Join thousands of fashion lovers worldwide
            <AnimatedEmoji emoji="🌍" animation="pulse" size="small" delay={0.6} />
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage("summer")}
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-black hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Shop Now
              <AnimatedEmoji emoji="🛒" animation="bounce" size="small" delay={0} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage("social-handle")}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-black hover:bg-white hover:text-amber-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Follow Us
              <AnimatedEmoji emoji="📱" animation="wiggle" size="small" delay={0.2} />
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
