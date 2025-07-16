"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } =
    useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="relative mb-8">
            <ShoppingCart className="h-24 w-24 text-foreground-tertiary mx-auto" />
            <div className="absolute inset-0 bg-foreground-tertiary/10 rounded-full blur-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>

          <p className="text-lg text-foreground-secondary mb-8">
            Looks like you haven&apos;t added any firecrackers to your cart yet.
            Let&apos;s fix that!
          </p>

          <div className="space-y-4">
            <Link href="/dashboard">
              <Button size="lg" variant="accent" className="w-full">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Shopping Cart
              </h1>
              <p className="text-lg text-foreground-secondary">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <Button
              onClick={clearCart}
              variant="outline"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  layout
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-8 w-8 text-accent" />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-foreground-secondary">
                            {item.description}
                          </p>
                          <p className="text-lg font-bold text-accent">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-16 text-center h-8"
                              min="1"
                              max={item.stock}
                            />

                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="h-8 w-8"
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-foreground-secondary">
                            Subtotal ({item.quantity}{" "}
                            {item.quantity === 1 ? "item" : "items"})
                          </span>
                          <span className="text-lg font-semibold text-foreground">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Subtotal</span>
                    <span className="font-medium">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Tax</span>
                    <span className="font-medium">
                      ₹{Math.round(total * 0.18).toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-accent">
                        ₹{Math.round(total * 1.18).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Link href="/checkout">
                    <Button size="lg" variant="accent" className="w-full">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Promo Code */}
                <div className="pt-4 border-t border-border">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <Input placeholder="Enter code" className="flex-1" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
