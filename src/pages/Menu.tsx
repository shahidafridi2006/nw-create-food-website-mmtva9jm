import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/food/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Product, Category } from "@/types";
import { useSearch } from "wouter";

export default function Menu() {
  const searchParams = new URLSearchParams(useSearch());
  const initialCategory = searchParams.get('category') || 'all';
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data as Category[];
    }
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedCategory, search],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (selectedCategory !== 'all') {
        const cat = categories?.find(c => c.slug === selectedCategory);
        if (cat) {
          query = query.eq('category_id', cat.id);
        }
      }
      
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!categories || selectedCategory === 'all'
  });

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground">Discover delicious meals for every craving</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search dishes..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            selectedCategory === 'all' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          All Items
        </button>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.slug)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category.slug 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-[350px] animate-pulse bg-muted rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products?.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">No dishes found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
