import { useState } from "react";
import Icon from "@/components/ui/icon";

const galleryItems = [
  {
    id: 1,
    title: "Домашняя ферма на подоконнике",
    category: "Интерьер",
    src: "https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/8da2171c-79c4-4ff3-926a-5504e33dff11.jpg",
    desc: "Базилик, мята и петрушка на солнечном подоконнике",
  },
  {
    id: 2,
    title: "Разнообразие микрозелени",
    category: "Урожай",
    src: "https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/c7ed205a-fa06-48b7-bf96-6eda4f2a7241.jpg",
    desc: "Подсолнух, горох, редис и пшеница",
  },
  {
    id: 3,
    title: "Гидропонная установка",
    category: "Оборудование",
    src: "https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/fa3ef2a9-25f6-4508-8fb2-04c835930724.jpg",
    desc: "Многоуровневая система с LED-подсветкой",
  },
  {
    id: 4,
    title: "Сбор урожая",
    category: "Процесс",
    src: "https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/b358506b-7089-4d9a-9c3c-834a61925590.jpg",
    desc: "Первый урожай базилика спустя три недели",
  },
  {
    id: 5,
    title: "Стартовый набор",
    category: "Оборудование",
    src: "https://cdn.poehali.dev/projects/2c94c5de-c23b-465a-9c3f-7b779daebd0b/files/1cdfb047-761b-4955-90a8-7153f7124371.jpg",
    desc: "Всё для начала: семена, горшки, грунт, инструкция",
  },
];

const cats = ["Все", "Интерьер", "Урожай", "Оборудование", "Процесс"];

export default function GalleryPage() {
  const [active, setActive] = useState("Все");
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered =
    active === "Все" ? galleryItems : galleryItems.filter((i) => i.category === active);

  return (
    <div className="py-16">
      <div className="container">
        <div className="mb-10">
          <h1 className="font-display text-5xl font-bold mb-3">Галерея</h1>
          <p className="text-muted-foreground max-w-lg">
            Реальные фермы наших клиентов и примеры оборудования
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                active === c
                  ? "bg-leaf text-white"
                  : "bg-card border border-border hover:bg-leaf-light"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="hover-lift group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm"
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-xs text-leaf-light font-medium uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="font-display text-xl text-cream font-semibold">
                  {item.title}
                </h3>
                <p className="text-cream/70 text-sm mt-1">{item.desc}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ZoomIn" size={14} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <span className="text-4xl mb-4 block">🌱</span>
            В этой категории пока нет фото
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Довольных клиентов", icon: "Users" },
            { value: "12", label: "Видов культур", icon: "Leaf" },
            { value: "7", label: "Дней до первого урожая", icon: "Clock" },
            { value: "100%", label: "Органическое", icon: "Heart" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-2xl p-5 text-center"
            >
              <Icon
                name={s.icon as "Users"}
                size={22}
                className="text-leaf mx-auto mb-2"
              />
              <div className="font-display text-3xl font-bold text-foreground">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-bark/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="w-full h-auto max-h-[70vh] object-cover"
            />
            <div className="bg-card p-5">
              <span className="text-xs text-leaf font-medium uppercase tracking-wider">
                {lightbox.category}
              </span>
              <h3 className="font-display text-2xl font-semibold mt-1">
                {lightbox.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">{lightbox.desc}</p>
            </div>
            <button
              className="absolute top-3 right-3 w-9 h-9 bg-bark/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-bark transition-colors"
              onClick={() => setLightbox(null)}
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
