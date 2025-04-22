export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
}

export interface ProductRecommendationResponse {
  products: Product[];
  total: number;
}

export interface ProductRecommendationError {
  error: string;
} 