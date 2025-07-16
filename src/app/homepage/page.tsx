import { Hero } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Categories } from "@/components/sections/categories";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
