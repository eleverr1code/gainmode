# Gain Mode Pharma — препараты для спорта

Витрина интернет-магазина спортивной фармакологии. Тёмная тема с **неоново-красным** акцентом: шапка с поиском и часами, промо-hero с фирменным знаком, чипы категорий, сетка товаров, корзина и избранное. Без авторизации, чата поддержки, консультаций врача и выбора складов.

## Стек

- **Next.js 16** (App Router, Cache Components) + **TypeScript**
- **Tailwind CSS v4** — дизайн-токены в `app/globals.css` (`--neon: #ff2d4d`)
- **Zustand** (+ persist) — корзина / избранное / категория / поиск
- **lucide-react** — иконки

## Команды

```bash
npm install                      # зависимости
npm run dev                      # дев-сервер (http://localhost:3000)
npm run build                    # продакшен-сборка
npm run lint                     # ESLint
node scripts/recolor.mjs         # массовая замена цветов (утилита миграции)
```

## Структура

```
app/
  page.tsx                  # главная: hero + категории + каталог
  cart/page.tsx             # корзина и оформление заказа
  favorites/page.tsx        # избранное
  product/[slug]/page.tsx   # карточка товара (SSR + metadata)
components/
  layout/    Header, Logo, Footer, FloatingWidgets (Telegram)
  home/      Hero, CategoryChips
  catalog/   ProductGrid, ProductCard, ProductDetail
lib/         types.ts, catalog.ts (категории), products.ts (актуальный прайс)
store/       shop.ts (zustand-стор + хелперы цены)
scripts/     recolor.mjs
```

## Данные

Каталог — актуальный прайс в `lib/products.ts` (61 позиция: тестостероны, нандролоны, мастероны, болденон, тренболоны, оралы, ГР, пептиды). Фото пока нет — используется общая плашка `public/products/no-photo.svg`; при появлении реальных фото положите их в `public/products/` и обновите поле `image`. Логотип — векторная реконструкция фирменного знака в `components/layout/Logo.tsx` (красный металлик вместо золота, тёмная плашка в стиле панелей сайта).

## Дальнейшие шаги

1. Подключение API/БД вместо статического массива
2. Реальные фото товаров и контентные страницы (о компании, доставка)
3. Платёжный шлюз и оформление заказа на бэкенде
4. Отправка заказов в Telegram-бота / на почту
5. SEO: sitemap, Open Graph, микроразметка товаров
