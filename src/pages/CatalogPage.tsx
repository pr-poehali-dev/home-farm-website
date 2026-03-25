import { useState } from "react";
import Icon from "@/components/ui/icon";

export interface CatalogProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  days: string;
  emoji: string;
  difficulty: string;
  desc: string;
}

interface CatalogPageProps {
  onAddToCart: (product: CatalogProduct) => void;
  cartItems: { id: number; qty: number }[];
  onNavigate: (page: string) => void;
}

const categories = ["Все", "Семена", "Микрозелень", "Оборудование", "Наборы"];

const products = [
  {
    id: 1,
    name: "Базилик зелёный",
    category: "Семена",
    price: 120,
    unit: "10 г",
    days: "21–28 дней",
    emoji: "🌿",
    difficulty: "Легко",
    desc: "Классический ароматный базилик. Подходит для пиццы, салатов и соусов.",
  },
  {
    id: 2,
    name: "Микрозелень подсолнуха",
    category: "Микрозелень",
    price: 180,
    unit: "25 г",
    days: "7–10 дней",
    emoji: "🌱",
    difficulty: "Легко",
    desc: "Богата белком и витамином E. Хрустящий вкус, отлично в салаты.",
  },
  {
    id: 3,
    name: "Мята перечная",
    category: "Семена",
    price: 140,
    unit: "5 г",
    days: "28–35 дней",
    emoji: "🌾",
    difficulty: "Средне",
    desc: "Освежающая мята для чаёв, коктейлей и десертов.",
  },
  {
    id: 4,
    name: "Руккола",
    category: "Семена",
    price: 110,
    unit: "15 г",
    days: "14–21 день",
    emoji: "🥬",
    difficulty: "Легко",
    desc: "Пикантная руккола с ореховым привкусом. Первый урожай через 2 недели.",
  },
  {
    id: 5,
    name: "Горох на микрозелень",
    category: "Микрозелень",
    price: 160,
    unit: "50 г",
    days: "10–14 дней",
    emoji: "🫛",
    difficulty: "Легко",
    desc: "Сочные ростки с нежным вкусом. Много витамина C и клетчатки.",
  },
  {
    id: 6,
    name: "Гидропонная система «Старт»",
    category: "Оборудование",
    price: 3500,
    unit: "1 шт",
    days: "Постоянно",
    emoji: "🪴",
    difficulty: "Легко",
    desc: "Компактная установка на 6 ячеек. Автоциркуляция воды, без грунта.",
  },
  {
    id: 7,
    name: "LED фитолампа 15Вт",
    category: "Оборудование",
    price: 1800,
    unit: "1 шт",
    days: "—",
    emoji: "💡",
    difficulty: "—",
    desc: "Полный спектр для фотосинтеза. Подходит для площади до 0.5 м².",
  },
  {
    id: 8,
    name: "Стартовый набор «Первый урожай»",
    category: "Наборы",
    price: 890,
    unit: "1 набор",
    days: "7–14 дней",
    emoji: "📦",
    difficulty: "Легко",
    desc: "5 видов семян + грунт + горшки + инструкция. Всё для первого урожая.",
  },
  {
    id: 9,
    name: "Редис «Чемпион»",
    category: "Семена",
    price: 95,
    unit: "10 г",
    days: "28–35 дней",
    emoji: "🌰",
    difficulty: "Средне",
    desc: "Сочный редис круглой формы. Растёт даже в небольших горшках.",
  },
  {
    id: 10,
    name: "Набор «Гидропоника дома»",
    category: "Наборы",
    price: 4800,
    unit: "1 набор",
    days: "Постоянно",
    emoji: "🌊",
    difficulty: "Средне",
    desc: "Гидропонная система + семена на 3 месяца + питательный раствор.",
  },
  {
    id: 11,
    name: "Петрушка кудрявая",
    category: "Семена",
    price: 100,
    unit: "10 г",
    days: "21–28 дней",
    emoji: "🌿",
    difficulty: "Легко",
    desc: "Витаминная зелень для любых блюд. Богата железом и витамином K.",
  },
  {
    id: 12,
    name: "Микрозелень редиса",
    category: "Микрозелень",
    price: 150,
    unit: "20 г",
    days: "5–7 дней",
    emoji: "🌱",
    difficulty: "Легко",
    desc: "Самый быстрый урожай. Острый вкус, насыщенный цвет.",
  },
];

const difficultyColor: Record<string, string> = {
  "Легко": "bg-leaf-light text-leaf-dark",
  "Средне": "bg-secondary text-foreground",
  "—": "bg-muted text-muted-foreground",
};

export default function CatalogPage({ onAddToCart, cartItems, onNavigate }: CatalogPageProps) {
  const [active, setActive] = useState("Все");

  const filtered =
    active === "Все" ? products : products.filter((p) => p.category === active);

  const getQty = (id: number) => cartItems.find((i) => i.id === id)?.qty ?? 0;

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-5xl font-bold text-foreground mb-3">
            Каталог
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Семена, оборудование и готовые наборы для домашней фермы
          </p>
        </div>

        {/* Cover image */}
        <div className="rounded-2xl overflow-hidden mb-10 h-52 relative">
          <img
            src="https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/c7ed205a-fa06-48b7-bf96-6eda4f2a7241.jpg"
            alt="Каталог"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bark/60 to-transparent flex items-center px-8">
            <p className="text-cream font-display text-2xl font-semibold max-w-xs">
              Всё для вашей зелёной фермы
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-leaf text-white shadow-sm"
                  : "bg-card border border-border text-foreground hover:bg-leaf-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="hover-lift bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-secondary/40 h-36 flex items-center justify-center text-6xl">
                {p.emoji}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {p.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${difficultyColor[p.difficulty]}`}
                  >
                    {p.difficulty}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs mb-3 leading-relaxed flex-1">
                  {p.desc}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Icon name="Clock" size={12} />
                  <span>{p.days}</span>
                  <span className="text-border">·</span>
                  <Icon name="Package" size={12} />
                  <span>{p.unit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl text-foreground">
                    {p.price.toLocaleString()} ₽
                  </span>
                  <button
                    onClick={() => onAddToCart(p)}
                    className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${
                      getQty(p.id) > 0
                        ? "bg-leaf-light text-leaf-dark border border-leaf"
                        : "bg-leaf text-white hover:bg-leaf-dark"
                    }`}
                  >
                    <Icon
                      name={getQty(p.id) > 0 ? "Check" : "ShoppingCart"}
                      size={14}
                    />
                    {getQty(p.id) > 0 ? `В корзине: ${getQty(p.id)}` : "В корзину"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Хотите индивидуальный набор под ваши задачи?
          </p>
          <button
            onClick={() => onNavigate("contacts")}
            className="inline-flex items-center gap-2 bg-leaf text-white px-6 py-3 rounded-xl font-medium hover:bg-leaf-dark transition-colors"
          >
            Оставить заявку <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}