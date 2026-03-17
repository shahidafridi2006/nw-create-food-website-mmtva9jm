export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">NovaFood</h3>
            <p className="text-muted-foreground max-w-xs">
              Bringing the best local restaurants directly to your doorstep. Fresh, fast, and delicious.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/menu" className="hover:text-primary">Our Menu</a></li>
              <li><a href="/#categories" className="hover:text-primary">Categories</a></li>
              <li><a href="/profile" className="hover:text-primary">My Account</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NovaFood Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
