import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import NotFound from "@/pages/NotFound";
import { useAuth } from "@/hooks/useAuth";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profile} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-success" component={OrderSuccess} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
