export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  category: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AppContextType {
  // Cart state
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist state
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: string) => boolean;
  wishlistCount: number;

  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;

  // UI state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Navigation
  selectedProduct: any;
  setSelectedProduct: (product: any) => void;
  setCurrentPage: (page: string) => void;
}