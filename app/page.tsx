import { Hero } from "@/components/home/Hero";
import { CategoryChips } from "@/components/home/CategoryChips";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 pt-8 pb-28 lg:px-8">
      <Hero />
      <CategoryChips />
      <ProductGrid />
      <Footer />
    </div>
  );
}
