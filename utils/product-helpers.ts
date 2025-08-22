import { Product } from '../types';
import { adminService } from './supabase/admin';

export interface CategoryProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  subcategory?: string;
  sizes?: string[];
  colors?: string[];
  brand?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  icon?: React.ReactNode;
  popular?: boolean;
  itemCount?: string;
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
}

export class ProductHelper {
  // Fetch products from database with optional category/subcategory filtering
  static async fetchProductsByCategory(
    category?: string, 
    subcategory?: string
  ): Promise<CategoryProduct[]> {
    try {
      // Fetch products from database
      const products = await adminService.getProducts(category);
      
      // Filter by subcategory if specified
      let filteredProducts = products;
      if (subcategory) {
        filteredProducts = products.filter(product => 
          product.subcategory?.toLowerCase().includes(subcategory.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(subcategory.toLowerCase()))
        );
      }

      // Convert to CategoryProduct format
      return filteredProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        sizes: product.sizes || [],
        colors: product.colors || [],
        brand: 'Outlander',
        rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
        reviews: Math.floor(Math.random() * 300) + 50, // Random reviews 50-350
        features: product.tags || ['Premium Quality', 'Comfortable Fit'],
        popular: product.featured,
        itemCount: product.featured ? 'Best Seller' : 'New Arrival',
        inStock: product.inStock,
        featured: product.featured,
        tags: product.tags || []
      }));

    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  // Merge database products with mock products for fallback
  static mergeWithMockProducts(
    dbProducts: CategoryProduct[], 
    mockProducts: CategoryProduct[]
  ): CategoryProduct[] {
    // Use database products first, then fallback to mock products
    if (dbProducts.length > 0) {
      return [...dbProducts, ...mockProducts.slice(0, Math.max(0, 8 - dbProducts.length))];
    }
    return mockProducts;
  }

  // Filter products by search query
  static filterProductsBySearch(
    products: CategoryProduct[], 
    searchQuery: string
  ): CategoryProduct[] {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.subcategory?.toLowerCase().includes(query) ||
      product.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Sort products by various criteria
  static sortProducts(
    products: CategoryProduct[], 
    sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'popular' = 'name'
  ): CategoryProduct[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'popular':
        return sorted.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
      default:
        return sorted;
    }
  }

  // Get category-specific page mapping
  static getCategoryPageMap(): Record<string, string> {
    return {
      // Men's categories
      'men-t-shirts': 'men-tshirts',
      'men-shirts': 'men-shirts', 
      'men-polos': 'men-polos',
      'men-shorts': 'men-shorts',
      'men-trousers': 'men-trousers',
      'men-jeans': 'men-jeans',
      'men-activewear': 'men-activewear',
      
      // Women's categories
      'women-t-shirts': 'women-tshirts',
      'women-polos': 'women-polos',
      'women-shirts': 'women-shirts',
      'women-skirts-shorts': 'women-skirts-shorts',
      'women-dresses-jumpsuits': 'women-dresses-jumpsuits',
      'women-activewear': 'women-activewear',
      'women-trousers': 'women-trousers',
      'women-jeans': 'women-jeans',
      
      // Accessories
      'men-accessories': 'men-accessories',
      'women-accessories': 'women-accessories'
    };
  }

  // Parse subcategory from admin form to page identifier
  static parseSubcategoryToPageId(category: string, subcategory: string): string {
    if (!subcategory) return category;
    
    const normalized = subcategory.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single
    
    return `${category}-${normalized}`;
  }

  // Validate product data before saving
  static validateProduct(product: Partial<CategoryProduct>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!product.name?.trim()) {
      errors.push('Product name is required');
    }
    
    if (!product.description?.trim()) {
      errors.push('Product description is required');
    }
    
    if (!product.category?.trim()) {
      errors.push('Product category is required');
    }
    
    if (!product.price || product.price <= 0) {
      errors.push('Product price must be greater than 0');
    }
    
    if (!product.image?.trim() && (!product.images || product.images.length === 0)) {
      errors.push('At least one product image is required');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export commonly used functions for convenience
export const {
  fetchProductsByCategory,
  mergeWithMockProducts,
  filterProductsBySearch,
  sortProducts,
  getCategoryPageMap,
  parseSubcategoryToPageId,
  validateProduct
} = ProductHelper;
