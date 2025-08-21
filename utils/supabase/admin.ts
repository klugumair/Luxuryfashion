import { supabase } from './client';
import { Product, Category, User } from '../../types';

export const adminService = {
  // Check if user is admin
  async checkAdminStatus(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        // If no role exists, user is not admin
        console.log('No role found for user:', userId);
        return false;
      }

      return data?.role === 'admin';
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
      let query = supabase
        .from('products')
        .select(`
          *,
          categories!inner(name, slug)
        `);
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data?.map(this.mapDatabaseProductToProduct) || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data?.map(this.mapDatabaseCategoryToCategory) || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
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
