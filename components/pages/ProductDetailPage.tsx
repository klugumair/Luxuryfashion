import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, ArrowLeft, Share, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useAppContext } from "../../App";
import { AnimatedEmoji } from "../animations";
import { reviewService } from "../../utils/supabase/reviews";
import { ReviewForm } from "../ReviewForm";
import { ProductReview } from "../../types";
import { toast } from "sonner";

// Mock product data
const mockProduct = {
  id: "summer-breeze-shirt-001",
  name: "Summer Breeze Linen Shirt",
  price: 59.99,
  originalPrice: 79.99,
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800",
    "https://images.unsplash.com/photo-1583743814966-8936f37f86c6?q=80&w=800",
    "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=800"
  ],
  category: "Men's Shirts",
  description: "Experience ultimate comfort with our premium linen summer shirt. Crafted from 100% organic linen, this versatile piece offers breathability and style for any occasion.",
  features: [
    "100% Organic Linen",
    "Breathable & Lightweight", 
    "Wrinkle-resistant finish",
    "Sustainable production",
    "Machine washable"
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Ocean Blue", value: "#2563eb", available: true },
    { name: "Sage Green", value: "#059669", available: true },
    { name: "Sunset Orange", value: "#ea580c", available: true },
    { name: "Pearl White", value: "#f8fafc", available: false }
  ],
  rating: 4.8,
  reviews: 124,
  inStock: true,
  fastShipping: true
};

interface ProductDetailPageProps {
  setCurrentPage: (page: string) => void;
}

export function ProductDetailPage({ setCurrentPage }: ProductDetailPageProps) {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    selectedProduct, 
    setSelectedProduct 
  } = useAppContext();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Use mock data if no product is selected
  const product = selectedProduct || mockProduct;

  // Load reviews when component mounts or product changes
  useEffect(() => {
    loadReviews();
  }, [product.id]);

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const [reviewsData, statsData] = await Promise.all([
        reviewService.getProductReviews(product.id),
        reviewService.getReviewStats(product.id)
      ]);
      setReviews(reviewsData);
      setReviewStats(statsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleReviewSubmitted = () => {
    loadReviews(); // Reload reviews after submission
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  // Set default color if product has colors
  if (product.colors && product.colors.length > 0 && selectedColor.name !== product.colors[0].name) {
    setSelectedColor(product.colors[0]);
  }

  // Check if product is in wishlist
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${Date.now()}-${i}`,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor.name,
        category: product.category
      });
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    // Add the product to cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${Date.now()}-${i}`,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor.name,
        category: product.category
      });
    }

    // Navigate to cart page
    setCurrentPage("cart");
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      description: product.description,
    };

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleBack = () => {
    setSelectedProduct(null);
    setCurrentPage("home");
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="rounded-full hover:bg-amber-100 transition-all duration-300 border-2 border-amber-300 hover:border-amber-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl border-2 border-amber-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Sale Badge */}
              {discountPercentage > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white font-bold">
                    -{discountPercentage}%
                  </Badge>
                </motion.div>
              )}

              {/* Wishlist Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlistToggle}
                  className={`rounded-full w-12 h-12 p-0 transition-all duration-300 border-2 ${
                    inWishlist 
                      ? 'text-rose-500 bg-white shadow-lg border-rose-400 hover:border-rose-500' 
                      : 'text-gray-500 bg-white/80 hover:bg-white border-amber-300 hover:border-rose-400 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </Button>
              </motion.div>

              {/* Share Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-4 right-4"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-12 h-12 p-0 text-gray-500 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-amber-300 hover:border-amber-500"
                >
                  <Share className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-amber-400 scale-105 shadow-lg' 
                      : 'border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="secondary" className="mb-3">{product.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                  {product.name}
                </h1>
              </motion.div>
              
              {/* Rating */}
              <motion.div 
                className="flex items-center gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </motion.div>

              {/* Price */}
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-4xl font-black text-amber-600">${product.price}</span>
                {discountPercentage > 0 && (
                  <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.fastShipping && (
                  <Badge className="bg-green-100 text-green-800">
                    <Truck className="w-3 h-3 mr-1" />
                    Fast Shipping
                  </Badge>
                )}
              </motion.div>
            </div>

            {/* Color Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-bold mb-4 text-lg">Color: <span className="text-amber-600">{selectedColor.name}</span></h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    whileHover={{ scale: color.available ? 1.1 : 1 }}
                    whileTap={{ scale: color.available ? 0.9 : 1 }}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 relative ${
                      selectedColor.name === color.name 
                        ? 'border-amber-400 scale-110 shadow-lg' 
                        : 'border-amber-300 hover:border-amber-400'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.available ? color.name : `${color.name} (Out of Stock)`}
                  >
                    {!color.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-red-500 rotate-45"></div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Size Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Size: <span className="text-amber-600">{selectedSize || "Select Size"}</span></h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentPage("size-guide")}
                  className="text-sm text-amber-600 hover:text-amber-700 border-2 border-amber-300 hover:border-amber-500"
                >
                  Size Guide
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <motion.div key={size} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-full transition-all duration-300 border-2 ${
                        selectedSize === size 
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg border-amber-600' 
                          : 'hover:bg-amber-50 border-amber-300 hover:border-amber-400'
                      }`}
                    >
                      {size}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="font-bold mb-4 text-lg">Quantity</h3>
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 p-0 rounded-full hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500"
                  >
                    -
                  </Button>
                </motion.div>
                <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 p-0 rounded-full hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500"
                  >
                    +
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !selectedSize}
                  className="w-full h-16 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                  <AnimatedEmoji emoji="🛒" animation="bounce" size="small" className="ml-2" />
                </Button>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className={`h-12 rounded-full font-bold w-full border-2 transition-all duration-200 ${
                      inWishlist
                        ? "border-rose-400 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-500"
                        : "border-amber-400 bg-white text-amber-700 hover:bg-amber-50 hover:border-amber-500"
                    }`}
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
                    {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    onClick={handleBuyNow}
                    disabled={!product.inStock || !selectedSize}
                    className="h-12 rounded-full font-bold hover:bg-purple-50 w-full border-2 border-amber-300 hover:border-purple-400"
                  >
                    Buy Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">Orders over $75</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs font-medium">Secure Payment</p>
                <p className="text-xs text-gray-500">SSL Protected</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30 day policy</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8 shadow-xl border-2 border-amber-200">
            <Tabs defaultValue="description">
              <TabsList className="w-full mb-8 bg-gray-100 rounded-full p-1">
                <TabsTrigger value="description" className="flex-1 rounded-full transition-all duration-300">Description</TabsTrigger>
                <TabsTrigger value="features" className="flex-1 rounded-full transition-all duration-300">Features</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 rounded-full transition-all duration-300">Reviews ({reviewStats.totalReviews})</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1 rounded-full transition-all duration-300">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <h3 className="font-bold text-2xl flex items-center gap-2">
                  Product Description
                  <AnimatedEmoji emoji="📝" animation="bounce" size="small" />
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <h3 className="font-bold text-2xl flex items-center gap-2">
                  Features & Benefits
                  <AnimatedEmoji emoji="⭐" animation="pulse" size="small" />
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center gap-3 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AnimatedEmoji emoji="✅" animation="bounce" size="small" delay={index * 0.1} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-2xl flex items-center gap-2">
                    Customer Reviews
                    <AnimatedEmoji emoji="💬" animation="wiggle" size="small" />
                  </h3>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-amber-300 hover:border-amber-500"
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentPage("write-review");
                    }}
                  >
                    Write a Review
                  </Button>
                </div>
                
                {/* Review Statistics */}
                {reviewStats.totalReviews > 0 && (
                  <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold text-amber-600">
                        {reviewStats.averageRating.toFixed(1)}
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(reviewStats.averageRating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        Based on {reviewStats.totalReviews} review{reviewStats.totalReviews !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {loadingReviews ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Star className="w-12 h-12 mx-auto mb-2" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-600 mb-2">No reviews yet</h4>
                      <p className="text-gray-500">Be the first to review this product!</p>
                    </div>
                  ) : (
                    reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        className="p-6 bg-gray-50 rounded-2xl border-2 border-amber-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-bold">
                            {(review as any).users?.name || 'Anonymous'}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(review.createdAt)}
                          </span>
                          {review.verifiedPurchase && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        {review.title && (
                          <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                        )}
                        <p className="text-gray-600">{review.comment}</p>
                      </motion.div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-6">
                <h3 className="font-bold text-2xl flex items-center gap-2">
                  Shipping Information
                  <AnimatedEmoji emoji="🚚" animation="bounce" size="small" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold mb-4 text-lg">Shipping Options</h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2 border-amber-100">
                        <span>Standard Shipping (5-7 days)</span>
                        <span className="font-bold">$9.99</span>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2 border-amber-100">
                        <span>Express Shipping (2-3 days)</span>
                        <span className="font-bold">$19.99</span>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2 border-amber-100">
                        <span>Overnight Shipping</span>
                        <span className="font-bold">$39.99</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4 text-lg">Return Policy</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Free returns within 30 days of purchase. Items must be unworn and in original packaging. 
                      Easy returns process with prepaid shipping labels.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <ReviewForm
            productId={product.id}
            productName={product.name}
            onClose={() => setShowReviewForm(false)}
            onReviewSubmitted={handleReviewSubmitted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
