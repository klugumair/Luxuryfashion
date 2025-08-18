"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../../App";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { AnimatedEmoji } from "../animations";
import { Heart, ShoppingCart, Trash2, Eye, Filter, Grid3X3, List } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export function WishlistPage() {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    isInWishlist,
    setSelectedProduct,
    setCurrentPage,
  } = useAppContext();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'category'>('name');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Get unique categories for filtering
  const categories = ['all', ...Array.from(new Set(wishlistItems.map(item => item.category)))];

  // Filter and sort wishlist items
  const filteredAndSortedItems = wishlistItems
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (item: WishlistItem) => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: "M", // Default size
        color: "Default", // Default color
        category: item.category,
      });
      setIsLoading(false);
    }, 300);
  };

  const handleViewProduct = (item: WishlistItem) => {
    setSelectedProduct({
      id: item.id,
      name: item.name,
      price: item.price,
      images: [item.image, item.image, item.image, item.image],
      category: item.category,
      description: item.description || `Beautiful ${item.name.toLowerCase()} from our premium collection.`,
      features: [
        "Premium Quality Materials",
        "Comfortable Fit", 
        "Durable Construction",
        "Easy Care Instructions",
        "Versatile Style"
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { name: "Navy Blue", value: "#1e3a8a", available: true },
        { name: "Charcoal Gray", value: "#374151", available: true },
        { name: "Forest Green", value: "#166534", available: true },
        { name: "Burgundy", value: "#991b1b", available: false }
      ],
      rating: 4.5,
      reviews: Math.floor(Math.random() * 100) + 10,
      inStock: true,
      fastShipping: true,
      brand: "Outlander"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-purple-50/50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3">
              <AnimatedEmoji emoji="💝" animation="bounce" size="large" delay={0} />
              My Wishlist
              <AnimatedEmoji emoji="✨" animation="twinkle" size="medium" delay={0.3} />
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <AnimatedEmoji emoji="💕" animation="pulse" size="small" delay={0.6} />
              Your carefully curated collection of favorite items
              <AnimatedEmoji emoji="🎯" animation="wiggle" size="small" delay={0.9} />
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0 ? (
          // Empty Wishlist State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <Card className="p-12 max-w-lg mx-auto bg-gradient-to-br from-amber-50 to-purple-50 border-2 border-amber-200/50 shadow-lg">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <AnimatedEmoji emoji="💔" animation="bounce" size="large" delay={0} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-zinc-900 mb-2 flex items-center justify-center gap-2">
                    Your wishlist is empty
                    <AnimatedEmoji emoji="😢" animation="wiggle" size="small" delay={0.3} />
                  </h3>
                  <p className="text-zinc-600 flex items-center justify-center gap-2">
                    <AnimatedEmoji emoji="🛍️" animation="pulse" size="small" delay={0.6} />
                    Start adding items you love!
                    <AnimatedEmoji emoji="💫" animation="float" size="small" delay={0.9} />
                  </p>
                </div>
                <Button
                  onClick={() => window.history.back()}
                  className="bg-gradient-to-r from-amber-500 to-purple-500 text-white hover:from-amber-600 hover:to-purple-600 transition-all duration-200 px-8 py-3 rounded-full font-bold flex items-center gap-2"
                >
                  <AnimatedEmoji emoji="🏪" animation="bounce" size="small" delay={0} />
                  Continue Shopping
                  <AnimatedEmoji emoji="➡️" animation="float" size="small" delay={0.2} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Filters and Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <AnimatedEmoji emoji="📊" animation="pulse" size="small" delay={0} />
                <span className="font-medium text-zinc-700">
                  {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'item' : 'items'}
                </span>
                <AnimatedEmoji emoji="💎" animation="twinkle" size="small" delay={0.3} />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-zinc-500" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-zinc-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'category')}
                    className="px-3 py-2 border border-zinc-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="p-2"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="p-2"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Wishlist Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }
            >
              <AnimatePresence>
                {filteredAndSortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View Card
                      <Card className="group bg-white/80 backdrop-blur-sm border-2 border-amber-100/50 hover:border-purple-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden">
                        <div className="relative">
                          <div className="aspect-square overflow-hidden">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          {/* Quick Actions Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                handleViewProduct(item);
                                setCurrentPage("product-detail");
                              }}
                              className="bg-white/90 text-zinc-900 hover:bg-white"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleAddToCart(item)}
                              disabled={isLoading}
                              className="bg-white/90 text-zinc-900 hover:bg-white"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Remove from Wishlist Button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromWishlist(item.id)}
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600 p-2 rounded-full shadow-lg"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </Button>

                          {/* Category Badge */}
                          <Badge
                            variant="secondary"
                            className="absolute bottom-2 left-2 bg-amber-100 text-amber-800 hover:bg-amber-200"
                          >
                            {item.category}
                          </Badge>
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-zinc-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xl font-black text-purple-600 mb-4">
                            ${item.price.toFixed(2)}
                          </p>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAddToCart(item)}
                              disabled={isLoading}
                              className="flex-1 bg-gradient-to-r from-amber-500 to-purple-500 text-white hover:from-amber-600 hover:to-purple-600 transition-all duration-200 rounded-full font-bold"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      // List View Card
                      <Card className="bg-white/80 backdrop-blur-sm border-2 border-amber-100/50 hover:border-purple-200/50 transition-all duration-300 hover:shadow-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold text-zinc-900 mb-1">
                                  {item.name}
                                </h3>
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 mb-2">
                                  {item.category}
                                </Badge>
                                <p className="text-lg font-black text-purple-600">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    handleViewProduct(item);
                                    setCurrentPage("product-detail");
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(item)}
                                  disabled={isLoading}
                                  className="bg-gradient-to-r from-amber-500 to-purple-500 text-white hover:from-amber-600 hover:to-purple-600 flex items-center gap-1"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  Add to Cart
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeFromWishlist(item.id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Wishlist Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-purple-50 border-2 border-amber-200/50">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-black text-zinc-900 mb-2 flex items-center justify-center lg:justify-start gap-2">
                      <AnimatedEmoji emoji="📋" animation="bounce" size="small" delay={0} />
                      Wishlist Summary
                      <AnimatedEmoji emoji="📊" animation="pulse" size="small" delay={0.3} />
                    </h3>
                    <p className="text-zinc-600 flex items-center justify-center lg:justify-start gap-2">
                      <AnimatedEmoji emoji="💰" animation="wiggle" size="small" delay={0.6} />
                      Total value: ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                      <AnimatedEmoji emoji="💎" animation="twinkle" size="small" delay={0.9} />
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => window.history.back()}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-full font-bold flex items-center gap-2"
                    >
                      <AnimatedEmoji emoji="🛍️" animation="bounce" size="small" delay={0} />
                      Continue Shopping
                    </Button>
                    <Button
                      onClick={() => {
                        wishlistItems.forEach(item => handleAddToCart(item));
                      }}
                      disabled={isLoading || wishlistItems.length === 0}
                      className="bg-gradient-to-r from-amber-500 to-purple-500 text-white hover:from-amber-600 hover:to-purple-600 transition-all duration-200 px-6 py-3 rounded-full font-bold flex items-center gap-2"
                    >
                      <AnimatedEmoji emoji="🛒" animation="bounce" size="small" delay={0} />
                      Add All to Cart
                      <AnimatedEmoji emoji="✨" animation="twinkle" size="small" delay={0.2} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}