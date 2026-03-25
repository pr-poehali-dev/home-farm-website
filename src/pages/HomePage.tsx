import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const benefits = [
  {
    icon: "Leaf",
    title: "Всегда свежее",
    desc: "Зелень круглый год — срезайте прямо перед едой без нитратов и химии",
  },
  {
    icon: "Sun",
    title: "Не нужен огород",
    desc: "Компактные системы для подоконника, балкона или кухонной полки",
  },
  {
    icon: "Droplets",
    title: "Мало воды",
    desc: "Гидропоника потребляет в 10 раз меньше воды, чем обычный огород",
  },
  {
    icon: "Heart",
    title: "Польза для здоровья",
    desc: "Микрозелень содержит в 40 раз больше витаминов, чем взрослые растения",
  },
];

const popular = [
  {
    name: "Базилик",
    days: "21–28 дней",
    emoji: "🌿",
    color: "bg-leaf-light",
  },
  {
    name: "Микрозелень",
    days: "7–14 дней",
    emoji: "🌱",
    color: "bg-secondary",
  },
  {
    name: "Мята",
    days: "28–35 дней",
    emoji: "🌾",
    color: "bg-leaf-light",
  },
  {
    name: "Руккола",
    days: "14–21 дней",
    emoji: "🥬",
    color: "bg-secondary",
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden grain-overlay min-h-[85vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/8da2171c-79c4-4ff3-926a-5504e33dff11.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bark/80 via-bark/50 to-transparent" />
        <div className="container relative z-10 py-24">
          <div className="max-w-xl animate-fade-in">
            <span className="inline-block bg-leaf/20 text-leaf-light text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-4 backdrop-blur-sm border border-leaf/30">
              Домашняя мини-ферма
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-cream leading-tight mb-6">
              Свежая зелень<br />
              <span className="text-leaf-light">круглый год</span>
            </h1>
            <p className="text-cream/80 text-lg mb-8 leading-relaxed">
              Выращивайте базилик, мяту, рукколу и микрозелень прямо дома.
              Семена, грунт и системы полива — всё с доставкой по России.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("catalog")}
                className="bg-leaf text-white px-6 py-3 rounded-xl font-medium hover:bg-leaf-dark transition-colors inline-flex items-center gap-2"
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={16} />
              </button>
              <button
                onClick={() => onNavigate("cart")}
                className="bg-cream/10 backdrop-blur-sm text-cream border border-cream/30 px-6 py-3 rounded-xl font-medium hover:bg-cream/20 transition-colors"
              >
                Заказать набор
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-semibold text-foreground mb-3">
              Почему домашняя ферма?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Простая система, которая даёт результат уже через неделю
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="hover-lift bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-leaf-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={b.icon as "Leaf"} size={22} className="text-leaf" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {b.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular plants */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl font-semibold text-foreground mb-2">
                Популярные культуры
              </h2>
              <p className="text-muted-foreground">
                Быстро растут, легко ухаживать
              </p>
            </div>
            <button
              onClick={() => onNavigate("catalog")}
              className="hidden md:inline-flex items-center gap-1 text-leaf font-medium story-link text-sm"
            >
              Весь каталог <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popular.map((p) => (
              <div
                key={p.name}
                className={`hover-lift ${p.color} rounded-2xl p-6 flex flex-col items-center text-center gap-2`}
              >
                <span className="text-4xl">{p.emoji}</span>
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <span className="text-xs text-muted-foreground bg-white/60 px-2 py-0.5 rounded-full">
                  {p.days}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-semibold mb-3">
              Как начать?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Три простых шага к своей домашней ферме
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "1",
                title: "Выбираете набор",
                desc: "Подбираем стартовый комплект под ваш бюджет и площадь",
                icon: "ShoppingCart",
              },
              {
                step: "2",
                title: "Получаете доставку",
                desc: "Семена, грунт и инструкцию привезём в удобное время",
                icon: "Package",
              },
              {
                step: "3",
                title: "Собираете урожай",
                desc: "Первая зелень через 7–28 дней в зависимости от культуры",
                icon: "Scissors",
              },
            ].map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-leaf text-white rounded-full flex items-center justify-center text-2xl font-display font-bold mb-4 shadow-lg">
                  {s.step}
                </div>
                <div className="w-10 h-10 bg-leaf-light rounded-full flex items-center justify-center mb-3">
                  <Icon name={s.icon as "ShoppingCart"} size={18} className="text-leaf" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-leaf text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl font-bold mb-4">
            Начните выращивать уже сегодня
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Стартовый набор для микрозелени — всё необходимое в одной коробке
          </p>
          <button
            onClick={() => onNavigate("catalog")}
            className="inline-flex items-center gap-2 bg-white text-leaf font-semibold px-8 py-3 rounded-xl hover:bg-cream transition-colors"
          >
            Заказать стартовый набор
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </section>

      {/* Hydroponic farm photo */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="animate-slide-up">
              <span className="text-leaf text-sm font-medium uppercase tracking-widest">
                Гидропоника дома
              </span>
              <h2 className="font-display text-4xl font-semibold mt-2 mb-4">
                Современные системы выращивания
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Гидропонные установки позволяют выращивать в 5 раз больше
                зелени на той же площади. Не нужен грунт — только вода с
                питательным раствором.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                {[
                  "Не нужен грунт — чисто и без запаха",
                  "Автоматический полив",
                  "LED-фитолампы в комплекте",
                  "Урожай круглый год",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-leaf flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate("catalog")}
                className="inline-flex items-center gap-2 text-leaf font-medium story-link"
              >
                Смотреть оборудование <Icon name="ArrowRight" size={16} />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl hover-lift">
              <img
                src="https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/fa3ef2a9-25f6-4508-8fb2-04c835930724.jpg"
                alt="Гидропонная система"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}