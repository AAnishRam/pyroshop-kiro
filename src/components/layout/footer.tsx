import Link from "next/link";
import { Flame, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                <Flame className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">Pyro Shop</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Your trusted partner for premium firecrackers and fireworks.
              Making celebrations memorable since 2008.
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/products"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                All Products
              </Link>
              <Link
                href="/categories"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Special Deals
              </Link>
              <Link
                href="/new-arrivals"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/shipping"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Returns & Exchanges
              </Link>
              <Link
                href="/safety"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Safety Guidelines
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get special offers and updates on new products.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-white text-black mt-2 hover:bg-gray-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Pyro Shop. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
