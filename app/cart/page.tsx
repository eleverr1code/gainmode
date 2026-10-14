"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Trash2, Minus, Plus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { cartTotals, formatPrice, useShopStore } from "@/store/shop";
import { Footer } from "@/components/layout/Footer";

type Line = { qty: number; productId: string };

export default function CartPage() {
  const cart = useShopStore((s) => s.cart);
  const setQty = useShopStore((s) => s.setQty);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const clearCart = useShopStore((s) => s.clearCart);
  const [ordered, setOrdered] = useState(false);

  const lines = cart.flatMap((l: Line) => {
    const product = PRODUCTS.find((p) => p.id === l.productId);
    return product ? [{ line: l, product }] : [];
  });

  const { count, total } = cartTotals(cart, PRODUCTS);

  if (ordered) {
    return (
      <div className="mx-auto w-full max-w-[900px] px-4 pt-10 pb-28">
        <div className="panel flex flex-col items-center gap-4 py-20 text-center">
          <CheckCircle2 className="h-12 w-12 text-green" />
          <h1 className="text-2xl font-extrabold">Заказ оформлен</h1>
          <p className="max-w-md text-sm text-muted">
            Менеджер свяжется с вами для подтверждения. Номер заказа придёт в
            SMS или сообщением в Telegram.
          </p>
          <Link
            href="/"
            className="mt-2 rounded-lg bg-neon px-6 py-3 text-sm font-bold text-background uppercase transition hover:shadow-[0_0_18px_rgba(255,45,77,0.45)]"
          >
            Вернуться в каталог
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 pt-8 pb-28">
      <Link
        href="/"
        className="tech flex w-fit items-center gap-2 text-muted transition hover:text-neon"
      >
        <ArrowLeft className="h-4 w-4" /> назад в каталог
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight">
        КОРЗИНА <span className="text-neon text-glow">/ {count} шт.</span>
      </h1>

      {lines.length === 0 ? (
        <div className="panel flex flex-col items-center gap-3 py-20 text-center">
          <p className="font-bold">Корзина пуста</p>
          <p className="text-sm text-muted">Добавьте препараты из каталога</p>
          <Link
            href="/"
            className="mt-2 rounded-lg border border-[var(--border-strong)] px-6 py-2.5 text-sm font-bold text-neon transition hover:shadow-[0_0_16px_rgba(255,45,77,0.35)]"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {lines.map(({ line, product }) => {
            return (
              <div
                key={line.productId}
                className="panel flex flex-wrap items-center gap-4 p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#120709]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="tech text-muted">{product.brand}</div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="line-clamp-1 text-sm font-bold transition hover:text-neon"
                  >
                    {product.name}
                  </Link>
                  <div className="tech mt-1 text-muted">
                    {formatPrice(product.price)} / шт
                  </div>
                </div>
                <QtyControl
                  qty={line.qty}
                  onChange={(q) => setQty(line.productId, q)}
                />
                <div className="w-28 text-right text-base font-extrabold text-neon tabular-nums">
                  {formatPrice(product.price * line.qty)}
                </div>
                <button
                  type="button"
                  aria-label="Удалить"
                  onClick={() => removeFromCart(line.productId)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-muted transition hover:border-danger hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}

          <div className="panel flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <div className="tech text-muted">итого</div>
              <div className="text-3xl font-extrabold text-neon tabular-nums text-glow">
                {formatPrice(total)}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-bold text-muted uppercase transition hover:border-danger hover:text-danger"
              >
                Очистить
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrdered(true);
                  clearCart();
                }}
                className="rounded-lg bg-neon px-7 py-3 text-sm font-extrabold text-background uppercase transition hover:shadow-[0_0_20px_rgba(255,45,77,0.5)]"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function QtyControl({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-1">
      <button
        type="button"
        aria-label="Уменьшить"
        onClick={() => onChange(qty - 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:text-neon"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-bold tabular-nums">{qty}</span>
      <button
        type="button"
        aria-label="Увеличить"
        onClick={() => onChange(qty + 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:text-neon"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
