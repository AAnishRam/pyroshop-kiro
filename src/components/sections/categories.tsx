import { Card, CardContent } from "@/components/ui/card";
import { Flame, Sparkles, Star, Zap } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Sparklers",
    icon: Sparkles,
    count: 45,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 2,
    name: "Rockets",
    icon: Zap,
    count: 32,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    name: "Ground Spinners",
    icon: Star,
    count: 28,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-green-400 to-blue-500",
  },
  {
    id: 4,
    name: "Aerial Shells",
    icon: Flame,
    count: 56,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-red-400 to-pink-500",
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of premium firecrackers and fireworks,
            carefully categorized for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="group cursor-pointer product-hover border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    ></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.count} products
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
