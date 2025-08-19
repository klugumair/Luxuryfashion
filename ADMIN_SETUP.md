# Outlander E-commerce Admin Setup Guide

## 🚀 Quick Start

### 1. Database Setup

1. **Connect to Supabase**: Click the "Connect to Supabase" button in the top right of your Bolt interface
2. **Run Database Setup**: Go to your Supabase project dashboard → SQL Editor
3. **Execute Setup Script**: Copy and paste the contents of `supabase/database-setup.sql` and run it
4. **Verify Tables**: Check that all tables were created successfully in the Table Editor

### 2. Authentication Configuration

#### Google OAuth Setup (Already Enabled)
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - **Client ID**: Your Google OAuth client ID
   - **Client Secret**: Your Google OAuth client secret
4. Set authorized redirect URIs in Google Console:
   - `https://your-project-ref.supabase.co/auth/v1/callback`
   - `http://localhost:3000` (for development)

#### Email Authentication (Already Enabled)
- Email/password authentication is enabled by default
- Email confirmation is disabled for easier testing
- Users can sign up and sign in immediately

### 3. Create Your First Admin User

After setting up the database and signing up through your app:

1. **Sign up first**: Use your app to create an account with your email
2. **Grant admin access**: Go to Supabase SQL Editor and run:

```sql
INSERT INTO user_roles (user_id, role, assigned_by) 
SELECT id, 'admin', id FROM auth.users WHERE email = 'your-email@example.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin', updated_at = NOW();
```

Replace `your-email@example.com` with your actual email address.

### 4. Access the Admin Panel

1. **Sign in**: Log into your app with your admin account
2. **Access admin features**: 
   - Click your profile picture in the top right
   - Select "Admin Panel" from the dropdown
   - Or use the floating admin button on category pages

## 📊 Database Schema Overview

### Core Tables Created:

#### User Management
- **`user_roles`**: Admin permissions and role management
- **`user_profiles`**: Extended user information and preferences
- **`customer_addresses`**: Shipping and billing addresses

#### Product Catalog
- **`categories`**: Product categories with hierarchical structure
- **`products`**: Main product catalog with full details
- **`product_variants`**: Size/color combinations with individual stock
- **`product_reviews`**: Customer reviews and ratings

#### Shopping Features
- **`cart_items`**: Persistent shopping cart across devices
- **`wishlists`**: Saved items for later purchase

#### Order Management
- **`orders`**: Complete order tracking
- **`order_items`**: Individual items within orders
- **`order_status_history`**: Order status change tracking

#### Admin Features
- **`admin_logs`**: Audit trail of all admin actions
- **`inventory_tracking`**: Stock movement history

## 🔐 Security Features

### Row Level Security (RLS)
- **Enabled on all tables** for maximum security
- **User isolation**: Users can only access their own data
- **Admin access**: Admins can manage all data with proper permissions
- **Public access**: Product catalog is publicly viewable

### Authentication Features
- **Google OAuth**: One-click sign-in with Google accounts
- **Email/Password**: Traditional authentication method
- **Session management**: Automatic token refresh and persistence
- **Profile creation**: Automatic user profile creation on signup

## 🛠️ Admin Panel Features

### Product Management
- **Add Products**: Create new products with full details
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from catalog
- **Inventory Tracking**: Monitor stock levels and changes
- **Category Management**: Organize products into categories

### User Management
- **Role Assignment**: Grant admin access to users
- **User Profiles**: View and manage user information
- **Activity Monitoring**: Track admin actions and changes

### Order Management
- **Order Tracking**: View and update order status
- **Inventory Updates**: Automatic stock adjustments
- **Status History**: Complete audit trail of order changes

## 📱 User Features

### Shopping Experience
- **Persistent Cart**: Cart items saved across sessions and devices
- **Wishlist**: Save items for later purchase
- **Product Reviews**: Rate and review purchased items
- **Address Management**: Save multiple shipping addresses

### Account Management
- **Profile Management**: Update personal information
- **Order History**: View past purchases and status
- **Authentication**: Google OAuth or email/password
- **Data Sync**: Seamless experience across devices

## 🔧 Technical Features

### Performance Optimizations
- **Database Indexes**: Optimized queries for fast loading
- **Efficient Queries**: Minimal database calls with proper joins
- **Caching Strategy**: Local storage with database sync

### Data Integrity
- **Foreign Key Constraints**: Maintain data relationships
- **Check Constraints**: Validate data at database level
- **Triggers**: Automatic data updates and logging
- **Transactions**: Ensure data consistency

## 🚀 Getting Started Checklist

- [ ] Run the database setup SQL script
- [ ] Configure Google OAuth in Supabase
- [ ] Sign up for an account in your app
- [ ] Grant yourself admin access using SQL
- [ ] Access the admin panel
- [ ] Add your first product
- [ ] Test the shopping flow
- [ ] Configure additional settings as needed

## 📞 Support

If you encounter any issues:

1. **Check the browser console** for error messages
2. **Verify database setup** in Supabase Table Editor
3. **Confirm authentication** is working in Supabase Auth
4. **Test with sample data** using the provided SQL examples

## 🎯 Next Steps

1. **Add Products**: Use the admin panel to populate your catalog
2. **Customize Categories**: Modify categories to match your business
3. **Configure Payments**: Set up Stripe or other payment processors
4. **Deploy**: Deploy your app to production
5. **Monitor**: Use the admin logs to track system usage

Your Outlander e-commerce platform is now fully configured and ready for business! 🎉