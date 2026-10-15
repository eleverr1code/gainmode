import { Logo } from "./Logo";

const columns = [
  {
    title: "Каталог",
    links: [
      { label: "Все препараты", href: "/#catalog" },
      { label: "Избранное", href: "/favorites" },
      { label: "Корзина", href: "/cart" },
    ],
  },
  {
    title: "Покупателям",
    links: [
      { label: "Доставка и оплата", href: "/#catalog" },
      { label: "Гарантии качества", href: "/#catalog" },
      { label: "Возврат", href: "/#catalog" },
    ],
  },
  {
    title: "Связь",
    links: [{ label: "Telegram", href: "https://t.me/+ShaDelf_zakaz" }],
  },
];

export function Footer() {
  return (
    <footer className="panel mt-4 flex flex-col gap-8 p-7 sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-xs">
          <div className="mb-3 flex items-center gap-3">
            <Logo size={30} />
            <span className="font-extrabold uppercase">
              Gain Mode <span className="text-neon">Pharma</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted">
            Спортивная фармакология. Препараты для атлетов.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="flex flex-col gap-2.5">
            <span className="tech mb-1 text-neon">{col.title}</span>
            {col.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted transition hover:text-neon"
              >
                {l.label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
        <span className="tech text-muted/70">
          © 2026 gain mode pharma — все права защищены
        </span>
        <span className="tech flex items-center gap-2 text-neon">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse-dot" />
          system online
        </span>
      </div>
    </footer>
  );
}

