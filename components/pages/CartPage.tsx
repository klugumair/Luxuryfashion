import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useAppContext } from "../../App";
import { AnimatedEmoji } from "../animations";

interface CartPageProps {
  setCurrentPage?: (page: string) => void;
}

export function CartPage({ setCurrentPage }: CartPageProps) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    cartCount 
  } = useAppContext();

  const shippingCost = cartTotal > 75 ? 0 : 9.99;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shippingCost + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <AnimatedEmoji emoji="🛒" animation="bounce" size="large" className="mb-6" />
            <h1 className="text-4xl font-black mb-4">Your Cart is Empty</h1>
            <p className="text-zinc-600 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. 
              Let's find some amazing pieces for you!
            </p>
            <Button 
              onClick={() => window.history.back()}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 rounded-full font-bold"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-black flex items-center gap-2">
              Shopping Cart
              <AnimatedEmoji emoji="🛒" animation="bounce" size="medium" />
            </h1>
            <p className="text-zinc-600">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black">Items ({cartCount})</h2>
                {cartItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-amber-50/50 transition-colors">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-zinc-900 mb-1 truncate">{item.name}</h3>
                        <p className="text-sm text-zinc-600 mb-2">
                          Size: {item.size} • Color: {item.color}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">${item.price}</span>
                          <span className="text-sm text-zinc-500">each</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 p-0 rounded-full"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <span className="w-8 text-center font-medium">{item.quantity}</span>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-xs text-zinc-500">
                            {item.quantity} × ${item.price}
                          </div>
                        </div>
                      </div>
                    </div>

                    {index < cartItems.length - 1 && <Separator className="my-4" />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                Order Summary
                <AnimatedEmoji emoji="📋" animation="bounce" size="small" />
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    Shipping
                    {shippingCost === 0 && (
                      <AnimatedEmoji emoji="🎉" animation="bounce" size="small" />
                    )}
                  </span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                    <AnimatedEmoji emoji="🚚" animation="bounce" size="small" className="mr-2" />
                    Add ${(75 - cartTotal).toFixed(2)} more for FREE shipping!
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  console.log("Checkout button clicked, setCurrentPage:", setCurrentPage);
                  if (setCurrentPage) {
                    setCurrentPage("checkout");
                  } else {
                    console.error("setCurrentPage is not available");
                    // Fallback navigation
                    window.location.hash = "#checkout";
                  }
                }}
                className="w-full mt-6 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold h-12 rounded-full"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Checkout
                <AnimatedEmoji emoji="💳" animation="bounce" size="small" className="ml-2" />
              </Button>

              <div className="mt-4 space-y-2 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <AnimatedEmoji emoji="🔒" animation="pulse" size="small" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatedEmoji emoji="📦" animation="bounce" size="small" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatedEmoji emoji="⚡" animation="pulse" size="small" />
                  <span>Fast shipping available</span>
                </div>
              </div>
            </Card>

            {/* Recommended Items */}
            <Card className="p-6 mt-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                You Might Also Like
                <AnimatedEmoji emoji="💡" animation="pulse" size="small" />
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: "Summer Breeze Shirt", price: 39.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200" },
                  { name: "Casual Weekend Jeans", price: 59.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=200" }
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-amber-600 font-bold">${item.price}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs">
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
