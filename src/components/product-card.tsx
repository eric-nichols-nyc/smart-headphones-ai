'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  sku: string;
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
}

const ensurePngExtension = (url: string) => {
  if (!url) return '';
  return url.endsWith('.png') ? url : `${url}.png`;
};

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock_quantity > 0;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="bg-gray-900 border-gray-800 overflow-hidden transition-transform hover:scale-[1.02] duration-200">
        <div className="aspect-square relative">
          <Image
            src={ensurePngExtension(product.image_url)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-white truncate">{product.name}</h3>
            <span className="text-lg font-medium text-blue-400">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isInStock ? 'text-green-500' : 'text-red-500'}`}>
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!isInStock}
              className="pointer-events-none"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}