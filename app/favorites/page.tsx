"use client";

import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useShopStore } from "@/store/shop";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Footer } from "@/components/layout/Footer";

export default function FavoritesPage() {
  const favorites = useShopStore((s) => s.favorites);
  const items = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 pt-8 pb-28 lg:px-8">
      <Link
        href="/"
        className="tech flex w-fit items-center gap-2 text-muted transition hover:text-neon"
      >
        <ArrowLeft className="h-4 w-4" /> назад в каталог
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight">
        ИЗБРАННОЕ <span className="text-neon text-glow">/ {items.length}</span>
      </h1>

      {items.length === 0 ? (
        <div className="panel flex flex-col items-center gap-3 py-20 text-center">
          <Heart className="h-8 w-8 text-muted" />
          <p className="font-bold">Список избранного пуст</p>
          <p className="text-sm text-muted">
            Отмечайте препараты сердечком в каталоге — они появятся здесь
          </p>
          <Link
            href="/"
            className="mt-2 rounded-lg border border-[var(--border-strong)] px-6 py-2.5 text-sm font-bold text-neon transition hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
