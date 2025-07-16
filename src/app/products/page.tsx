"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, ShoppingCart, Star, Grid, List } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";

import Footer from "@/components/layout/footer";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  category: string;
  inStock: boolean;
};

const products = [
  {
    id: 1,
    name: "Premium Sparklers Pack",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: placeholder,
    badge: "Best Seller",
    category: "Sparklers",
    inStock: true,
  },
  {
    id: 2,
    name: "Colorful Rocket Set",
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviews: 89,
    image: placeholder,
    badge: "New",
    category: "Rockets",
    inStock: true,
  },
  {
    id: 3,
    name: "Ground Spinner Combo",
    price: 449,
    originalPrice: 549,
    rating: 4.7,
    reviews: 156,
    image: placeholder,
    badge: "Popular",
    category: "Ground Spinners",
    inStock: true,
  },
  {
    id: 4,
    name: "Aerial Shell Collection",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 203,
    image: placeholder,
    badge: "Premium",
    category: "Aerial Shells",
    inStock: false,
  },
  {
    id: 5,
    name: "Fountain Fireworks Set",
    price: 349,
    originalPrice: 449,
    rating: 4.6,
    reviews: 78,
    image: placeholder,
    badge: "Sale",
    category: "Fountains",
    inStock: true,
  },
  {
    id: 6,
    name: "Roman Candle Bundle",
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviews: 145,
    image: placeholder,
    badge: "Hot",
    category: "Roman Candles",
    inStock: true,
  },
];

export default function ProductsPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    toast("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(
    (product) => filterCategory === "all" || product.category === filterCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">All Products</h1>
          <p className="text-gray-600">
            Discover our complete collection of premium firecrackers and
            fireworks
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <Input placeholder="Search products..." className="bg-white" />
          </div>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full lg:w-48 bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Sparklers">Sparklers</SelectItem>
              <SelectItem value="Rockets">Rockets</SelectItem>
              <SelectItem value="Ground Spinners">Ground Spinners</SelectItem>
              <SelectItem value="Aerial Shells">Aerial Shells</SelectItem>
              <SelectItem value="Fountains">Fountains</SelectItem>
              <SelectItem value="Roman Candles">Roman Candles</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48 bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className={`group cursor-pointer product-hover border-0 shadow-lg bg-white ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
            >
              <CardContent className="p-0">
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list"
                      ? "w-48 h-48 flex-shrink-0"
                      : "w-full h-64"
                  } rounded-t-lg`}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black text-white">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge
                        variant="secondary"
                        className="bg-white text-black"
                      >
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-black">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  </div>

                  <Button
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-gray-300 bg-transparent"
          >
            Load More Products
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
