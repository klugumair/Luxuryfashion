"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../App";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { X, Save } from "lucide-react";
import { AnimatedEmoji } from "./animations";

interface QuickAddProductProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export function QuickAddProduct({ isOpen, onClose, category }: QuickAddProductProps) {
  const { addProduct, isLoading } = useAppContext();
  
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
    inStock: true,
    featured: false
  });

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: 0,
      originalPrice: 0,
      sizes: [],
      colors: [],
      images: [],
      inStock: true,
      featured: false
    });
  };

  const handleSave = async () => {
    try {
      if (!productForm.name || !productForm.description) {
        return;
      }

      await addProduct({
        ...productForm,
        category: category.toLowerCase(),
        tags: [category.toLowerCase()]
      });
      
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">Quick Add Product</h2>
                  <AnimatedEmoji emoji="⚡" size="medium" animation="pulse" />
                </div>
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Name *
                  </label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price *
                    </label>
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
                    <label className="block text-sm font-medium mb-2">
                      Original Price
                    </label>
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

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sizes (comma-separated)
                  </label>
                  <Input
                    value={productForm.sizes.join(", ")}
                    onChange={(e) => setProductForm(prev => ({ 
                      ...prev, 
                      sizes: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                    }))}
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Colors (comma-separated)
                  </label>
                  <Input
                    value={productForm.colors.join(", ")}
                    onChange={(e) => setProductForm(prev => ({ 
                      ...prev, 
                      colors: e.target.value.split(",").map(c => c.trim()).filter(Boolean)
                    }))}
                    placeholder="Red, Blue, Green"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URLs (comma-separated)
                  </label>
                  <Textarea
                    value={productForm.images.join(", ")}
                    onChange={(e) => setProductForm(prev => ({ 
                      ...prev, 
                      images: e.target.value.split(",").map(url => url.trim()).filter(Boolean)
                    }))}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows={2}
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
                    <span className="text-sm font-medium">Featured</span>
                  </label>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Category:</span> {category}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading || !productForm.name || !productForm.description}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
