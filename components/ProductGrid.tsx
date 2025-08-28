import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { AnimatedEmoji } from "./animations";
import { fadeIn, staggerContainer, itemFadeIn } from "./constants";
import { useAppContext } from "../App";
import { ShoppingCart, Heart, Star, MessageSquare } from "lucide-react";

// Enhanced Product Grid Component with flexible product format support
export function ProductGrid({ title, subtitle, products }: {
  title: string;
  subtitle: string;
  products: any[];
}) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, setSelectedProduct, setCurrentPage } = useAppContext();

  const handleAddToCart = (product: any, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent triggering product click
    }

    // Handle different price formats
    let price = 0;
    if (typeof product.price === 'string') {
      price = parseFloat(product.price.replace('$', ''));
    } else if (typeof product.price === 'number') {
      price = product.price;
    }

    addToCart({
      id: `${product.id || product.name}-${Date.now()}`,
      name: product.name,
      price: price,
      image: product.image,
      size: "M", // Default size
      color: "Default", // Default color
      category: product.category || getProductCategoryName(product),
    });
  };

  const handleWishlistToggle = (product: any, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent triggering product click
    }

    // Handle different price formats
    let price = 0;
    if (typeof product.price === 'string') {
      price = parseFloat(product.price.replace('$', ''));
    } else if (typeof product.price === 'number') {
      price = product.price;
    }

    const wishlistItem = {
      id: product.id || `${product.name.toLowerCase().replace(/\s+/g, '-')}-001`,
      name: product.name,
      price: price,
      image: product.image,
      category: product.category || getProductCategoryName(product),
      description: product.description || `${product.name} - Experience premium quality and exceptional style with this carefully crafted piece.`,
    };

    if (isInWishlist(wishlistItem.id)) {
      removeFromWishlist(wishlistItem.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleWriteReview = (product: any, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent triggering product click
    }

    // Set the selected product for review
    const reviewProduct = {
      id: product.id || `${product.name.toLowerCase().replace(/\s+/g, '-')}-001`,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price,
      originalPrice: (typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price) * 1.25,
      images: [
        product.image,
        product.image,
        product.image,
        product.image
      ],
      category: product.category || getProductCategoryName(product),
      description: product.description || `${product.name} - Experience premium quality and exceptional style with this carefully crafted piece.`,
      features: product.features || [
        "Premium Quality Materials",
        "Comfortable Fit",
        "Durable Construction",
        "Easy Care Instructions",
        "Versatile Style"
      ],
      sizes: product.sizes || ["XS", "S", "M", "L", "XL", "XXL"],
      colors: product.colors ? product.colors.map((color: string, index: number) => ({
        name: color,
        value: getColorValue(color, index),
        available: true
      })) : [
        { name: "Navy Blue", value: "#1e3a8a", available: true },
        { name: "Charcoal Gray", value: "#374151", available: true },
        { name: "Forest Green", value: "#166534", available: true },
        { name: "Burgundy", value: "#991b1b", available: false }
      ],
      rating: product.rating || (4.6 + Math.random() * 0.4),
      reviews: product.reviews || (Math.floor(Math.random() * 200) + 50),
      inStock: true,
      fastShipping: true,
      brand: product.brand || "Outlander"
    };

    setSelectedProduct(reviewProduct);
    setCurrentPage("write-review");
  };
  const handleProductClick = (product: any) => {
    // Handle different price formats
    let price = 0;
    let priceString = "";
    if (typeof product.price === 'string') {
      price = parseFloat(product.price.replace('$', ''));
      priceString = product.price;
    } else if (typeof product.price === 'number') {
      price = product.price;
      priceString = `$${price}`;
    }

    // Convert any product format to the format expected by ProductDetailPage
    const detailProduct = {
      id: product.id || `${product.name.toLowerCase().replace(/\s+/g, '-')}-001`,
      name: product.name,
      price: price,
      originalPrice: price * 1.25, // Add 25% for original price
      images: [
        product.image,
        product.image,
        product.image,
        product.image
      ],
      category: product.category || getProductCategoryName(product),
      description: product.description || `${product.name} - Experience premium quality and exceptional style with this carefully crafted piece. Made with attention to detail and superior materials for lasting comfort and durability.`,
      features: product.features || [
        "Premium Quality Materials",
        "Comfortable Fit", 
        "Durable Construction",
        "Easy Care Instructions",
        "Versatile Style"
      ],
      sizes: product.sizes || ["XS", "S", "M", "L", "XL", "XXL"],
      colors: product.colors ? product.colors.map((color: string, index: number) => ({
        name: color,
        value: getColorValue(color, index),
        available: true
      })) : [
        { name: "Navy Blue", value: "#1e3a8a", available: true },
        { name: "Charcoal Gray", value: "#374151", available: true },
        { name: "Forest Green", value: "#166534", available: true },
        { name: "Burgundy", value: "#991b1b", available: false }
      ],
      rating: product.rating || (4.6 + Math.random() * 0.4), // Use product rating or random between 4.6-5.0
      reviews: product.reviews || (Math.floor(Math.random() * 200) + 50), // Use product reviews or random between 50-250
      inStock: true,
      fastShipping: true,
      brand: product.brand || "Outlander"
    };

    setSelectedProduct(detailProduct);
    setCurrentPage("product-detail");
  };

  const getProductCategoryName = (product: any) => {
    // Determine category based on product name
    if (product.name.toLowerCase().includes('dress')) return "Women's Dresses";
    if (product.name.toLowerCase().includes('shirt')) return "Shirts";
    if (product.name.toLowerCase().includes('polo')) return "Polo Shirts";
    if (product.name.toLowerCase().includes('short')) return "Shorts";
    if (product.name.toLowerCase().includes('jean')) return "Jeans";
    if (product.name.toLowerCase().includes('tank')) return "Tank Tops";
    if (product.name.toLowerCase().includes('blouse')) return "Blouses";
    if (product.name.toLowerCase().includes('skirt')) return "Skirts";
    if (product.name.toLowerCase().includes('pant') || product.name.toLowerCase().includes('trouser')) return "Pants";
    if (product.name.toLowerCase().includes('hoodie')) return "Hoodies";
    if (product.name.toLowerCase().includes('swimwear') || product.name.toLowerCase().includes('swim')) return "Swimwear";
    if (product.name.toLowerCase().includes('tee') || product.name.toLowerCase().includes('t-shirt')) return "T-Shirts";
    return product.category || "Clothing";
  };

  const getColorValue = (colorName: string, index: number) => {
    // Map color names to hex values
    const colorMap: { [key: string]: string } = {
      'white': '#ffffff',
      'black': '#000000',
      'navy': '#1e3a8a',
      'gray': '#6b7280',
      'grey': '#6b7280',
      'charcoal': '#374151',
      'olive': '#84cc16',
      'rust': '#dc2626',
      'stone': '#a8a29e',
      'red': '#dc2626',
      'blue': '#2563eb',
      'forest': '#166534',
      'slate': '#64748b',
      'cream': '#fef7cd',
      'midnight': '#1e293b',
      'wine': '#7c2d12',
      'camel': '#d2691e',
      'sage': '#9ca3af',
      'natural': '#f5f5dc'
    };

    // Clean color name for lookup
    const cleanName = colorName.toLowerCase().split('/')[0].split(' ')[0];
    
    // Return mapped color or fallback colors
    if (colorMap[cleanName]) {
      return colorMap[cleanName];
    }

    // Fallback colors based on index
    const fallbackColors = ['#1e3a8a', '#374151', '#166534', '#991b1b', '#dc2626', '#7c2d12'];
    return fallbackColors[index % fallbackColors.length];
  };

  const formatPrice = (price: any) => {
    if (typeof price === 'string') {
      return price.startsWith('$') ? price : `$${price}`;
    } else if (typeof price === 'number') {
      return `$${price}`;
    }
    return '$0';
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="container px-4 md:px-6 mx-auto"
      >
        <div className="text-center space-y-6 mb-16 relative">
          <motion.div 
            className="font-bold text-xl text-amber-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {subtitle}
          </motion.div>
          <div className="relative">
            <motion.h1 
              className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
              <AnimatedEmoji 
                emoji="✨"
                className="absolute -right-6 md:-right-8 top-0 text-amber-500"
                animation="pulse"
                delay={0.3}
                size="large"
              />
            </motion.h1>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-amber-500/20 rounded-full blur-sm" />
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {products.map((product, index) => {
            const productId = product.id || `${product.name.toLowerCase().replace(/\s+/g, '-')}-001`;
            const inWishlist = isInWishlist(productId);
            
            return (
              <motion.div
                key={product.id || `${product.name}-${index}`}
                variants={itemFadeIn}
                whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.2 } }}
                onClick={() => handleProductClick(product)}
                className="group relative transition-all duration-200 cursor-pointer"
                style={{ willChange: "transform" }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-800
                  border-2 border-amber-600 dark:border-amber-400
                  rounded-lg shadow-[4px_4px_0px_0px] shadow-amber-600 dark:shadow-amber-400
                  transition-all duration-200
                  group-hover:shadow-[6px_6px_0px_0px]
                  group-hover:translate-x-[-2px]
                  group-hover:translate-y-[-2px]"
                />

                {product.popular && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-amber-400 text-zinc-900 
                    font-bold px-3 py-1 rounded-full rotate-12 text-sm border-2 border-zinc-900 flex items-center gap-1 z-20"
                    animate={{ 
                      rotate: [12, 8, 16, 12],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <AnimatedEmoji
                      emoji="🔥"
                      animation="pulse"
                      size="small"
                      className="text-[9px] sm:text-xl"
                      delay={0}
                    />
                    Best Seller!
                  </motion.div>
                )}

                <div className="relative p-3 sm:p-6">
                  <div className="mb-4 sm:mb-6">
                    <div className="relative h-40 sm:h-56 md:h-64 w-full rounded-lg overflow-hidden mb-3 sm:mb-4">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                        style={{ willChange: "transform" }}
                      />
                      <div className="absolute top-4 left-4">
                        <motion.div
                          className="w-10 h-10 rounded-full
                          flex items-center justify-center
                          border-2 border-white bg-white/90 backdrop-blur-sm
                          text-amber-600 text-[9px] sm:text-xl"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {product.icon}
                        </motion.div>
                      </div>
                      
                      {/* Wishlist Button */}
                      <motion.button
                        onClick={(e) => handleWishlistToggle(product, e)}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 border-2 ${
                          inWishlist
                            ? "bg-rose-500 text-white border-rose-600 hover:bg-rose-600"
                            : "bg-white/90 text-zinc-700 hover:text-rose-500 border-amber-300 hover:border-rose-400 hover:bg-white"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                      </motion.button>
                      
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-black/70 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <AnimatedEmoji
                            emoji="💰"
                            animation="bounce"
                            size="small"
                            className="text-[9px] sm:text-xl"
                            delay={0.5}
                          />
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                    <motion.h3 
                      className="font-bold text-sm sm:text-xl text-zinc-900 dark:text-white text-center mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {product.name}
                    </motion.h3>
                    <motion.p 
                      className="font-medium text-zinc-600 dark:text-zinc-400 text-center text-xs sm:text-sm mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      {product.description}
                    </motion.p>
                    <motion.p 
                      className="font-bold text-[11px] sm:text-xs text-amber-600 text-center flex items-center justify-center gap-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <AnimatedEmoji
                        emoji="📦"
                        animation="wiggle"
                        size="small"
                        className="text-[9px] sm:text-xl"
                        delay={0.8}
                      />
                      {product.itemCount}
                    </motion.p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full h-8 sm:h-10 font-bold relative
                        border-2 border-amber-600 dark:border-amber-400
                        transition-all duration-200 flex items-center justify-center gap-2
                        shadow-[4px_4px_0px_0px] shadow-amber-600 dark:shadow-amber-400
                        hover:shadow-[5px_5px_0px_0px]
                        hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                          product.popular
                            ? "bg-amber-400 text-zinc-900 hover:bg-amber-300 dark:hover:bg-amber-300"
                            : "bg-gradient-to-br from-amber-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-700 text-zinc-900 dark:text-white hover:from-amber-100 hover:to-purple-100 dark:hover:from-zinc-700 dark:hover:to-zinc-600"
                        }`}
                      >
                        <AnimatedEmoji
                          emoji="🛒"
                          animation="bounce"
                          size="small"
                          className="text-[9px] sm:text-xl"
                          delay={0}
                        />
                        Add to Cart
                        <ShoppingCart className="w-4 h-4 ml-1" />
                      </Button>
                    </motion.div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={(e) => handleWishlistToggle(product, e)}
                        variant="outline"
                          className={`w-full h-8 sm:h-9 font-bold relative transition-all duration-200 flex items-center justify-center gap-1 border-2 text-xs ${
                          inWishlist
                            ? "border-rose-400 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-500"
                            : "border-amber-400 bg-white text-amber-700 hover:bg-amber-50 hover:border-amber-500"
                        }`}
                      >
                          <Heart className={`w-3 h-3 ${inWishlist ? "fill-current" : ""}`} />
                          {inWishlist ? "Saved" : "Save"}
                        <AnimatedEmoji
                          emoji={inWishlist ? "💕" : "💖"}
                          animation={inWishlist ? "pulse" : "bounce"}
                          size="small"
                          className="text-[9px] sm:text-xl"
                          delay={0}
                        />
                      </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={(e) => handleWriteReview(product, e)}
                          variant="outline"
                          className="w-full h-8 sm:h-9 font-bold relative transition-all duration-200 flex items-center justify-center gap-1 border-2 border-blue-400 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-500 text-xs"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Review
                          <AnimatedEmoji
                            emoji="⭐"
                            animation="bounce"
                            size="small"
                            className="text-[9px] sm:text-xl"
                            delay={0}
                          />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
