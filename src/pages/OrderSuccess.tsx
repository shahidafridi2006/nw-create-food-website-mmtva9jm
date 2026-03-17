import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function OrderSuccess() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center py-12">
      <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-8">
        <CheckCircle2 className="h-20 w-20 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-xl text-muted-foreground max-w-md mb-12">
        Thank you for your order. We've received it and our chefs are already preparing your delicious meal.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/profile">
          <Button size="lg" variant="outline">View Order Status</Button>
        </Link>
        <Link href="/menu">
          <Button size="lg">Order More Food</Button>
        </Link>
      </div>
    </div>
  );
}
