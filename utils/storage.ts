import { CartItem, WishlistItem, User } from "../types";

const STORAGE_KEYS = {
  CART: "outlander-cart",
  WISHLIST: "outlander-wishlist",
  USER: "outlander-user",
};

export const storage = {
  // Cart operations
  saveCart: (cartItems: CartItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  },

  loadCart: (): CartItem[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      localStorage.removeItem(STORAGE_KEYS.CART);
      return [];
    }
  },

  // Wishlist operations
  saveWishlist: (wishlistItems: WishlistItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  },

  loadWishlist: (): WishlistItem[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading wishlist:", error);
      localStorage.removeItem(STORAGE_KEYS.WISHLIST);
      return [];
    }
  },

  // User operations
  saveUser: (user: User | null) => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  },

  loadUser: (): User | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem(STORAGE_KEYS.USER);
      return null;
    }
  },

  // Clear corrupted data
  clearCorruptedData: () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.WISHLIST);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};