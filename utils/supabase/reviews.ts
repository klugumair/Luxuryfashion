import { supabase } from './client';
import { ProductReview } from '../../types';

export const reviewService = {
  // Get all approved reviews for a product
  async getProductReviews(productId: string): Promise<ProductReview[]> {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select(`
          *,
          user_profiles:user_id (
            first_name,
            last_name
          )
        `)
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        // Silently handle database errors
        return [];
      }

      return data || [];
    } catch (error) {
      // Silently handle database errors
      return [];
    }
  },

  // Create a new review
  async createReview(review: {
    productId: string;
    userId: string;
    rating: number;
    title?: string;
    comment?: string;
    userName?: string;
  }): Promise<{ success: boolean; error?: string; data?: ProductReview }> {
    try {
      // First, ensure the product exists in our database
      const { data: productExists, error: productError } = await supabase
        .from('products')
        .select('id')
        .eq('id', review.productId)
        .single();

      if (productError || !productExists) {
        // Product doesn't exist in database, create a placeholder
        console.log('Product not found in database, creating placeholder...');
        
        // This is a fallback for products that exist in the UI but not in the database
        // In a real app, you'd want to ensure all products are properly stored
        const { error: insertError } = await supabase
          .from('products')
          .insert({
            id: review.productId,
            name: review.userName || 'Unknown Product',
            description: 'Product added via review system',
            price: 0,
            category: 'general',
            images: [],
            sizes: [],
            colors: [],
            in_stock: true,
            featured: false,
            tags: ['review-generated']
          });

        if (insertError) {
          console.error('Error creating placeholder product:', insertError);
          // Continue anyway - the review might still work
        }
      }
      const { data, error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: review.productId,
          user_id: review.userId,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
          user_name: review.userName, // Store the user name directly in the review
          verified_purchase: false, // You can implement logic to check if user actually purchased
          helpful_votes: 0,
          is_approved: true // Auto-approve for now, you can add moderation later
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          return { success: false, error: 'You have already reviewed this product' };
        }
        if (error.code === '23503') { // Foreign key constraint violation
          return { success: false, error: 'Product not found. Please try again.' };
        }
        console.error('Error creating review:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as ProductReview };
    } catch (error) {
      console.error('Error creating review:', error);
      return { success: false, error: 'Failed to create review' };
    }
  },

  // Update an existing review
  async updateReview(reviewId: string, updates: {
    rating?: number;
    title?: string;
    comment?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId);

      if (error) {
        console.error('Error updating review:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating review:', error);
      return { success: false, error: 'Failed to update review' };
    }
  },

  // Delete a review
  async deleteReview(reviewId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .delete()
        .eq('id', reviewId);

      if (error) {
        console.error('Error deleting review:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting review:', error);
      return { success: false, error: 'Failed to delete review' };
    }
  },

  // Get user's review for a specific product
  async getUserReview(productId: string, userId: string): Promise<ProductReview | null> {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          return null;
        }
        console.error('Error fetching user review:', error);
        return null;
      }

      return data as ProductReview;
    } catch (error) {
      console.error('Error fetching user review:', error);
      return null;
    }
  },

  // Get review statistics for a product
  async getReviewStats(productId: string): Promise<{
    averageRating: number;
    totalReviews: number;
    ratingDistribution: { [key: number]: number };
  }> {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('rating')
        .eq('product_id', productId)
        .eq('is_approved', true);

      if (error || !data) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }

      const totalReviews = data.length;
      const sum = data.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalReviews > 0 ? sum / totalReviews : 0;

      const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      data.forEach(review => {
        ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
      });

      return {
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews,
        ratingDistribution
      };
    } catch (error) {
      console.error('Error fetching review stats:', error);
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
  }
};
