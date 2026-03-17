import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Link } from "wouter";
import type { Category } from "@/types";

export default function CategoryBar() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data as Category[];
    }
  });

  if (isLoading) return <div className="h-24 animate-pulse bg-muted rounded-lg" />;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {categories?.map((category) => (
        <Link key={category.id} href={`/menu?category=${category.slug}`}>
          <div className="flex flex-col items-center gap-2 min-w-[100px] cursor-pointer group">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
              <img 
                src={category.image_url || ''} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
