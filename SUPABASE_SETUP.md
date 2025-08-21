# Supabase Setup Guide

## Step 1: Connect to Supabase via MCP
1. Click [Connect to Supabase](#open-mcp-popover) in the Builder.io interface
2. This will help you connect your Supabase project to this application

## Step 2: Set up Database Schema
After connecting Supabase:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/schema.sql` into the SQL editor
4. Run the SQL to create all necessary tables and relationships

## Step 3: Configure Environment Variables
The following environment variables need to be set:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Test the Connection
After setup:
1. Go to the Admin Panel
2. Try adding a product
3. The demo messages should disappear and products will be stored in your Supabase database

## Database Schema Overview

The setup creates these tables:
- `categories` - Product categories
- `products` - All products with full details
- `user_roles` - User permissions (admin/user)
- `user_profiles` - User profile information
- `cart_items` - Shopping cart data
- `wishlists` - User wishlist items

## Features Enabled
- Row Level Security (RLS) for data protection
- Automatic user profile creation on signup
- Timestamp tracking for all records
- Proper indexing for performance
- Foreign key relationships between tables

## Troubleshooting
If you see "demo mode" messages:
1. Check that environment variables are set correctly
2. Verify the database schema was created successfully
3. Ensure RLS policies allow your operations
4. Check browser console for specific error messages
