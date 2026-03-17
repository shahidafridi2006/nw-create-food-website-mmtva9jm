import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <h1 className="text-9xl font-extrabold text-primary/20">404</h1>
      <h2 className="text-3xl font-bold mt-[-2rem] mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
