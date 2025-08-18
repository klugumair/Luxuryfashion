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
        console.error('Error checking admin status:', error);
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
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
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
      let query = supabase.from('products').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

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
        .order('order', { ascending: true });

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
      order: dbCategory.order
    };
  }
};
