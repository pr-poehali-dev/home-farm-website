import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export interface CartItem {
  id: number;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  qty: number;
}

interface CartPageProps {
  items: CartItem[];
  onUpdate: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  onNavigate: (page: string) => void;
}

export default function CartPage({ items, onUpdate, onRemove, onClear, onNavigate }: CartPageProps) {
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "", comment: "" });
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("success");
    onClear();
  };

  if (step === "success") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-7xl mb-6">🌱</div>
          <h2 className="font-display text-4xl font-bold text-leaf mb-3">
            Заказ оформлен!
          </h2>
          <p className="text-muted-foreground mb-2">
            Мы получили ваш заказ и свяжемся с вами в течение часа для подтверждения.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Доставка по всей России — СДЭК, Почта России или ПВЗ.
          </p>
          <Button
            className="bg-leaf text-white hover:bg-leaf-dark"
            onClick={() => onNavigate("catalog")}
          >
            Продолжить покупки
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="font-display text-3xl font-semibold mb-3">Корзина пуста</h2>
          <p className="text-muted-foreground mb-8">
            Добавьте семена или оборудование из каталога
          </p>
          <Button
            className="bg-leaf text-white hover:bg-leaf-dark"
            onClick={() => onNavigate("catalog")}
          >
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-secondary/40 py-12 border-b border-border">
        <div className="container">
          <h1 className="font-display text-5xl font-bold text-foreground mb-2">Корзина</h1>
          <p className="text-muted-foreground">{totalItems} товар{totalItems === 1 ? "" : totalItems < 5 ? "а" : "ов"} на сумму {total.toLocaleString("ru-RU")} ₽</p>
        </div>
      </section>

      <div className="container py-10">
        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="text-4xl w-14 h-14 bg-secondary/50 rounded-xl flex items-center justify-center shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onUpdate(item.id, item.qty - 1)}
                      className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="w-6 text-center font-medium">{item.qty}</span>
                    <button
                      onClick={() => onUpdate(item.id, item.qty + 1)}
                      className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                  <div className="text-right shrink-0 min-w-[80px]">
                    <p className="font-bold text-lg">{(item.price * item.qty).toLocaleString("ru-RU")} ₽</p>
                    <p className="text-xs text-muted-foreground">{item.price.toLocaleString("ru-RU")} ₽/шт</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-20">
              <h2 className="font-display text-2xl font-semibold mb-5">Итого</h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate max-w-[160px]">
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-medium shrink-0 ml-2">
                      {(item.price * item.qty).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg mb-1">
                <span>Итого</span>
                <span>{total.toLocaleString("ru-RU")} ₽</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Доставка рассчитывается при оформлении
              </p>
              <Button
                className="w-full bg-leaf text-white hover:bg-leaf-dark"
                onClick={() => setStep("checkout")}
              >
                <Icon name="ArrowRight" size={16} className="mr-2" />
                Оформить заказ
              </Button>
              <button
                onClick={() => onNavigate("catalog")}
                className="w-full mt-3 text-sm text-muted-foreground hover:text-leaf transition-colors"
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div className="max-w-xl mx-auto">
            <button
              onClick={() => setStep("cart")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-leaf mb-8 transition-colors"
            >
              <Icon name="ArrowLeft" size={14} />
              Назад в корзину
            </button>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-display text-3xl font-semibold mb-6">Оформление заказа</h2>

              <form onSubmit={handleOrder} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Ваше имя *</label>
                  <input
                    required
                    type="text"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
                  <input
                    required
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Адрес доставки *</label>
                  <input
                    required
                    type="text"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    placeholder="Город, улица, дом, квартира"
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Комментарий</label>
                  <textarea
                    rows={3}
                    value={orderForm.comment}
                    onChange={(e) => setOrderForm({ ...orderForm, comment: e.target.value })}
                    placeholder="Предпочтения по доставке или вопросы..."
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 transition-all resize-none"
                  />
                </div>

                <div className="bg-secondary/50 rounded-xl p-4 text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>Сумма заказа:</span>
                    <span>{total.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1">
                    Оплата при получении или по реквизитам — менеджер свяжется с вами
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-leaf text-white hover:bg-leaf-dark"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Оформляем...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Icon name="ShoppingBasket" size={16} />
                      Подтвердить заказ
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
