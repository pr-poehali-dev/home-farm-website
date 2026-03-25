import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="py-16">
      <div className="container">
        <div className="mb-10">
          <h1 className="font-display text-5xl font-bold mb-3">Контакты</h1>
          <p className="text-muted-foreground max-w-lg">
            Задайте вопрос или оставьте заявку — ответим в течение часа
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Написать нам
            </h2>

            {status === "success" ? (
              <div className="text-center py-10">
                <span className="text-5xl block mb-4">🌿</span>
                <h3 className="font-display text-2xl font-semibold text-leaf mb-2">
                  Сообщение отправлено!
                </h3>
                <p className="text-muted-foreground">
                  Мы ответим вам в течение часа
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-leaf font-medium story-link text-sm"
                >
                  Отправить ещё одно сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">
                    Сообщение *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Расскажите, что вас интересует..."
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-leaf/30 focus:border-leaf transition-all resize-none"
                  />
                </div>
                {status === "error" && (
                  <p className="text-destructive text-sm">
                    Ошибка отправки. Попробуйте ещё раз.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-leaf text-white font-medium py-3 rounded-xl hover:bg-leaf-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={16} />
                      Отправить сообщение
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-2xl font-semibold mb-5">
                Как с нами связаться
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    icon: "Phone",
                    label: "Телефон",
                    value: "+7 (999) 123-45-67",
                    sub: "Пн–Вс, 9:00–20:00",
                  },
                  {
                    icon: "Mail",
                    label: "Email",
                    value: "hello@minifarm.ru",
                    sub: "Ответим в течение часа",
                  },
                  {
                    icon: "MessageCircle",
                    label: "Telegram",
                    value: "@minifarm_ru",
                    sub: "Быстрые ответы",
                  },
                  {
                    icon: "MapPin",
                    label: "Доставка",
                    value: "По всей России",
                    sub: "Почта России, СДЭК, ПВЗ",
                  },
                ].map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-leaf-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon
                        name={c.icon as "Phone"}
                        size={16}
                        className="text-leaf"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{c.label}</span>
                      <p className="font-medium text-sm">{c.value}</p>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-leaf-light border border-leaf/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">
                    Консультация по выбору
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Не знаете с чего начать? Напишите нам — подберём оптимальный
                    набор под ваш бюджет, площадь и пожелания.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/40 border border-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-3">
                Часто спрашивают
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Сколько времени занимает доставка?",
                  "Есть ли гарантия на семена?",
                  "Нужен ли опыт для начала?",
                  "Как ухаживать за растениями?",
                ].map((q) => (
                  <li
                    key={q}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Icon name="ChevronRight" size={14} className="text-leaf flex-shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}