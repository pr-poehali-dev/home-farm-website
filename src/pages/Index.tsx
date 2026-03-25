import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import CatalogPage, { CatalogProduct } from "@/pages/CatalogPage";
import GalleryPage from "@/pages/GalleryPage";
import ContactsPage from "@/pages/ContactsPage";
import CartPage, { CartItem } from "@/pages/CartPage";

type Page = "home" | "catalog" | "gallery" | "contacts" | "cart";

const Index = () => {
  const [page, setPage] = useState<Page>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: CatalogProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          emoji: product.emoji,
          price: product.price,
          unit: product.unit,
          qty: 1,
        },
      ];
    });
  };

  const updateCart = (id: number, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentPage={page}
        onNavigate={navigate}
        cartCount={cartCount}
      />

      <main className="flex-1">
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "catalog" && (
          <CatalogPage
            onAddToCart={addToCart}
            cartItems={cartItems.map((i) => ({ id: i.id, qty: i.qty }))}
            onNavigate={navigate}
          />
        )}
        {page === "gallery" && <GalleryPage />}
        {page === "contacts" && <ContactsPage />}
        {page === "cart" && (
          <CartPage
            items={cartItems}
            onUpdate={updateCart}
            onRemove={removeFromCart}
            onClear={() => setCartItems([])}
            onNavigate={navigate}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default Index;