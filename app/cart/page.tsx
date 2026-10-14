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
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [tg, setTg] = useState("");

  const fieldCls =
    "rounded-lg border border-[var(--border)] bg-panel-2 px-4 py-3 text-sm outline-none transition focus:border-[var(--border-strong)] focus:shadow-[0_0_14px_rgba(59,130,246,0.25)]";

  const lines = cart.flatMap((l: Line) => {
    const product = PRODUCTS.find((p) => p.id === l.productId);
    return product ? [{ line: l, product }] : [];
  });

  const { count, total } = cartTotals(cart, PRODUCTS);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Укажите имя");
      return;
    }
    if (tg.trim().replace(/^@+/, "").length < 3) {
      setError("Укажите username в Telegram");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map(({ product, line }) => ({
            name: product.name,
            brand: product.brand,
            qty: line.qty,
            price: product.price,
          })),
          total,
          name: name.trim(),
          tg: tg.trim().replace(/^@+/, ""),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Не удалось отправить заказ");
        return;
      }
      setOrdered(true);
      clearCart();
    } catch {
      setError("Ошибка сети. Проверьте соединение и попробуйте снова");
    } finally {
      setSending(false);
    }
  };

  if (ordered && cart.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[900px] px-4 pt-10 pb-28">
        <div className="panel flex flex-col items-center gap-4 py-20 text-center">
          <CheckCircle2 className="h-12 w-12 text-green" />
          <h1 className="text-2xl font-extrabold">Заказ отправлен</h1>
          <p className="max-w-md text-sm text-muted">
            Менеджер получил заявку и свяжется с вами для подтверждения.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setOrdered(false);
                setShowForm(false);
                setName("");
                setTg("");
                setError(null);
              }}
              className="rounded-lg bg-neon px-6 py-3 text-sm font-bold text-background uppercase transition hover:shadow-[0_0_18px_rgba(59,130,246,0.45)]"
            >
              Заказать ещё раз
            </button>
            <Link
              href="/"
              className="rounded-lg border border-[var(--border-strong)] px-6 py-3 text-sm font-bold text-neon uppercase transition hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
            >
              Вернуться в каталог
            </Link>
          </div>
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
            className="mt-2 rounded-lg border border-[var(--border-strong)] px-6 py-2.5 text-sm font-bold text-neon transition hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
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
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#0c1a2e]">
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
                  setError(null);
                  setShowForm(true);
                }}
                className="rounded-lg bg-neon px-7 py-3 text-sm font-extrabold text-background uppercase transition hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно оформления заказа */}
      {showForm && !ordered && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowForm(false)}
        >
          <div
            className="panel w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-extrabold tracking-tight">
              Оформление заказа
            </h2>
            <p className="mt-1 text-sm text-muted">
              {count} шт. на сумму{" "}
              <b className="text-neon tabular-nums">{formatPrice(total)}</b> —
              менеджер свяжется с вами для подтверждения.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="tech text-muted">имя *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Александр"
                  autoComplete="name"
                  className={fieldCls}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="tech text-muted">telegram *</span>
                <input
                  value={tg}
                  onChange={(e) => setTg(e.target.value)}
                  placeholder="@username"
                  autoComplete="username"
                  className={fieldCls}
                />
              </label>

              {error && <p className="text-sm text-danger">{error}</p>}

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-bold text-muted uppercase transition hover:border-danger hover:text-danger"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 rounded-lg bg-neon px-6 py-3 text-sm font-extrabold text-background uppercase transition hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50"
                >
                  {sending ? "Отправляем…" : "Отправить заказ"}
                </button>
              </div>
            </form>
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
