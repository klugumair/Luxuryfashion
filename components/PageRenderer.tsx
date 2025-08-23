import { HomePage } from "./pages/HomePage";
import { SummerPage } from "./pages/SummerPage";
import { MenPage } from "./pages/MenPage";
import { WomenPage } from "./pages/WomenPage";
import { SocialHandlePage } from "./pages/SocialHandlePage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { SearchPage } from "./pages/SearchPage";
import AuthPage from "./pages/AuthPage";
import { AccountPage } from "./pages/AccountPage";
import AuthTest from "./test/AuthTest";
import OAuthDebug from "./test/OAuthDebug";
import { SizeGuidePage } from "./pages/SizeGuidePage";
import { WishlistPage } from "./pages/WishlistPage";
// Import Men's Category Pages
import { MenTShirtsPage } from "./pages/MenTShirtsPage";
import { MenShirtsPage } from "./pages/MenShirtsPage";
import { MenPolosPage } from "./pages/MenPolosPage";
import { MenShortsPage } from "./pages/MenShortsPage";
import { MenTrousersPage } from "./pages/MenTrousersPage";
import { MenJeansPage } from "./pages/MenJeansPage";
import { MenActivewearPage } from "./pages/MenActivewearPage";
// Import Women's Category Pages
import { WomenTShirtsPage } from "./pages/WomenTShirtsPage";
import { WomenPolosPage } from "./pages/WomenPolosPage";
import { WomenShirtsPage } from "./pages/WomenShirtsPage";
import { WomenSkirtsAndShortsPage } from "./pages/WomenSkirtsAndShortsPage";
import { WomenDressesAndJumpsuitsPage } from "./pages/WomenDressesAndJumpsuitsPage";
import { WomenActivewearPage } from "./pages/WomenActivewearPage";
import { WomenTrousersPage } from "./pages/WomenTrousersPage";
import { WomenJeansPage } from "./pages/WomenJeansPage";
// Import Kids Category Pages - Boys 6M-5Y
import { KidsBoys6M5YShirtsPage } from "./pages/KidsBoys6M5YShirtsPage";
import { KidsBoys6M5YTShirtsPolosPage } from "./pages/KidsBoys6M5YTShirtsPolosPage";
import { KidsBoys6M5YCoordSetsPage } from "./pages/KidsBoys6M5YCoordSetsPage";
import { KidsBoys6M5YShortsPage } from "./pages/KidsBoys6M5YShortsPage";
import { KidsBoys6M5YTrousersPage } from "./pages/KidsBoys6M5YTrousersPage";
import { KidsBoys6M5YJeansPage } from "./pages/KidsBoys6M5YJeansPage";
// Import Kids Category Pages - Boys 6-14Y
import { KidsBoys6To14YShirtsPage } from "./pages/KidsBoys6To14YShirtsPage";
import { KidsBoys6To14YTShirtsPolosPage } from "./pages/KidsBoys6To14YTShirtsPolosPage";
// Import Kids Category Pages - Girls 6M-5Y
import { KidsGirls6M5YDressesJumpsuitsPage } from "./pages/KidsGirls6M5YDressesJumpsuitsPage";
import { KidsGirls6M5YTShirtsPage } from "./pages/KidsGirls6M5YTShirtsPage";
import { KidsGirls6M5YShirtsPage } from "./pages/KidsGirls6M5YShirtsPage";
import { KidsGirls6M5YShortsAndSkirtsPage } from "./pages/KidsGirls6M5YShortsAndSkirtsPage";
import { KidsGirls6M5YCoordSetsPage } from "./pages/KidsGirls6M5YCoordSetsPage";
import { KidsGirls6M5YJeansPage } from "./pages/KidsGirls6M5YJeansPage";
import { KidsGirls6M5YTrousersPage } from "./pages/KidsGirls6M5YTrousersPage";
// Import Kids Category Pages - Girls 6-14Y
import { KidsGirls6To14YShirtsPage } from "./pages/KidsGirls6To14YShirtsPage";
import { KidsGirls6To14YTShirtsPage } from "./pages/KidsGirls6To14YTShirtsPage";
import { KidsGirls6To14YDressesJumpsuitsPage } from "./pages/KidsGirls6To14YDressesJumpsuitsPage";
import { KidsGirls6To14YCoordSetsPage } from "./pages/KidsGirls6To14YCoordSetsPage";
// Import additional Boys 6-14Y pages
import { KidsBoys6To14YShortsPage } from "./pages/KidsBoys6To14YShortsPage";
import { KidsBoys6To14YCoordSetsPage } from "./pages/KidsBoys6To14YCoordSetsPage";
import { KidsBoys6To14YTrousersPage } from "./pages/KidsBoys6To14YTrousersPage";
import { KidsBoys6To14YJeansPage } from "./pages/KidsBoys6To14YJeansPage";
// Import remaining Girls 6-14Y pages
import { KidsGirls6To14YShortsAndSkirtsPage } from "./pages/KidsGirls6To14YShortsAndSkirtsPage";
import { KidsGirls6To14YTrousersPage } from "./pages/KidsGirls6To14YTrousersPage";
import { KidsGirls6To14YJeansPage } from "./pages/KidsGirls6To14YJeansPage";
// Import Accessories Pages
import { AccessoriesPage } from "./pages/AccessoriesPage";
import { MenAccessoriesPage } from "./pages/MenAccessoriesPage";
import { WomenAccessoriesPage } from "./pages/WomenAccessoriesPage";
// Import Admin Pages
import { AdminPanel } from "./pages/AdminPanel";
import AddProductPage from "./pages/AddProductPage";
import { ErrorBoundary } from "./ErrorBoundary";
// AuthTest already imported above as default import

interface PageRendererProps {
  currentPage: string;
  handlePageChange: (page: string) => void;
}

export function PageRenderer({ currentPage, handlePageChange }: PageRendererProps) {
  try {
    switch (currentPage) {
      case "men":
        return <MenPage />;
      case "women":
        return <WomenPage />;
      case "accessories":
        return <AccessoriesPage setCurrentPage={handlePageChange} />;
      case "summer":
        return <SummerPage />;
      case "social-handle":
        return <SocialHandlePage />;
      case "cart":
        return <CartPage setCurrentPage={handlePageChange} />;
      case "checkout":
        return <CheckoutPage setCurrentPage={handlePageChange} />;
      case "wishlist":
        return <WishlistPage />;
      case "product-detail":
        return <ProductDetailPage setCurrentPage={handlePageChange} />;
      case "search":
        return <SearchPage />;
      case "auth":
        return <AuthPage />;
      case "account":
        return <AccountPage setCurrentPage={handlePageChange} />;
      case "admin":
        return <AdminPanel />;
      case "add-product":
        return <AddProductPage />;
      case "size-guide":
        return <SizeGuidePage />;
      case "auth-test":
        return <AuthTest />;
      case "oauth-debug":
        return <OAuthDebug />;
      // Men's category pages
      case "men-tshirts":
        return <MenTShirtsPage />;
      case "men-shirts":
        return <MenShirtsPage />;
      case "men-polos":
        return <MenPolosPage />;
      case "men-shorts":
        return <MenShortsPage />;
      case "men-trousers":
        return <MenTrousersPage />;
      case "men-jeans":
        return <MenJeansPage />;
      case "men-activewear":
        return <MenActivewearPage />;
      // Women's category pages
      case "women-tshirts":
        return <WomenTShirtsPage />;
      case "women-polos":
        return <WomenPolosPage />;
      case "women-shirts":
        return <WomenShirtsPage />;
      case "women-skirts-shorts":
        return <WomenSkirtsAndShortsPage />;
      case "women-dresses-jumpsuits":
        return <WomenDressesAndJumpsuitsPage />;
      case "women-activewear":
        return <WomenActivewearPage />;
      case "women-trousers":
        return <WomenTrousersPage />;
      case "women-jeans":
        return <WomenJeansPage />;
      // Kids Boys 6M-5Y category pages
      case "kids-boys-6m5y-shirts":
        return <KidsBoys6M5YShirtsPage />;
      case "kids-boys-6m5y-tshirts-polos":
        return <KidsBoys6M5YTShirtsPolosPage />;
      case "kids-boys-6m5y-coord-sets":
        return <KidsBoys6M5YCoordSetsPage />;
      case "kids-boys-6m5y-shorts":
        return <KidsBoys6M5YShortsPage />;
      case "kids-boys-6m5y-trousers":
        return <KidsBoys6M5YTrousersPage />;
      case "kids-boys-6m5y-jeans":
        return <KidsBoys6M5YJeansPage />;
      // Kids Boys 6-14Y category pages
      case "kids-boys-6-14y-shirts":
        return <KidsBoys6To14YShirtsPage />;
      case "kids-boys-6-14y-tshirts-polos":
        return <KidsBoys6To14YTShirtsPolosPage />;
      case "kids-boys-6-14y-coord-sets":
        return <KidsBoys6To14YCoordSetsPage />;
      case "kids-boys-6-14y-shorts":
        return <KidsBoys6To14YShortsPage />;
      case "kids-boys-6-14y-trousers":
        return <KidsBoys6To14YTrousersPage />;
      case "kids-boys-6-14y-jeans":
        return <KidsBoys6To14YJeansPage />;
      // Kids Girls 6M-5Y category pages
      case "kids-girls-6m5y-shirts":
        return <KidsGirls6M5YShirtsPage />;
      case "kids-girls-6m5y-tshirts":
        return <KidsGirls6M5YTShirtsPage />;
      case "kids-girls-6m5y-dresses-jumpsuits":
        return <KidsGirls6M5YDressesJumpsuitsPage />;
      case "kids-girls-6m5y-coord-sets":
        return <KidsGirls6M5YCoordSetsPage />;
      case "kids-girls-6m5y-shorts-skirts":
        return <KidsGirls6M5YShortsAndSkirtsPage />;
      case "kids-girls-6m5y-trousers":
        return <KidsGirls6M5YTrousersPage />;
      case "kids-girls-6m5y-jeans":
        return <KidsGirls6M5YJeansPage />;
      // Kids Girls 6-14Y category pages
      case "kids-girls-6-14y-shirts":
        return <KidsGirls6To14YShirtsPage />;
      case "kids-girls-6-14y-tshirts":
        return <KidsGirls6To14YTShirtsPage />;
      case "kids-girls-6-14y-dresses-jumpsuits":
        return <KidsGirls6To14YDressesJumpsuitsPage />;
      case "kids-girls-6-14y-coord-sets":
        return <KidsGirls6To14YCoordSetsPage />;
      case "kids-girls-6-14y-shorts-skirts":
        return <KidsGirls6To14YShortsAndSkirtsPage />;
      case "kids-girls-6-14y-trousers":
        return <KidsGirls6To14YTrousersPage />;
      case "kids-girls-6-14y-jeans":
        return <KidsGirls6To14YJeansPage />;
      // Accessories category pages
      case "men-accessories":
        return <MenAccessoriesPage />;
      case "women-accessories":
        return <WomenAccessoriesPage />;
      case "home":
      default:
        return <HomePage setCurrentPage={handlePageChange} />;
    }
  } catch (error) {
    console.error("Error rendering page:", error);
    return <ErrorBoundary onReturnHome={() => handlePageChange("home")} />;
  }
}
