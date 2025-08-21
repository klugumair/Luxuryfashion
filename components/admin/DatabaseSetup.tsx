"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Database, Check, AlertTriangle, Copy } from "lucide-react";
import { toast } from "sonner";
import { testDatabaseConnection, initializeDatabase } from "../../utils/supabase/init-db";

export function DatabaseSetup() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSqlScript, setShowSqlScript] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const result = await testDatabaseConnection();
      setIsConnected(result.connected);
      
      if (result.connected) {
        toast.success("Database Connected", {
          description: "Successfully connected to Supabase database"
        });
      } else {
        toast.error("Connection Failed", {
          description: result.error || "Failed to connect to database"
        });
      }
    } catch (error) {
      setIsConnected(false);
      toast.error("Connection Test Failed", {
        description: "An error occurred while testing the connection"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupDatabase = async () => {
    setIsLoading(true);
    try {
      const result = await initializeDatabase();
      
      if (result.success) {
        toast.success("Database Setup Complete", {
          description: "Database initialized successfully"
        });
        setIsConnected(true);
      } else {
        toast.error("Setup Failed", {
          description: "Failed to initialize database. Please run the SQL script manually."
        });
        setShowSqlScript(true);
      }
    } catch (error) {
      toast.error("Setup Error", {
        description: "An error occurred during database setup"
      });
      setShowSqlScript(true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!", {
      description: "SQL script copied to clipboard"
    });
  };

  const sqlScript = `-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_category VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category VARCHAR(255) NOT NULL,
  subcategory VARCHAR(255),
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Men', 'men', 'Men''s clothing and accessories', 1),
  ('Women', 'women', 'Women''s clothing and accessories', 2),
  ('Kids', 'kids', 'Children''s clothing', 3),
  ('Accessories', 'accessories', 'Fashion accessories', 4),
  ('Summer Collection', 'summer', 'Summer collection items', 5)
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON categories FOR DELETE USING (auth.role() = 'authenticated');`;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold">Database Setup</h2>
            <p className="text-gray-600">Configure your Supabase database connection</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {isConnected === null ? (
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
              ) : isConnected ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">
                {isConnected === null ? 'Unknown' : isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <Button 
              onClick={testConnection} 
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              Test Connection
            </Button>
          </div>

          {/* Setup Actions */}
          <div className="space-y-3">
            <Button 
              onClick={setupDatabase} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Setting up...' : 'Initialize Database'}
            </Button>

            <Button 
              onClick={() => setShowSqlScript(!showSqlScript)}
              variant="outline"
              className="w-full"
            >
              {showSqlScript ? 'Hide' : 'Show'} SQL Script
            </Button>
          </div>

          {/* SQL Script Display */}
          {showSqlScript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Manual Setup SQL Script</h3>
                <Button 
                  onClick={() => copyToClipboard(sqlScript)}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-96 overflow-y-auto">
                <pre>{sqlScript}</pre>
              </div>
              <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-lg">
                <p><strong>Manual Setup Instructions:</strong></p>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>Copy the SQL script above</li>
                  <li>Go to your Supabase dashboard → SQL Editor</li>
                  <li>Paste and run the script</li>
                  <li>Click "Test Connection" to verify setup</li>
                </ol>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
}
