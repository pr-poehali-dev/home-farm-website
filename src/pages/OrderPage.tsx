import { useState } from "react";
import Icon from "@/components/ui/icon";

const packages = [
  {
    id: "starter",
    title: "Стартовый",
    price: 890,
    emoji: "🌱",
    desc: "Идеально для первого опыта",
    includes: ["5 видов семян", "Кокосовый грунт 2л", "3 горшка с поддонами", "Инструкция PDF"],
    highlight: false,
  },
  {
    id: "comfort",
    title: "Комфорт",
    price: 2400,
    emoji: "🌿",
    desc: "Самый популярный набор",
    includes: [
      "10 видов семян",
      "Грунт 5л + перлит",
      "6 горшков с поддонами",
      "LED-лампа 10Вт",
      "Таймер полива",
      "Поддержка 30 дней",
    ],
    highlight: true,
  },
  {
    id: "hydro",
    title: "Гидропоника",
    price: 4800,
    emoji: "🪴",
    desc: "Для максимального урожая",
    includes: [
      "Гидропонная система на 6 ячеек",
      "Питательный раствор на 3 месяца",
      "8 видов семян",
      "LED-лампа 15Вт полный спектр",
      "EC/pH-метр",
      "Онлайн-консультация",
    ],
    highlight: false,
  },
];

export default function OrderPage() {
  const [selected, setSelected] = useState("comfort");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    delivery: "cdek",
    comment: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const pkg = packages.find((p) => p.id === selected)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://functions.poehali.dev/d44d64e2-9ac5-4cb7-8acc-104bf734e661", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: selected, ...form }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-24 container flex flex-col items-center text-center">
        <span className="text-6xl mb-6">🎉</span>
        <h1 className="font-display text-4xl font-bold mb-3">Заказ принят!</h1>
        <p className="text-muted-foreground max-w-md mb-2">
          Мы свяжемся с вами в течение часа для подтверждения заказа
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Детали отправлены на <strong>{form.email}</strong>
        </p>
        <button
          onClick={() => { setStatus("idle"); setStep(1); }}
          className="text-leaf font-medium story-link"
        >
          Сделать ещё один заказ
        </button>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container max-w-5xl">
        <div className="mb-10">
          <h1 className="font-display text-5xl font-bold mb-3">Оформить заказ</h1>
          <p className="text-muted-foreground">
            Выберите набор и укажите данные для доставки
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Выбор набора", "Доставка", "Подтверждение"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step > i + 1
                    ? "bg-leaf text-white"
                    : step === i + 1
                    ? "bg-leaf text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > i + 1 ? <Icon name="Check" size={13} /> : i + 1}
              </div>
              <span
                className={`text-sm hidden sm:block ${
                  step === i + 1 ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {i < 2 && <div className="flex-1 h-px bg-border mx-1 w-6 sm:w-12" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Package selection */}
          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {packages.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all hover-lift ${
                      selected === p.id
                        ? "border-leaf bg-leaf-light/40"
                        : "border-border bg-card"
                    }`}
                  >
                    {p.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-leaf text-white text-xs font-medium px-3 py-0.5 rounded-full">
                        Популярный
                      </span>
                    )}
                    <div className="text-4xl mb-3">{p.emoji}</div>
                    <h3 className="font-display text-xl font-semibold mb-0.5">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                    <div className="font-bold text-2xl text-foreground mb-4">
                      {p.price.toLocaleString()} ₽
                    </div>
                    <ul className="space-y-1.5">
                      {p.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs">
                          <Icon name="Check" size={12} className="text-leaf flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {selected === p.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-leaf rounded-full flex items-center justify-center">
                        <Icon name="Check" size={11} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-leaf text-white px-6 py-3 rounded-xl font-medium hover:bg-leaf-dark transition-colors flex items-center gap-2"
                >
                  Продолжить <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 2 && (
            <div className="max-w-lg">
              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{pkg.emoji}</span>
                  <div>
                    <p className="font-semibold">{pkg.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {pkg.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="ml-auto text-sm text-leaf story-link"
                  >
                    Изменить
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Имя *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван"
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Способ доставки
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "cdek", label: "СДЭК" },
                      { id: "post", label: "Почта РФ" },
                      { id: "pvz", label: "Пункт выдачи" },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setForm({ ...form, delivery: d.id })}
                        className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                          form.delivery === d.id
                            ? "bg-leaf text-white border-leaf"
                            : "bg-card border-border hover:bg-leaf-light"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Адрес доставки *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Город, улица, дом"
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Комментарий
                  </label>
                  <textarea
                    rows={2}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Пожелания или вопросы..."
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-border text-foreground px-6 py-3 rounded-xl font-medium hover:bg-muted transition-colors"
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-leaf text-white px-6 py-3 rounded-xl font-medium hover:bg-leaf-dark transition-colors flex items-center justify-center gap-2"
                >
                  Продолжить <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="max-w-lg">
              <div className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-3">
                <h3 className="font-display text-xl font-semibold">Ваш заказ</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Набор:</span>
                  <span className="font-medium">{pkg.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Имя:</span>
                  <span className="font-medium">{form.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Телефон:</span>
                  <span className="font-medium">{form.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{form.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка:</span>
                  <span className="font-medium">{form.address}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                  <span>Итого:</span>
                  <span className="text-leaf">{pkg.price.toLocaleString()} ₽</span>
                </div>
              </div>

              {status === "error" && (
                <p className="text-destructive text-sm mb-4">
                  Ошибка. Попробуйте ещё раз или свяжитесь с нами.
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border border-border text-foreground px-6 py-3 rounded-xl font-medium hover:bg-muted transition-colors"
                >
                  Назад
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 bg-leaf text-white px-6 py-3 rounded-xl font-medium hover:bg-leaf-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Оформляем...
                    </>
                  ) : (
                    <>
                      <Icon name="ShoppingBag" size={16} />
                      Оформить заказ
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}