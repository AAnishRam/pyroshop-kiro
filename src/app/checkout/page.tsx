"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
      setLoading(false);
    }, 2000);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <Sparkles className="h-24 w-24 text-foreground-tertiary mx-auto mb-8" />

          <h1 className="text-3xl font-bold text-foreground mb-4">
            No Items to Checkout
          </h1>

          <p className="text-lg text-foreground-secondary mb-8">
            Your cart is empty. Add some firecrackers to proceed with checkout.
          </p>

          <Link href="/dashboard">
            <Button size="lg" variant="accent">
              <Sparkles className="h-5 w-5 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="relative mb-8">
            <CheckCircle className="h-24 w-24 text-green-600 mx-auto" />
            <div className="absolute inset-0 bg-green-600/20 rounded-full blur-2xl animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Order Placed Successfully! 🎉
          </h1>

          <p className="text-lg text-foreground-secondary mb-8">
            Thank you for your order! We&apos;ll send you a confirmation email
            shortly and keep you updated on your delivery status.
          </p>

          <div className="space-y-4">
            <Link href="/dashboard">
              <Button size="lg" variant="accent" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline" className="w-full">
                View Order History
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const subtotal = total;
  const tax = Math.round(total * 0.18);
  const finalTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Checkout
            </h1>
          </div>
          <p className="text-lg text-foreground-secondary">
            Complete your order and get ready to celebrate!
          </p>
        </motion.div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                    <CardDescription>
                      Where should we deliver your order?
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                          <Input
                            name="fullName"
                            value={shippingData.fullName}
                            onChange={handleShippingChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                          <Input
                            name="email"
                            type="email"
                            value={shippingData.email}
                            onChange={handleShippingChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                        <Input
                          name="phone"
                          type="tel"
                          value={shippingData.phone}
                          onChange={handleShippingChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Address
                      </label>
                      <Input
                        name="address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        placeholder="Street address, apartment, suite, etc."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          City
                        </label>
                        <Input
                          name="city"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          State
                        </label>
                        <Input
                          name="state"
                          value={shippingData.state}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          PIN Code
                        </label>
                        <Input
                          name="pincode"
                          value={shippingData.pincode}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </CardTitle>
                    <CardDescription>
                      Enter your payment details securely
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                        <Input
                          name="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Expiry Date
                        </label>
                        <Input
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          CVV
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                          <Input
                            name="cvv"
                            value={paymentData.cvv}
                            onChange={handlePaymentChange}
                            placeholder="123"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Cardholder Name
                      </label>
                      <Input
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        placeholder="Name on card"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-2 bg-background-secondary rounded-lg"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-foreground-secondary">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">
                        Subtotal
                      </span>
                      <span className="font-medium">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">
                        Shipping
                      </span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">
                        Tax (18%)
                      </span>
                      <span className="font-medium">
                        ₹{tax.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-accent">
                        ₹{finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="accent"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : `Place Order - ₹${finalTotal.toLocaleString()}`}
                  </Button>

                  <p className="text-xs text-foreground-secondary text-center">
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
