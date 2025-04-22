import { NextResponse } from 'next/server';

// In-memory cache for products
let productsCache: Product[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  imageUrl: string;
}

interface APIProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  image_url: string;
}

async function fetchProducts(): Promise<Product[]> {
  const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || 'https://products-api-jade.vercel.app';
  const response = await fetch(`${PRODUCTS_API_URL}/api/products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await response.json();
  return products.map((product: APIProduct) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    features: product.features || [],
    imageUrl: product.image_url
  }));
}

export async function GET() {
  try {
    // Check if cache is valid
    const now = Date.now();
    if (!productsCache || now - lastFetchTime > CACHE_DURATION) {
      // Cache is empty or expired, fetch new data
      productsCache = await fetchProducts();
      lastFetchTime = now;
    }

    return NextResponse.json(productsCache);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 