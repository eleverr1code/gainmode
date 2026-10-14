import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { ProductDetail } from "@/components/catalog/ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Препарат не найден" };
  const dosage = product.dosage ? ` — ${product.dosage}` : "";
  return {
    title: `${product.brand} ${product.name}`,
    description: `${product.name}${dosage}. Купить в Gain Mode Pharma.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

