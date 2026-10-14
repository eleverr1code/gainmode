import { NextRequest, NextResponse } from "next/server";

interface OrderItem {
  name: string;
  brand: string;
  qty: number;
  price: number;
}

interface OrderPayload {
  items: OrderItem[];
  total: number;
  name: string;
  phone: string;
}

/** Экранирование спецсимволов для parse_mode: HTML */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatPrice(n: number): string {
  return (
    new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(n) +
    " ₽"
  );
}

/** Формирование текста заказа для менеджера */
function buildMessage(order: OrderPayload): string {
  const lines = order.items.map((it, i) => {
    const lineTotal = it.price * it.qty;
    return `${i + 1}. ${escapeHtml(it.brand)} — ${escapeHtml(it.name)}\n   ${it.qty} шт × ${formatPrice(it.price)} = ${formatPrice(lineTotal)}`;
  });

  const date = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });

  return [
    "🛒 <b>Новый заказ — Gain Mode Pharma</b>",
    "",
    `👤 Имя: <b>${escapeHtml(order.name)}</b>`,
    `📞 Телефон: <b>${escapeHtml(order.phone)}</b>`,
    "",
    "<b>Товары:</b>",
    ...lines,
    "—————————",
    `💰 Итого: <b>${formatPrice(order.total)}</b>`,
    "",
    `🕐 ${date} (МСК)`,
  ].join("\n");
}

export async function POST(req: NextRequest) {
  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400 }
    );
  }

  // Серверная валидация (не доверяем клиенту)
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Корзина пуста" },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Укажите имя" },
      { status: 400 }
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "Укажите корректный телефон" },
      { status: 400 }
    );
  }

  // Читаем env в рантайме (важно для serverless-хостингов)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");
    return NextResponse.json(
      { ok: false, error: "Сервис заказов не настроен" },
      { status: 500 }
    );
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildMessage(body),
          parse_mode: "HTML",
        }),
      }
    );

    const data = await res.json();
    if (!data.ok) {
      console.error("Telegram API error:", data);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заказ менеджеру" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Ошибка отправки в Telegram:", e);
    return NextResponse.json(
      { ok: false, error: "Ошибка соединения. Попробуйте позже" },
      { status: 500 }
    );
  }
}
