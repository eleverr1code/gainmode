import Image from "next/image";

/**
 * Логотип Gain Mode Pharma.
 * Файл public/logo.png (красный знак на тёмном фоне — совпадает с палитрой сайта).
 * withPlaque — оборачивает в скруглённую плашку с неоновой рамкой (шапка, футер),
 * иначе отдаёт «голый» знак со свечением (декоративные кольца на главной).
 */
export function Logo({
  size = 34,
  withPlaque = true,
}: {
  size?: number;
  /** false — только знак со свечением, для декоративных подложек */
  withPlaque?: boolean;
}) {
  const img = (
    <Image
      src="/logo.png"
      alt="Gain Mode Pharma"
      width={size}
      height={size}
      className="block h-full w-full object-contain"
      priority
    />
  );

  const glow = "drop-shadow-[0_0_10px_rgba(255,45,77,0.45)]";

  if (!withPlaque) {
    // Круглый медальон: квадратное изображение обрезается по кругу,
    // тёмный фон логотипа совпадает с фоном сайта — стык незаметен
    return (
      <span
        className={`inline-block shrink-0 overflow-hidden rounded-full ${glow}`}
        style={{ width: size, height: size }}
      >
        {img}
      </span>
    );
  }

  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-[22%] border-2 border-[var(--border-strong)] ${glow}`}
      style={{ width: size, height: size }}
    >
      {img}
    </span>
  );
}
