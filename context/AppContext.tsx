import { useState, createContext, useContext, useEffect } from "react";
import { toast } from "sonner";
import { CartItem, WishlistItem, User, AppContextType, Product, Category } from "../types";
import { storage } from "../utils/storage";
import { adminService } from "../utils/supabase/admin";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
  setCurrentPage: (page: string) => void;
  setUser?: (user: User | null) => void;
}

export function AppProvider({ children, setCurrentPage, setUser: setUserFromProps }: AppProviderProps) {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [user, setUserState] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Admin state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Determine which setUser to use
  const setUser = setUserFromProps || setUserState;

  // Load data from localStorage on mount
  useEffect(() => {
    setCartItems(storage.loadCart());
    setWishlistItems(storage.loadWishlist());
    const savedUser = storage.loadUser();
    setUserState(savedUser);
    if (setUserFromProps && savedUser) {
      setUserFromProps(savedUser);
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    storage.saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    storage.saveWishlist(wishlistItems);
  }, [wishlistItems]);

  useEffect(() => {
    storage.saveUser(user);
  }, [user]);

  // Cart functions
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    try {
      const existingItem = cartItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color,
      );

      if (existingItem) {
        updateQuantity(existingItem.id, existingItem.quantity + 1);
        toast.success("Quantity updated in cart! 🛒", {
          description: `${item.name} quantity increased`,
          duration: 3000,
        });
      } else {
        const newItem: CartItem = { ...item, quantity: 1 };
        setCartItems((prev) => [...prev, newItem]);
        toast.success("Added to cart! ✨", {
          description: `${item.name} has been added to your cart`,
          duration: 3000,
          action: {
            label: "View Cart",
            onClick: () => setCurrentPage("cart"),
          },
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = (itemId: string) => {
    try {
      const item = cartItems.find((item) => item.id === itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));

      if (item) {
        toast.success("Removed from cart 🗑️", {
          description: `${item.name} has been removed from your cart`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        ),
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update item quantity");
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      toast.success("Cart cleared 🧹", {
        description: "All items have been removed from your cart",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  // Wishlist functions
  const addToWishlist = (item: WishlistItem) => {
    try {
      const existingItem = wishlistItems.find(
        (wishlistItem) => wishlistItem.id === item.id,
      );

      if (existingItem) {
        toast.info("Already in wishlist! 💕", {
          description: `${item.name} is already saved to your wishlist`,
          duration: 3000,
          action: {
            label: "View Wishlist",
            onClick: () => setCurrentPage("wishlist"),
          },
        });
        return;
      }

      setWishlistItems((prev) => [...prev, item]);
      toast.success("Added to wishlist! 💝", {
        description: `${item.name} has been saved to your wishlist`,
        duration: 3000,
        action: {
          label: "View Wishlist",
          onClick: () => setCurrentPage("wishlist"),
        },
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add item to wishlist");
    }
  };

  const removeFromWishlist = (itemId: string) => {
    try {
      const item = wishlistItems.find((item) => item.id === itemId);
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));

      if (item) {
        toast.success("Removed from wishlist 💔", {
          description: `${item.name} has been removed from your wishlist`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const clearWishlist = () => {
    try {
      setWishlistItems([]);
      toast.success("Wishlist cleared 🧹", {
        description: "All items have been removed from your wishlist",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      toast.error("Failed to clear wishlist");
    }
  };

  const isInWishlist = (itemId: string) => {
    return wishlistItems.some((item) => item.id === itemId);
  };

  // Admin functions
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      const newProduct = await adminService.createProduct(productData);
      if (newProduct) {
        setProducts(prev => [newProduct, ...prev]);
        toast.success("Product added successfully! 🎉", {
          description: `${productData.name} has been added to the store`,
        });
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      setIsLoading(true);
      const updatedProduct = await adminService.updateProduct(id, updates);
      if (updatedProduct) {
        setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
        toast.success("Product updated successfully! ✨", {
          description: `${updatedProduct.name} has been updated`,
        });
      }
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      const productToDelete = products.find(p => p.id === id);
      await adminService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Product deleted successfully! 🗑️", {
        description: `${productToDelete?.name || 'Product'} has been removed from the store`,
      });
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async (category?: string) => {
    try {
      setIsLoading(true);
      const fetchedProducts = await adminService.getProducts(category);
      setProducts(fetchedProducts);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check admin status when user changes
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.id) {
        try {
          const adminStatus = await adminService.checkAdminStatus(user.id);
          setIsAdmin(adminStatus);

          // If admin, fetch categories
          if (adminStatus) {
            const fetchedCategories = await adminService.getCategories();
            setCategories(fetchedCategories);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Computed values
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0,
  );
  const wishlistCount = wishlistItems.length;
  const isAuthenticated = !!user;

  const contextValue: AppContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount,
    user,
    setUser: setUser || setUserState,
    isAuthenticated,
    searchQuery,
    setSearchQuery,
    isLoading,
    setIsLoading,
    selectedProduct,
    setSelectedProduct,
    setCurrentPage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
