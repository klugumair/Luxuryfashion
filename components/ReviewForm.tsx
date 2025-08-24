import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { reviewService } from '../utils/supabase/reviews';
import { supabase } from '../utils/supabase/client';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  productName,
  onClose,
  onReviewSubmitted
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user if logged in, otherwise create a guest review
      const { data: { user } } = await supabase.auth.getUser();
      
      // For now, we'll create a temporary user ID for guest reviews
      // In a production app, you might want to require login or handle guest reviews differently
      const userId = user?.id || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const result = await reviewService.createReview({
        productId,
        userId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
        userName: userName.trim()
      });

      if (result.success) {
        toast.success('Review submitted successfully! Thank you for your feedback.');
        onReviewSubmitted();
        onClose();
      } else {
        console.error('Review submission error:', result.error);
        toast.error(result.error || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md"
      >
        <Card className="relative">
          <CardHeader className="pb-4">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <CardTitle className="text-xl pr-8">
              Write a Review
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Share your experience with {productName}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rating *</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1 hover:scale-110 transition-transform"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-gray-600">
                      {rating} star{rating !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full"
                  maxLength={50}
                />
              </div>

              {/* Title Input (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Review Title (Optional)
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your review"
                  className="w-full"
                  maxLength={100}
                />
              </div>

              {/* Comment Input */}
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-sm font-medium">
                  Your Review *
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  className="w-full min-h-[100px] resize-none"
                  maxLength={500}
                />
                <div className="text-right text-xs text-gray-500">
                  {comment.length}/500 characters
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
                  disabled={isSubmitting || !rating || !userName.trim() || !comment.trim()}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Submit Review
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
