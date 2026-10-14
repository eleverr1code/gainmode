import { NextResponse } from "next/server";

/**
 * Диагностика: показывает, доходят ли env-переменные до рантайма функций.
 * Значения не отдаются — только факт наличия.
 */
export async function GET() {
  return NextResponse.json({
    hasBotToken: Boolean(process.env.TELEGRAM_BOT_TOKEN),
    hasChatId: Boolean(process.env.TELEGRAM_CHAT_ID),
  });
}
