export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  /** Необязательно: объём/дозировка, если указана в прайсе */
  dosage?: string;
  inStock: boolean;
}

export interface CartLine {
  productId: string;
  qty: number;
}

