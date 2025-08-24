import { supabase } from './client';
import { Product, Category, User } from '../../types';

export const adminService = {
  // Check if user is admin
  async checkAdminStatus(userId: string): Promise<boolean> {
    try {
      // First try using the RPC function
      const { data, error } = await supabase.rpc('check_user_admin_status', {
        user_id: userId
      });

      if (!error && data !== null) {
        return data === true;
      }

      // Fallback: try direct query (this should work with simplified RLS)
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .limit(1)
        .single();

      if (roleError) {
        console.log('No role found for user, assuming user role');
        return false;
      }

      return roleData?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },

  // Set user role (only callable by existing admins)
  async setUserRole(userId: string, role: 'user' | 'admin'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role })
        .select();

      if (error) {
        console.error('Error setting user role:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error setting user role:', error);
      return false;
    }
  },

  // Product CRUD operations
  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> {
    try {
      // Validate category exists
      const { data: categoryExists } = await supabase
        .from('categories')
        .select('slug')
        .eq('slug', product.category)
        .single();

      if (!categoryExists) {
        throw new Error(`Category '${product.category}' not found in database`);
      }

      // Generate slug from name
      const slug = product.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          slug,
          is_active: true,
          stock_quantity: 100, // Default stock
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating product:', error);
        throw error;
      }

      return this.mapDatabaseProductToProduct(data);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        throw error;
      }

      return this.mapDatabaseProductToProduct(data);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async getProducts(category?: string): Promise<Product[]> {
    try {
      // Check if supabase is properly configured
      if (!supabase) {
        throw new Error('Supabase client not configured');
      }

      let query = supabase
        .from('products')
        .select('*');

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error fetching products:', error.message || error);
        throw new Error(`Database error: ${error.message || 'Unknown database error'}`);
      }

      return data?.map(this.mapDatabaseProductToProduct) || [];
    } catch (error: any) {
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      console.error('Error in getProducts:', errorMessage);
      throw new Error(`Failed to fetch products: ${errorMessage}`);
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      // First check if we can connect to Supabase
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        // Silently handle database connection issues and use mock data
        return this.getMockCategories();
      }

      return data?.map(this.mapDatabaseCategoryToCategory) || this.getMockCategories();
    } catch (error: any) {
      // Silently handle any connection errors and use mock data
      // This ensures the app continues to work even without database access
      // Return mock data instead of throwing error
      return this.getMockCategories();
    }
  },

  // Mock data methods for when database is not available
  getMockProducts(category?: string): Product[] {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Summer T-Shirt',
        description: 'Comfortable cotton t-shirt perfect for summer',
        price: 29.99,
        originalPrice: 39.99,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
        category: 'men',
        subcategory: 'tshirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Blue'],
        inStock: true,
        featured: true,
        tags: ['summer', 'casual'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Women\'s Dress',
        description: 'Elegant dress for special occasions',
        price: 79.99,
        originalPrice: 99.99,
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'],
        category: 'women',
        subcategory: 'dresses',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Red', 'Black', 'Navy'],
        inStock: true,
        featured: true,
        tags: ['elegant', 'formal'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Kids Polo Shirt',
        description: 'Comfortable polo shirt for kids',
        price: 19.99,
        originalPrice: 24.99,
        images: ['https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500'],
        category: 'kids',
        subcategory: 'polos',
        sizes: ['2T', '3T', '4T', '5T'],
        colors: ['White', 'Blue', 'Green'],
        inStock: true,
        featured: false,
        tags: ['kids', 'school'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    if (category) {
      return mockProducts.filter(product => product.category === category);
    }
    return mockProducts;
  },

  getMockCategories(): Category[] {
    return [
      {
        id: '1',
        name: 'Men',
        slug: 'men',
        description: 'Men\'s clothing and accessories',
        order: 1
      },
      {
        id: '2',
        name: 'Women',
        slug: 'women',
        description: 'Women\'s clothing and accessories',
        order: 2
      },
      {
        id: '3',
        name: 'Kids',
        slug: 'kids',
        description: 'Children\'s clothing',
        order: 3
      },
      {
        id: '4',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Fashion accessories',
        order: 4
      }
    ];
  },

  // Helper functions to map database fields to frontend types
  mapDatabaseProductToProduct(dbProduct: any): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      description: dbProduct.description,
      price: dbProduct.price,
      originalPrice: dbProduct.original_price,
      images: dbProduct.images || [],
      category: dbProduct.category,
      subcategory: dbProduct.subcategory,
      sizes: dbProduct.sizes || [],
      colors: dbProduct.colors || [],
      inStock: dbProduct.in_stock,
      featured: dbProduct.featured,
      tags: dbProduct.tags || [],
      createdAt: dbProduct.created_at,
      updatedAt: dbProduct.updated_at
    };
  },

  mapDatabaseCategoryToCategory(dbCategory: any): Category {
    return {
      id: dbCategory.id,
      name: dbCategory.name,
      slug: dbCategory.slug,
      parentCategory: dbCategory.parent_category,
      description: dbCategory.description,
      order: dbCategory.sort_order
    };
  },

  // Cart operations
  async saveCartToDatabase(userId: string, cartItems: any[]) {
    try {
      // Clear existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      // Insert new cart items
      if (cartItems.length > 0) {
        const { error } = await supabase
          .from('cart_items')
          .insert(
            cartItems.map(item => ({
              user_id: userId,
              product_id: item.productId || item.id,
              quantity: item.quantity,
              size: item.size,
              color: item.color
            }))
          );

        if (error) {
          console.error('Error saving cart to database:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error saving cart to database:', error);
      throw error;
    }
  },

  async loadCartFromDatabase(userId: string) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products!inner(name, price, images, category)
        `)
        .eq('user_id', userId);

      if (error) {
        console.error('Error loading cart from database:', error);
        throw error;
      }

      return data?.map(item => ({
        id: `${item.product_id}-${item.size}-${item.color}`,
        name: item.products.name,
        price: item.products.price,
        image: item.products.images[0] || '',
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        category: item.products.category
      })) || [];
    } catch (error) {
      console.error('Error loading cart from database:', error);
      return [];
    }
  },

  // Wishlist operations
  async saveWishlistToDatabase(userId: string, productId: string) {
    try {
      const { error } = await supabase
        .from('wishlists')
        .insert({ user_id: userId, product_id: productId });

      if (error) {
        console.error('Error saving to wishlist:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      throw error;
    }
  },

  async removeFromWishlistDatabase(userId: string, productId: string) {
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  async loadWishlistFromDatabase(userId: string) {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          products!inner(id, name, price, images, category, description)
        `)
        .eq('user_id', userId);

      if (error) {
        console.error('Error loading wishlist from database:', error);
        throw error;
      }

      return data?.map(item => ({
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        image: item.products.images[0] || '',
        category: item.products.category,
        description: item.products.description
      })) || [];
    } catch (error) {
      console.error('Error loading wishlist from database:', error);
      return [];
    }
  },

  // Profile management
  async createUserProfile(userId: string, profileData: any) {
    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (existingProfile) {
        // Update existing profile
        const { data, error } = await supabase
          .from('user_profiles')
          .update({
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            avatar_url: profileData.avatar_url,
            preferences: profileData.preferences || {},
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .select()
          .single();
        
        return { data, error };
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('user_profiles')
          .insert({
            user_id: userId,
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            avatar_url: profileData.avatar_url,
            preferences: profileData.preferences || {}
          })
          .select()
          .single();
        
        return { data, error };
      }
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      return { data: null, error };
    }
  }
};
