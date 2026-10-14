"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Heart, ShoppingCart, Search } from "lucide-react";
import { Logo } from "./Logo";
import { useShopStore, cartTotals } from "@/store/shop";
import { PRODUCTS } from "@/lib/products";

/** Гидратация-безопасный flаg: false на сервере, true на клиенте */
const emptySubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("ru-RU", { hour12: false })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tech text-neon/80 tabular-nums">
      {time ?? "--:--:--"}
    </span>
  );
}

export function Header() {
  const cart = useShopStore((s) => s.cart);
  const search = useShopStore((s) => s.search);
  const setSearch = useShopStore((s) => s.setSearch);
  const { count } = cartTotals(cart, PRODUCTS);
  const mounted = useMounted();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(10,5,7,0.92)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 lg:px-8">
        {/* Статус-декор слева (только на больших экранах) */}
        <div className="hidden shrink-0 flex-col gap-1 xl:flex">
          <span className="tech flex items-center gap-1.5 text-neon">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse-dot" />
            System online
          </span>
          <span className="tech text-muted/70">core_node_v3.1.0 // access_granted</span>
        </div>

        {/* Логотип */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Logo />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-extrabold tracking-tight uppercase">
              Gain Mode <span className="text-neon text-glow">Pharma</span>
            </span>
            <span className="tech text-muted">спортивная фармакология</span>
          </span>
        </Link>

        {/* Поиск */}
        <label className="relative mx-2 hidden min-w-0 flex-1 items-center md:flex">
          <Search
            className="pointer-events-none absolute left-4 h-4 w-4 text-muted"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск препаратов..."
            className="w-full rounded-lg border border-[var(--border)] bg-panel-2 py-2.5 pr-4 pl-10 text-sm outline-none transition focus:border-[var(--border-strong)] focus:shadow-[0_0_14px_rgba(255,45,77,0.25)]"
          />
        </label>

        {/* Действия */}
        <div className="ml-auto flex items-center gap-2.5">
          <span className="hidden lg:block">
            <Clock />
          </span>
          <Link
            href="/favorites"
            aria-label="Избранное"
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] text-muted transition hover:border-[var(--border-strong)] hover:text-neon"
          >
            <Heart className="h-4.5 w-4.5" />
          </Link>
          <Link
            href="/cart"
            aria-label="Корзина"
            className="relative grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] text-muted transition hover:border-[var(--border-strong)] hover:text-neon"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {mounted && count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-neon px-1 text-[11px] font-bold text-background">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
