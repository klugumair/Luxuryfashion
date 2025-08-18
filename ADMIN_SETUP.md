# Admin Panel Setup Instructions

## 1. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/database-setup.sql`
4. Run the SQL script to create all necessary tables and policies

## 2. Create Your First Admin User

After setting up the database:

1. Sign up for an account in your app using your email
2. Go back to the Supabase SQL Editor
3. Run this command to make yourself an admin (replace with your email):

```sql
INSERT INTO user_roles (user_id, role) 
SELECT id, 'admin' FROM auth.users WHERE email = 'your-email@example.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

## 3. Access the Admin Panel

1. Log into your app with your admin account
2. Click on your profile picture/user menu in the top right
3. You should see an "Admin Panel" option
4. Click it to access the admin features

## 4. Admin Features

### Product Management
- **Add Products**: Click "Add Product" to create new products
- **Edit Products**: Click the edit icon on any product card
- **Delete Products**: Click the trash icon on any product card
- **Filter & Search**: Use the search bar and category filter

### Categories Available
- Men's Clothing
- Women's Clothing
- Kids' Clothing
- Accessories
- Summer Collection

### Product Fields
- **Name**: Product name (required)
- **Description**: Product description (required)
- **Price**: Current selling price (required)
- **Original Price**: Original price for discount display
- **Category**: Main category (required)
- **Sizes**: Available sizes (comma-separated)
- **Colors**: Available colors (comma-separated)
- **Images**: Image URLs (comma-separated)
- **In Stock**: Availability toggle
- **Featured**: Featured product toggle

## 5. Security

- Only users with admin role can access the admin panel
- All database operations are protected by Row Level Security (RLS)
- Non-admin users will be redirected away from admin pages

## 6. Troubleshooting

### Can't access admin panel?
1. Make sure you've run the database setup SQL
2. Verify your user has admin role in the `user_roles` table
3. Check browser console for any errors

### Products not showing?
1. Check if products were created successfully in the database
2. Verify the category names match exactly
3. Check if there are any JavaScript errors in the console

### Database errors?
1. Ensure all tables were created successfully
2. Check that RLS policies are applied correctly
3. Verify your Supabase connection is working

## 7. Adding More Admins

To give admin access to other users:

1. Have them sign up in your app first
2. Run this SQL in Supabase (replace email):

```sql
INSERT INTO user_roles (user_id, role) 
SELECT id, 'admin' FROM auth.users WHERE email = 'new-admin@example.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

## 8. Demo Data (Optional)

You can add some demo products to test the system:

```sql
INSERT INTO products (name, description, price, original_price, category, sizes, colors, images, featured) VALUES
('Classic White T-Shirt', 'Comfortable cotton t-shirt perfect for everyday wear', 29.99, 39.99, 'men', ARRAY['S', 'M', 'L', 'XL'], ARRAY['White', 'Black', 'Gray'], ARRAY['https://example.com/tshirt1.jpg'], true),
('Summer Floral Dress', 'Beautiful floral dress perfect for summer occasions', 89.99, 120.00, 'women', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Floral', 'Blue', 'Pink'], ARRAY['https://example.com/dress1.jpg'], true),
('Kids Rainbow Hoodie', 'Colorful hoodie that kids love', 45.99, NULL, 'kids', ARRAY['4T', '5T', '6T'], ARRAY['Rainbow', 'Pink', 'Blue'], ARRAY['https://example.com/hoodie1.jpg'], false);
```

That's it! Your admin panel should now be fully functional.
