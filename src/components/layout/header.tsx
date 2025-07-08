"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  useEffect(() => {
    setCartCount(3);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b bg-white/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Logo / Brand */}
      <Link href="/" className="text-lg font-semibold">
        Pyro&nbsp;<span className="font-bold text-red-600">Shop</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          href="/products"
          className="text-sm font-medium hover:text-red-600 transition-colors"
        >
          Products
        </Link>
        <Link
          href="/categories"
          className="text-sm font-medium hover:text-red-600 transition-colors"
        >
          Categories
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium hover:text-red-600 transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium hover:text-red-600 transition-colors"
        >
          Contact
        </Link>
      </nav>

      {/* Search Bar */}
      <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search firecrackers..."
            className="pl-10 bg-gray-50 border-0 focus:bg-white"
          />
        </div>
      </div>

      {/* Right-hand Actions */}
      <nav className="flex items-center gap-4">
        {/* Cart Icon Placeholder */}
        <Link href="/cart" aria-label="Cart" className="relative">
          <ShoppingCart className="size-5" />
          {/* Simple Badge – Hook Up to Cart Length Later */}
          <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white">
            {cartCount}
          </span>
        </Link>

        {/* User Icon */}
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </nav>
    </header>
  );
}
