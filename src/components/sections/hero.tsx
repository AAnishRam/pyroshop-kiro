import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-20 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Quality Guaranteed
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Light Up Your
                <span className="gradient-text block">Celebrations</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Discover our premium collection of firecrackers and fireworks.
                Safe, spectacular, and perfect for every celebration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white group"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 bg-transparent"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">500+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src={placeholder}
                alt="Fireworks Display"
                className="w-full h-auto rounded-2xl shadow-2xl"
                width={500}
                height={400}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-orange-500/20 rounded-2xl blur-3xl transform scale-110"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
