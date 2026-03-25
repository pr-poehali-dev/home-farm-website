import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
}

const links = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

export default function Navbar({ currentPage, onNavigate, cartCount }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 group">
          <span className="text-2xl">🌿</span>
          <span className="font-display text-xl font-semibold text-leaf-dark tracking-wide">
            МиниФерма
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              className={`story-link text-sm font-medium transition-colors ${
                currentPage === l.id
                  ? "text-leaf"
                  : "text-foreground hover:text-leaf"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate("cart")}
            className="relative flex items-center gap-1.5 bg-leaf text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-leaf-dark transition-colors"
          >
            <Icon name="ShoppingBasket" size={15} />
            Корзина
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => onNavigate("cart")}
            className="relative p-2 text-leaf"
          >
            <Icon name="ShoppingBasket" size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-border px-4 pb-4 flex flex-col gap-1 pt-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { onNavigate(l.id); setOpen(false); }}
              className={`text-sm font-medium py-2.5 px-3 rounded-lg text-left transition-colors ${
                currentPage === l.id
                  ? "text-leaf bg-leaf-light"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}