export const VALID_PAGES = [
  "home",
  "summer",
  "men",
  "women",
  "kids",
  "accessories",
  "social-handle",
  "cart",
  "wishlist",
  "product-detail",
  "search",
  "auth",
  "account",
  "admin",
  "add-product",
  "size-guide",
  // Men's category pages
  "men-tshirts",
  "men-shirts", 
  "men-polos",
  "men-shorts",
  "men-trousers",
  "men-jeans",
  "men-activewear",
  // Women's category pages
  "women-tshirts",
  "women-polos",
  "women-shirts",
  "women-skirts-shorts",
  "women-dresses-jumpsuits",
  "women-activewear",
  "women-trousers",
  "women-jeans",
  // Kids Boys 6M-5Y category pages
  "kids-boys-6m5y-shirts",
  "kids-boys-6m5y-tshirts-polos",
  "kids-boys-6m5y-coord-sets",
  "kids-boys-6m5y-shorts",
  "kids-boys-6m5y-trousers",
  "kids-boys-6m5y-jeans",
  // Kids Boys 6-14Y category pages
  "kids-boys-6-14y-shirts",
  "kids-boys-6-14y-tshirts-polos",
  "kids-boys-6-14y-coord-sets",
  "kids-boys-6-14y-shorts",
  "kids-boys-6-14y-trousers",
  "kids-boys-6-14y-jeans",
  // Kids Girls 6M-5Y category pages
  "kids-girls-6m5y-shirts",
  "kids-girls-6m5y-tshirts",
  "kids-girls-6m5y-dresses-jumpsuits",
  "kids-girls-6m5y-coord-sets",
  "kids-girls-6m5y-shorts-skirts",
  "kids-girls-6m5y-trousers",
  "kids-girls-6m5y-jeans",
  // Kids Girls 6-14Y category pages
  "kids-girls-6-14y-shirts",
  "kids-girls-6-14y-tshirts",
  "kids-girls-6-14y-dresses-jumpsuits",
  "kids-girls-6-14y-coord-sets",
  "kids-girls-6-14y-shorts-skirts",
  "kids-girls-6-14y-trousers",
  "kids-girls-6-14y-jeans",
  // Accessories category pages
  "men-accessories",
  "women-accessories",
];

export const isValidPage = (page: string): boolean => {
  return VALID_PAGES.includes(page);
};

export const createNavigationHandler = (
  setCurrentPage: (page: string) => void,
  setIsLoading: (loading: boolean) => void,
  setIsMenuOpen: (open: boolean) => void,
  currentPage: string,
  setSearchQuery: (query: string) => void
) => {
  return (page: string) => {
    if (isValidPage(page)) {
      // Add loading state for smooth transitions
      setIsLoading(true);
      
      // Close mobile menu when navigating
      setIsMenuOpen(false);

      // Reset search when leaving search page
      if (currentPage === "search" && page !== "search") {
        setSearchQuery("");
      }

      // Smooth transition with slight delay
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
        
        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    }
  };
};
