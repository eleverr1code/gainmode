import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, Product } from "@/lib/types";

interface ShopState {
  cart: CartLine[];
  favorites: string[];
  category: string;
  search: string;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  setCategory: (category: string) => void;
  setSearch: (q: string) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      favorites: [],
      category: "ВСЕ",
      search: "",

      addToCart: (productId, qty = 1) =>
        set((s) => {
          const line = s.cart.find((l) => l.productId === productId);
          if (line) {
            return {
              cart: s.cart.map((l) =>
                l.productId === productId ? { ...l, qty: l.qty + qty } : l
              ),
            };
          }
          return { cart: [...s.cart, { productId, qty }] };
        }),

      removeFromCart: (productId) =>
        set((s) => ({ cart: s.cart.filter((l) => l.productId !== productId) })),

      setQty: (productId, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((l) => l.productId !== productId)
              : s.cart.map((l) => (l.productId === productId ? { ...l, qty } : l)),
        })),

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (productId) =>
        set((s) => ({
          favorites: s.favorites.includes(productId)
            ? s.favorites.filter((id) => id !== productId)
            : [...s.favorites, productId],
        })),

      setCategory: (category) => set({ category }),
      setSearch: (search) => set({ search }),
    }),
    { name: "gainmode-shop-v2" }
  )
);

/** Итог по корзине с учётом каталога */
export function cartTotals(
  cart: CartLine[],
  products: Product[]
): { count: number; total: number } {
  let count = 0;
  let total = 0;
  for (const line of cart) {
    const p = products.find((x) => x.id === line.productId);
    if (!p) continue;
    count += line.qty;
    total += p.price * line.qty;
  }
  return { count, total };
}

export function formatPrice(value: number): string {
  return (
    new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 2,
    }).format(value) + " ₽"
  );
}
