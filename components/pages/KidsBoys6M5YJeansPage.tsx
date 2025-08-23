import { ProductGrid } from "../ProductGrid";

const kidsBoys6M5YJeansProducts = [
  {
    id: "kb6m5y-j-001",
    name: "Classic Blue Jeans",
    price: "$26",
    image: "https://i.pinimg.com/1200x/b2/6d/f2/b26df2f504f03a4fdde3b566c2453381.jpg",
    description: "Timeless classic blue jeans that never go out of style",
    category: "Jeans",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Light Blue", "Medium Blue", "Dark Blue"],
    brand: "Classic Denim",
    rating: 4.8,
    reviews: 267,
    features: ["Classic Cut", "Soft Denim", "Adjustable Waist"],
    icon: "👖",
    popular: true,
    itemCount: "Best Seller",
  },
  {
    id: "kb6m5y-j-002",
    name: "Distressed Play Jeans",
    price: "$28",
    image: "https://i.pinimg.com/736x/83/c0/94/83c0947a20e57d3065d53f81d399e261.jpg",
    description: "Trendy distressed jeans for fashionable little boys",
    category: "Jeans",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Light Wash", "Medium Wash", "Dark Wash"],
    brand: "Trendy Tots",
    rating: 4.7,
    reviews: 198,
    features: ["Distressed Style", "Trendy Look", "Comfortable"],
    icon: "👖",
    itemCount: "Trendy",
  },
  {
    id: "kb6m5y-j-003",
    name: "Stretch Comfort Jeans",
    price: "$30",
    image: "https://i.pinimg.com/1200x/92/e0/7c/92e07c40c5e2e104a82b8534ef9986fd.jpg",
    description: "Super stretchy jeans for active toddlers",
    category: "Jeans",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Medium Blue", "Dark Blue", "Black"],
    brand: "Flex Denim",
    rating: 4.6,
    reviews: 156,
    features: ["Stretch Fabric", "Active Fit", "Flexible"],
    icon: "👖",
    itemCount: "Stretch",
  },
  {
    id: "kb6m5y-j-004",
    name: "Straight Leg Jeans",
    price: "$25",
    image: 'https://i.pinimg.com/736x/a7/24/04/a724043111330c24e7d955e6f3343251.jpg",
    description: "Classic straight leg cut perfect for everyday wear",
    category: "Jeans",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Light Blue", "Medium Blue", "Dark Blue"],
    brand: "Straight Style",
    rating: 4.5,
    reviews: 123,
    features: ["Straight Leg", "Classic Fit", "Versatile"],
    icon: "👖",
    itemCount: "Classic",
  },
  {
    id: "kb6m5y-j-005",
    name: "Relaxed Fit Jeans",
    price: "$27",
    image: "https://i.pinimg.com/1200x/ab/1e/80/ab1e805f210e7ed7913053f30210d2d2.jpg",
    description: "Roomy relaxed fit jeans for maximum comfort",
    category: "Jeans",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Medium Wash", "Dark Wash", "Stone Wash"],
    brand: "Relaxed Kids",
    rating: 4.4,
    reviews: 145,
    features: ["Relaxed Fit", "Roomy", "Comfortable"],
    icon: "👖",
    itemCount: "Relaxed",
  },
  {
    id: "kb6m5y-j-006",
    name: "Slim Fit Jeans",
    price: "$29",
    image: "https://i.pinimg.com/736x/62/4a/23/624a233c9180115138325c2566ced214.jpg",
    description: "Modern slim fit jeans for a contemporary look",
    category: "Jeans",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Dark Blue", "Black", "Gray"],
    brand: "Modern Kids",
    rating: 4.3,
    reviews: 167,
    features: ["Slim Fit", "Modern Style", "Contemporary"],
    icon: "👖",
    itemCount: "Modern",
  },
  {
    id: "kb6m5y-j-007",
    name: "Pull-On Jeggings",
    price: "$24",
    image: "https://i.pinimg.com/1200x/cb/0f/ee/cb0feea718a1ff310545e128e9b5c326.jpg",
    description: "Easy pull-on jeggings that look like jeans",
    category: "Jeans",
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T"],
    colors: ["Medium Blue", "Dark Blue", "Black"],
    brand: "Easy Denim",
    rating: 4.6,
    reviews: 189,
    features: ["Pull-On Style", "Jeggings", "Easy Dressing"],
    icon: "👖",
    itemCount: "Easy",
  },

];

export function KidsBoys6M5YJeansPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <main className="flex-1">
        <ProductGrid 
          title="Boys 6M-5Y Jeans Collection" 
          subtitle="Stylish & Durable Jeans for Little Adventurers"
          products={kidsBoys6M5YJeansProducts} 
        />
      </main>
    </div>
  );
}