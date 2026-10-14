"use client";

import { CATEGORIES } from "@/lib/catalog";
import { useShopStore } from "@/store/shop";

/** Горизонтальный скролл чипов категорий (по референсу) */
export function CategoryChips() {
  const category = useShopStore((s) => s.category);
  const setCategory = useShopStore((s) => s.setCategory);

  return (
    <nav
      aria-label="Категории препаратов"
      className="chips-scroll -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2"
    >
      {CATEGORIES.map((cat) => {
        const active = cat === category;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={[
              "shrink-0 rounded-md border px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition",
              active
                ? "border-[var(--border-strong)] bg-neon/12 text-neon shadow-[0_0_14px_rgba(59,130,246,0.3)]"
                : "border-[var(--border)] bg-panel-2 text-muted hover:border-[var(--border-strong)] hover:text-foreground",
            ].join(" ")}
          >
            {cat}
          </button>
        );
      })}
    </nav>
  );
}
