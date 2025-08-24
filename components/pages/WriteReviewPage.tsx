import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AnimatedEmoji } from '../animations';
import { ReviewForm } from '../ReviewForm';
import { useAppContext } from '../../App';

interface WriteReviewPageProps {
  setCurrentPage: (page: string) => void;
}

// Featured products for reviews
const featuredProducts = [
  {
    id: "summer-breeze-shirt-001",
    name: "Summer Breeze Linen Shirt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=300",
    category: "Men's Shirts",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "classic-denim-jacket-002", 
    name: "Classic Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=300",
    category: "Jackets",
    rating: 4.6,
    reviews: 89
  },
  {
    id: "summer-dress-003",
    name: "Floral Summer Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=300",
    category: "Women's Dresses",
    rating: 4.9,
    reviews: 156
  },
  {
    id: "athletic-shoes-004",
    name: "Athletic Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300",
    category: "Footwear",
    rating: 4.7,
    reviews: 203
  },
  {
    id: "leather-handbag-005",
    name: "Premium Leather Handbag",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300",
    category: "Accessories",
    rating: 4.8,
    reviews: 78
  },
  {
    id: "wool-sweater-006",
    name: "Cozy Wool Sweater",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=300",
    category: "Sweaters",
    rating: 4.5,
    reviews: 92
  }
];

export function WriteReviewPage({ setCurrentPage }: WriteReviewPageProps) {
  const { setSelectedProduct } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductForReview, setSelectedProductForReview] = useState<any>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(featuredProducts);
    } else {
      const filtered = featuredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  const handleProductSelect = (product: any) => {
    setSelectedProductForReview(product);
    setShowReviewForm(true);
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setSelectedProductForReview(null);
    // You could show a success message or navigate somewhere
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('home')}
              className="p-2 hover:bg-amber-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <AnimatedEmoji emoji="📝" animation="bounce" size="medium" />
                Write a Review
              </h1>
              <p className="text-gray-600 mt-1">Share your experience with our products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for a product to review..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-amber-200 focus:border-amber-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="bg-amber-100 rounded-2xl p-6 max-w-2xl mx-auto border-2 border-amber-200">
            <h2 className="text-xl font-semibold text-amber-800 mb-2 flex items-center justify-center gap-2">
              <AnimatedEmoji emoji="💡" animation="pulse" size="small" />
              How it works
            </h2>
            <p className="text-amber-700">
              Select a product below that you've purchased or experienced, then share your honest review to help other customers make informed decisions.
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Select a Product to Review
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-2" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300 cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600">
                          {product.category}
                        </Badge>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-amber-600">
                            ${product.price}
                          </span>
                          <Button
                            onClick={() => handleProductSelect(product)}
                            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-4 py-2 rounded-full"
                          >
                            Review This
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <AnimatedEmoji emoji="🤝" animation="wiggle" size="small" />
              Can't find your product?
            </h3>
            <p className="text-gray-600 mb-6">
              We're constantly adding new products. In the meantime, you can browse our collections to find similar items to review.
            </p>
            <Button
              onClick={() => setCurrentPage('summer')}
              variant="outline"
              className="border-2 border-amber-300 hover:border-amber-500 hover:bg-amber-50"
            >
              Browse Products
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && selectedProductForReview && (
        <ReviewForm
          productId={selectedProductForReview.id}
          productName={selectedProductForReview.name}
          onClose={() => {
            setShowReviewForm(false);
            setSelectedProductForReview(null);
          }}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </div>
  );
}
