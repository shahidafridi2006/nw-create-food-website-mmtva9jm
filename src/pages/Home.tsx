import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import CategoryBar from "@/components/food/CategoryBar";
import ProductCard from "@/components/food/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

export default function Home() {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8);
      if (error) throw error;
      return data as Product[];
    }
  });

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero background"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Delicious Food <br />
            <span className="text-primary">Delivered Fast</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Order from your favorite local restaurants and enjoy gourmet meals in the comfort of your home.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="text-lg px-8">Order Now</Button>
            </Link>
            <Link href="/#categories">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur hover:bg-white/20 border-white/20">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="container">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Popular Categories</h2>
            <p className="text-muted-foreground">Explore our wide variety of cuisines</p>
          </div>
          <Link href="/menu">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <CategoryBar />
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Featured Dishes</h2>
          <p className="text-muted-foreground">Hand-picked favorites from our top chefs</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[350px] animate-pulse bg-muted rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="bg-primary rounded-3xl p-12 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Ready to taste the best?</h2>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of happy customers who enjoy fresh, hot meals delivered daily. Sign up now for exclusive offers.
            </p>
          </div>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-12">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
