"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sparkles,
  ShoppingBag,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "All our products meet international safety standards with proper certifications.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Quick and secure delivery to your doorstep with tracking support.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Handpicked selection of the finest firecrackers and pyrotechnics.",
    },
    {
      icon: Heart,
      title: "Customer Care",
      description:
        "24/7 customer support to help you with all your celebration needs.",
    },
  ];

  const categories = [
    {
      name: "Sparklers",
      description: "Beautiful handheld sparklers for intimate celebrations",
      image: "/api/placeholder/300/200",
      count: "25+ Products",
    },
    {
      name: "Rockets",
      description: "High-flying rockets that light up the night sky",
      image: "/api/placeholder/300/200",
      count: "15+ Products",
    },
    {
      name: "Fountains",
      description: "Ground-based fountains with spectacular effects",
      image: "/api/placeholder/300/200",
      count: "20+ Products",
    },
    {
      name: "Crackers",
      description: "Traditional crackers for festive celebrations",
      image: "/api/placeholder/300/200",
      count: "30+ Products",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <Sparkles className="h-16 w-16 text-accent" />
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Light Up Your
                <span className="text-accent block">Celebrations</span>
              </h1>

              <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
                Discover premium firecrackers and pyrotechnics that bring magic
                to every moment. Safe, certified, and spectacular - your
                celebration starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/products">
                  <Button size="lg" variant="accent" className="group">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Shop Now
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-tertiary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Pyro Shop?
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              We&apos;re committed to providing the best firecracker experience
              with safety, quality, and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                        <feature.icon className="h-8 w-8 text-accent" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Our Categories
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              From intimate sparklers to grand displays, find the perfect
              fireworks for every occasion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <Zap className="h-12 w-12 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-secondary">
                        {category.count}
                      </span>
                      <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/categories">
              <Button size="lg" variant="outline">
                View All Categories
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Star className="h-12 w-12 text-accent" />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg animate-pulse" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Create Magic?
            </h2>

            <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
              Join thousands of satisfied customers who trust Pyro Shop for
              their celebrations. Start your journey with us today and make
              every moment unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="accent">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
