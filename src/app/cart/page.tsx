"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";

const initialCartItems = [
  {
    id: 1,
    name: "Premium Sparklers Pack",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 2,
    inStock: true,
  },
  {
    id: 2,
    name: "Colorful Rocket Set",
    price: 599,
    originalPrice: 799,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
    inStock: true,
  },
  {
    id: 3,
    name: "Ground Spinner Combo",
    price: 449,
    originalPrice: 549,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 3,
    inStock: true,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast("Item removed", {
      description: "Item has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "pyro10") {
      setDiscount(0.1);
      toast("Promo code applied!", {
        description: "You got 10% discount on your order.",
      });
    } else {
      toast.error("Invalid promo code", {
        description: "Please check your promo code and try again.",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link href="/products">
              <Button className="bg-black hover:bg-gray-800">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold">₹{item.price}</span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice}
                        </span>
                      </div>
                      <p className="text-sm text-green-600">In Stock</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ₹{item.price * item.quantity}
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-₹{discountAmount.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      Add ₹{500 - subtotal} more for free shipping
                    </p>
                  )}
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white mb-4">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
