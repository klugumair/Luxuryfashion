-- Outlander E-commerce Complete Database Setup
-- This script sets up all necessary tables, policies, and functions for the Outlander e-commerce platform

/*
  # Complete E-commerce Database Setup

  1. Authentication & User Management
    - `user_roles` table for admin permissions
    - `user_profiles` table for extended user data
    
  2. Product Management
    - `categories` table for product organization
    - `products` table for product catalog
    - `product_variants` table for size/color combinations
    - `product_reviews` table for customer feedback
    
  3. Order Management
    - `orders` table for order tracking
    - `order_items` table for order line items
    - `order_status_history` table for status tracking
    
  4. Customer Features
    - `wishlists` table for saved items
    - `cart_items` table for persistent shopping cart
    - `customer_addresses` table for shipping addresses
    
  5. Admin Features
    - `admin_logs` table for audit trail
    - `inventory_tracking` table for stock management
    
  6. Security
    - Row Level Security (RLS) enabled on all tables
    - Comprehensive policies for data access
    - Admin-only access controls
*/

-- =============================================
-- 1. USER MANAGEMENT TABLES
-- =============================================

-- User roles table for admin permissions
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Extended user profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  marketing_consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Customer addresses
CREATE TABLE IF NOT EXISTS customer_addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('billing', 'shipping', 'both')) DEFAULT 'shipping',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state_province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  phone TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. PRODUCT MANAGEMENT TABLES
-- =============================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_category UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,
  image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10,2) CHECK (original_price >= price),
  cost_price DECIMAL(10,2) CHECK (cost_price >= 0),
  sku TEXT UNIQUE,
  barcode TEXT,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  subcategory TEXT,
  brand TEXT,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  care_instructions TEXT,
  weight_grams INTEGER,
  dimensions JSONB, -- {length, width, height}
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  low_stock_threshold INTEGER DEFAULT 10,
  featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants for size/color combinations
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE,
  size TEXT,
  color TEXT,
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, size, color)
);

-- Product reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  helpful_votes INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- =============================================
-- 3. SHOPPING & WISHLIST TABLES
-- =============================================

-- Persistent shopping cart
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  size TEXT,
  color TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id, size, color)
);

-- Wishlist items
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- =============================================
-- 4. ORDER MANAGEMENT TABLES
-- =============================================

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
  tax_amount DECIMAL(10,2) DEFAULT 0 CHECK (tax_amount >= 0),
  shipping_amount DECIMAL(10,2) DEFAULT 0 CHECK (shipping_amount >= 0),
  discount_amount DECIMAL(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  currency TEXT DEFAULT 'USD',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
  payment_method TEXT,
  payment_reference TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  notes TEXT,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT,
  size TEXT,
  color TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order status history
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  changed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 5. ADMIN & ANALYTICS TABLES
-- =============================================

-- Admin activity logs
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory tracking
CREATE TABLE IF NOT EXISTS inventory_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL CHECK (change_type IN ('restock', 'sale', 'adjustment', 'return')),
  quantity_change INTEGER NOT NULL,
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reason TEXT,
  reference_id UUID, -- Could reference order_id or other tables
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 6. INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_user_id ON customer_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_default ON customer_addresses(user_id, is_default);

-- Product indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);

-- Category indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_category);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order);

-- Shopping indexes
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_product_id ON wishlists(product_id);

-- Order indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);

-- Admin indexes
CREATE INDEX IF NOT EXISTS idx_admin_logs_user_id ON admin_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_action ON admin_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_tracking_product_id ON inventory_tracking(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_tracking_created_at ON inventory_tracking(created_at DESC);

-- =============================================
-- 7. INSERT DEFAULT DATA
-- =============================================

-- Insert default categories
INSERT INTO categories (name, slug, parent_category, description, sort_order, is_active) VALUES
  ('Men''s Clothing', 'men', NULL, 'Premium clothing for men', 1, true),
  ('Women''s Clothing', 'women', NULL, 'Elegant clothing for women', 2, true),
  ('Kids'' Clothing', 'kids', NULL, 'Fun and comfortable clothing for children', 3, true),
  ('Accessories', 'accessories', NULL, 'Fashion accessories and lifestyle items', 4, true),
  ('Summer Collection', 'summer', NULL, 'Limited time summer collection', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert subcategories for Men's Clothing
DO $$
DECLARE
  men_category_id UUID;
BEGIN
  SELECT id INTO men_category_id FROM categories WHERE slug = 'men';
  
  IF men_category_id IS NOT NULL THEN
    INSERT INTO categories (name, slug, parent_category, description, sort_order, is_active) VALUES
      ('T-Shirts', 'men-tshirts', men_category_id, 'Comfortable t-shirts for men', 1, true),
      ('Shirts', 'men-shirts', men_category_id, 'Dress and casual shirts', 2, true),
      ('Polos', 'men-polos', men_category_id, 'Classic polo shirts', 3, true),
      ('Shorts', 'men-shorts', men_category_id, 'Summer shorts and swim wear', 4, true),
      ('Trousers', 'men-trousers', men_category_id, 'Formal and casual trousers', 5, true),
      ('Jeans', 'men-jeans', men_category_id, 'Denim jeans in various fits', 6, true),
      ('Activewear', 'men-activewear', men_category_id, 'Athletic and performance wear', 7, true)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END $$;

-- Insert subcategories for Women's Clothing
DO $$
DECLARE
  women_category_id UUID;
BEGIN
  SELECT id INTO women_category_id FROM categories WHERE slug = 'women';
  
  IF women_category_id IS NOT NULL THEN
    INSERT INTO categories (name, slug, parent_category, description, sort_order, is_active) VALUES
      ('T-Shirts', 'women-tshirts', women_category_id, 'Stylish t-shirts for women', 1, true),
      ('Polos', 'women-polos', women_category_id, 'Elegant polo shirts', 2, true),
      ('Shirts & Blouses', 'women-shirts', women_category_id, 'Professional and casual tops', 3, true),
      ('Skirts & Shorts', 'women-skirts-shorts', women_category_id, 'Bottoms for every occasion', 4, true),
      ('Dresses & Jumpsuits', 'women-dresses-jumpsuits', women_category_id, 'One-piece elegance', 5, true),
      ('Activewear', 'women-activewear', women_category_id, 'Performance and yoga wear', 6, true),
      ('Trousers', 'women-trousers', women_category_id, 'Professional and casual pants', 7, true),
      ('Jeans', 'women-jeans', women_category_id, 'Denim in various cuts', 8, true)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END $$;

-- =============================================
-- 8. ROW LEVEL SECURITY SETUP
-- =============================================

-- Enable RLS on all tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_tracking ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 9. RLS POLICIES
-- =============================================

-- User roles policies
CREATE POLICY "Users can view their own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON user_roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage roles" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Customer addresses policies
CREATE POLICY "Users can manage their own addresses" ON customer_addresses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all addresses" ON customer_addresses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Categories policies (public read, admin write)
CREATE POLICY "Anyone can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can view all categories" ON categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can view all products" ON products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Product variants policies
CREATE POLICY "Anyone can view active variants" ON product_variants
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage variants" ON product_variants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Product reviews policies
CREATE POLICY "Anyone can view approved reviews" ON product_reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can manage their own reviews" ON product_reviews
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews" ON product_reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Cart items policies
CREATE POLICY "Users can manage their own cart" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can manage their own wishlist" ON wishlists
  FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Order items policies
CREATE POLICY "Users can view their order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage order items" ON order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admin logs policies (admin only)
CREATE POLICY "Admins can view admin logs" ON admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert admin logs" ON admin_logs
  FOR INSERT WITH CHECK (true);

-- Inventory tracking policies (admin only)
CREATE POLICY "Admins can view inventory tracking" ON inventory_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage inventory tracking" ON inventory_tracking
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================
-- 10. FUNCTIONS AND TRIGGERS
-- =============================================

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_user_roles_updated_at 
  BEFORE UPDATE ON user_roles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_addresses_updated_at 
  BEFORE UPDATE ON customer_addresses 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at 
  BEFORE UPDATE ON product_variants 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at 
  BEFORE UPDATE ON product_reviews 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at 
  BEFORE UPDATE ON cart_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  order_num TEXT;
  counter INTEGER;
BEGIN
  -- Get today's date in YYYYMMDD format
  order_num := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-';
  
  -- Get count of orders today
  SELECT COUNT(*) + 1 INTO counter
  FROM orders 
  WHERE DATE(created_at) = CURRENT_DATE;
  
  -- Pad with zeros to make it 4 digits
  order_num := order_num || LPAD(counter::TEXT, 4, '0');
  
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (user_id, first_name, last_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    '',
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  
  -- Assign default user role
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update product stock after order
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
  -- Update main product stock
  UPDATE products 
  SET stock_quantity = stock_quantity - NEW.quantity,
      updated_at = NOW()
  WHERE id = NEW.product_id;
  
  -- Update variant stock if applicable
  IF NEW.variant_id IS NOT NULL THEN
    UPDATE product_variants 
    SET stock_quantity = stock_quantity - NEW.quantity,
        updated_at = NOW()
    WHERE id = NEW.variant_id;
  END IF;
  
  -- Log inventory change
  INSERT INTO inventory_tracking (
    product_id, 
    variant_id, 
    change_type, 
    quantity_change, 
    previous_quantity, 
    new_quantity,
    reason,
    reference_id
  )
  SELECT 
    NEW.product_id,
    NEW.variant_id,
    'sale',
    -NEW.quantity,
    p.stock_quantity + NEW.quantity,
    p.stock_quantity,
    'Order sale',
    NEW.order_id
  FROM products p WHERE p.id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stock when order items are inserted
CREATE TRIGGER update_stock_on_order_item_insert
  AFTER INSERT ON order_items
  FOR EACH ROW EXECUTE FUNCTION update_product_stock();

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if user is admin
  IF EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
  ) THEN
    INSERT INTO admin_logs (
      user_id,
      action,
      resource_type,
      resource_id,
      old_values,
      new_values
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      COALESCE(NEW.id::TEXT, OLD.id::TEXT),
      CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
      CASE WHEN TG_OP = 'INSERT' THEN to_jsonb(NEW) 
           WHEN TG_OP = 'UPDATE' THEN to_jsonb(NEW)
           ELSE NULL END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply admin logging to key tables
CREATE TRIGGER log_products_changes
  AFTER INSERT OR UPDATE OR DELETE ON products
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_categories_changes
  AFTER INSERT OR UPDATE OR DELETE ON categories
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_user_roles_changes
  AFTER INSERT OR UPDATE OR DELETE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

-- =============================================
-- 11. VIEWS FOR COMMON QUERIES
-- =============================================

-- View for product catalog with category info
CREATE OR REPLACE VIEW product_catalog AS
SELECT 
  p.*,
  c.name as category_name,
  c.slug as category_slug,
  pc.name as parent_category_name,
  pc.slug as parent_category_slug,
  COALESCE(AVG(pr.rating), 0) as average_rating,
  COUNT(pr.id) as review_count
FROM products p
LEFT JOIN categories c ON p.category = c.slug
LEFT JOIN categories pc ON c.parent_category = pc.id
LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = true
WHERE p.is_active = true
GROUP BY p.id, c.name, c.slug, pc.name, pc.slug;

-- View for user order history
CREATE OR REPLACE VIEW user_order_history AS
SELECT 
  o.*,
  COUNT(oi.id) as item_count,
  STRING_AGG(oi.product_name, ', ') as product_names
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;

-- =============================================
-- 12. GRANT PERMISSIONS
-- =============================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Grant access to views
GRANT SELECT ON product_catalog TO anon, authenticated;
GRANT SELECT ON user_order_history TO authenticated;

-- =============================================
-- 13. SAMPLE ADMIN USER SETUP
-- =============================================

-- Instructions for creating your first admin user:
-- 1. Sign up through your app first with your email
-- 2. Then run this command (replace with your actual email):

/*
INSERT INTO user_roles (user_id, role, assigned_by) 
SELECT id, 'admin', id FROM auth.users WHERE email = 'your-admin-email@example.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin', updated_at = NOW();
*/

-- Example (uncomment and replace with your email after signup):
-- INSERT INTO user_roles (user_id, role, assigned_by) 
-- SELECT id, 'admin', id FROM auth.users WHERE email = 'admin@outlander.com'
-- ON CONFLICT (user_id) DO UPDATE SET role = 'admin', updated_at = NOW();

-- =============================================
-- 14. SAMPLE PRODUCTS (OPTIONAL)
-- =============================================

-- Uncomment to add sample products for testing:
/*
INSERT INTO products (
  name, slug, description, price, original_price, category, 
  sizes, colors, images, featured, stock_quantity, tags
) VALUES
(
  'Classic Summer T-Shirt',
  'classic-summer-tshirt',
  'Comfortable cotton t-shirt perfect for summer days. Made from premium organic cotton with a relaxed fit.',
  29.99,
  39.99,
  'men',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['White', 'Black', 'Navy', 'Gray'],
  ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'],
  true,
  100,
  ARRAY['summer', 'cotton', 'casual']
),
(
  'Elegant Summer Dress',
  'elegant-summer-dress',
  'Beautiful flowing dress perfect for summer occasions. Lightweight fabric with elegant drape.',
  79.99,
  99.99,
  'women',
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Coral', 'Navy', 'White', 'Pink'],
  ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800'],
  true,
  75,
  ARRAY['summer', 'dress', 'elegant']
),
(
  'Kids Adventure T-Shirt',
  'kids-adventure-tshirt',
  'Fun and colorful t-shirt designed for active kids. Soft cotton blend with playful graphics.',
  19.99,
  24.99,
  'kids',
  ARRAY['4T', '5T', '6', '8', '10', '12'],
  ARRAY['Red', 'Blue', 'Green', 'Yellow'],
  ARRAY['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800'],
  false,
  50,
  ARRAY['kids', 'adventure', 'colorful']
);
*/

-- =============================================
-- SETUP COMPLETE
-- =============================================

-- Your Outlander e-commerce database is now fully configured with:
-- ✅ Complete user management with roles and profiles
-- ✅ Comprehensive product catalog with variants and reviews
-- ✅ Shopping cart and wishlist functionality
-- ✅ Full order management system
-- ✅ Admin panel with audit logging
-- ✅ Inventory tracking
-- ✅ Row Level Security on all tables
-- ✅ Performance optimized with proper indexes
-- ✅ Automated triggers for data consistency

-- Next steps:
-- 1. Create your admin user using the SQL command above
-- 2. Configure Google OAuth in Supabase Auth settings
-- 3. Test the authentication flow in your app
-- 4. Add your first products through the admin panel