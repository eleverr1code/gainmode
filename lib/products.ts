import type { Product } from "./types";

/** Заглушка «Фото пока нет» — для позиций, у которых нет своего фото */
const IMG = "/images/no-photo.png";

type Draft = Omit<Product, "id" | "image"> & { image?: string };

/** Актуальный прайс (61 позиция). Порядок позиций = порядок на сайте. */
const items: Draft[] = [
  // ===== Тест Пропионат =====
  { slug: "test-propionate-pharmagen", image: "/images/photo_4.jpg", brand: "Фармаген", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 2400, inStock: true },
  { slug: "test-propionate-vermodji", image: "/images/photo_32.jpg", brand: "Вермоджи", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 1900, inStock: true },
  { slug: "test-propionate-balkan", image: "/images/photo_18.jpg", brand: "Балкан", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 1900, inStock: true },
  { slug: "test-propionate-eurofarm", image: "/images/photo_38.jpg", brand: "Еврофарм", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 1900, inStock: true },
  { slug: "test-propionate-swiss", image: "/images/photo_24.jpg", brand: "Свисс", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 1900, inStock: true },
  { slug: "test-propionate-gold-dragon", brand: "Голд Драгон", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 1800, inStock: true },
  { slug: "test-propionate-olymp", brand: "Олимп", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 1800, inStock: true },
  { slug: "test-propionate-zphc", brand: "ЗПХ", name: "Тест Пропионат", category: "ТЕСТОСТЕРОН", price: 1900, inStock: true },

  // ===== Тест Энантат =====
  { slug: "test-enanthate-pharmagen", image: "/images/photo_8.jpg", brand: "Фармаген", name: "Тест Энантат", category: "ТЕСТОСТЕРОН", price: 3500, inStock: true },
  { slug: "test-enanthate-eurofarm", image: "/images/photo_36.jpg", brand: "Еврофарм", name: "Тест Энантат", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },
  { slug: "test-enanthate-vermodji", image: "/images/photo_28.jpg", brand: "Вермоджи", name: "Тест Энантат", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },
  { slug: "test-enanthate-swiss", brand: "Свисс", name: "Тест Энантат", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },

  // ===== Тест Ципионат =====
  { slug: "test-cypionate-pharmagen", image: "/images/photo_21.jpg", brand: "Фармаген", name: "Тест Ципионат", category: "ТЕСТОСТЕРОН", price: 3500, inStock: true },
  { slug: "test-cypionate-vermodji", brand: "Вермоджи", name: "Тест Ципионат", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },
  { slug: "test-cypionate-balkan", image: "/images/photo_16.jpg", brand: "Балкан", name: "Тест Ципионат", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },
  { slug: "test-cypionate-eurofarm", brand: "Еврофарм", name: "Тест Ципионат", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },
  { slug: "test-cypionate-zphc", brand: "ЗПХ", name: "Тест Ципионат", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },

  // ===== Сустанон =====
  { slug: "sustanon-pharmagen", image: "/images/photo_1.jpg", brand: "Фармаген", name: "Сустанон", category: "ТЕСТОСТЕРОН", price: 3600, inStock: true },
  { slug: "sustanon-vermodji", brand: "Вермоджи", name: "Сустанон", category: "ТЕСТОСТЕРОН", price: 3400, inStock: true },
  { slug: "sustanon-balkan", image: "/images/photo_14.jpg", brand: "Балкан", name: "Сустанон", category: "ТЕСТОСТЕРОН", price: 3500, inStock: true },
  { slug: "sustanon-eurofarm", brand: "Еврофарм", name: "Сустанон", category: "ТЕСТОСТЕРОН", price: 3500, inStock: true },
  { slug: "sustanon-zphc", brand: "ЗПХ", name: "Сустанон", category: "ТЕСТОСТЕРОН", price: 3500, inStock: true },

  // ===== Нандролон Деканат =====
  { slug: "nandrolone-decanoate-pharmagen", image: "/images/photo_6.jpg", brand: "Фармаген", name: "Нандролон Деканат", category: "НАНДРОЛОН", price: 3700, inStock: true },
  { slug: "nandrolone-decanoate-vermodji", brand: "Вермоджи", name: "Нандролон Деканат", category: "НАНДРОЛОН", price: 3600, inStock: true },
  { slug: "nandrolone-decanoate-eurofarm", brand: "Еврофарм", name: "Нандролон Деканат", category: "НАНДРОЛОН", price: 3650, inStock: true },

  // ===== Нандролон Фенил =====
  { slug: "nandrolone-phenylpropionate-eurofarm", brand: "Еврофарм", name: "Нандролон Фенил", category: "НАНДРОЛОН", price: 2600, inStock: true },
  { slug: "nandrolone-phenylpropionate-balkan", image: "/images/photo_13.jpg", brand: "Балкан", name: "Нандролон Фенил", category: "НАНДРОЛОН", price: 2500, inStock: true },

  // ===== Мастерон Энантат =====
  { slug: "masteron-enanthate-pharmagen", image: "/images/photo_7.jpg", brand: "Фармаген", name: "Мастерон Энантат", category: "МАСТЕРОН", price: 5500, inStock: true },
  { slug: "masteron-enanthate-vermodji", image: "/images/photo_31.jpg", brand: "Вермоджи", name: "Мастерон Энантат", category: "МАСТЕРОН", price: 5300, inStock: true },
  { slug: "masteron-enanthate-eurofarm", brand: "Еврофарм", name: "Мастерон Энантат", category: "МАСТЕРОН", price: 5300, inStock: true },

  // ===== Мастерон Пропионат =====
  { slug: "masteron-propionate-pharmagen", image: "/images/photo_3.jpg", brand: "Фармаген", name: "Мастерон Пропионат", category: "МАСТЕРОН", price: 3600, inStock: true },
  { slug: "masteron-propionate-vermodji", image: "/images/photo_29.jpg", brand: "Вермоджи", name: "Мастерон Пропионат", category: "МАСТЕРОН", price: 3400, inStock: true },
  { slug: "masteron-propionate-eurofarm", brand: "Еврофарм", name: "Мастерон Пропионат", category: "МАСТЕРОН", price: 3400, inStock: true },
  { slug: "masteron-propionate-zphc", brand: "ЗПХ", name: "Мастерон Пропионат", category: "МАСТЕРОН", price: 3500, inStock: true },

  // ===== Болденон =====
  { slug: "boldenone-pharmagen", image: "/images/photo_2.jpg", brand: "Фармаген", name: "Болденон", category: "БОЛДЕНОН", price: 3600, inStock: true },
  { slug: "boldenone-vermodji", brand: "Вермоджи", name: "Болденон", category: "БОЛДЕНОН", price: 3400, inStock: true },
  { slug: "boldenone-eurofarm", brand: "Еврофарм", name: "Болденон", category: "БОЛДЕНОН", price: 3400, inStock: true },
  { slug: "boldenone-zphc", brand: "ЗПХ", name: "Болденон", category: "БОЛДЕНОН", price: 3400, inStock: true },

  // ===== Тренболон =====
  { slug: "trenbolone-acetate-pharmagen", image: "/images/photo_5.jpg", brand: "Фармаген", name: "Тренболон Ацетат", category: "ТРЕНБОЛОН", price: 3800, inStock: true },
  { slug: "trenbolone-acetate-swiss", brand: "Свисс", name: "Тренболон Ацетат", category: "ТРЕНБОЛОН", price: 3500, inStock: true },
  { slug: "trenbolone-acetate-zphc", brand: "ЗПХ", name: "Тренболон Ацетат", category: "ТРЕНБОЛОН", price: 3300, inStock: true },
  { slug: "trenbolone-enanthate-pharmagen", image: "/images/photo_11.jpg", brand: "Фармаген", name: "Тренболон Энантат", category: "ТРЕНБОЛОН", price: 4900, inStock: true },
  { slug: "trenbolone-enanthate-swiss", brand: "Свисс", name: "Тренболон Энантат", category: "ТРЕНБОЛОН", price: 4700, inStock: true },
  { slug: "trenbolone-enanthate-zphc", brand: "ЗПХ", name: "Тренболон Энантат", category: "ТРЕНБОЛОН", price: 4700, inStock: true },
  { slug: "trenbolone-hexa-pharmagen", brand: "Фармаген", name: "Тренболон Гекса", category: "ТРЕНБОЛОН", price: 5500, inStock: true },

  // ===== Примоболан =====
  { slug: "primobolan-pharmagen", image: "/images/photo_23.jpg", brand: "Фармаген", name: "Примоболан", category: "ПРИМОБОЛАН", price: 7500, inStock: true },
  { slug: "primobolan-vermodji", image: "/images/photo_30.jpg", brand: "Вермоджи", name: "Примоболан", category: "ПРИМОБОЛАН", price: 7200, inStock: true },
  { slug: "primobolan-eurofarm", image: "/images/photo_37.jpg", brand: "Еврофарм", name: "Примоболан", category: "ПРИМОБОЛАН", price: 7200, inStock: true },

  // ===== Таблетки / оралы =====
  { slug: "stanazolol-eurofarm", brand: "Еврофарм", name: "Станазалол (таб)", category: "ТАБЛЕТКИ", price: 2000, inStock: true },
  { slug: "turinabol-pharmagen", image: "/images/photo_9.jpg", brand: "Фармаген", name: "Туринабол", category: "ТАБЛЕТКИ", price: 3500, inStock: true },
  { slug: "metandrostenolone-pharmagen", brand: "Фармаген", name: "Метана", category: "ДГБ", price: 2500, inStock: true },
  { slug: "oxandrolone-pharmagen", brand: "Фармаген", name: "Оксандралон", category: "ТАБЛЕТКИ", price: 4000, inStock: true },

  // ===== Гормоны роста =====
  { slug: "somatotropin-canada-dry", image: "/images/photo_19.jpg", brand: "Канада", name: "Саматропин сухой", category: "ГОРМОНЫ РОСТА", price: 9800, inStock: true },
  { slug: "somatotropin-marten-dry", brand: "Мартен", name: "Саматропин сухой | 100 МЕ", category: "ГОРМОНЫ РОСТА", price: 8500, dosage: "100 МЕ", inStock: true },
  { slug: "eurotropin-liquid", image: "/images/photo_39.jpg", brand: "Евротропин", name: "Соматропин жидкий | 100 МЕ", category: "ГОРМОНЫ РОСТА", price: 8500, dosage: "100 МЕ", inStock: true },

  // ===== Swiss пептиды =====
  { slug: "retatrutide-40mg-swiss", image: "/images/photo_44.jpg", brand: "Swiss", name: "Ретатрутид (Рета)", category: "ПЕПТИДЫ", price: 20000, dosage: "40 мг", inStock: true },
  { slug: "tirzepatide-30mg-swiss", brand: "Swiss", name: "Тирзепатид (Терз)", category: "ПЕПТИДЫ", price: 19000, dosage: "30 мг", inStock: true },
  { slug: "mots-c-20mg-swiss", image: "/images/photo_43.jpg", brand: "Swiss", name: "MOTS-C (Мотс)", category: "ПЕПТИДЫ", price: 11500, dosage: "20 мг", inStock: true },
  { slug: "tb-500-20mg-swiss", brand: "Swiss", name: "ТБ-500", category: "ПЕПТИДЫ", price: 11000, dosage: "20 мг", inStock: true },
  { slug: "pt-141-10mg-swiss", brand: "Swiss", name: "ПТ-141", category: "ПЕПТИДЫ", price: 10000, dosage: "10 мг", inStock: true },
  { slug: "ghk-cu-60mg-swiss", brand: "Swiss", name: "GHK-Cu", category: "ПЕПТИДЫ", price: 9000, dosage: "60 мг", inStock: true },
];

/** Каталог: id = slug, image — фото из /images или заглушка */
export const PRODUCTS: Product[] = items.map((p) => ({
  ...p,
  id: p.slug,
  image: p.image ?? IMG,
}));

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
