"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../../App";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Package,
  Users,
  BarChart3,
  Settings,
  ShoppingBag,
  DollarSign
} from "lucide-react";
import { AnimatedEmoji } from "../animations";
import { Product } from "../../types";
import { toast } from "sonner";
import { DatabaseSetup } from "../admin/DatabaseSetup";
import { ImageUpload } from "../ui/image-upload";

export function AdminPanel() {
  const {
    user,
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    setCurrentPage,
    isLoading
  } = useAppContext();

  const [activeTab, setActiveTab] = useState("products");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form state for adding/editing products
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "",
    subcategory: "",
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
    inStock: true,
    featured: false,
    tags: [] as string[]
  });

  // Removed admin access restriction - everyone can access admin panel

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: 0,
      originalPrice: 0,
      category: "",
      subcategory: "",
      sizes: [],
      colors: [],
      images: [],
      inStock: true,
      featured: false,
      tags: []
    });
  };

  const handleAddProduct = async () => {
    try {
      if (!productForm.name || !productForm.description || !productForm.category) {
        toast.error("Please fill in all required fields");
        return;
      }

      await addProduct(productForm);
      setIsAddingProduct(false);
      resetProductForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      subcategory: product.subcategory || "",
      sizes: product.sizes,
      colors: product.colors,
      images: product.images,
      inStock: product.inStock,
      featured: product.featured || false,
      tags: product.tags || []
    });
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct.id, productForm);
      setEditingProduct(null);
      resetProductForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Categories for the store
  const mainCategories = [
    { value: "men", label: "Men's Clothing" },
    { value: "women", label: "Women's Clothing" },
    { value: "kids", label: "Kids' Clothing" },
    { value: "accessories", label: "Accessories" },
    { value: "summer", label: "Summer Collection" }
  ];

  // Removed admin access check - everyone can access admin panel

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <AnimatedEmoji emoji="⚡" size="large" animation="pulse" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Manage your store and products</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Users className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{mainCategories.length}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.inStock).length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.featured).length}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-600" />
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {mainCategories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => setIsAddingProduct(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="overflow-hidden">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          {product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {product.name}
                            </h3>
                            <div className="flex gap-1">
                              {product.featured && (
                                <Badge variant="secondary" className="text-xs">
                                  Featured
                                </Badge>
                              )}
                              <Badge 
                                variant={product.inStock ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">${product.price}</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <AnimatedEmoji emoji="📦" size="large" animation="bounce" />
                  <h3 className="text-lg font-semibold text-gray-900 mt-4">No products found</h3>
                  <p className="text-gray-600 mt-2">
                    {searchQuery || selectedCategory !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by adding your first product"
                    }
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mainCategories.map((category) => (
                    <Card key={category.value} className="p-4">
                      <h4 className="font-medium">{category.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {products.filter(p => p.category === category.value).length} products
                      </p>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Settings</h3>
                <p className="text-gray-600">Settings and configuration options will be available here.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {(isAddingProduct || editingProduct) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {isAddingProduct ? "Add New Product" : "Edit Product"}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                        resetProductForm();
                      }
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Name *</label>
                      <Input
                        value={productForm.name}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {mainCategories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <Textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price *</label>
                      <Input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Original Price</label>
                      <Input
                        type="number"
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Sizes (comma-separated)</label>
                      <Input
                        value={productForm.sizes.join(", ")}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Better parsing: split by comma, trim spaces, filter empty, and remove duplicates
                          const parsedSizes = value
                            .split(/[,\s]+/)
                            .map(s => s.trim())
                            .filter(Boolean)
                            .filter((size, index, arr) => arr.indexOf(size) === index);
                          setProductForm(prev => ({ ...prev, sizes: parsedSizes }));
                        }}
                        placeholder="S, M, L, XL"
                      />
                      {productForm.sizes.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {productForm.sizes.map((size, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Colors (comma-separated)</label>
                      <Input
                        value={productForm.colors.join(", ")}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Better parsing: split by comma, trim spaces, filter empty, and remove duplicates
                          const parsedColors = value
                            .split(/[,]+/)
                            .map(c => c.trim())
                            .filter(Boolean)
                            .filter((color, index, arr) => arr.indexOf(color) === index);
                          setProductForm(prev => ({ ...prev, colors: parsedColors }));
                        }}
                        placeholder="Red, Blue, Green"
                      />
                      {productForm.colors.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {productForm.colors.map((color, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Product Images</label>
                    <ImageUpload
                      images={productForm.images}
                      onImagesChange={(images) => setProductForm(prev => ({ ...prev, images }))}
                      maxImages={5}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.featured}
                        onChange={(e) => setProductForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">Featured Product</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                        resetProductForm();
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={isAddingProduct ? handleAddProduct : handleUpdateProduct}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Product"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
