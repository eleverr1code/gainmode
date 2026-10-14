"use client";

import { Send } from "lucide-react";

/** Плавающая кнопка Telegram (виджет справа внизу) */
export function FloatingWidgets() {
  return (
    <div className="pointer-events-none fixed right-0 bottom-0 z-40 flex items-end justify-between px-4 pb-4 sm:px-6">
      <a
        href="https://t.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2.5 rounded-lg border border-[var(--border-strong)] bg-panel-2 py-2.5 pr-3 pl-5 text-sm font-bold uppercase shadow-[0_0_20px_rgba(59,130,246,0.3)] transition hover:shadow-[0_0_28px_rgba(59,130,246,0.5)]"
      >
        Мы в Telegram
        <span className="grid h-9 w-9 place-items-center rounded-md bg-neon text-background">
          <Send className="h-5 w-5" />
        </span>
      </a>
    </div>
  );
}

