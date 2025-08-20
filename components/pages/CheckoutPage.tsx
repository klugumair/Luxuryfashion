import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useAppContext } from '../../App';
import { toast } from 'sonner';
import { countries, getStatesByCountryCode, Country, State } from '../../utils/countries-states';

interface CheckoutPageProps {
  setCurrentPage: (page: string) => void;
}

export function CheckoutPage({ setCurrentPage }: CheckoutPageProps) {
  const { 
    cartItems, 
    cartTotal, 
    cartCount,
    clearCart,
    user,
    isAuthenticated
  } = useAppContext();

  // Form state
  const [billingForm, setBillingForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [availableBillingStates, setAvailableBillingStates] = useState<State[]>([]);
  const [availableShippingStates, setAvailableShippingStates] = useState<State[]>([]);

  // Pricing calculations
  const shippingCost = shippingMethod === 'express' ? 19.99 : cartTotal > 75 ? 0 : 9.99;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shippingCost + tax;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      setCurrentPage('cart');
    }
  }, [cartItems.length, setCurrentPage]);

  // Initialize available states on component mount
  useEffect(() => {
    setAvailableBillingStates(getStatesByCountryCode(billingForm.country));
    setAvailableShippingStates(getStatesByCountryCode(shippingForm.country));
  }, []);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }

    setPaymentForm(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return billingForm.firstName && billingForm.lastName && billingForm.email && 
               billingForm.address && billingForm.city && billingForm.state && billingForm.zipCode;
      case 2:
        return sameAsShipping || (shippingForm.firstName && shippingForm.lastName && 
               shippingForm.address && shippingForm.city && shippingForm.state && shippingForm.zipCode);
      case 3:
        return paymentForm.cardNumber && paymentForm.expiryDate && paymentForm.cvv && paymentForm.nameOnCard;
      default:
        return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Clear cart and show success
      clearCart();
      toast.success('Order placed successfully!', {
        description: 'You will receive a confirmation email shortly.'
      });
      
      // Navigate to a success page or home
      setCurrentPage('home');
    } catch (error) {
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Update available states when country changes
  useEffect(() => {
    const billingStates = getStatesByCountryCode(billingForm.country);
    setAvailableBillingStates(billingStates);

    // Reset state if it's not available in the new country
    if (billingStates.length > 0 && !billingStates.some(state => state.code === billingForm.state)) {
      setBillingForm(prev => ({ ...prev, state: '' }));
    }
  }, [billingForm.country]);

  useEffect(() => {
    const shippingStates = getStatesByCountryCode(shippingForm.country);
    setAvailableShippingStates(shippingStates);

    // Reset state if it's not available in the new country
    if (shippingStates.length > 0 && !shippingStates.some(state => state.code === shippingForm.state)) {
      setShippingForm(prev => ({ ...prev, state: '' }));
    }
  }, [shippingForm.country]);

  // Copy billing to shipping
  useEffect(() => {
    if (sameAsShipping) {
      setShippingForm({
        firstName: billingForm.firstName,
        lastName: billingForm.lastName,
        address: billingForm.address,
        city: billingForm.city,
        state: billingForm.state,
        zipCode: billingForm.zipCode,
        country: billingForm.country
      });
    }
  }, [sameAsShipping, billingForm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-purple-50/50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => setCurrentPage('cart')}
            className="mb-4 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Secure Checkout
            </h1>
            <p className="text-gray-600">
              Complete your order in just a few steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep
                        ? 'bg-gradient-to-r from-amber-500 to-purple-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        step < currentStep ? 'bg-gradient-to-r from-amber-500 to-purple-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-8 text-sm">
            <span className={currentStep >= 1 ? 'text-purple-600 font-medium' : 'text-gray-400'}>
              Billing Info
            </span>
            <span className={currentStep >= 2 ? 'text-purple-600 font-medium' : 'text-gray-400'}>
              Shipping
            </span>
            <span className={currentStep >= 3 ? 'text-purple-600 font-medium' : 'text-gray-400'}>
              Payment
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Billing Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-amber-600" />
                        Billing Information
                      </CardTitle>
                      <CardDescription>
                        Enter your billing details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={billingForm.firstName}
                            onChange={handleBillingChange}
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={billingForm.lastName}
                            onChange={handleBillingChange}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={billingForm.email}
                            onChange={handleBillingChange}
                            className="pl-10"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={billingForm.phone}
                            onChange={handleBillingChange}
                            className="pl-10"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="address"
                            name="address"
                            value={billingForm.address}
                            onChange={handleBillingChange}
                            className="pl-10"
                            placeholder="123 Main Street"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={billingForm.city}
                            onChange={handleBillingChange}
                            placeholder="New York"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State/Province *</Label>
                          {availableBillingStates.length > 0 ? (
                            <Select value={billingForm.state} onValueChange={(value) => setBillingForm(prev => ({ ...prev, state: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state/province" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableBillingStates.map((state) => (
                                  <SelectItem key={state.code} value={state.code}>
                                    {state.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id="state"
                              name="state"
                              value={billingForm.state}
                              onChange={handleBillingChange}
                              placeholder="Enter state/province"
                              required
                            />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={billingForm.zipCode}
                            onChange={handleBillingChange}
                            placeholder="10001"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country *</Label>
                          <Select value={billingForm.country} onValueChange={(value) => setBillingForm(prev => ({ ...prev, country: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-48 overflow-y-auto">
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Shipping Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-amber-600" />
                        Shipping Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sameAsShipping"
                          checked={sameAsShipping}
                          onCheckedChange={setSameAsShipping}
                        />
                        <Label htmlFor="sameAsShipping">
                          Same as billing address
                        </Label>
                      </div>

                      {!sameAsShipping && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="shippingFirstName">First Name *</Label>
                              <Input
                                id="shippingFirstName"
                                name="firstName"
                                value={shippingForm.firstName}
                                onChange={handleShippingChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="shippingLastName">Last Name *</Label>
                              <Input
                                id="shippingLastName"
                                name="lastName"
                                value={shippingForm.lastName}
                                onChange={handleShippingChange}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="shippingAddress">Street Address *</Label>
                            <Input
                              id="shippingAddress"
                              name="address"
                              value={shippingForm.address}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="shippingCity">City *</Label>
                              <Input
                                id="shippingCity"
                                name="city"
                                value={shippingForm.city}
                                onChange={handleShippingChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="shippingState">State/Province *</Label>
                              {availableShippingStates.length > 0 ? (
                                <Select value={shippingForm.state} onValueChange={(value) => setShippingForm(prev => ({ ...prev, state: value }))}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state/province" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableShippingStates.map((state) => (
                                      <SelectItem key={state.code} value={state.code}>
                                        {state.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  id="shippingState"
                                  name="state"
                                  value={shippingForm.state}
                                  onChange={handleShippingChange}
                                  placeholder="Enter state/province"
                                  required
                                />
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="shippingZipCode">ZIP Code *</Label>
                              <Input
                                id="shippingZipCode"
                                name="zipCode"
                                value={shippingForm.zipCode}
                                onChange={handleShippingChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="shippingCountry">Country *</Label>
                              <Select value={shippingForm.country} onValueChange={(value) => setShippingForm(prev => ({ ...prev, country: value }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-48 overflow-y-auto">
                                  {countries.map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle>Shipping Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard">
                              <div>
                                <div className="font-medium">Standard Shipping</div>
                                <div className="text-sm text-gray-500">5-7 business days</div>
                              </div>
                            </Label>
                          </div>
                          <div className="font-semibold">
                            {cartTotal > 75 ? 'FREE' : '$9.99'}
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express">
                              <div>
                                <div className="font-medium">Express Shipping</div>
                                <div className="text-sm text-gray-500">2-3 business days</div>
                              </div>
                            </Label>
                          </div>
                          <div className="font-semibold">$19.99</div>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card *</Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={paymentForm.nameOnCard}
                          onChange={handlePaymentChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentForm.cardNumber}
                            onChange={handlePaymentChange}
                            className="pl-10"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentForm.expiryDate}
                            onChange={handlePaymentChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              name="cvv"
                              type={showCvv ? 'text' : 'password'}
                              value={paymentForm.cvv}
                              onChange={handlePaymentChange}
                              className="pr-10"
                              placeholder="123"
                              maxLength={4}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowCvv(!showCvv)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle>Order Notes (Optional)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Any special instructions for your order..."
                        className="min-h-[100px]"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8"
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  className="px-8 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-8 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-amber-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-gradient-to-r from-amber-50 to-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>30-day Return Policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
