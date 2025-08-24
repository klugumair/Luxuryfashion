import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Truck, Shield, MapPin, Mail, Phone, User, Lock, Calendar, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useAppContext } from "../../App";
import { AnimatedEmoji } from "../animations";
import { toast } from "sonner";

interface CheckoutPageProps {
  setCurrentPage: (page: string) => void;
}

export function CheckoutPage({ setCurrentPage }: CheckoutPageProps) {
  const { cartItems, cartTotal, clearCart, cartCount } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddressSame: true,
  });

  const [billingForm, setBillingForm] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const shippingCost = cartTotal > 75 ? 0 : 9.99;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !shippingForm[field as keyof typeof shippingForm]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setCurrentStep(2);
    toast.success("Shipping information saved!");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate payment form
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.nameOnCard) {
      toast.error("Please fill in all payment details");
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);
      clearCart();
      toast.success("Order placed successfully!", {
        description: "You'll receive a confirmation email shortly"
      });
    }, 3000);
  };

  const updateShippingForm = (field: string, value: string) => {
    setShippingForm(prev => ({ ...prev, [field]: value }));
  };

  const updatePaymentForm = (field: string, value: string | boolean) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  };

  const updateBillingForm = (field: string, value: string) => {
    setBillingForm(prev => ({ ...prev, [field]: value }));
  };

  if (cartItems.length === 0 && currentStep !== 3) {
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
              You need items in your cart to proceed with checkout.
            </p>
            <Button 
              onClick={() => setCurrentPage("home")}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 rounded-full font-bold"
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage("cart")}
            className="rounded-full hover:bg-amber-100 transition-all duration-300 border-2 border-amber-300 hover:border-amber-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          <div>
            <h1 className="text-3xl font-black flex items-center gap-2">
              Secure Checkout
              <AnimatedEmoji emoji="🔒" animation="pulse" size="medium" />
            </h1>
            <p className="text-zinc-600">
              Complete your order securely and safely
            </p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-8 mb-8">
            {[
              { step: 1, title: "Shipping", icon: Truck },
              { step: 2, title: "Payment", icon: CreditCard },
              { step: 3, title: "Confirmation", icon: CheckCircle },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 rounded-full border-2 transition-all ${
                    currentStep >= step
                      ? 'border-transparent text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                  style={{
                    height: '38px',
                    width: '42px',
                    ...(currentStep >= step && {
                      backgroundImage: 'url(https://m.media-amazon.com/images/I/41tfInzWFKL._UF350,350_QL50_.jpg)',
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    })
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-amber-600' : 'text-gray-400'
                }`}>
                  {title}
                </span>
                {step < 3 && (
                  <div className={`ml-8 w-16 h-0.5 transition-all ${
                    currentStep > step ? 'bg-gradient-to-r from-amber-500 to-purple-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 shadow-xl border-2 border-amber-200">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-black">Shipping Information</h2>
                    <AnimatedEmoji emoji="📦" animation="bounce" size="small" />
                  </div>

                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={shippingForm.firstName}
                          onChange={(e) => updateShippingForm('firstName', e.target.value)}
                          placeholder="Enter your first name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={shippingForm.lastName}
                          onChange={(e) => updateShippingForm('lastName', e.target.value)}
                          placeholder="Enter your last name"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingForm.email}
                          onChange={(e) => updateShippingForm('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingForm.phone}
                          onChange={(e) => updateShippingForm('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Street Address *
                      </Label>
                      <Input
                        id="address"
                        value={shippingForm.address}
                        onChange={(e) => updateShippingForm('address', e.target.value)}
                        placeholder="123 Main Street"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingForm.city}
                          onChange={(e) => updateShippingForm('city', e.target.value)}
                          placeholder="City"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={shippingForm.zipCode}
                          onChange={(e) => updateShippingForm('zipCode', e.target.value)}
                          placeholder="12345"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold h-12 rounded-full"
                    >
                      Continue to Payment
                      <AnimatedEmoji emoji="➡️" animation="bounce" size="small" className="ml-2" />
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 shadow-xl border-2 border-amber-200">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-black">Payment Information</h2>
                    <AnimatedEmoji emoji="💳" animation="bounce" size="small" />
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <Tabs defaultValue="card" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="space-y-6 mt-6">
                        <div>
                          <Label htmlFor="nameOnCard" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Name on Card *
                          </Label>
                          <Input
                            id="nameOnCard"
                            value={paymentForm.nameOnCard}
                            onChange={(e) => updatePaymentForm('nameOnCard', e.target.value)}
                            placeholder="John Doe"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber" className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Card Number *
                          </Label>
                          <Input
                            id="cardNumber"
                            value={paymentForm.cardNumber}
                            onChange={(e) => updatePaymentForm('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate" className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Expiry Date *
                            </Label>
                            <Input
                              id="expiryDate"
                              value={paymentForm.expiryDate}
                              onChange={(e) => updatePaymentForm('expiryDate', e.target.value)}
                              placeholder="MM/YY"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              CVV *
                            </Label>
                            <Input
                              id="cvv"
                              value={paymentForm.cvv}
                              onChange={(e) => updatePaymentForm('cvv', e.target.value)}
                              placeholder="123"
                              maxLength={4}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="billingAddressSame"
                            checked={paymentForm.billingAddressSame}
                            onChange={(e) => updatePaymentForm('billingAddressSame', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="billingAddressSame" className="text-sm">
                            Billing address is the same as shipping address
                          </Label>
                        </div>

                        {!paymentForm.billingAddressSame && (
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-bold">Billing Address</h3>
                            {/* Billing address fields would go here */}
                            <p className="text-sm text-gray-600">Billing address fields would be implemented here</p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="paypal" className="mt-6">
                        <div className="text-center py-8">
                          <div className="mb-4">
                            <AnimatedEmoji emoji="💰" animation="bounce" size="large" />
                          </div>
                          <p className="text-gray-600 mb-4">
                            You'll be redirected to PayPal to complete your payment securely.
                          </p>
                          <Button 
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full"
                          >
                            Pay with PayPal
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 border-2 border-amber-300 hover:border-amber-500"
                      >
                        Back to Shipping
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold h-12 rounded-full"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <>
                            Complete Order
                            <AnimatedEmoji emoji="✨" animation="bounce" size="small" className="ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 shadow-xl border-2 border-green-200 text-center">
                  <div className="mb-6">
                    <AnimatedEmoji emoji="🎉" animation="bounce" size="large" />
                  </div>
                  <h2 className="text-3xl font-black mb-4 text-green-600">Order Confirmed!</h2>
                  <p className="text-zinc-600 mb-6">
                    Thank you for your purchase! Your order has been successfully placed.
                  </p>
                  
                  <div className="bg-green-50 p-4 rounded-lg mb-6 border-2 border-green-200">
                    <h3 className="font-bold mb-2">Order #ORD-{Date.now().toString().slice(-6)}</h3>
                    <p className="text-sm text-gray-600">
                      A confirmation email has been sent to {shippingForm.email}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => setCurrentPage("home")}
                      className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold rounded-full"
                    >
                      Continue Shopping
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentPage("account")}
                      className="border-2 border-amber-300 hover:border-amber-500"
                    >
                      View Orders
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Order Summary - Right Sidebar */}
          {currentStep < 3 && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6 shadow-xl border-2 border-amber-200">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  Order Summary
                  <AnimatedEmoji emoji="📋" animation="bounce" size="small" />
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          {item.size} • {item.color} • Qty: {item.quantity}
                        </p>
                        <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
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

                <div className="mt-6 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span>Satisfaction guarantee</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
