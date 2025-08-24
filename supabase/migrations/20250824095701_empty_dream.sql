/*
  # Add user_name field to product_reviews table

  1. Changes
    - Add `user_name` column to `product_reviews` table to store reviewer names
    - This allows both logged-in users and guest reviewers to have their names displayed
    - Update existing reviews to populate user_name from user_profiles if available

  2. Security
    - No changes to RLS policies needed
    - Existing policies continue to work as expected
*/

-- Add user_name column to product_reviews table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_reviews' AND column_name = 'user_name'
  ) THEN
    ALTER TABLE product_reviews ADD COLUMN user_name TEXT;
  END IF;
END $$;

-- Update existing reviews to populate user_name from user_profiles
UPDATE product_reviews 
SET user_name = COALESCE(
  (SELECT CONCAT(first_name, ' ', last_name) 
   FROM user_profiles 
   WHERE user_profiles.user_id = product_reviews.user_id),
  'Anonymous User'
)
WHERE user_name IS NULL;

-- Set default value for future reviews
ALTER TABLE product_reviews 
ALTER COLUMN user_name SET DEFAULT 'Anonymous User';