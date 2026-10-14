import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { FloatingWidgets } from "@/components/layout/FloatingWidgets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Gain Mode Pharma — препараты для спорта",
    template: "%s | Gain Mode Pharma",
  },
  description:
    "Препараты для спорта: пептиды, тестостерон, гормоны роста и таблетки. Актуальные цены, быстрая отгрузка, доставка по России, Беларуси и Европе.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <FloatingWidgets />
      </body>
    </html>
  );
}

