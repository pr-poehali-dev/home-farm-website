import Icon from "@/components/ui/icon";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-bark text-cream/80 pt-12 pb-6">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🌿</span>
            <span className="font-display text-lg font-semibold text-cream">
              МиниФерма
            </span>
          </div>
          <p className="text-sm leading-relaxed text-cream/60">
            Свежая зелень круглый год прямо у вас дома. Семена, оборудование и
            консультации.
          </p>
        </div>

        <div>
          <h4 className="font-display text-cream text-lg mb-3">Разделы</h4>
          <ul className="space-y-2 text-sm">
            {[
              { id: "home", label: "Главная" },
              { id: "catalog", label: "Каталог" },
              { id: "gallery", label: "Галерея" },
              { id: "contacts", label: "Контакты" },
            ].map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => onNavigate(l.id)}
                  className="story-link text-cream/70 hover:text-cream transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-cream text-lg mb-3">Контакты</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li className="flex items-center gap-2">
              <Icon name="Phone" size={14} />
              +7 (999) 123-45-67
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Mail" size={14} />
              hello@minifarm.ru
            </li>
            <li className="flex items-center gap-2">
              <Icon name="MapPin" size={14} />
              Доставка по всей России
            </li>
          </ul>
        </div>
      </div>

      <div className="container border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
        © 2026 МиниФерма. Все права защищены.
      </div>
    </footer>
  );
}