"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, useShopStore } from "@/store/shop";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const favorites = useShopStore((s) => s.favorites);
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);
  const addToCart = useShopStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  const isFav = favorites.includes(product.id);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="panel group flex flex-col overflow-hidden transition hover:border-[var(--border-strong)] hover:shadow-[0_0_20px_rgba(255,45,77,0.18)]">
      {/* Изображение + избранное */}
      <div className="relative aspect-square bg-[#120709]">
        <button
          type="button"
          aria-label={
            isFav ? "Убрать из избранного" : "Добавить в избранное"
          }
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 left-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[rgba(5,9,12,0.8)] transition hover:border-[var(--border-strong)]"
        >
          <Heart
            className={[
              "h-4.5 w-4.5 transition",
              isFav ? "fill-danger text-danger" : "text-foreground",
            ].join(" ")}
          />
        </button>
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-contain p-4 transition duration-300 group-hover:scale-[1.04]"
          />
        </Link>
      </div>

      {/* Информация */}
      <div className="flex flex-1 flex-col gap-1.5 border-t border-[var(--border)] p-4">
        <span className="tech text-muted">{product.brand}</span>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm leading-snug font-bold transition hover:text-neon"
        >
          {product.name}
        </Link>
        <span className="tech text-muted">{product.category}</span>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="leading-tight">
            <div className="text-lg font-extrabold text-neon tabular-nums">
              {formatPrice(product.price)}
            </div>
            {product.oldPrice && (
              <div className="text-xs text-muted line-through tabular-nums">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Добавить в корзину"
            onClick={handleAdd}
            className={[
              "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition",
              added
                ? "border-green bg-green/15 text-green"
                : "border-[var(--border)] text-neon hover:border-[var(--border-strong)] hover:shadow-[0_0_14px_rgba(255,45,77,0.3)]",
            ].join(" ")}
          >
            {added ? (
              <Check className="h-5 w-5" strokeWidth={3} />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
