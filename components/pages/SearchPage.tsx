import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAppContext } from "../../App";
import { AnimatedEmoji } from "../animations";

// Mock search results
const mockProducts = [
  {
    id: "1",
    name: "Summer Breeze Linen Shirt",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400",
    category: "Men's Shirts",
    rating: 4.8,
    reviews: 124,
    colors: ["Blue", "White", "Green"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "Casual Weekend Jeans",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400",
    category: "Men's Jeans",
    rating: 4.6,
    reviews: 89,
    colors: ["Dark Blue", "Light Blue", "Black"],
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: "3",
    name: "Elegant Summer Dress",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400",
    category: "Women's Dresses",
    rating: 4.9,
    reviews: 156,
    colors: ["Coral", "Navy", "White"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "4",
    name: "Kids Adventure T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=400",
    category: "Kids' Shirts",
    rating: 4.7,
    reviews: 67,
    colors: ["Red", "Blue", "Yellow"],
    sizes: ["4", "6", "8", "10", "12"]
  }
];

export function SearchPage() {
  const { searchQuery, setSearchQuery, setSelectedProduct } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceMin: "",
    priceMax: "",
    rating: "",
    size: "",
    color: ""
  });

  // Search functionality
  useEffect(() => {
    let results = mockProducts;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      results = results.filter(product => 
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.priceMin) {
      results = results.filter(product => product.price >= parseFloat(filters.priceMin));
    }

    if (filters.priceMax) {
      results = results.filter(product => product.price <= parseFloat(filters.priceMax));
    }

    if (filters.rating) {
      results = results.filter(product => product.rating >= parseFloat(filters.rating));
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Mock newest sorting
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredProducts(results);
  }, [searchQuery, filters, sortBy]);

  const handleProductClick = (product: any) => {
    // Convert product format to match ProductDetailPage expectations
    const detailProduct = {
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
      category: product.category || "general",
      description: product.description || `${product.name} - Experience premium quality and exceptional style with this carefully crafted piece.`,
      features: product.features || [
        "Premium Quality Materials",
        "Comfortable Fit",
        "Durable Construction",
        "Easy Care Instructions",
        "Versatile Style"
      ],
      sizes: product.sizes || ["XS", "S", "M", "L", "XL"],
      colors: product.colors || ["Black", "White", "Gray"],
      inStock: product.inStock !== false,
      featured: product.featured || false,
      tags: product.tags || []
    };

    setSelectedProduct(detailProduct);
    setCurrentPage("product-detail");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full border-2 border-gray-200 focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="flex border border-gray-200 rounded-full p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-full"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-full"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredProducts.length} results
              {searchQuery && ` for "${searchQuery}"`}
            </p>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0"
            >
              <Card className="p-6 sticky top-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="font-medium mb-2 block">Category</label>
                    <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="men">Men's</SelectItem>
                        <SelectItem value="women">Women's</SelectItem>
                        <SelectItem value="kids">Kids'</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="font-medium mb-2 block">Price Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.priceMin}
                        onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="font-medium mb-2 block">Minimum Rating</label>
                    <Select value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Rating</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.8">4.8+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      category: "",
                      priceMin: "",
                      priceMax: "",
                      rating: "",
                      size: "",
                      color: ""
                    })}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <AnimatedEmoji emoji="🔍" animation="bounce" size="large" className="mb-4" />
                <h2 className="text-2xl font-bold mb-2">No products found</h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button onClick={() => { setSearchQuery(""); setFilters({ category: "", priceMin: "", priceMax: "", rating: "", size: "", color: "" }); }}>
                  Clear Search
                </Button>
              </motion.div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105 ${
                      viewMode === "list" ? "flex" : ""
                    }`}>
                      <div className={`relative ${viewMode === "list" ? "w-48" : "aspect-square"} overflow-hidden bg-gray-100`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        
                        {/* Sale Badge */}
                        {product.originalPrice > product.price && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            Sale
                          </Badge>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-white/80 rounded-full">
                            ❤️
                          </Button>
                        </div>
                      </div>

                      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {product.category}
                        </Badge>
                        
                        <h3 className="font-bold mb-2 group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {"★".repeat(Math.floor(product.rating))}
                          </div>
                          <span className="text-sm text-gray-500">
                            ({product.reviews})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-lg text-amber-600">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        {viewMode === "list" && (
                          <div className="flex gap-2 mb-3">
                            <div>
                              <span className="text-sm text-gray-600">Colors: </span>
                              <span className="text-sm">{product.colors.join(", ")}</span>
                            </div>
                          </div>
                        )}

                        <Button 
                          size="sm" 
                          className="w-full bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
