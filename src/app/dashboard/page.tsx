"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Zap,
  Sparkles,
  Rocket,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/contexts/CartContext";

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock products data - In real app, this would come from Firebase
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Golden Sparklers",
      price: 299,
      image: "/api/placeholder/300/300",
      description: "Premium golden sparklers perfect for celebrations",
      category: "sparklers",
      stock: 50,
    },
    {
      id: "2",
      name: "Sky Rocket Deluxe",
      price: 599,
      image: "/api/placeholder/300/300",
      description: "High-flying rockets with colorful bursts",
      category: "rockets",
      stock: 25,
    },
    {
      id: "3",
      name: "Fountain of Joy",
      price: 449,
      image: "/api/placeholder/300/300",
      description: "Beautiful ground fountain with multi-color effects",
      category: "fountains",
      stock: 30,
    },
    {
      id: "4",
      name: "Thunder Crackers",
      price: 199,
      image: "/api/placeholder/300/300",
      description: "Traditional crackers with loud sound effects",
      category: "crackers",
      stock: 100,
    },
    {
      id: "5",
      name: "Rainbow Sparklers",
      price: 349,
      image: "/api/placeholder/300/300",
      description: "Multi-colored sparklers for magical moments",
      category: "sparklers",
      stock: 75,
    },
    {
      id: "6",
      name: "Mega Rocket Pack",
      price: 899,
      image: "/api/placeholder/300/300",
      description: "Pack of 5 premium rockets for grand displays",
      category: "rockets",
      stock: 15,
    },
  ]);

  const categories = [
    { id: "all", name: "All Products", icon: Sparkles },
    { id: "sparklers", name: "Sparklers", icon: Star },
    { id: "rockets", name: "Rockets", icon: Rocket },
    { id: "fountains", name: "Fountains", icon: Zap },
    { id: "crackers", name: "Crackers", icon: Crown },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {currentUser?.displayName || "Pyro Enthusiast"}! 🎆
          </h1>
          <p className="text-lg text-foreground-secondary">
            Discover our premium collection of firecrackers and pyrotechnics
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-64"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                        selectedCategory === category.id
                          ? "bg-accent/10 text-accent border-r-2 border-accent"
                          : "text-foreground-secondary hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <category.icon className="h-4 w-4 mr-3" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4"
            >
              <p className="text-foreground-secondary">
                Showing {filteredProducts.length} products
              </p>
            </motion.div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Sparkles className="h-16 w-16 text-accent group-hover:scale-110 transition-transform" />
                    </div>

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {product.name}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {product.description}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-accent">
                            ₹{product.price}
                          </p>
                          <p className="text-xs text-foreground-secondary">
                            {product.stock} in stock
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full group"
                        variant="accent"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Sparkles className="h-16 w-16 text-foreground-tertiary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-foreground-secondary">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
