"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, useShopStore } from "@/store/shop";
import { Footer } from "@/components/layout/Footer";

export function ProductDetail({ product }: { product: Product }) {
  const favorites = useShopStore((s) => s.favorites);
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);
  const addToCart = useShopStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  const isFav = favorites.includes(product.id);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 pt-8 pb-28">
      <Link
        href="/"
        className="tech flex w-fit items-center gap-2 text-muted transition hover:text-neon"
      >
        <ArrowLeft className="h-4 w-4" /> назад в каталог
      </Link>

      <div className="panel corner-marks grid gap-0 overflow-hidden lg:grid-cols-2">
        {/* Изображение */}
        <div className="relative aspect-square bg-[#0c1a2e]">
          <button
            type="button"
            aria-label={isFav ? "Убрать из избранного" : "В избранное"}
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-4 left-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-[rgba(10,21,38,0.8)] transition hover:border-[var(--border-strong)]"
          >
            <Heart
              className={
                isFav ? "h-5 w-5 fill-danger text-danger" : "h-5 w-5"
              }
            />
          </button>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 550px"
            className="object-contain p-10"
            priority
          />
        </div>

        {/* Информация */}
        <div className="flex flex-col gap-4 border-t border-[var(--border)] p-7 sm:p-10 lg:border-t-0 lg:border-l">
          <span className="tech text-muted">{product.brand}</span>
          <h1 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <div className="tech flex flex-wrap gap-3">
            <span className="rounded-md border border-[var(--border)] px-3 py-1.5 text-muted">
              {product.category}
            </span>
            <span className="rounded-md border border-green/40 px-3 py-1.5 text-green">
              в наличии
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted">
            {product.dosage && (
              <>
                Дозировка: <b className="text-foreground">{product.dosage}</b>.{" "}
              </>
            )}
            Оригинальная упаковка с защитными элементами. Отгрузка в течение
            24 часов после подтверждения заказа.
          </p>

          <div className="flex items-end gap-4">
            <span className="text-4xl font-extrabold text-neon tabular-nums text-glow">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="pb-1 text-base text-muted line-through tabular-nums">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                addToCart(product.id);
                setAdded(true);
                setTimeout(() => setAdded(false), 1200);
              }}
              className={[
                "flex items-center gap-2.5 rounded-lg px-7 py-4 text-sm font-extrabold uppercase transition",
                added
                  ? "bg-green text-background"
                  : "bg-neon text-background hover:shadow-[0_0_22px_rgba(59,130,246,0.55)]",
              ].join(" ")}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" strokeWidth={3} /> добавлено
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" /> в корзину
                </>
              )}
            </button>
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-lg border border-[var(--border-strong)] px-7 py-4 text-sm font-bold uppercase text-neon transition hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
            >
              перейти в корзину
            </Link>
          </div>

          <ul className="mt-2 flex flex-col gap-2.5 border-t border-[var(--border)] pt-5 text-xs text-muted">
            <li className="flex items-center gap-2.5">
              <Truck className="h-4 w-4 shrink-0 text-neon" /> Быстрая отправка,
              отслеживание по номеру заказа
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-neon" /> Гарантия
              подлинности и возврат при браке
            </li>
            <li className="flex items-center gap-2.5">
              <BadgeCheck className="h-4 w-4 shrink-0 text-neon" /> Проверка
              качества каждой позиции перед отгрузкой
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
