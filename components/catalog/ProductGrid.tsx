"use client";

import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useShopStore } from "@/store/shop";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

/** Фильтрация каталога по категории, поиску и «избранному» */
export function filterProducts(
  products: Product[],
  opts: {
    category: string;
    search: string;
    favoritesOnly: boolean;
    favorites: string[];
  }
): Product[] {
  const q = opts.search.trim().toLowerCase();
  return products.filter((p) => {
    if (opts.category !== "ВСЕ" && p.category !== opts.category) return false;
    if (opts.favoritesOnly && !opts.favorites.includes(p.id)) return false;
    if (q && !`${p.brand} ${p.name}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function ProductGrid() {
  const category = useShopStore((s) => s.category);
  const search = useShopStore((s) => s.search);
  const favorites = useShopStore((s) => s.favorites);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const items = useMemo(
    () =>
      filterProducts(PRODUCTS, {
        category,
        search,
        favoritesOnly,
        favorites,
      }),
    [category, search, favoritesOnly, favorites]
  );

  return (
    <section id="catalog" className="animate-fade-up scroll-mt-24">
      {/* Заголовок секции */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
          Каталог <span className="text-neon text-glow">препаратов</span>
        </h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setFavoritesOnly((v) => !v)}
            className={[
              "tech rounded-lg border px-5 py-2.5 transition",
              favoritesOnly
                ? "border-danger bg-danger/10 text-danger"
                : "border-[var(--border)] text-muted hover:border-[var(--border-strong)] hover:text-foreground",
            ].join(" ")}
          >
            избранное
          </button>
          <span className="tech text-muted">
            {items.length} найдено
          </span>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="panel flex flex-col items-center gap-3 py-16 text-center">
          <Heart className="h-8 w-8 text-muted" />
          <p className="text-sm font-bold">Ничего не найдено</p>
          <p className="text-xs text-muted">
            Измените категорию или поисковый запрос
          </p>
        </div>
      )}
    </section>
  );
}
