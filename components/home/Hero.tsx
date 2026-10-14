"use client";

import Link from "next/link";
import { ArrowDown, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { Logo } from "@/components/layout/Logo";

const stats = [
  { value: String(PRODUCTS.length), label: "позиций в прайсе" },
  { value: "24ч", label: "отгрузка" },
  { value: "100%", label: "оригинал" },
];

const features = [
  { icon: ShieldCheck, text: "Гарантия подлинности" },
  { icon: Truck, text: "Доставка по РФ, РБ и ЕС" },
  { icon: BadgeCheck, text: "Проверка качества" },
];

/** Hero: промо-блок Gain Mode Pharma (без консультаций) */
export function Hero() {
  return (
    <section className="panel corner-marks animate-fade-up relative overflow-hidden">
      {/* Диагональный красный акцент */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rotate-45 bg-[linear-gradient(135deg,rgba(59,130,246,0.35),transparent_70%)] blur-2xl"
        aria-hidden
      />

      <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
        {/* Левая часть — текст */}
        <div className="flex flex-col justify-center gap-6 p-7 sm:p-10 lg:p-12">
          <span className="tech flex w-fit items-center gap-2 rounded-md border border-[var(--border-strong)] bg-panel-2 px-4 py-2 text-neon">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse-dot" />
            gain mode // режим роста включён
          </span>

          <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight uppercase sm:text-5xl xl:text-6xl">
            Только оригинал
            <br />
            <span className="text-neon text-glow">для твоей формы</span>
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-muted">
            Gain Mode Pharma — препараты для спорта по актуальным ценам.
            Честные цены, быстрая отгрузка и проверка качества каждой позиции.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/#catalog"
              className="flex items-center gap-2.5 rounded-lg bg-neon px-8 py-4 text-sm font-extrabold text-background uppercase transition hover:shadow-[0_0_24px_rgba(59,130,246,0.55)]"
            >
              В каталог <ArrowDown className="h-4 w-4" />
            </Link>
            <Link
              href="/cart"
              className="rounded-lg border border-[var(--border-strong)] px-8 py-4 text-sm font-bold text-neon uppercase transition hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
            >
              Корзина
            </Link>
          </div>

          {/* Статистика */}
          <dl className="mt-2 flex flex-wrap gap-8 border-t border-[var(--border)] pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="text-3xl font-extrabold text-neon tabular-nums text-glow">
                  {s.value}
                </dd>
                <dd className="tech mt-1 text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Правая часть — визуал: монограмма + ЭКГ */}
        <div className="relative min-h-[280px] overflow-hidden border-t border-[var(--border)] bg-panel-2 lg:min-h-[460px] lg:border-t-0 lg:border-l">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(59,130,246,0.22),transparent_65%)]" />

          {/* Фирменный знак в кольцах */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid h-44 w-44 place-items-center sm:h-56 sm:w-56">
              {/* Подлож под круглым логотипом — гасит кромку квадратного фона */}
              <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,#0a1526_55%,rgba(10,21,38,0.65)_75%,transparent_100%)] blur-md" />
              <div className="absolute inset-0 rounded-full border-2 border-[var(--border-strong)]" />
              <div className="absolute inset-5 rounded-full border border-dashed border-[var(--border)] animate-spin-slow" />
              <Logo size={112} withPlaque={false} />
            </div>
          </div>

          {/* Штриховой паттерн */}
          <div
            className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(-45deg,transparent_0_14px,rgba(59,130,246,0.18)_14px_15px)]"
            aria-hidden
          />

          {/* Пульс (ЭКГ) */}
          <svg
            viewBox="0 0 400 60"
            className="absolute right-0 bottom-10 w-full opacity-80"
            aria-hidden="true"
          >
            <path
              d="M0 30h120l12-22 14 44 12-32 10 10h50l10-16 12 32 10-16h150"
              fill="none"
              stroke="var(--neon)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Нижняя строка-преимущества */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-[var(--border)] px-6 py-3">
        {features.map(({ icon: Icon, text }) => (
          <span key={text} className="tech flex items-center gap-2 text-neon">
            <Icon className="h-4 w-4" /> {text}
          </span>
        ))}
      </div>
    </section>
  );
}
