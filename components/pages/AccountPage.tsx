import { useState } from "react";
import { motion } from "motion/react";
import { User, Package, Heart, Settings, LogOut, Edit, Camera, MapPin, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { useAppContext } from "../../App";
import { AnimatedEmoji } from "../animations";
import { toast } from "sonner@2.0.3";

export function AccountPage() {
  const { user, setUser, cartItems, cartTotal, isAuthenticated } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: ""
  });

  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 89.99,
      items: 2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=100"
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      status: "Shipped",
      total: 159.98,
      items: 3,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=100"
    }
  ];

  // Mock wishlist data
  const wishlist = [
    {
      id: "1",
      name: "Summer Breeze Shirt",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200",
      inStock: true
    },
    {
      id: "2",
      name: "Elegant Dress",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=200",
      inStock: false
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <AnimatedEmoji emoji="🔒" animation="bounce" size="large" className="mb-6" />
          <h1 className="text-3xl font-black mb-4">Access Required</h1>
          <p className="text-gray-600 mb-8">Please sign in to access your account.</p>
          <Button 
            onClick={() => window.history.pushState({}, '', '/auth')}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 rounded-full font-bold"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: editForm.name,
        email: editForm.email
      });
    }
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    setUser(null);
    toast.success("Logged out successfully");
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-purple-500 text-white">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="text-xl font-bold"
                    />
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm">Save</Button>
                      <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                      <h1 className="text-2xl font-black">{user?.name}</h1>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                        className="p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-3">{user?.email}</p>
                    <div className="flex gap-2 justify-center md:justify-start">
                      <Badge className="bg-green-100 text-green-800">
                        <AnimatedEmoji emoji="✅" animation="pulse" size="small" className="mr-1" />
                        Verified
                      </Badge>
                      <Badge variant="outline">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium Member
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-black text-amber-600">{orders.length}</div>
                    <div className="text-xs text-gray-600">Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-purple-600">{wishlist.length}</div>
                    <div className="text-xs text-gray-600">Wishlist</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-rose-600">{cartItems.length}</div>
                    <div className="text-xs text-gray-600">Cart</div>
                  </div>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Account Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="w-full">
              <TabsTrigger value="orders" className="flex-1">
                <Package className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex-1">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black flex items-center gap-2">
                    Order History
                    <AnimatedEmoji emoji="📦" animation="bounce" size="small" />
                  </h2>
                  <Badge>{orders.length} orders</Badge>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <AnimatedEmoji emoji="📦" animation="bounce" size="large" className="mb-4" />
                    <p className="text-gray-600 mb-4">No orders yet</p>
                    <Button>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={order.image} alt="Order" className="w-16 h-16 rounded-lg object-cover" />
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold">{order.id}</span>
                              <Badge variant={
                                order.status === "Delivered" ? "default" : 
                                order.status === "Shipped" ? "secondary" : "outline"
                              }>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {order.items} items • ${order.total}
                            </p>
                            <p className="text-xs text-gray-500">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>

                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black flex items-center gap-2">
                    Wishlist
                    <AnimatedEmoji emoji="❤️" animation="pulse" size="small" />
                  </h2>
                  <Badge>{wishlist.length} items</Badge>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-8">
                    <AnimatedEmoji emoji="💝" animation="bounce" size="large" className="mb-4" />
                    <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                    <Button>Browse Products</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                          
                          <div className="flex-1">
                            <h3 className="font-bold mb-1">{item.name}</h3>
                            <p className="text-amber-600 font-bold mb-2">${item.price}</p>
                            
                            <div className="flex gap-2">
                              <Button size="sm" disabled={!item.inStock}>
                                {item.inStock ? "Add to Cart" : "Out of Stock"}
                              </Button>
                              <Button size="sm" variant="outline">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="p-6">
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  Profile Information
                  <AnimatedEmoji emoji="👤" animation="bounce" size="small" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input value={user?.name || ""} readOnly />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input value={user?.email || ""} readOnly />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input placeholder="Add phone number" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Birthday</label>
                    <Input type="date" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input placeholder="Add your address" />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    Account Settings
                    <AnimatedEmoji emoji="⚙️" animation="spin" size="small" />
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive updates about orders and promotions</p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Privacy Settings</h3>
                        <p className="text-sm text-gray-600">Control your data and privacy preferences</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add extra security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-red-600">Danger Zone</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full text-red-600 border-red-200">
                      Delete Account
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}